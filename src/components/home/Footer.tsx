"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer id="contact" className="bg-white pt-24 pb-12 px-6 overflow-hidden">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto mb-32 relative h-[500px] rounded-[3rem] overflow-hidden group">
        <Image 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80" 
          alt="CTA Background" 
          fill 
          sizes="100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-white text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-none">
            Experience the Magic of <br /> Mount Bromo Today
          </h2>
          <p className="text-white/80 max-w-xl mb-10 text-lg">
            Discover breathtaking views, volcanic landscapes, and unforgettable moments in one of Indonesia's most iconic destinations.
          </p>
          <Link href="/login" className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold flex items-center gap-3 group hover:bg-white hover:text-black transition-all">
            <span>Reserve Your Tour Now</span>
            <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
              <span className="text-xl">↗</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto border-b border-stroke pb-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_2fr] gap-16">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-black text-xl font-bold tracking-tight">BromoRise</span>
            </div>
            <p className="text-paragraph text-sm max-w-xs">
              We provide curated Mount Bromo travel experiences with expert local guides, safe transportation, and unforgettable sunrise moments.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-black font-bold">Quick Links</h4>
            <div className="flex flex-col gap-3 text-sm font-medium">
              <Link href="/" className="text-paragraph hover:text-black transition-colors">Home</Link>
              <Link href="#packages" className="text-paragraph hover:text-black transition-colors">Packages</Link>
              <Link href="#gallery" className="text-paragraph hover:text-black transition-colors">Gallery</Link>
              <Link href="#how-it-works" className="text-paragraph hover:text-black transition-colors">How it works</Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-black font-bold">Contact Info</h4>
            <div className="flex flex-col gap-3 text-sm text-paragraph font-medium">
              <p>hello@bromorise.com</p>
              <p>+62 8XX XXXX XXX</p>
              <p>East Java, Indonesia</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-black font-bold">Newsletter</h4>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="flex-1 bg-gray-50 border border-stroke rounded-full px-6 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                required
              />
              <button 
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-paragraph transition-colors disabled:opacity-50"
                disabled={subscribed}
              >
                {subscribed ? "Subscribed!" : "Join"}
              </button>
            </form>
            
            <div className="flex gap-4 mt-4">
              {['instagram', 'facebook', 'youtube', 'twitter'].map((social) => (
                <div key={social} className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center cursor-pointer hover:bg-black group transition-colors">
                   <div className="w-5 h-5 bg-paragraph rounded-sm opacity-20 group-hover:bg-white group-hover:opacity-100 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 text-center">
        <p className="text-paragraph text-[10px] font-medium tracking-widest uppercase">
          © 2026 BromoRise. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
