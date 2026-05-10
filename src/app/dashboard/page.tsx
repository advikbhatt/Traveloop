"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getUserTrips, Trip } from "@/lib/db-services";
import { seedDummyData } from "@/lib/seed";

const popularCities = [
  { name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e907a5ea82c?auto=format&fit=crop&w=300&q=80" },
  { name: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=300&q=80" },
  { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=80" },
];

export default function Dashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // Seed dummy data if needed
      await seedDummyData();
      
      const userTrips = await getUserTrips();
      setTrips(userTrips);
      setLoading(false);
    }
    loadData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-300">
      <header className="flex justify-between items-center mb-16 flex-wrap gap-4">
        <div>
          <h1 className="gradient-text text-4xl mb-1">Welcome back, Explorer</h1>
          <p className="text-text-secondary text-lg">Ready for your next adventure?</p>
        </div>
        <div>
          <Link href="/trips/new" className="btn-primary">
            + Plan New Trip
          </Link>
        </div>
      </header>

      <section className="mb-16">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl font-bold">Your Upcoming Trips</h2>
          <Link href="/trips" className="text-accent-primary hover:underline text-sm font-medium">View All</Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-40">
            <p className="text-text-tertiary animate-pulse">Loading your trips...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.length > 0 ? trips.map((trip) => (
              <div key={trip.id} className="glass-panel group flex flex-col hover:-translate-y-1 transition-all duration-300 overflow-hidden rounded-2xl">
                <div 
                  className="h-40 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                  style={{ backgroundImage: `url(${trip.coverPhoto})` }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{trip.name}</h3>
                  <p className="text-accent-primary text-sm font-medium mb-3">{trip.dates}</p>
                  <div className="flex justify-between text-text-secondary text-xs">
                    <span>{trip.destinationCount} Destinations</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/trips/${trip.id}`} className="btn-secondary py-1.5 px-4 text-xs">View</Link>
                    <Link href={`/trips/${trip.id}/build`} className="btn-secondary py-1.5 px-4 text-xs">Edit</Link>
                  </div>
                </div>
              </div>
            )) : (
              <p className="text-text-tertiary col-span-full py-10 text-center">No trips yet. Start planning one!</p>
            )}
            <Link href="/trips/new" className="glass-panel flex flex-col items-center justify-center min-h-[240px] border-dashed border-white/10 hover:border-accent-primary hover:bg-accent-primary/5 text-text-secondary hover:text-accent-primary transition-all rounded-2xl group">
              <div className="text-4xl font-light mb-2 transition-transform group-hover:scale-110">+</div>
              <p className="font-medium text-sm">Create a new journey</p>
            </Link>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-1">Get Inspired</h2>
        <p className="text-text-secondary mb-6">Popular destinations right now</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCities.map((city, index) => (
            <div key={index} className="relative h-52 rounded-2xl overflow-hidden group cursor-pointer shadow-lg shadow-black/20">
              <div 
                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                style={{ backgroundImage: `url(${city.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex items-end p-6">
                <h4 className="text-white text-lg font-bold">{city.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
