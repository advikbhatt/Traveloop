"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getUserTrips, Trip } from "@/lib/db-services";

export default function MyTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrips() {
      const data = await getUserTrips();
      setTrips(data);
      setLoading(false);
    }
    fetchTrips();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-300">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex-1">
          <h1 className="gradient-text text-4xl mb-2">My Trips</h1>
          <p className="text-text-secondary">Manage and organize all your adventures in one place.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10 self-start md:self-center">
          <button className="px-5 py-2 rounded-full text-xs font-medium bg-white text-black">All Trips</button>
          <button className="px-5 py-2 rounded-full text-xs font-medium text-text-secondary hover:text-white transition-colors">Upcoming</button>
          <button className="px-5 py-2 rounded-full text-xs font-medium text-text-secondary hover:text-white transition-colors">Past</button>
        </div>

        <Link href="/trips/new" className="btn-primary self-start">
          + Plan New Trip
        </Link>
      </header>

      {loading ? (
        <div className="flex items-center justify-center h-60">
          <p className="text-text-tertiary animate-pulse">Loading trips...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {trips.length > 0 ? trips.map((trip) => (
            <div key={trip.id} className="glass-panel flex flex-col sm:flex-row items-stretch gap-6 p-4 rounded-2xl hover:bg-white/5 transition-all group shadow-lg shadow-black/20">
              <div 
                className="w-full sm:w-48 h-32 bg-cover bg-center rounded-xl overflow-hidden shadow-inner" 
                style={{ backgroundImage: `url(${trip.coverPhoto})` }}
              />
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold">{trip.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider ${
                    trip.status === 'upcoming' ? 'bg-success/20 text-success border border-success/30' : 
                    trip.status === 'planning' ? 'bg-warning/20 text-warning border border-warning/30' : 
                    'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                  }`}>
                    {trip.status}
                  </span>
                </div>
                <p className="text-accent-primary text-sm font-medium mb-1">{trip.dates}</p>
                <p className="text-text-secondary text-sm">{trip.destinationCount} Destinations</p>
              </div>
              <div className="flex flex-row sm:flex-col justify-center gap-3">
                <Link href={`/trips/${trip.id}/build`} className="btn-secondary text-center text-xs py-2">Edit Plan</Link>
                <Link href={`/trips/${trip.id}`} className="btn-primary text-center text-xs py-2">View Trip</Link>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
              <p className="text-text-tertiary mb-6">No trips found. Start your first adventure!</p>
              <Link href="/trips/new" className="btn-primary">Create Your First Trip</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
