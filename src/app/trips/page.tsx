"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
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
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className="gradient-text">My Trips</h1>
          <p>Manage and organize all your adventures in one place.</p>
        </div>
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.activeTab}`}>All Trips</button>
          <button className={styles.tab}>Upcoming</button>
          <button className={styles.tab}>Past</button>
        </div>
        <Link href="/trips/new" className="btn-primary">
          + Plan New Trip
        </Link>
      </header>

      {loading ? (
        <p>Loading trips...</p>
      ) : (
        <div className={styles.tripList}>
          {trips.map((trip) => (
            <div key={trip.id} className={`glass-panel ${styles.tripRow}`}>
              <div 
                className={styles.tripThumbnail} 
                style={{ backgroundImage: `url(${trip.coverPhoto})` }}
              />
              <div className={styles.tripDetails}>
                <div className={styles.tripHeader}>
                  <h2>{trip.name}</h2>
                  <span className={`${styles.statusBadge} ${styles[trip.status.toLowerCase()] || styles.planning}`}>
                    {trip.status}
                  </span>
                </div>
                <p className={styles.tripDates}>{trip.dates}</p>
                <p className={styles.destinations}>{trip.destinationCount} Destinations</p>
              </div>
              <div className={styles.actions}>
                <Link href={`/trips/${trip.id}/build`} className="btn-secondary">Edit Plan</Link>
                <Link href={`/trips/${trip.id}`} className="btn-primary">View Trip</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
