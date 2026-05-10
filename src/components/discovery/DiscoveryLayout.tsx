"use client";

import { Search, SlidersHorizontal, ChevronRight, Plus, MapPin, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const regions = [
  { id: 1, name: "Europe", count: "12 Destinations", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80" },
  { id: 2, name: "Asia", count: "24 Destinations", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80" },
  { id: 3, name: "Americas", count: "18 Destinations", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=400&q=80" },
  { id: 4, name: "Africa", count: "8 Destinations", image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&q=80" },
  { id: 5, name: "Oceania", count: "10 Destinations", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=400&q=80" },
];

const previousTrips = [
  { 
    id: 1, 
    title: "Summer in Paris", 
    location: "France", 
    date: "June 2025", 
    duration: "7 Days",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" 
  },
  { 
    id: 2, 
    title: "Tokyo Exploration", 
    location: "Japan", 
    date: "March 2025", 
    duration: "10 Days",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80" 
  },
  { 
    id: 3, 
    title: "Bali Retreat", 
    location: "Indonesia", 
    date: "January 2025", 
    duration: "5 Days",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80" 
  },
];

export default function DiscoveryLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredRegions = regions.filter(region => 
    region.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTrips = previousTrips.filter(trip => 
    trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trip.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-24">
      {/* Banner Section */}
      <div className="px-6 md:px-12 pt-32">
        <div className="w-full relative h-[500px] rounded-[3.5rem] overflow-hidden group">
          <Image 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80" 
            alt="Mountain Landscape" 
            fill 
            sizes="100vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-105" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
          <div className="absolute bottom-12 left-12 right-12">
            <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tighter mb-4 leading-[0.9]">
              Explore the <br /> 
              <span className="text-white/80">World with Us</span>
            </h1>
            <p className="text-white/70 text-lg max-w-md font-medium">
              Discover hidden gems and plan your perfect journey with our personalized recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filter Section */}
      <div className="w-full px-6 md:px-12 mt-12">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-paragraph transition-colors group-focus-within:text-bg-black" size={20} />
            <input 
              type="text" 
              placeholder="Search for destinations, countries, or regions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-6 py-5 rounded-full bg-white border border-stroke focus:border-bg-black outline-none transition-all shadow-sm hover:shadow-md font-medium"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-5 rounded-full bg-white border border-stroke hover:bg-bg-secondary transition-all font-bold text-sm">
              <SlidersHorizontal size={18} />
              <span>Filter</span>
            </button>
            <select className="flex-1 md:flex-none px-6 py-5 rounded-full bg-white border border-stroke hover:border-bg-black outline-none transition-all font-bold text-sm appearance-none cursor-pointer text-center">
              <option>Group by: All</option>
              <option>Group by: Region</option>
              <option>Group by: Type</option>
            </select>
            <select className="flex-1 md:flex-none px-6 py-5 rounded-full bg-white border border-stroke hover:border-bg-black outline-none transition-all font-bold text-sm appearance-none cursor-pointer text-center">
              <option>Sort by: Popularity</option>
              <option>Sort by: Latest</option>
              <option>Sort by: Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Top Regional Selections */}
      <section className="w-full px-6 md:px-12 mt-20">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-2xl font-bold whitespace-nowrap">Top Regional Selections</h2>
          <div className="h-[1px] w-full bg-stroke"></div>
          <button className="flex items-center gap-1 text-sm font-bold text-text-paragraph hover:text-bg-black transition-colors whitespace-nowrap">
            View All <ChevronRight size={16} />
          </button>
        </div>

        {filteredRegions.length > 0 ? (
          <div className="flex gap-8 overflow-x-auto pb-4 no-scrollbar -mx-6 md:-mx-12 px-6 md:px-12">
            {filteredRegions.map((region) => (
              <div key={region.id} className="flex-shrink-0 group cursor-pointer">
                <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden relative mb-4 border border-stroke shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:scale-105 group-hover:-translate-y-1">
                  <Image 
                    src={region.image} 
                    alt={region.name} 
                    fill 
                    sizes="160px"
                    className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-lg mb-0.5">{region.name}</h4>
                  <p className="text-[10px] font-bold text-text-paragraph uppercase tracking-widest">{region.count}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-white rounded-[2rem] border border-dashed border-stroke">
            <p className="text-text-paragraph font-bold">No regions found matching "{searchQuery}"</p>
          </div>
        )}
      </section>

      {/* Previous Trips Section */}
      <section className="w-full px-6 md:px-12 mt-24">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-2xl font-bold whitespace-nowrap">Recent Explorations</h2>
          <div className="h-[1px] w-full bg-stroke"></div>
        </div>

        {filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {filteredTrips.map((trip) => (
              <div key={trip.id} className="group bg-white rounded-[3rem] overflow-hidden border border-stroke shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="relative h-96 overflow-hidden">
                  <Image 
                    src={trip.image} 
                    alt={trip.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest">
                        Completed
                      </span>
                    </div>
                    <Link href="#" className="flex items-center justify-between">
                      <span className="text-white font-bold text-lg underline underline-offset-4 decoration-white/30 hover:decoration-white transition-all">View Full Recap</span>
                      <div className="w-10 h-10 rounded-full bg-white text-bg-black flex items-center justify-center">
                        <ChevronRight size={20} />
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-text-paragraph text-[10px] font-bold uppercase tracking-widest mb-3">
                    <MapPin size={12} className="text-bg-black" />
                    <span>{trip.location}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-bg-black tracking-tighter mb-6">{trip.title}</h3>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-stroke">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-text-paragraph" />
                        <span className="text-xs font-bold text-text-paragraph">{trip.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-text-paragraph" />
                        <span className="text-xs font-bold text-text-paragraph">{trip.duration}</span>
                      </div>
                    </div>
                    <button className="w-10 h-10 rounded-xl border border-stroke flex items-center justify-center hover:bg-bg-secondary transition-all">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-[3rem] border border-dashed border-stroke">
            <Search className="mx-auto mb-4 text-stroke" size={48} />
            <p className="text-text-paragraph font-bold text-xl">No explorations found for "{searchQuery}"</p>
            <p className="text-text-paragraph/60 mt-2">Try searching for a different country or city.</p>
          </div>
        )}
      </section>

      {/* Floating Action Button */}
      <Link 
        href="/trips/new" 
        className="fixed bottom-10 right-10 flex items-center gap-3 px-8 py-4 bg-bg-black text-white rounded-full font-bold shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 group border border-white/10"
      >
        <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center transition-transform group-hover:rotate-90">
          <Plus size={16} />
        </div>
        <span className="uppercase tracking-widest text-xs font-black">Plan a trip</span>
      </Link>
    </div>
  );
}
