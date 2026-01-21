import { useState } from "react";
import { ConsensusChart } from "./components/ConsensusChart";
import { About } from "./About";
import { Header } from "./Header";

type MetricType = "Entropy" | "Nakamoto" | "Gini" | "HHI" | "Count";
type DataSourceType = "consensus" | "defi_gov" | "defi_tvl" | "developers" | "exchanges" | "nft_marketplace";
type PageType = "dashboard" | "about";

function App() {
  const [selectedDataSource, setSelectedDataSource] = useState<DataSourceType>("consensus");
  const [selectedMetric, setSelectedMetric] = useState<MetricType>("Entropy");
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");
  
  const metrics: { value: MetricType; label: string }[] = [
    { value: "Entropy", label: "Shannon Entropy" },
    { value: "Nakamoto", label: "Nakamoto Coefficient" },
    { value: "Gini", label: "Gini Coefficient" },
    { value: "HHI", label: "Herfindahl-Hirschman Index" },
    { value: "Count", label: "Number of Entities" },
  ];
  
  const dataSources: { value: DataSourceType; label: string }[] = [
    { value: "consensus", label: "Consensus" },
    { value: "defi_gov", label: "DeFi Governance" },
    { value: "defi_tvl", label: "DeFi TVL" },
    { value: "developers", label: "Developers" },
    { value: "exchanges", label: "Exchanges" },
    { value: "nft_marketplace", label: "NFT Marketplace" },
  ];

  const metricDescriptions: { [key in MetricType]: string } = {
    "Entropy": "Shannon Entropy measures how evenly control or contributions are distributed. Higher entropy indicates greater decentralization.",
    "Nakamoto": "The Nakamoto Coefficient describes the minimum number of entities needed to control 51% of a subsystem, highlighting vulnerability to centralization.",
    "Gini": "The Gini Coefficient assesses inequality in contributions. Lower values suggest more even distribution.",
    "HHI": "The Herfindahl-Hirschman Index (HHI) measures market concentration. Lower values indicate less centralization.",
    "Count": "The Number of Entities is the count of active participants (e.g. validators, developers, exchanges) within each subsystem."
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header Navigation */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content */}
      <main className="p-3 sm:p-4 md:p-6 lg:p-8">
        {currentPage === "dashboard" ? (
          <div className="max-w-7xl mx-auto animate-fadeIn">
            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 text-center px-2">
              Crypto Decentralization Dashboard
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8 text-center px-2">
              Visualize the decentralization of crypto subsystems over time.
            </p>

            {/* Subsystem Selector - Separate Block */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 transition-shadow hover:shadow-xl border border-gray-700">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {dataSources.map(source => (
                  <button
                    key={source.value}
                    onClick={() => setSelectedDataSource(source.value)}
                    className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm md:text-base ${
                      selectedDataSource === source.value
                        ? 'bg-transparent text-orange-400 border-2 border-orange-500'
                        : 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600'
                    }`}
                  >
                    {source.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart with Metric Buttons */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-3 sm:p-4 md:p-6 transition-shadow hover:shadow-xl border border-gray-700">
              <h2 className="text-base sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 md:mb-6 transition-all duration-300 text-center text-white px-2">
                {metrics.find(m => m.value === selectedMetric)?.label} for the {dataSources.find(d => d.value === selectedDataSource)?.label} subsystem
              </h2>
              
              {/* Fixed height container to prevent size changes during loading */}
              <div className="min-h-[350px] sm:min-h-[450px] md:min-h-[500px] transition-opacity duration-300">
                <ConsensusChart metric={selectedMetric} dataSource={selectedDataSource} />
              </div>
              
              {/* Metric Selector Buttons */}
              <div className="mt-4 sm:mt-6">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {metrics.map(metric => (
                    <button
                      key={metric.value}
                      onClick={() => setSelectedMetric(metric.value)}
                      className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm md:text-base ${
                        selectedMetric === metric.value
                          ? 'bg-gray-700 text-white border-b-4 border-orange-500'
                          : 'bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600'
                      }`}
                    >
                      {metric.label}
                    </button>
                  ))}
                </div>
                
                {/* Metric Description with animation */}
                <div 
                  key={selectedMetric}
                  className="bg-gray-700/50 rounded-lg p-3 sm:p-4 border-l-4 border-orange-500 animate-fadeIn"
                >
                  <p className="text-xs sm:text-sm md:text-base text-gray-300">
                    {metricDescriptions[selectedMetric]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* About Page */
          <About />
        )}
      </main>
      
      {/* Styled Footer */}
      <footer className="max-w-7xl mx-auto mt-12 sm:mt-16 md:mt-20 pt-6 sm:pt-8 pb-6 sm:pb-8 border-t-2 border-gray-700">
        <div className="text-center px-4">
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            Last updated <span className="font-semibold text-gray-300">January 2026</span>
          </p>
          <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-2">
            For feedback or questions, contact{" "}
            <a 
              href="mailto:harang@mit.edu" 
              className="text-orange-400 hover:text-orange-300 font-medium transition-colors hover:underline"
            >
              harang@mit.edu
            </a>
            {" "}or{" "}
            <a 
              href="mailto:nzain1@jh.edu" 
              className="text-orange-400 hover:text-orange-300 font-medium transition-colors hover:underline"
            >
              nzain1@jh.edu
            </a>
          </p>
        </div>
      </footer>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;