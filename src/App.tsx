import { useState } from "react";
import { ConsensusChart } from "./components/ConsensusChart";

type MetricType = "Entropy" | "Nakamoto" | "Gini" | "HHI" | "Count";
type DataSourceType = "consensus" | "defi_gov" | "defi_tvl" | "developers" | "exchanges" | "nft_marketplace";

function App() {
  const [selectedDataSource, setSelectedDataSource] = useState<DataSourceType>("consensus");
  
  const metrics: MetricType[] = ["Entropy", "Nakamoto", "Gini", "HHI", "Count"];
  
  const dataSources: { value: DataSourceType; label: string }[] = [
    { value: "consensus", label: "Consensus" },
    { value: "defi_gov", label: "DeFi Governance" },
    { value: "defi_tvl", label: "DeFi TVL" },
    { value: "developers", label: "Developers" },
    { value: "exchanges", label: "Exchanges" },
    { value: "nft_marketplace", label: "NFT Marketplace" },
  ];

  {/*metric names -> graph titles */}
  const metricTitles: { [key in MetricType]: string } = {
    "Entropy": "Shannon Entropy",
    "Nakamoto": "Nakamoto Coefficient",
    "Gini": "Gini Coefficient",
    "HHI": "Herfindahl-Hirschman Index",
    "Count": "Number of Entities"
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Crypto Decentralization Dashboard</h1>

        <div className="pt-4 pb-8 space-y-2">
          <p className="text-base pl-4">This is a dashboard which describes the decentralization of 
          crypto subsystems over time, as described in the paper 
          <a href="https://cacm.acm.org/research/are-crypto-ecosystems-decentralizing-a-framework-for-longitudinal-analysis/" className="underline text-blue-600"> Are Crypto Ecosystems (De)centralizing? A Framework for Longitudinal Analysis</a>. </p>
         
          <p className="text-base pl-4"> Here we the decentralization of seven major crypto ecosystems: Bitcoin, Ethereum, BNB, Solana, Tron, TON, and Ronin 
          across six subsystems: Consensus, Developers, Exchanges, DeFi Governance, DeFi TVL, and NFT Marketplaces.</p>

    <div className="pl-4">
       <p className="text-base py-2"> We employ the following metrics: </p>

        <ul className="list-disc pl-4 space-y-2 pb-4">
          <li>Shannon Entropy measures how evenly control or contributions are distributed. Higher entropy indicates greater decentralization. </li>
          <li>The Nakamoto Coefficient describes the minimum number of entities needed to control 51% of a subsystem, highlighting vulnerability to centralization.</li>
          <li>The Gini Coefficient assesses inequality in contributions. Lower values suggest more even distribution.</li>
          <li>The Herfindahl-Hirschman Index (HHI) measures market concentration. Lower values indicate less centralization.</li>
          <li>The Number of Entities is the count of active participants (e.g. validators, developers, exchanges) within each subsystem.</li>
        </ul>
        </div>

       </div>
        
        {/*subsystem selector*/}
        <div className="bg-gray-50 rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-4">
          <label className="block text-lg mb-2">Subsystem:</label>
          <select 
            value={selectedDataSource}
            onChange={(e) => setSelectedDataSource(e.target.value as DataSourceType)}
            className="border border-gray-300 rounded-md px-4 py-2 w-64 hover:bg-gray-300"
          >
            {dataSources.map(source => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>
          </div>
          <p className="text-base text-gray-600 mt-2">
          Use the slider at the bottom to adjust data timespan. Click legend items to hide/show lines. Hover over legend items to highlight lines.
          </p>
        </div>

        {/*the actual charts for each metric, see components/consensuscharts*/}
        <div className="space-y-6">
          {metrics.map(metric => (
            <div key={metric} className="bg-gray-50 rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                {metricTitles[metric]}
              </h2>
              <ConsensusChart metric={metric} dataSource={selectedDataSource} />
            </div>
          ))}
        </div>
      </div>
      <p className="py-6">Last updated Jan, 2026. For feedback or questions, contact <a href="harang@mit.edu" className="text-blue-600">harang@mit.edu</a> 
      or <a href="nzain1@jh.edu" className="text-blue-600">nzain1@jh.edu</a></p>
    </div>
  );
}

export default App;