"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        setName(user.displayName || "New Traveler");
        setEmail(user.email || "");
        setPhoto(user.photoURL || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E");
      } else {
        // Option: send back to login if no user session is active
        // router.push("/");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully (simulated)!");
  };

  const handleLogout = async () => {
    try {
      if (auth.signOut) {
        await auth.signOut();
      }
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="text-text-secondary text-lg animate-pulse">Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <header className="mb-10 flex flex-col gap-4">
        <h1 className="gradient-text text-4xl font-bold">Profile Settings</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div className="bg-white border border-stroke p-8 rounded-3xl shadow-sm">
          <h2 className="text-xl font-bold mb-8 text-bg-black">Personal Information</h2>
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <div className="flex items-center gap-6 mb-4">
              {photo ? (
                <img 
                  src={photo} 
                  alt={name} 
                  className="w-20 h-20 rounded-full object-cover border-4 border-bg-secondary shadow-md"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-bg-black flex items-center justify-center text-white text-2xl font-bold border-4 border-bg-secondary shadow-md">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
              <button type="button" className="btn-secondary py-2 text-sm">Update Photo</button>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-bold text-text-paragraph ml-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full p-4 bg-bg-secondary border border-stroke rounded-xl text-bg-black font-medium focus:outline-none focus:ring-2 focus:ring-accent-primary/10 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-bold text-text-paragraph ml-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                disabled
                className="w-full p-4 bg-bg-secondary border border-stroke rounded-xl text-text-paragraph cursor-not-allowed opacity-60 font-medium"
              />
            </div>

            <div className="flex flex-col gap-2">
               <label htmlFor="language" className="text-sm font-bold text-text-paragraph ml-1">Language Preference</label>
               <select 
                  id="language" 
                  className="w-full p-4 bg-bg-secondary border border-stroke rounded-xl text-bg-black font-medium focus:outline-none cursor-pointer"
               >
                  <option value="en">English (India)</option>
                  <option value="hi">Hindi</option>
               </select>
            </div>

            <button type="submit" className="btn-primary mt-4 self-start px-8">Save Changes</button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white border border-stroke p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold mb-4 text-bg-black">Account Status</h2>
            <div className="flex flex-col gap-3">
              <button className="btn-secondary w-full" onClick={handleLogout}>Sign Out Session</button>
              <button className="w-full py-3 rounded-full text-error font-bold text-xs uppercase tracking-widest hover:bg-error/5 transition-colors border border-transparent hover:border-error/20">
                Delete Account
              </button>
            </div>
          </div>

          <div className="bg-white border border-stroke p-6 rounded-2xl shadow-sm">
             <h2 className="text-lg font-bold mb-4 text-bg-black">Saved Bucket List</h2>
             <ul className="flex flex-col gap-3">
                <li className="flex items-center gap-3 bg-bg-secondary p-3 rounded-xl border border-stroke">
                   <div className="w-10 h-10 rounded-lg bg-[url('https://images.unsplash.com/photo-1626621340025-73c76b1c3b3b?auto=format&fit=crop&w=100&q=80')] bg-cover" />
                   <div>
                      <p className="text-sm font-bold text-bg-black">Mussoorie</p>
                      <p className="text-[10px] text-text-paragraph">Uttarakhand</p>
                   </div>
                </li>
                <li className="flex items-center gap-3 bg-bg-secondary p-3 rounded-xl border border-stroke">
                   <div className="w-10 h-10 rounded-lg bg-[url('https://images.unsplash.com/photo-1596998804349-4e169f595cd9?auto=format&fit=crop&w=100&q=80')] bg-cover" />
                   <div>
                      <p className="text-sm font-bold text-bg-black">Tapkeshwar</p>
                      <p className="text-[10px] text-text-paragraph">Dehradun</p>
                   </div>
                </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
