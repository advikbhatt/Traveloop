"use client";

import Image from "next/image";

const moments = [
  { id: 1, title: "Sunrise View", image: "https://images.unsplash.com/photo-1530172202330-0b30ddcfc7b5?auto=format&fit=crop&w=400&q=80", span: "col-span-1 h-60" },
  { id: 2, title: "Jeep Tour", image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=600&q=80", span: "col-span-1 h-80" },
  { id: 3, title: "Crater Hike", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80", span: "col-span-1 h-[28rem]" },
  { id: 4, title: "Local Life", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", span: "col-span-1 h-96" },
  { id: 5, title: "Sea of Sand", image: "https://images.unsplash.com/photo-1530172202330-0b30ddcfc7b5?auto=format&fit=crop&w=600&q=80", span: "col-span-1 h-80" },
];

export default function Moments() {
  return (
    <section id="gallery" className="py-24 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-gray-50 text-black text-xs font-bold mb-6">
          <span>Pure Adventure</span>
          <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]">✨</div>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight">
          Unforgettable <span className="text-gray-400">Moments in the</span> <br />
          Heart of Mount Bromo
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Experience breathtaking sunrises, explore volcanic landscapes, and create memories at one of Indonesia's most iconic destinations.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex items-end gap-6 h-[500px]">
        {/* We'll use a custom flex layout to mimic the uneven card heights from the screenshot */}
        <div className="flex-1 h-64 rounded-3xl overflow-hidden relative group cursor-pointer">
          <Image src="https://images.unsplash.com/photo-1530172202330-0b30ddcfc7b5?auto=format&fit=crop&w=400&q=80" alt="Moment 1" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="flex-1 h-80 rounded-3xl overflow-hidden relative group cursor-pointer">
          <Image src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=400&q=80" alt="Moment 2" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="flex-1 h-[450px] rounded-3xl overflow-hidden relative group cursor-pointer">
          <Image src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80" alt="Moment 3" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="flex-[1.5] h-[480px] rounded-3xl overflow-hidden relative group cursor-pointer">
          <Image 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" 
            alt="Moment 4" 
            fill 
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute bottom-8 left-8 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 max-w-xs">
            <h4 className="text-black font-bold mb-2">Sea of Sand Exploration</h4>
            <p className="text-gray-400 text-xs mb-4">Cross the vast volcanic desert by 4x4 jeep or on foot.</p>
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-black">↗</div>
          </div>
        </div>
        <div className="flex-1 h-96 rounded-3xl overflow-hidden relative group cursor-pointer">
          <Image src="https://images.unsplash.com/photo-1530172202330-0b30ddcfc7b5?auto=format&fit=crop&w=400&q=80" alt="Moment 5" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="flex-1 h-72 rounded-3xl overflow-hidden relative group cursor-pointer">
          <Image src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=400&q=80" alt="Moment 6" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
      </div>
    </section>
  );
}
