"use client";

import { useState } from "react";
import Link from "next/link";
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
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <header className="mb-10 flex flex-col gap-4">
        <Link href="/dashboard" className="text-text-tertiary hover:text-white transition-colors text-sm font-medium">← Back to Dashboard</Link>
        <h1 className="gradient-text text-4xl font-bold">Profile Settings</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div className="glass-panel p-8 rounded-3xl shadow-xl shadow-black/40">
          <h2 className="text-xl font-bold mb-8">Personal Information</h2>
          <form onSubmit={handleSave} className="flex flex-col gap-6">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-20 h-20 rounded-full bg-accent-gradient flex items-center justify-center text-white text-2xl font-bold border-4 border-white/5 shadow-lg">
                AE
              </div>
              <button type="button" className="btn-secondary py-2 text-sm">Change Photo</button>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-text-secondary ml-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full p-4 bg-bg-secondary border border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-accent-primary focus:ring-3 focus:ring-accent-primary/20 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-text-secondary ml-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                disabled
                className="w-full p-4 bg-bg-secondary border border-white/10 rounded-xl text-text-tertiary cursor-not-allowed opacity-60"
              />
            </div>

            <button type="submit" className="btn-primary mt-4 self-start px-8">Save Changes</button>
          </form>
        </div>

        <div className="flex flex-col gap-8">
          <div className="glass-panel p-6 rounded-2xl border-error/10">
            <h2 className="text-lg font-bold mb-4">Account Actions</h2>
            <div className="flex flex-col gap-3">
              <button className="btn-secondary w-full" onClick={handleLogout}>Log Out</button>
              <button className="w-full py-3 rounded-full text-error font-medium hover:bg-error/10 transition-colors border border-transparent hover:border-error/20">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
