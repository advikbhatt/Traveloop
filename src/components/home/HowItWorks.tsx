"use client";

import Image from "next/image";

const steps = [
  { id: 1, title: "Choose a Package", desc: "Select the tour that best fits your schedule and travel style." },
  { id: 2, title: "Check Availability", desc: "Pick your preferred date and group size." },
  { id: 3, title: "Make a Reservation", desc: "Confirm your booking securely online in minutes." },
  { id: 4, title: "Enjoy the Experience", desc: "Get ready for an unforgettable adventure!" }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-white overflow-hidden border-t border-stroke">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-6xl md:text-8xl font-bold text-black mb-12 tracking-tighter">
          How to Book Your Tour
        </h2>
        
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-gray-400 text-xs font-medium uppercase tracking-widest">
           <span className="flex items-center gap-2">✧ Exploration</span>
           <span className="flex items-center gap-2">✧ Sunrise Explorer</span>
           <span className="flex items-center gap-2">✧ Tour Guide</span>
           <span className="flex items-center gap-2">✧ Adventure</span>
           <span className="flex items-center gap-2">✧ Sunrise Viewing</span>
           <span className="flex items-center gap-2">✧ Private Bromo</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[600px] rounded-[3rem] overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1588365851480-e8371cc0b217?auto=format&fit=crop&w=800&q=80" 
            alt="Booking" 
            fill 
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover" 
          />
          <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl flex justify-between items-center">
            <p className="text-white text-xs max-w-[180px]">Plan your Mount Bromo adventure in minutes with our simple and secure booking.</p>
            <button className="bg-white text-black text-[10px] font-bold px-6 py-3 rounded-full flex items-center gap-2">
              Book now <span>↗</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <span className="text-gray-400 text-sm font-medium">How it works</span>
          <h3 className="text-4xl font-bold text-black mb-4">Book Tour in 4 Easy Steps</h3>
          
          <div className="flex flex-col gap-4">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`p-8 rounded-3xl transition-all border ${
                  step.id === 1 ? 'bg-gray-50 border-transparent shadow-sm' : 'bg-white border-gray-50 hover:bg-gray-50'
                }`}
              >
                <div className="flex gap-8">
                  <span className="text-2xl font-bold text-black">{step.id}</span>
                  <div>
                    <h4 className="text-lg font-bold text-black mb-2">{step.title}</h4>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
