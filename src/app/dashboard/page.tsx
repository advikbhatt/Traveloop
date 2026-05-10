"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
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
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.greeting}>
          <h1 className="gradient-text">Welcome back, Explorer</h1>
          <p>Ready for your next adventure?</p>
        </div>
        <div className={styles.actions}>
          <Link href="/trips/new" className="btn-primary">
            + Plan New Trip
          </Link>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Your Upcoming Trips</h2>
          <Link href="/trips" className="btn-secondary">View All</Link>
        </div>

        {loading ? (
          <p>Loading your trips...</p>
        ) : (
          <div className={styles.tripGrid}>
            {trips.length > 0 ? trips.map((trip) => (
              <div key={trip.id} className={`glass-panel ${styles.tripCard}`}>
                <div 
                  className={styles.tripCover} 
                  style={{ backgroundImage: `url(${trip.coverPhoto})` }}
                />
                <div className={styles.tripInfo}>
                  <h3>{trip.name}</h3>
                  <p className={styles.tripDates}>{trip.dates}</p>
                  <div className={styles.tripMeta}>
                    <span>{trip.destinationCount} Destinations</span>
                  </div>
                  <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                    <Link href={`/trips/${trip.id}`} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>View</Link>
                    <Link href={`/trips/${trip.id}/build`} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>Edit</Link>
                  </div>
                </div>
              </div>
            )) : (
              <p>No trips yet. Start planning one!</p>
            )}
            <Link href="/trips/new" className={`glass-panel ${styles.newTripCard}`}>
              <div className={styles.newTripIcon}>+</div>
              <p>Create a new journey</p>
            </Link>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h2>Get Inspired</h2>
        <p className={styles.subtext}>Popular destinations right now</p>
        <div className={styles.inspirationGrid}>
          {popularCities.map((city, index) => (
            <div key={index} className={styles.cityCard}>
              <div 
                className={styles.cityImage} 
                style={{ backgroundImage: `url(${city.image})` }}
              />
              <div className={styles.cityOverlay}>
                <h4>{city.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
