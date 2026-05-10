"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function CreateTrip() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Prisma API
    // Redirect to the itinerary builder for the new trip (mock ID '4')
    router.push("/trips/4/build");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className="gradient-text">Plan a New Trip</h1>
        <p>Start your journey by giving it a name and selecting the dates.</p>
      </div>

      <div className={`glass-panel ${styles.formContainer}`}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Trip Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Euro Summer 2026"
              required
            />
          </div>

          <div className={styles.dateRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="endDate">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">Trip Description (Optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's the vibe of this trip?"
              rows={4}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="coverPhoto">Cover Photo URL (Optional)</label>
            <input
              type="url"
              id="coverPhoto"
              value={coverPhoto}
              onChange={(e) => setCoverPhoto(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className="btn-secondary" onClick={() => router.back()}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Create & Add Stops
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
