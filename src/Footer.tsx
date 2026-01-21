export function Footer() {
    return (
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
    );
  }