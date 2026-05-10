"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser: any) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Only hide on public shared pages if desired, but the user said "visible all over"
  if (pathname?.startsWith("/shared/")) {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logoArea}>
          <Link href="/" className={styles.logo}>
            Traveloop
          </Link>
        </div>

        <div className={styles.navLinks}>
          {/* General Links always visible */}
          <Link href="/" className={pathname === "/" ? styles.activeLink : ""}>
            Home
          </Link>
          <Link href="/#packages">Packages</Link>
          <Link href="/#how-it-works">How it Works</Link>
          
          {/* Logged-in Specific Links */}
          {user && (
            <>
              <Link href="/dashboard" className={pathname === "/dashboard" ? styles.activeLink : ""}>
                <span className={styles.icon}></span> Dashboard
              </Link>
              <Link href="/trips" className={pathname?.startsWith("/trips") ? styles.activeLink : ""}>
                <span className={styles.icon}></span> My Trips
              </Link>
            </>
          )}
        </div>

        <div className={styles.authArea}>
          {!loading && (
            user ? (
              <Link href="/profile" className={styles.profileLink}>
                <img 
                  src={user.photoURL || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"} 
                  alt="Profile" 
                  className={styles.avatar} 
                  style={{ background: "rgba(255,255,255,0.1)" }}
                />
              </Link>
            ) : (
              <Link href="/login" className={styles.bookNowBtn}>
                <span>Book Now / Login</span>
                <div className={styles.arrowCircle}>↗</div>
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
