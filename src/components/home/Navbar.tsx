"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element && (window as any).lenis) {
      (window as any).lenis.scrollTo(element, {
        offset: 0,
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 transition-all duration-500 ${scrolled ? 'py-4 bg-black/40 backdrop-blur-xl border-b border-white/5' : 'py-4 bg-transparent'}`}>
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group ${scrolled ? 'bg-white' : 'bg-black'}`}>
            <span className={`font-extrabold text-xl tracking-tighter ${scrolled ? 'text-black' : 'text-white'}`}>T</span>
          </div>
          <span className={`text-2xl font-extrabold tracking-tighter transition-colors duration-500 ${scrolled ? 'text-white' : 'text-black'}`}>Traveloop</span>
        </Link>
      </div>

      <div className={`hidden md:flex items-center p-1 rounded-full border transition-all duration-500 ${scrolled ? 'bg-white/10 backdrop-blur-2xl border-white/10' : 'bg-black/5 border-black/5'}`}>
        <button 
          onClick={(e) => handleScrollTo(e, 'top')} 
          className={`px-6 py-2 rounded-full font-bold text-sm shadow-lg transition-all duration-500 ${scrolled ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          Home
        </button>
        <div className="flex items-center px-4 gap-8">
          <Link href="/community" className={`font-bold text-sm transition-colors ${scrolled ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'}`}>Community</Link>
          <Link href="/billing" className={`font-bold text-sm transition-colors ${scrolled ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'}`}>Billing</Link>
          <Link href="/checklist" className={`font-bold text-sm transition-colors ${scrolled ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'}`}>Checklist</Link>
          <Link href="/profile" className={`font-bold text-sm transition-colors ${scrolled ? 'text-white/70 hover:text-white' : 'text-black/60 hover:text-black'}`}>Profile</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {!loading && (
          user ? (
            <Link href="/dashboard" className={`px-6 py-2.5 rounded-full flex items-center gap-4 group transition-all shadow-xl hover:scale-105 ${scrolled ? 'bg-white text-black' : 'bg-black text-white'}`}>
              <span className="font-bold text-sm">Dashboard</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${scrolled ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <span className="text-xl">↗</span>
              </div>
            </Link>
          ) : (
            <Link href="/login" className={`px-6 py-2.5 rounded-full flex items-center gap-4 group transition-all shadow-xl hover:scale-105 ${scrolled ? 'bg-white text-black' : 'bg-black text-white'}`}>
              <span className="font-bold text-sm">Book now</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${scrolled ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <span className="text-xl">↗</span>
              </div>
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
