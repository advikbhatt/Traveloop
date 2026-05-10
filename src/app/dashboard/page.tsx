"use client";

import Link from "next/link";
import styles from "./page.module.css";

// Mock data for the dashboard
const recentTrips = [
  { id: "1", name: "Euro Summer 2026", dates: "Jun 10 - Jul 05", destinations: 4, cover: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80" },
  { id: "2", name: "Japan Autumn", dates: "Nov 01 - Nov 15", destinations: 3, cover: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80" },
];

const popularCities = [
  { name: "Paris, France", image: "https://images.unsplash.com/photo-1502602898657-3e907a5ea82c?auto=format&fit=crop&w=300&q=80" },
  { name: "Tokyo, Japan", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=300&q=80" },
  { name: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=80" },
];

export default function Dashboard() {
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
          <h2>Upcoming Trips</h2>
          <Link href="/trips">View all</Link>
        </div>
        <div className={styles.tripGrid}>
          {recentTrips.map((trip) => (
            <div key={trip.id} className={`glass-panel ${styles.tripCard}`}>
              <div 
                className={styles.tripCover} 
                style={{ backgroundImage: `url(${trip.cover})` }}
              />
              <div className={styles.tripInfo}>
                <h3>{trip.name}</h3>
                <p className={styles.tripDates}>{trip.dates}</p>
                <div className={styles.tripMeta}>
                  <span>{trip.destinations} Destinations</span>
                </div>
              </div>
            </div>
          ))}
          <Link href="/trips/new" className={`glass-panel ${styles.newTripCard}`}>
            <div className={styles.newTripIcon}>+</div>
            <p>Create a new journey</p>
          </Link>
        </div>
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
