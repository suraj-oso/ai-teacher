export default function Footer() {
    return (
      <div className="relative mt-12">
        <div className="absolute -inset-1 bg-black"></div>
        <div className="relative bg-[#FFFBE6] p-3 sm:p-4 border-2 border-black">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-black"></div>
                <img 
                  src="https://github.com/suraj-oso.png" 
                  alt="Suraj Chandrakar"
                  className="relative w-12 h-12 sm:w-16 sm:h-16 border-2 border-black"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold">Developed by Suraj Chandrakar</h3>
                <p className="text-sm sm:text-base">Web Developer | DSA Problem Solving</p>
              </div>
            </div>
            <a 
              href="https://github.com/suraj-oso"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
            >
              <div className="absolute -inset-1 bg-black transition-all group-hover:-inset-2"></div>
              <span className="relative block bg-[#FFFBE6] px-4 py-2 border-2 border-black font-bold text-sm sm:text-base">
                GitHub Profile ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    )
  }
  
  