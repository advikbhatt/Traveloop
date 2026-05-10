"use client";

import Link from "next/link";

// Mock data (Read-only version of the itinerary)
const tripInfo = {
  name: "Euro Summer 2026",
  dates: "Jun 10 - Jul 05",
  cover: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
  author: "Alex Explorer",
  stopsCount: 4
};

const itineraryDays = [
  {
    day: "Day 1",
    date: "Wed, Jun 10",
    city: "Paris, France",
    activities: [
      { time: "10:00 AM", name: "Arrival at CDG", type: "Transport" },
      { time: "2:00 PM", name: "Eiffel Tower Summit", type: "Sightseeing" },
    ]
  }
];

export default function SharedItineraryView() {
  return (
    <div className="animate-in fade-in duration-500 pb-20 bg-bg-primary min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5">
        <div className="gradient-text text-2xl font-bold">Traveloop</div>
        <Link href="/" className="btn-secondary text-sm">Plan your own trip</Link>
      </nav>

      <div 
        className="relative h-[450px] w-full flex items-end px-6 md:px-[10%] pb-16 bg-cover bg-center mt-16" 
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 11, 0.3), #0A0A0B), url(${tripInfo.cover})` }}
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-accent-primary/20 text-accent-primary border border-accent-primary/30 text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-4">
            Public Itinerary
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-4 tracking-tighter text-white leading-none">{tripInfo.name}</h1>
          <p className="text-text-secondary text-lg">
            Planned by <strong className="text-white">{tripInfo.author}</strong> • {tripInfo.dates} • {tripInfo.stopsCount} Destinations
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="glass-panel flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl mb-16 border-accent-primary/20 bg-accent-primary/5">
          <p className="text-white font-medium text-lg">Love this itinerary? Copy it to your own dashboard to modify it!</p>
          <button className="btn-primary px-10" onClick={() => alert("Trip Copied!")}>Copy Trip</button>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          {itineraryDays.map((day, index) => (
            <div key={index} className="relative pl-8 md:pl-12 border-l border-white/10">
              <div className="absolute top-0 left-[-6px] w-3 h-3 rounded-full bg-accent-primary shadow-[0_0_10px_rgba(0,122,255,0.8)]"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-8">
                <div>
                  <h2 className="text-3xl font-bold mb-1">{day.day}</h2>
                  <span className="text-accent-primary font-medium text-sm tracking-wide uppercase">{day.date}</span>
                </div>
                <div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-text-secondary text-sm font-semibold">
                  {day.city}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {day.activities.map((act, i) => (
                  <div key={i} className="glass-panel flex flex-col sm:flex-row gap-4 p-5 rounded-2xl hover:bg-white/5 transition-all group">
                    <div className="w-full sm:w-24 text-text-tertiary text-sm font-mono pt-1">{act.time}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-accent-primary transition-colors">{act.name}</h3>
                      <span className="px-3 py-0.5 rounded-full bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20 text-[0.7rem] font-bold uppercase tracking-wider">
                        {act.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
