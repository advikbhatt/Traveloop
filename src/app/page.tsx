import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full min-h-[800px] h-screen bg-[url('/images/hero.png')] bg-cover bg-center bg-no-repeat flex flex-col overflow-hidden">
      {/* Hero Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50 z-1"></div>
      
      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl h-16 flex items-center justify-between px-6 z-[100]">
        <div className="flex items-center gap-3 font-display text-2xl font-bold text-white">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">B</div>
          <span>BromoRise</span>
        </div>
        
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl p-1.5 rounded-full border border-white/10">
          <Link href="/" className="px-5 py-2 rounded-full text-sm font-medium transition-all bg-white text-black">Home</Link>
          <Link href="/packages" className="px-5 py-2 rounded-full text-sm font-medium transition-all text-white/80 hover:text-white">Packages</Link>
          <Link href="/gallery" className="px-5 py-2 rounded-full text-sm font-medium transition-all text-white/80 hover:text-white">Gallery</Link>
          <Link href="/how-it-works" className="px-5 py-2 rounded-full text-sm font-medium transition-all text-white/80 hover:text-white">How it works</Link>
          <Link href="/contact" className="px-5 py-2 rounded-full text-sm font-medium transition-all text-white/80 hover:text-white">Contact</Link>
        </div>
        
        <Link href="/login" className="bg-white/20 backdrop-blur-md text-white px-6 py-2.5 rounded-full flex items-center gap-2.5 font-medium border border-white/20 hover:bg-white/30 transition-all">
          Book now 
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </div>
        </Link>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 mt-auto mb-[60px] px-[5%] w-full">
        <span className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-white text-sm mx-auto mb-8 w-fit block">
          East Java&apos;s Natural Wonder
        </span>
        <h1 className="text-5xl md:text-8xl font-bold text-center max-w-[1000px] mx-auto leading-[1.1] tracking-tighter mb-[60px] text-white">
          Unforgettable Mount Bromo <br /> Sunrise Experience
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 items-end">
          {/* Info Card */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 text-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-cover" style={{backgroundImage: 'url(https://i.pravatar.cc/100?img=1)'}}></div>
                <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-cover" style={{backgroundImage: 'url(https://i.pravatar.cc/100?img=2)'}}></div>
                <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-cover" style={{backgroundImage: 'url(https://i.pravatar.cc/100?img=3)'}}></div>
                <div className="w-10 h-10 rounded-full border-2 border-white/20 bg-cover" style={{backgroundImage: 'url(https://i.pravatar.cc/100?img=4)'}}></div>
              </div>
              <div className="text-[0.85rem] text-white/70">
                <span className="text-white font-semibold">50+</span> People Joined
              </div>
            </div>
            
            <p className="text-[0.95rem] leading-relaxed text-white/80 mb-8">
              Travel through volcanic landscapes, golden skies, and timeless beauty with expertly guided Mount Bromo tours.
            </p>

            <Link href="/login" className="bg-white/20 backdrop-blur-md text-white px-6 py-2.5 rounded-full flex items-center gap-2.5 font-medium border border-white/20 hover:bg-white/30 transition-all w-fit">
              Book now 
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center text-black">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </Link>
          </div>

          {/* Gallery */}
          <div className="flex gap-5 h-[380px]">
            <div className="group flex-1 relative rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 ease-in-out hover:flex-[2]">
              <img src="/images/horse.png" alt="Horse Riding" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-xl text-white mb-2 font-semibold">Active Volcano Walk</h4>
                <p className="text-[0.85rem] text-white/70">Walk to the edge of Mount Bromo&apos;s active crater and experience its raw beauty.</p>
              </div>
            </div>
            <div className="group flex-1 relative rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 ease-in-out hover:flex-[2]">
              <img src="/images/jeep.png" alt="Jeep Tour" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-xl text-white mb-2 font-semibold">Off-road Adventure</h4>
                <p className="text-[0.85rem] text-white/70">Explore the vast sand sea in a classic 4x4 Land Cruiser.</p>
              </div>
            </div>
            <div className="group flex-1 relative rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 ease-in-out hover:flex-[2]">
              <img src="/images/trekking.png" alt="Trekking" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-xl text-white mb-2 font-semibold">Ridge Trekking</h4>
                <p className="text-[0.85rem] text-white/70">Hike along the stunning ridges for the best panoramic views.</p>
              </div>
            </div>
            <div className="group flex-1 relative rounded-[20px] overflow-hidden cursor-pointer transition-all duration-500 ease-in-out hover:flex-[2]">
              <img src="/images/hero.png" alt="Golden Hour" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-xl text-white mb-2 font-semibold">Golden Hour</h4>
                <p className="text-[0.85rem] text-white/70">Witness the most iconic sunrise in Southeast Asia.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
