"use client";

import Link from "next/link";
import Image from "next/image";

const previewCards = [
  { 
    title: "Active Volcano Walk", 
    desc: "Walk to the edge of Mount Bromo's active crater.",
    url: "https://images.unsplash.com/photo-1530172202330-0b30ddcfc7b5?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Jeep Adventure", 
    desc: "Experience the vast Sea of Sand by 4x4.",
    url: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Sunrise View", 
    desc: "Witness the golden hour over the peaks.",
    url: "https://plus.unsplash.com/premium_photo-1690552679122-1660e10f73a5?auto=format&fit=crop&w=800&q=80"
  },
  { 
    title: "Local Culture", 
    desc: "Connect with the heart of East Java.",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  }
];

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[850px] flex flex-col items-center pt-32 px-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?q=80&w=1920&auto=format&fit=crop" 
          alt="Mount Bromo Landscape"
          fill
          className="object-cover brightness-[0.7]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-6xl">
        <div className="px-6 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white text-[13px] font-medium mb-12 tracking-wide uppercase">
          East Java's Natural Wonder
        </div>
        <h1 className="text-7xl md:text-[100px] font-medium text-white mb-8 tracking-tighter leading-[0.9] drop-shadow-2xl">
          Unforgettable Mount Bromo <br />
          <span className="font-medium opacity-90">Sunrise Experience</span>
        </h1>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 w-full max-w-[1400px] mt-auto pb-16 flex flex-col lg:flex-row items-end justify-between gap-8">
        
        {/* Left Side: Stats Card */}
        <div className="glass-panel p-10 rounded-[3rem] w-full max-w-[420px] bg-white/10 border-white/20 shadow-2xl relative transition-all duration-500 hover:bg-white/15 hover:-translate-y-2 group">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-white/50 overflow-hidden relative shadow-lg transition-transform duration-300 group-hover:translate-x-1">
                  <Image
                    src={`https://i.pravatar.cc/100?u=${i + 70}`}
                    alt="User"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-white/50 bg-white/20 flex items-center justify-center text-xs text-white backdrop-blur-xl font-bold relative">
                50+
              </div>
            </div>
            <span className="text-white text-base font-bold tracking-tight">People Joined</span>
          </div>
          
          <p className="text-white/80 text-[15px] leading-relaxed mb-10 font-medium max-w-[320px]">
            Travel through volcanic landscapes, golden skies, and timeless beauty with expertly guided Mount Bromo tours.
          </p>
          
          <Link href="/login" className="flex items-center gap-4 group/btn cursor-pointer">
            <div className="px-7 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm group-hover/btn:bg-white group-hover/btn:text-black transition-all">
              Book now
            </div>
            <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform">
              <span className="text-2xl">↗</span>
            </div>
          </Link>
        </div>

        {/* Right Side: Expanding Card Grid */}
        <div className="flex flex-row items-end gap-4 w-full lg:w-[800px] h-[340px]">
          {previewCards.map((card, index) => (
            <div 
              key={index} 
              className="group relative h-full rounded-[2.5rem] overflow-hidden border border-white/20 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] cursor-pointer flex-[1] hover:flex-[4] shadow-2xl hover:border-white/40"
            >
              <Image 
                src={card.url} 
                alt={card.title}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              
              {/* Card Content - Visible mostly when expanded */}
              <div className="absolute bottom-8 left-8 right-8 flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 translate-y-4 group-hover:translate-y-0 whitespace-nowrap">
                <h4 className="text-white font-bold text-xl mb-2">{card.title}</h4>
                <p className="text-white/70 text-sm">{card.desc}</p>
              </div>

              {/* Vertical Title for non-hovered state */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
                 <div className="rotate-[-90deg] text-white/40 font-bold text-xs tracking-widest uppercase origin-center min-w-[200px] text-center">
                   {card.title}
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
