import { useEffect, useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from "recharts";
import { fetchCSV, CSVRow } from "../lib/dataLoader";

type MetricType = "Entropy" | "Nakamoto" | "Gini" | "HHI" | "Count";
type DataSourceType = "consensus" | "defi_gov" | "defi_tvl" | "developers" | "exchanges" | "nft_marketplace";

interface ConsensusChartProps {
  metric: MetricType;
  dataSource: DataSourceType;
}

interface AggregatedData {
  Date: string;
  [key: string]: string | number;
}

export function ConsensusChart({ metric, dataSource }: ConsensusChartProps) {
  const [data, setData] = useState<AggregatedData[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hiddenLines, setHiddenLines] = useState<Set<string>>(new Set());
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const csvData = await fetchCSV(`${dataSource}.csv`);
        
        console.log(`Loaded ${csvData.length} rows from ${dataSource}.csv`);
        
        // get all unique groups
        const uniqueGroups = [...new Set(csvData.map(row => row.Group))].filter(Boolean);
        console.log('Unique groups found:', uniqueGroups);
        setGroups(uniqueGroups);
        
        // aggregate data by month for each group
        const monthlyData = aggregateByMonth(csvData, metric, uniqueGroups);
        console.log(`Aggregated to ${monthlyData.length} monthly data points`);
        
        setData(monthlyData);
        setError(null);
        // reset hidden lines when data changes
        setHiddenLines(new Set());
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [metric, dataSource]);

  // calculate filtered data based on visible lines and date range with actual data
  const filteredData = useMemo(() => {
    if (data.length === 0) return data;
    
    const visibleGroups = groups.filter(group => !hiddenLines.has(group));
    
    if (visibleGroups.length === 0) return data;
    
    // only include dates where at least one visible group has data
    return data.filter(dataPoint => {
      return visibleGroups.some(group => {
        const value = dataPoint[group];
        return value !== null && value !== undefined && typeof value === 'number' && !isNaN(value);
      });
    });
  }, [data, groups, hiddenLines]);

  // y axis domain based on visible lines
  const yAxisDomain = useMemo(() => {
    if (filteredData.length === 0) return [0, 'auto'];
    
    const visibleGroups = groups.filter(group => !hiddenLines.has(group));
    
    if (visibleGroups.length === 0) return [0, 'auto'];
    
    let min = Infinity;
    let max = -Infinity;
    
    filteredData.forEach(dataPoint => {
      visibleGroups.forEach(group => {
        const value = dataPoint[group];
        if (typeof value === 'number' && !isNaN(value)) {
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      });
    });
    
    // 5% padding to min/max 
    const padding = (max - min) * 0.05;
    return [
      Math.max(0, min - padding), // dont go below 0
      max + padding
    ];
  }, [filteredData, groups, hiddenLines]);

  // aggregate data by year-month, avg each group
  function aggregateByMonth(data: CSVRow[], metric: MetricType, groups: string[]): AggregatedData[] {
    const monthlyMap = new Map<string, Map<string, number[]>>();

    data.forEach(row => {
      if (!row.Date || !row.Group || row[metric] === null || row[metric] === undefined) {
        return;
      }

      // get the year+month from date
      const dateStr = String(row.Date);
      const yearMonth = dateStr.substring(0, 7); // Gets YYYY-MM
      
      if (!monthlyMap.has(yearMonth)) {
        monthlyMap.set(yearMonth, new Map());
      }
      
      const groupMap = monthlyMap.get(yearMonth)!;
      if (!groupMap.has(row.Group)) {
        groupMap.set(row.Group, []);
      }
      
      groupMap.get(row.Group)!.push(row[metric]);
    });

    // avgs
    const result: AggregatedData[] = [];
    
    // month first
    const sortedMonths = Array.from(monthlyMap.keys()).sort();
    
    sortedMonths.forEach((yearMonth) => {
      const groupMap = monthlyMap.get(yearMonth)!;
      const dataPoint: AggregatedData = { Date: yearMonth };
      
      // get group data, null if none
      groups.forEach(group => {
        if (groupMap.has(group)) {
          const values = groupMap.get(group)!;
          const average = values.reduce((a, b) => a + b, 0) / values.length;
          dataPoint[group] = average;
        } else {
          dataPoint[group] = null as any;
        }
      });
      
      result.push(dataPoint);
    });

    return result;
  }

  const handleLegendClick = (dataKey: string) => {
    const newHiddenLines = new Set(hiddenLines);
    if (newHiddenLines.has(dataKey)) {
      newHiddenLines.delete(dataKey);
    } else {
      newHiddenLines.add(dataKey);
    }
    setHiddenLines(newHiddenLines);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  // Define colors for each group
  const colorMap: { [key: string]: string } = {
    'Bitcoin': '#F7931A',
    'Ethereum': '#627EEA',
    'Solana': '#14F195',
    'BNB': '#2b9627',
    'Ronin': '#a841f2',
    'TON': '#9ebd04',
    'Tron': '#FF060A',
    'Polygon': '#8247E5',
  };

  // colors for groups not in colorMap
  const defaultColors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', 
    '#a28dd8', '#6dd8d0', '#ff9f40', '#c084fc',
    '#fb923c', '#34d399', '#60a5fa', '#f472b6'
  ];

  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    const isMobile = windowWidth < 640;
    
    return (
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4">
        {payload.map((entry: any, index: number) => {
          const isHidden = hiddenLines.has(entry.value);
          return (
            <button
              key={`legend-${index}`}
              onClick={() => handleLegendClick(entry.value)}
              onMouseEnter={() => setHoveredLine(entry.value)}
              onMouseLeave={() => setHoveredLine(null)}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded transition-all ${
                isHidden 
                  ? 'opacity-30 bg-gray-100' 
                  : 'opacity-100 hover:bg-gray-700 hover:shadow-sm'
              }`}
              style={{
                textDecoration: isHidden ? 'line-through' : 'none'
              }}
            >
              <span
                style={{
                  backgroundColor: entry.color,
                  width: isMobile ? '16px' : '20px',
                  height: '4px',
                  display: 'inline-block',
                  borderRadius: '2px',
                  opacity: isHidden ? 0.3 : 1
                }}
              />
              <span className={`text-xs sm:text-sm font-medium ${isHidden ? 'text-gray-400' : 'text-gray-300'}`}>
                {entry.value}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  return (
    <div className="px-2 sm:px-4 md:px-6 lg:px-8">
      {/* legend at top with more spacing */}
      {groups.length > 1 && (
        <div className="mb-4">
          {renderCustomLegend({ payload: groups.map((group, index) => ({
            value: group,
            color: colorMap[group] || defaultColors[index % defaultColors.length]
          })) })}
        </div>
      )}
      
      <div 
        className="w-full" 
        style={{ 
          height: isMobile ? '20em' : '28em', 
          minHeight: isMobile ? '300px' : '400px' 
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={filteredData}
            margin={{ 
              top: 10, 
              right: isMobile ? 10 : isTablet ? 30 : 60, 
              left: isMobile ? 10 : isTablet ? 40 : 60, 
              bottom: isMobile ? 30 : 50 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="Date" 
              tick={{ fontSize: isMobile ? 10 : 12, fill: '#9ca3af' }}
              type="category"
              stroke="#4b5563"
            />
            <YAxis 
              domain={yAxisDomain}
              tick={{ fontSize: isMobile ? 10 : 12, fill: '#9ca3af' }}
              width={isMobile ? 40 : isTablet ? 60 : 80}
              stroke="#4b5563"
              tickFormatter={(value) => {
                if (typeof value === 'number') {
                  return value.toFixed(isMobile ? 2 : 3);
                }
                return value;
              }}
            />
            <Tooltip 
              formatter={(value: any) => {
                if (typeof value === 'number') {
                  return value.toFixed(2);
                }
                return value;
              }}
              contentStyle={{
                backgroundColor: '#1f2937',
                border: '1px solid #374151',
                borderRadius: '0.5rem',
                color: '#f3f4f6'
              }}
              labelStyle={{ color: '#9ca3af' }}
            />
            <Brush 
              dataKey="Date" 
              height={isMobile ? 20 : 30} 
              stroke="#ea580c"
              fill="#1e293b"
              travellerWidth={10}
            />
            {groups.map((group, index) => {
              const isHidden = hiddenLines.has(group);
              const isHovered = hoveredLine === group;
              const isAnyHovered = hoveredLine !== null;
              
              return (
                <Line
                  key={`${group}-${metric}`}
                  type="monotone"
                  dataKey={group}
                  name={group}
                  stroke={colorMap[group] || defaultColors[index % defaultColors.length]}
                  dot={false}
                  strokeWidth={isHovered ? 4 : isMobile ? 1.5 : 2}
                  connectNulls
                  animationDuration={300}
                  hide={isHidden}
                  strokeOpacity={isAnyHovered && !isHovered ? 0.2 : 1}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}