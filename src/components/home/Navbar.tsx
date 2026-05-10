"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 transition-all duration-500 ${scrolled ? 'py-4 bg-black/40 backdrop-blur-xl' : 'py-8 bg-transparent'}`}>
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group">
            <span className="text-black font-extrabold text-xl tracking-tighter">B</span>
          </div>
          <span className="text-white text-2xl font-extrabold tracking-tighter">BromoRise</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center p-1 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10">
        <button 
          onClick={(e: any) => handleScrollTo(e, 'top')} 
          className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg"
        >
          Home
        </button>
        <div className="flex items-center px-4 gap-8">
          <a href="#packages" onClick={(e) => handleScrollTo(e, 'packages')} className="text-white/70 font-bold text-sm hover:text-white transition-colors">Packages</a>
          <a href="#gallery" onClick={(e) => handleScrollTo(e, 'gallery')} className="text-white/70 font-bold text-sm hover:text-white transition-colors">Gallery</a>
          <a href="#how-it-works" onClick={(e) => handleScrollTo(e, 'how-it-works')} className="text-white/70 font-bold text-sm hover:text-white transition-colors">How it works</a>
          <a href="#contact" onClick={(e) => handleScrollTo(e, 'contact')} className="text-white/70 font-bold text-sm hover:text-white transition-colors">Contact</a>
        </div>
      </div>

      <Link href="/login" className="bg-white/10 backdrop-blur-xl text-white px-6 py-2.5 rounded-full border border-white/20 flex items-center gap-4 group hover:bg-white hover:text-black transition-all shadow-xl">
        <span className="font-bold text-sm">Book now</span>
        <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
          <span className="text-xl">↗</span>
        </div>
      </Link>
    </nav>
  );
}
