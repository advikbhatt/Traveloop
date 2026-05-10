"use client";

import Link from "next/link";
import styles from "./page.module.css";

// Mock data
const myTrips = [
  { id: "1", name: "Euro Summer 2026", dates: "Jun 10 - Jul 05", destinations: 4, cover: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80", status: "Upcoming" },
  { id: "2", name: "Japan Autumn", dates: "Nov 01 - Nov 15", destinations: 3, cover: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80", status: "Planning" },
  { id: "3", name: "Weekend in NY", dates: "Feb 14 - Feb 16", destinations: 1, cover: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=80", status: "Past" },
];

export default function MyTrips() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1 className="gradient-text">My Trips</h1>
          <p>Manage and organize all your adventures in one place.</p>
        </div>
        <Link href="/trips/new" className="btn-primary">
          + Plan New Trip
        </Link>
      </header>

      <div className={styles.tripList}>
        {myTrips.map((trip) => (
          <div key={trip.id} className={`glass-panel ${styles.tripRow}`}>
            <div 
              className={styles.tripThumbnail} 
              style={{ backgroundImage: `url(${trip.cover})` }}
            />
            <div className={styles.tripDetails}>
              <div className={styles.tripHeader}>
                <h2>{trip.name}</h2>
                <span className={`${styles.statusBadge} ${styles[trip.status.toLowerCase()]}`}>
                  {trip.status}
                </span>
              </div>
              <p className={styles.tripDates}>{trip.dates}</p>
              <p className={styles.destinations}>{trip.destinations} Destinations</p>
            </div>
            <div className={styles.actions}>
              <Link href={`/trips/${trip.id}/build`} className="btn-secondary">Edit Plan</Link>
              <Link href={`/trips/${trip.id}`} className="btn-primary">View Trip</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
