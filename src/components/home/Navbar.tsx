"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['gallery', 'packages', 'reviews', 'how-it-works'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 100) setActiveSection("top");
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
    if (element) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(element, {
          offset: 0,
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Redirect to home with hash if not on home page
      window.location.href = `/#${id}`;
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
          className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-500 ${activeSection === 'top' ? (scrolled ? 'bg-white text-black shadow-lg scale-105' : 'bg-black text-white scale-105') : (scrolled ? 'text-white/40 hover:text-white/70' : 'text-black/40 hover:text-black/70')}`}
        >
          Home
        </button>
        <div className="flex items-center px-4 gap-2">
          <button 
            onClick={(e) => handleScrollTo(e, 'gallery')} 
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeSection === 'gallery' ? (scrolled ? 'bg-white text-black shadow-lg scale-105' : 'bg-black text-white scale-105') : (scrolled ? 'text-white/40 hover:text-white/70' : 'text-black/40 hover:text-black/70')}`}
          >
            Gallery
          </button>
          <button 
            onClick={(e) => handleScrollTo(e, 'packages')} 
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeSection === 'packages' ? (scrolled ? 'bg-white text-black shadow-lg scale-105' : 'bg-black text-white scale-105') : (scrolled ? 'text-white/40 hover:text-white/70' : 'text-black/40 hover:text-black/70')}`}
          >
            Packages
          </button>
          <button 
            onClick={(e) => handleScrollTo(e, 'reviews')} 
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeSection === 'reviews' ? (scrolled ? 'bg-white text-black shadow-lg scale-105' : 'bg-black text-white scale-105') : (scrolled ? 'text-white/40 hover:text-white/70' : 'text-black/40 hover:text-black/70')}`}
          >
            Reviews
          </button>
          <button 
            onClick={(e) => handleScrollTo(e, 'how-it-works')} 
            className={`px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 ${activeSection === 'how-it-works' ? (scrolled ? 'bg-white text-black shadow-lg scale-105' : 'bg-black text-white scale-105') : (scrolled ? 'text-white/40 hover:text-white/70' : 'text-black/40 hover:text-black/70')}`}
          >
            How to Book
          </button>
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
