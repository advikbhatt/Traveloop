"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTripById, getStopsForTrip, getActivitiesForStop, Trip, Activity } from "@/lib/db-services";

type DayBlock = {
  day: string;
  date: string;
  city: string;
  activities: Activity[];
};

export default function ItineraryView() {
  const params = useParams();
  const tripId = params.id as string;
  
  const [trip, setTrip] = useState<Trip | null>(null);
  const [itineraryDays, setItineraryDays] = useState<DayBlock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const tripData = await getTripById(tripId);
      setTrip(tripData);

      if (tripData) {
        const stops = await getStopsForTrip(tripId);
        const days: DayBlock[] = [];
        
        for (let i = 0; i < stops.length; i++) {
          const stop = stops[i];
          const acts = await getActivitiesForStop(stop.id);
          days.push({
            day: `Day ${i + 1}`,
            date: stop.dates,
            city: `${stop.city}, ${stop.country}`,
            activities: acts
          });
        }
        setItineraryDays(days);
      }
      setLoading(false);
    }
    loadData();
  }, [tripId]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-text-tertiary animate-pulse text-lg">Loading Itinerary...</p>
    </div>
  );
  
  if (!trip) return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p className="text-error text-lg mb-4">Trip not found.</p>
      <Link href="/trips" className="btn-secondary">Back to My Trips</Link>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      <div 
        className="relative h-[400px] w-full flex items-end px-6 md:px-[10%] pb-12 bg-cover bg-center" 
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 11, 0.2), #0A0A0B), url(${trip.coverPhoto})` }}
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <Link href="/trips" className="text-white/60 hover:text-white transition-colors mb-6 inline-block font-medium">← Back to Trips</Link>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-white">{trip.name}</h1>
          <p className="text-accent-primary text-xl font-medium">{trip.dates}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sticky top-0 z-40 py-4 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/trips/${params.id}/build`} className="btn-secondary py-2 text-sm">Edit Itinerary</Link>
            <Link href={`/trips/${params.id}/budget`} className="btn-secondary py-2 text-sm">Budget</Link>
            <Link href={`/trips/${params.id}/packing`} className="btn-secondary py-2 text-sm">Packing List</Link>
            <Link href={`/trips/${params.id}/notes`} className="btn-secondary py-2 text-sm">Notes</Link>
          </div>
          <Link href={`/shared/${params.id}`} className="btn-primary py-2 px-8 text-sm w-full md:w-auto text-center">Share Trip</Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-16">
        {itineraryDays.map((day, index) => (
          <div key={index} className="relative pl-8 md:pl-12 border-l border-white/10">
            {/* Timeline Dot */}
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
                  <div className="w-full sm:w-24 text-text-tertiary text-sm font-mono pt-1">{act.duration}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-accent-primary transition-colors">{act.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-0.5 rounded-full bg-accent-secondary/10 text-accent-secondary border border-accent-secondary/20 text-[0.7rem] font-bold uppercase tracking-wider">
                        {act.type}
                      </span>
                      {act.cost !== "Free" && (
                        <span className="px-3 py-0.5 rounded-full bg-success/10 text-success border border-success/20 text-[0.7rem] font-bold uppercase tracking-wider">
                          💰 {act.cost}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {day.activities.length === 0 && (
                <div className="py-6 px-4 bg-white/5 border border-dashed border-white/10 rounded-2xl text-center">
                  <p className="text-text-tertiary italic">No activities planned yet.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
