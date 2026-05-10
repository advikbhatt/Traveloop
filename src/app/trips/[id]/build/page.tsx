"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getStopsForTrip, getActivitiesForStop, addStop, addActivity, Stop, Activity } from "@/lib/db-services";

export default function ItineraryBuilder() {
  const params = useParams();
  const tripId = params.id as string;
  const [stops, setStops] = useState<Stop[]>([]);
  const [activitiesMap, setActivitiesMap] = useState<Record<string, Activity[]>>({});
  const [activeStopId, setActiveStopId] = useState<string | null>(null);
  
  const [showCityModal, setShowCityModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newCity, setNewCity] = useState("");
  const [newActivityName, setNewActivityName] = useState("");

  useEffect(() => {
    async function loadData() {
      const tripStops = await getStopsForTrip(tripId);
      setStops(tripStops);
      if (tripStops.length > 0) {
        setActiveStopId(tripStops[0].id);
      }
      
      const actsMap: Record<string, Activity[]> = {};
      for (const stop of tripStops) {
        actsMap[stop.id] = await getActivitiesForStop(stop.id);
      }
      setActivitiesMap(actsMap);
      setLoading(false);
    }
    loadData();
  }, [tripId]);

  const handleAddStop = async () => {
    if (!newCity.trim()) return;
    const newStop = { tripId, city: newCity, country: "Custom", dates: "TBD", order: stops.length + 1 };
    const id = await addStop(newStop);
    if (id) {
      setStops([...stops, { id, ...newStop }]);
      setActiveStopId(id);
      setShowCityModal(false);
      setNewCity("");
    }
  };

  const handleAddActivity = async () => {
    if (!newActivityName.trim() || !activeStopId) return;
    const newAct = { stopId: activeStopId, name: newActivityName, type: "General", duration: "2 hrs", cost: "Free" };
    const id = await addActivity(newAct);
    if (id) {
      setActivitiesMap({
        ...activitiesMap,
        [activeStopId]: [...(activitiesMap[activeStopId] || []), { id, ...newAct }]
      });
      setShowActivityModal(false);
      setNewActivityName("");
    }
  };

  const currentStop = stops.find(s => s.id === activeStopId);
  const activities = currentStop ? (activitiesMap[currentStop.id] || []) : [];

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-text-tertiary animate-pulse text-lg">Loading Builder...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 h-screen flex flex-col">
      <header className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <Link href={`/trips/${tripId}`} className="text-text-tertiary hover:text-white transition-colors text-sm font-medium mb-1 inline-block">← Back to Preview</Link>
          <h1 className="gradient-text text-3xl">Itinerary Builder</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/trips/${params.id}`} className="btn-secondary">Preview Plan</Link>
          <Link href={`/trips/${params.id}/budget`} className="btn-primary">Manage Budget</Link>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0 overflow-hidden">
        {/* Sidebar: Stops */}
        <div className="glass-panel w-full lg:w-80 flex flex-col min-h-0">
          <div className="p-5 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-lg font-bold">Route</h2>
            <button 
              className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center text-white hover:scale-110 transition-transform"
              onClick={() => setShowCityModal(true)}
            >
              +
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2">
            {stops.map((stop, index) => (
              <div 
                key={stop.id} 
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  activeStopId === stop.id 
                  ? 'bg-accent-primary/20 border-accent-primary/40 shadow-[0_0_15px_rgba(0,122,255,0.1)]' 
                  : 'bg-white/5 border-transparent hover:bg-white/10'
                }`}
                onClick={() => setActiveStopId(stop.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    activeStopId === stop.id ? 'bg-accent-primary text-white' : 'bg-white/10 text-text-tertiary'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold truncate ${activeStopId === stop.id ? 'text-white' : 'text-text-primary'}`}>{stop.city}</h3>
                    <p className="text-[10px] text-text-tertiary uppercase tracking-wider">{stop.dates}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/5">
            <button 
              className="btn-secondary w-full py-3 text-sm"
              onClick={() => setShowCityModal(true)}
            >
              + Add Destination
            </button>
          </div>
        </div>

        {/* Main Content: Activities */}
        <div className="glass-panel flex-1 flex flex-col min-h-0 overflow-hidden">
          {currentStop ? (
            <>
              <div className="p-8 border-b border-white/5 flex justify-between items-center flex-wrap gap-4 bg-white/5">
                <div>
                  <h2 className="text-2xl font-bold">{currentStop.city}, {currentStop.country}</h2>
                  <p className="text-accent-primary text-sm font-medium">{currentStop.dates}</p>
                </div>
                <button className="btn-primary" onClick={() => setShowActivityModal(true)}>
                  + Add Activity
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-4">
                {activities.length > 0 ? activities.map(act => (
                  <div key={act.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex justify-between items-center hover:bg-white/10 transition-all group">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest mb-1">{act.type}</span>
                      <h3 className="text-lg font-bold group-hover:text-accent-primary transition-colors">{act.name}</h3>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-end text-[11px] text-text-tertiary font-medium">
                        <span>⏱ {act.duration}</span>
                        <span className="text-success">{act.cost}</span>
                      </div>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center bg-error/10 text-error hover:bg-error hover:text-white transition-all opacity-0 group-hover:opacity-100">
                        ×
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-2xl mb-4 text-text-tertiary">🗺️</div>
                    <p className="text-text-tertiary mb-6 max-w-xs">No activities planned for this stop yet. What will you explore?</p>
                    <button className="btn-secondary" onClick={() => setShowActivityModal(true)}>
                      Explore things to do
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <p className="text-text-tertiary text-lg">Select a destination from the sidebar to plan activities.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowCityModal(false)}>
          <div className="glass-panel w-full max-w-md p-8 rounded-3xl animate-in zoom-in-95 duration-200 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6">Add Destination</h2>
            <input 
              type="text" 
              placeholder="City Name (e.g., Amsterdam)" 
              className="w-full p-4 bg-bg-secondary border border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-accent-primary focus:ring-3 focus:ring-accent-primary/20 transition-all mb-6"
              value={newCity}
              onChange={e => setNewCity(e.target.value)}
              autoFocus
            />
            <div className="flex gap-3">
              <button className="btn-primary flex-1" onClick={handleAddStop}>Add Stop</button>
              <button className="btn-secondary flex-1" onClick={() => setShowCityModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showActivityModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowActivityModal(false)}>
          <div className="glass-panel w-full max-w-md p-8 rounded-3xl animate-in zoom-in-95 duration-200 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-1">Add Activity</h2>
            <p className="text-text-secondary text-sm mb-6">Planning for {currentStop?.city}</p>
            <input 
              type="text" 
              placeholder="What are you doing? (e.g., Canal Tour)" 
              className="w-full p-4 bg-bg-secondary border border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-accent-primary focus:ring-3 focus:ring-accent-primary/20 transition-all mb-6"
              value={newActivityName}
              onChange={e => setNewActivityName(e.target.value)}
              autoFocus
            />
            <div className="flex gap-3">
              <button className="btn-primary flex-1" onClick={handleAddActivity}>Save Activity</button>
              <button className="btn-secondary flex-1" onClick={() => setShowActivityModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
