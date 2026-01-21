export function About() {
  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
          About This Dashboard
        </h2>
        
        <div className="space-y-6 text-sm sm:text-base text-gray-300">
          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">Overview</h3>
            <p>
              Decentralization is fundamental to blockchain resilience and security 
              yet there has been limited empirical evidence on whether crypto ecosystems are becoming more or less decentralized over time. 
              This dashboard presents a unified, longitudinal dataset measuring decentralization across seven major blockchains from January 2009 through May 2025, based on research published in{" "}
              <a 
                href="https://cacm.acm.org/research/are-crypto-ecosystems-decentralizing-a-framework-for-longitudinal-analysis/" 
                className="underline text-orange-400 hover:text-orange-300 transition-colors font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Communications of the ACM
              </a>.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">Blockchains & Subsystems</h3>
            <p className="mb-3">
              The dataset spans <span className="font-semibold text-white">seven major blockchains</span>: Bitcoin, Ethereum, BNB Chain, Solana, Tron, TON, and Ronin, across six distinct subsystems:
            </p>
            <ul className="list-disc pl-6 text-gray-300">
              <li><span className="font-medium text-white">Consensus:</span> Block validators and mining pools that produce blocks</li>
              <li><span className="font-medium text-white">Developers:</span> Open-source contributors to core blockchain repositories</li>
              <li><span className="font-medium text-white">Exchanges:</span> Centralized exchange trading volume distribution</li>
              <li><span className="font-medium text-white">DeFi Governance:</span> Distribution of governance token holdings</li>
              <li><span className="font-medium text-white">DeFi TVL:</span> Total value locked across DeFi protocols</li>
              <li><span className="font-medium text-white">NFT Marketplaces:</span> Secondary market trading volume distribution</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">Metrics Explained</h3>
            This paper details a systematic framework for measuring decentralization based on the following metrics:
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-1">Shannon Entropy</h4>
                <p className="text-gray-300">Our primary metric. Measures how evenly control is distributed across participants. Higher entropy indicates greater decentralization. Unlike other metrics, entropy scales logarithmically with the number of entities, making it intuitive and conducive to statistical inference across diverse systems.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-1">Nakamoto Coefficient</h4>
                <p className="text-gray-300">The minimum number of entities needed to control 51% of a subsystem. Higher values indicate more robust decentralization and greater resistance to collusion or attack.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-1">Gini Coefficient</h4>
                <p className="text-gray-300">Assesses inequality in contributions, ranging from 0 (perfect equality) to 1 (perfect inequality). Lower values suggest more even distribution of power.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-1">Herfindahl-Hirschman Index (HHI)</h4>
                <p className="text-gray-300">Measures market concentration by summing the squares of market shares. Lower values indicate less centralization. Values below 1,500 are generally considered competitive markets.</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-1">Number of Entities</h4>
                <p className="text-gray-300">The count of active participants within each subsystem. While more participants can indicate broader participation, the distribution of power among them matters more than raw numbers.</p>
              </div>
            </div>
          </section>


          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">Main Findings</h3>
            <p className="mb-3">
              This analysis reveals that crypto ecosystems have largely become <span className="font-semibold text-white">more decentralized over time</span>. However, critical subsystems show concerning trends:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-1">
              <li>Bitcoin's consensus layer has become noticeably more centralized in recent years</li>
              <li>NFT marketplaces show increasing concentration</li>
              <li>Developer networks demonstrate centralization trends</li>
            </ul>
            <p className="mt-3">
              This raises important questions about crypto resilience, independence, and security.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}