"use client";

import Link from "next/link";
import styles from "./page.module.css";

// Mock data for Admin
const stats = [
  { label: "Total Users", value: "1,248" },
  { label: "Trips Created", value: "3,892" },
  { label: "Active Trips", value: "450" },
  { label: "Popular Destination", value: "Paris, FR" },
];

const recentUsers = [
  { id: 1, name: "Alex Explorer", email: "alex@example.com", joined: "2026-05-01", trips: 4 },
  { id: 2, name: "Sarah Travels", email: "sarah@example.com", joined: "2026-05-05", trips: 1 },
  { id: 3, name: "John Doe", email: "john.doe@example.com", joined: "2026-05-08", trips: 0 },
];

export default function AdminDashboard() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/dashboard" className={styles.backLink}>← Back to App</Link>
          <h1 className="gradient-text">Admin Analytics</h1>
          <p className={styles.subtitle}>Platform usage and metrics</p>
        </div>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={`glass-panel ${styles.statCard}`}>
            <h3>{stat.label}</h3>
            <p className={styles.statValue}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className={`glass-panel ${styles.tableContainer}`}>
        <h2>Recent Users</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Joined Date</th>
              <th>Trips</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.joined}</td>
                <td>{user.trips}</td>
                <td>
                  <button className={styles.actionBtn}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
