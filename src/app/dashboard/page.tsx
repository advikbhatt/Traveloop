"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getUserTrips, Trip } from "@/lib/db-services";
import { seedDummyData } from "@/lib/seed";

const popularCities = [
  { name: "Bromo Crater Hike", image: "https://images.unsplash.com/photo-1530172202330-0b30ddcfc7b5?auto=format&fit=crop&w=400&q=80", tag: "Adventure" },
  { name: "Ijen Blue Fire", image: "https://images.unsplash.com/photo-1588365851480-e8371cc0b217?auto=format&fit=crop&w=400&q=80", tag: "Nature" },
  { name: "Tumpak Sewu Falls", image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=400&q=80", tag: "Experience" },
];

export default function Dashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      await seedDummyData();
      const userTrips = await getUserTrips();
      setTrips(userTrips);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F6F6] font-display">
      {/* Dashboard Nav */}
      <nav className="bg-white border-b border-stroke px-10 py-6 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-extrabold text-xl tracking-tighter">B</span>
          </div>
          <span className="text-black text-2xl font-extrabold tracking-tighter">BromoRise</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 rounded-full bg-gray-100 border border-stroke overflow-hidden">
             <Image src="https://i.pravatar.cc/100?u=42" alt="Profile" width={40} height={40} />
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-10 py-12">
        <header className="flex justify-between items-end mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/5 bg-white text-black text-[10px] font-bold uppercase tracking-widest mb-4">
              <span>Member Dashboard</span>
            </div>
            <h1 className="text-5xl font-bold text-black tracking-tighter">Hello, Explorer</h1>
            <p className="text-paragraph text-lg mt-2">Where will your next adventure take you?</p>
          </div>
          <Link href="/trips/new" className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-paragraph transition-all shadow-xl flex items-center gap-3">
            <span>New Journey</span>
            <span className="text-lg">+</span>
          </Link>
        </header>

        {/* My Trips */}
        <section className="mb-20">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Your Upcoming Trips</h2>
            <Link href="/trips" className="text-black font-bold text-sm underline underline-offset-4 hover:opacity-60 transition-opacity">View all</Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 rounded-[3rem] bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trips.map((trip) => (
                <div key={trip.id} className="group bg-white rounded-[3rem] overflow-hidden border border-stroke shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={trip.coverPhoto || "https://images.unsplash.com/photo-1588365851480-e8371cc0b217?auto=format&fit=crop&w=600&q=80"} 
                      alt={trip.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-black">
                      Upcoming
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-black tracking-tight mb-2">{trip.name}</h3>
                    <p className="text-paragraph text-sm font-medium mb-6">{trip.dates}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-stroke">
                      <span className="text-black font-bold text-sm tracking-tight">{trip.destinationCount} Destinations</span>
                      <Link href={`/trips/${trip.id}`} className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform">
                        <span>↗</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              <Link href="/trips/new" className="h-full min-h-[400px] rounded-[3rem] border-2 border-dashed border-stroke flex flex-col items-center justify-center gap-4 group hover:bg-white hover:border-black transition-all">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-4xl group-hover:bg-black group-hover:text-white transition-all">+</div>
                <p className="text-paragraph font-bold uppercase tracking-widest text-xs">Plan New Adventure</p>
              </Link>
            </div>
          )}
        </section>

        {/* Inspiration */}
        <section>
          <div className="max-w-7xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-white text-black text-xs font-bold mb-6">
              <span>Popular Now</span>
            </div>
            <h2 className="text-5xl font-bold text-black mb-12 tracking-tight">Get Inspired</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {popularCities.map((city, index) => (
              <div key={index} className="relative h-[480px] rounded-[3rem] overflow-hidden group cursor-pointer shadow-2xl">
                <Image 
                  src={city.image} 
                  alt={city.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="inline-flex px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest mb-4">
                    {city.tag}
                  </div>
                  <h4 className="text-white text-3xl font-bold tracking-tight">{city.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
