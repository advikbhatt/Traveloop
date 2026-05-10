"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useParams } from "next/navigation";
import { getTripById, getStopsForTrip, getActivitiesForStop, Trip, Stop, Activity } from "@/lib/db-services";

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

  if (loading) return <div className={styles.container}><p style={{padding: '2rem'}}>Loading Itinerary...</p></div>;
  if (!trip) return <div className={styles.container}><p style={{padding: '2rem'}}>Trip not found.</p></div>;

  return (
    <div className={styles.container}>
      <div 
        className={styles.hero} 
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 11, 0.2), var(--bg-primary)), url(${trip.coverPhoto})` }}
      >
        <div className={styles.heroContent}>
          <Link href="/trips" className={styles.backLink}>← Back to Trips</Link>
          <h1 className={styles.title}>{trip.name}</h1>
          <p className={styles.dates}>{trip.dates}</p>
        </div>
      </div>

      <div className={styles.actionsBar}>
        <div className={styles.quickLinks}>
          <Link href={`/trips/${params.id}/build`} className="btn-secondary">Edit Itinerary</Link>
          <Link href={`/trips/${params.id}/budget`} className="btn-secondary">Budget</Link>
          <Link href={`/trips/${params.id}/packing`} className="btn-secondary">Packing List</Link>
          <Link href={`/trips/${params.id}/notes`} className="btn-secondary">Notes</Link>
        </div>
        <Link href={`/shared/${params.id}`} className="btn-primary">Share Trip</Link>
      </div>

      <div className={styles.timeline}>
        {itineraryDays.map((day, index) => (
          <div key={index} className={styles.dayBlock}>
            <div className={styles.dayHeader}>
              <div className={styles.dayMeta}>
                <h2>{day.day}</h2>
                <span className={styles.dateLabel}>{day.date}</span>
              </div>
              <div className={styles.cityLabel}>{day.city}</div>
            </div>

              <div className={styles.activityList}>
                {day.activities.map((act, i) => (
                  <div key={i} className={`glass-panel ${styles.activityCard}`}>
                    <div className={styles.timeColumn}>{act.duration}</div>
                    <div className={styles.detailColumn}>
                      <h3>{act.name}</h3>
                      <div className={styles.actBadges}>
                        <span className={styles.typeBadge}>{act.type}</span>
                        {act.cost !== "Free" && <span className={styles.noteBadge}>💰 {act.cost}</span>}
                      </div>
                    </div>
                  </div>
                ))}
                {day.activities.length === 0 && (
                  <p style={{ color: 'var(--text-secondary)', padding: '1rem' }}>No activities planned yet.</p>
                )}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
