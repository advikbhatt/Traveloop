"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState("Alex Explorer");
  const [email, setEmail] = useState("alex@example.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile saved successfully!");
  };

  const handleLogout = () => {
    if (auth.signOut) {
      auth.signOut();
    }
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/dashboard" className={styles.backLink}>← Back to Dashboard</Link>
          <h1 className="gradient-text">Profile Settings</h1>
        </div>
      </header>

      <div className={styles.layout}>
        <div className={`glass-panel ${styles.formCard}`}>
          <h2>Personal Information</h2>
          <form onSubmit={handleSave} className={styles.form}>
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>AE</div>
              <button type="button" className="btn-secondary">Change Photo</button>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                disabled
              />
            </div>

            <button type="submit" className="btn-primary">Save Changes</button>
          </form>
        </div>

        <div className={styles.dangerZone}>
          <div className={`glass-panel ${styles.dangerCard}`}>
            <h2>Account Actions</h2>
            <div className={styles.actionList}>
              <button className="btn-secondary" onClick={handleLogout}>Log Out</button>
              <button className={styles.deleteBtn}>Delete Account</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
