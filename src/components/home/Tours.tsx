"use client";

import Link from "next/link";
import Image from "next/image";

const tours = [
  {
    id: 1,
    title: "Hill & Caves Explorer",
    desc: "Experience the famous cold water caves and Robber's Creek with a guided eco-tour.",
    price: "₹1,500 / person",
    image: "https://images.unsplash.com/photo-1588592783288-9c844d0e34c1?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Mussoorie Day Pass",
    desc: "Take the scenic route to Mall Road and Kempty Falls in an SUV expedition.",
    price: "₹3,200 / person",
    image: "https://images.unsplash.com/photo-1626621340025-73c76b1c3b3b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Spiritual Retreat",
    desc: "A mindful trip encompassing Mindrolling Monastery and Tapkeshwar Temple visits.",
    price: "₹1,800 / person",
    image: "https://images.unsplash.com/photo-1596998804349-4e169f595cd9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    title: "Private Valley Journey",
    desc: "Fully customized Himalayan valley immersion with direct local pickup & stay.",
    price: "₹8,500 / group",
    image: "https://images.unsplash.com/photo-1586163240128-0213c8a2e594?auto=format&fit=crop&w=400&q=80"
  }
];

export default function Tours() {
  return (
    <section id="packages" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-gray-50 text-black text-xs font-bold mb-6">
          <span>Expedition Packs</span>
          <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]">✨</div>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight">
          Discover the Dehradun <span className="text-gray-400">Gateway</span> <br />
          for Every Kind of Explorer
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Curated tour routes ranging from historic cave paths, misted waterfall hikes, and serene spiritual trails.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-8">
        {/* Left Featured Card */}
        <div className="relative rounded-[3rem] overflow-hidden min-h-[600px] group row-span-2">
          <Image 
            src="https://images.unsplash.com/photo-1616036740257-9449ea1f6605?auto=format&fit=crop&w=800&q=80" 
            alt="Main Tour" 
            fill 
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 right-12">
            <h3 className="text-white text-5xl font-bold leading-tight mb-4">
              Experience the <br /> Purest <br /> Essence of Valley
            </h3>
          </div>
        </div>

        {/* Right Grid */}
        {tours.map((tour) => (
          <div key={tour.id} className="flex flex-col">
            <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6 group">
              <Image 
                src={tour.image} 
                alt={tour.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <h4 className="text-black font-bold text-lg mb-2">{tour.title}</h4>
            <p className="text-gray-400 text-xs leading-relaxed mb-6">{tour.desc}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-black font-bold">{tour.price}</span>
              <Link href="/login" className="flex items-center gap-2 text-black text-[10px] font-bold border border-gray-100 rounded-full px-4 py-2 hover:bg-black hover:text-white transition-all">
                Book Now <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
