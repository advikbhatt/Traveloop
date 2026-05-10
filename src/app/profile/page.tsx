"use client";

import { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  User as UserIcon,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  Camera,
  Edit3,
  LogOut,
  ChevronLeft
} from "lucide-react";
import Navbar from "@/components/home/Navbar";

const preplannedTrips = [
  { id: 1, title: "Summer in Paris", location: "France", date: "June 2025", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80" },
  { id: 2, title: "Swiss Alps Hike", location: "Switzerland", date: "July 2025", image: "https://images.unsplash.com/photo-1531219432768-9f540ce91ef3?auto=format&fit=crop&w=400&q=80" },
  { id: 3, title: "London Bridge", location: "UK", date: "August 2025", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80" },
];

const previousTrips = [
  { id: 4, title: "Tokyo Nights", location: "Japan", date: "March 2025", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=400&q=80" },
  { id: 5, title: "Bali Sunsets", location: "Indonesia", date: "Jan 2025", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80" },
  { id: 6, title: "Rome History", location: "Italy", date: "Dec 2024", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("Alex Explorer");
  const [email, setEmail] = useState("alex@example.com");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "Alex Explorer");
        setEmail(currentUser.email || "alex@example.com");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  const handleSave = async () => {
    if (isEditing) {
      setIsSaving(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSaving(false);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32">
        {/* User Profile Section */}
        <section className="flex flex-col md:flex-row items-center gap-12 mb-20">
          <div className="relative group">
            <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl relative">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <UserIcon size={80} className="text-gray-400" />
                </div>
              )}
            </div>
            <button className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-bg-black text-white flex items-center justify-center border-4 border-white shadow-xl hover:scale-110 transition-all">
              <Camera size={20} />
            </button>
          </div>

          <div className="flex-1 relative">
            <div className="bg-white rounded-[3.5rem] p-10 shadow-xl border border-stroke relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all font-bold text-xs ${isSaving ? 'bg-bg-secondary cursor-not-allowed' : 'border-stroke hover:bg-bg-secondary'}`}
                >
                  <Edit3 size={14} />
                  <span>{isSaving ? "Saving..." : (isEditing ? "Save Changes" : "Edit Profile")}</span>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-bold tracking-tighter mb-2 h-12">
                    {isEditing ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-bg-secondary px-4 py-1 rounded-2xl outline-none focus:ring-2 focus:ring-bg-black/10 w-full max-w-md"
                      />
                    ) : name}
                  </h2>
                  <div className="h-6">
                    {isEditing ? (
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-bg-secondary px-4 py-0.5 rounded-xl outline-none focus:ring-2 focus:ring-bg-black/10 text-sm font-medium w-full max-w-sm"
                      />
                    ) : (
                      <p className="text-text-paragraph font-medium">{email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-3xl bg-bg-secondary/30 border border-stroke">
                    <p className="text-[10px] font-bold text-text-paragraph uppercase tracking-widest mb-1">Status</p>
                    <p className="font-bold text-bg-black">Active Explorer</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-bg-secondary/30 border border-stroke">
                    <p className="text-[10px] font-bold text-text-paragraph uppercase tracking-widest mb-1">Joined</p>
                    <p className="font-bold text-bg-black">May 2026</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Badge Tag */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 md:left-20 md:translate-x-0">
              <div className="px-6 py-2.5 rounded-full bg-[#6366F1] text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-200 border-2 border-white">
                Striking Sheep
              </div>
            </div>
          </div>
        </section>

        {/* Preplanned Trips Section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold whitespace-nowrap">Preplanned Trips</h2>
            <div className="h-[1px] w-full bg-stroke"></div>
            <Link href="/dashboard" className="flex items-center gap-1 text-sm font-bold text-text-paragraph hover:text-bg-black transition-colors whitespace-nowrap">
              See All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-6 no-scrollbar -mx-6 md:-mx-12 px-6 md:px-12">
            {preplannedTrips.map((trip) => (
              <div key={trip.id} className="flex-shrink-0 w-80 group">
                <div className="relative h-[480px] rounded-[3rem] overflow-hidden shadow-sm border border-stroke hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-2 opacity-80">
                      <MapPin size={10} />
                      <span>{trip.location}</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-6">{trip.title}</h3>
                    <button className="w-full py-4 rounded-2xl bg-white text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Previous Trips Section */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl font-bold whitespace-nowrap">Previous Trips</h2>
            <div className="h-[1px] w-full bg-stroke"></div>
            <Link href="/dashboard" className="flex items-center gap-1 text-sm font-bold text-text-paragraph hover:text-bg-black transition-colors whitespace-nowrap">
              See All <ChevronRight size={16} />
            </Link>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-6 no-scrollbar -mx-6 md:-mx-12 px-6 md:px-12">
            {previousTrips.map((trip) => (
              <div key={trip.id} className="flex-shrink-0 w-80 group">
                <div className="relative h-[480px] rounded-[3rem] overflow-hidden shadow-sm border border-stroke hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-2 opacity-80">
                      <Calendar size={10} />
                      <span>{trip.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-6">{trip.title}</h3>
                    <button className="w-full py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-sm hover:bg-white hover:text-black transition-all shadow-xl">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
