"use client";

import styles from "./page.module.css";
import Link from "next/link";

// Mock data (Read-only version of the itinerary)
const tripInfo = {
  name: "Euro Summer 2026",
  dates: "Jun 10 - Jul 05",
  cover: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
  author: "Alex Explorer",
  stopsCount: 4
};

const itineraryDays = [
  {
    day: "Day 1",
    date: "Wed, Jun 10",
    city: "Paris, France",
    activities: [
      { time: "10:00 AM", name: "Arrival at CDG", type: "Transport" },
      { time: "2:00 PM", name: "Eiffel Tower Summit", type: "Sightseeing" },
    ]
  }
];

export default function SharedItineraryView() {
  return (
    <div className={styles.container}>
      <nav className={styles.publicNav}>
        <div className="gradient-text" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Traveloop</div>
        <Link href="/" className="btn-secondary">Plan your own trip</Link>
      </nav>

      <div 
        className={styles.hero} 
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 11, 0.3), var(--bg-primary)), url(${tripInfo.cover})` }}
      >
        <div className={styles.heroContent}>
          <div className={styles.badge}>Public Itinerary</div>
          <h1 className={styles.title}>{tripInfo.name}</h1>
          <p className={styles.meta}>
            Planned by <strong>{tripInfo.author}</strong> • {tripInfo.dates} • {tripInfo.stopsCount} Destinations
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.actionBanner}>
          <p>Love this itinerary? Copy it to your own dashboard to modify it!</p>
          <button className="btn-primary" onClick={() => alert("Trip Copied!")}>Copy Trip</button>
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
                    <div className={styles.timeColumn}>{act.time}</div>
                    <div className={styles.detailColumn}>
                      <h3>{act.name}</h3>
                      <span className={styles.typeBadge}>{act.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
