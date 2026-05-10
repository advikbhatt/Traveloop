"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-8">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-black font-extrabold text-2xl tracking-tighter">B</span>
          </div>
          <span className="text-white text-3xl font-extrabold tracking-tighter">BromoRise</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center p-1.5 rounded-full bg-black/20 backdrop-blur-2xl border border-white/10">
        <Link href="/" className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm shadow-lg">
          Home
        </Link>
        <div className="flex items-center px-4 gap-8">
          <Link href="#packages" className="text-white/70 font-bold text-sm hover:text-white transition-colors">Packages</Link>
          <Link href="#gallery" className="text-white/70 font-bold text-sm hover:text-white transition-colors">Gallery</Link>
          <Link href="#how-it-works" className="text-white/70 font-bold text-sm hover:text-white transition-colors">How it works</Link>
          <Link href="#contact" className="text-white/70 font-bold text-sm hover:text-white transition-colors">Contact</Link>
        </div>
      </div>

      <Link href="/login" className="bg-white/10 backdrop-blur-xl text-white px-7 py-3 rounded-full border border-white/20 flex items-center gap-4 group hover:bg-white hover:text-black transition-all shadow-xl">
        <span className="font-bold text-sm">Book now</span>
        <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
          <span className="text-xl">↗</span>
        </div>
      </Link>
    </nav>
  );
}
