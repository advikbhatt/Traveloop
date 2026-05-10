"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
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

  if (loading) return <div className={styles.builderContainer}><p>Loading Itinerary...</p></div>;

  return (
    <div className={styles.builderContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/trips" className={styles.backLink}>← Back to Trips</Link>
          <h1 className="gradient-text">Euro Summer 2026</h1>
        </div>
        <div className={styles.headerRight}>
          <Link href={`/trips/${params.id}`} className="btn-secondary">Preview Itinerary</Link>
          <Link href={`/trips/${params.id}/budget`} className="btn-primary">View Budget</Link>
        </div>
      </header>

      <div className={styles.workspace}>
        {/* Sidebar: Stops */}
        <div className={`glass-panel ${styles.sidebar}`}>
          <div className={styles.sidebarHeader}>
            <h2>Your Route</h2>
            <button className={styles.iconBtn} onClick={() => setShowCityModal(true)}>+</button>
          </div>
          
          <div className={styles.stopsList}>
            {stops.map((stop, index) => (
              <div 
                key={stop.id} 
                className={`${styles.stopItem} ${activeStopId === stop.id ? styles.activeStop : ''}`}
                onClick={() => setActiveStopId(stop.id)}
              >
                <div className={styles.stopNumber}>{index + 1}</div>
                <div className={styles.stopDetails}>
                  <h3>{stop.city}</h3>
                  <p>{stop.dates}</p>
                </div>
              </div>
            ))}
          </div>

          <button 
            className={`btn-secondary ${styles.addStopBtn}`}
            onClick={() => setShowCityModal(true)}
          >
            + Add Destination
          </button>
        </div>

        {/* Main Content: Activities */}
        <div className={`glass-panel ${styles.mainContent}`}>
          {currentStop ? (
            <>
              <div className={styles.contentHeader}>
                <div>
                  <h2>{currentStop.city}, {currentStop.country}</h2>
                  <p className={styles.subtitle}>{currentStop.dates}</p>
                </div>
                <button className="btn-primary" onClick={() => setShowActivityModal(true)}>
                  + Add Activity
                </button>
              </div>

              <div className={styles.activitiesList}>
                {activities.length > 0 ? activities.map(act => (
                  <div key={act.id} className={styles.activityCard}>
                    <div className={styles.actInfo}>
                      <span className={styles.actType}>{act.type}</span>
                      <h3>{act.name}</h3>
                    </div>
                    <div className={styles.actMeta}>
                      <span>⏱ {act.duration}</span>
                      <span className={styles.actCost}>{act.cost}</span>
                      <button className={styles.deleteBtn}>×</button>
                    </div>
                  </div>
                )) : (
                  <div className={styles.emptyState}>
                    <p>No activities planned for this stop yet.</p>
                    <button className="btn-secondary" onClick={() => setShowActivityModal(true)}>
                      Explore things to do
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <p>Select a destination to plan activities.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals for Search */}
      {showCityModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCityModal(false)}>
          <div className={`glass-panel ${styles.modalContent}`} onClick={e => e.stopPropagation()}>
            <h2>Add Destination</h2>
            <input 
              type="text" 
              placeholder="City Name" 
              className={styles.searchInput}
              value={newCity}
              onChange={e => setNewCity(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-primary" onClick={handleAddStop}>Add Stop</button>
              <button className="btn-secondary" onClick={() => setShowCityModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showActivityModal && (
        <div className={styles.modalOverlay} onClick={() => setShowActivityModal(false)}>
          <div className={`glass-panel ${styles.modalContent}`} onClick={e => e.stopPropagation()}>
            <h2>Add Activity to {currentStop?.city}</h2>
            <input 
              type="text" 
              placeholder="Activity Name" 
              className={styles.searchInput}
              value={newActivityName}
              onChange={e => setNewActivityName(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-primary" onClick={handleAddActivity}>Save</button>
              <button className="btn-secondary" onClick={() => setShowActivityModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
