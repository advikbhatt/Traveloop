"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

const tours = [
  {
    id: 1,
    title: "Sunrise Explorer",
    desc: "Experience Mount Bromo's iconic sunrise with a smooth, guided tour.",
    price: "$39 / person",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Adventure Trail",
    desc: "Go deeper into Bromo with crater hikes and off-road jeep exploration.",
    price: "$69 / person",
    image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Night & Stars Escape",
    desc: "A premium night-to-sunrise experience for stargazers and photographers.",
    price: "$109 / person",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    title: "Private Bromo Journey",
    desc: "A fully personalized Bromo adventure with private transport and guide.",
    price: "$149 / person",
    image: "https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?auto=format&fit=crop&w=400&q=80"
  }
];

export default function Tours() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <section id="packages" className="py-24 px-6 md:px-12 bg-white overflow-hidden">
      <div className="w-full text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-gray-50 text-black text-xs font-bold mb-6">
          <span>Bromo Tours</span>
          <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]">✨</div>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight">
          Discover the Best Bromo <span className="text-gray-400">Adventures</span> <br />
          for Every Kind of Traveler
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Carefully crafted tour packages for every traveler whether you're chasing sunrise views, volcanic trails, or night-sky magic.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-8">
        {/* Left Featured Card */}
        <div className="relative rounded-[3rem] overflow-hidden min-h-[600px] group row-span-2">
          <Image 
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80" 
            alt="Main Tour" 
            fill 
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover group-hover:scale-105 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 right-12">
            <h3 className="text-white text-5xl font-bold leading-tight mb-4">
              Discover the <br /> Untamed <br /> Beauty of Bromo
            </h3>
          </div>
        </div>

        {/* Right Grid */}
        {tours.map((tour) => (
          <div key={tour.id} className="flex flex-col">
            <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6 group">
              <Image 
                src={tour.image} 
                alt={tour.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            </div>
            <h4 className="text-black font-bold text-lg mb-2">{tour.title}</h4>
            <p className="text-gray-400 text-xs leading-relaxed mb-6">{tour.desc}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-black font-bold">{tour.price}</span>
              <Link href={user ? "/dashboard" : "/login"} className="flex items-center gap-2 text-black text-[10px] font-bold border border-gray-100 rounded-full px-4 py-2 hover:bg-black hover:text-white transition-all">
                {user ? "View Plan" : "Book Now"} <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
