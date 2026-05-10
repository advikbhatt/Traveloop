"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTrip } from "@/lib/db-services";

export default function CreateTrip() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = await createTrip({
      name,
      dates: `${startDate} to ${endDate}`,
      destinationCount: 1,
      status: 'planning',
      coverPhoto: coverPhoto || 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80',
      userId: 'mock-user-id'
    });
    if (id) {
      router.push(`/trips/${id}/build`);
    } else {
      alert("Failed to create trip");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-10">
        <h1 className="gradient-text text-4xl mb-3">Plan a New Trip</h1>
        <p className="text-text-secondary">Start your journey by giving it a name and selecting the dates.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl shadow-2xl shadow-black/40">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-text-secondary ml-1">Trip Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Uttarakhand Getaway 2026"
              className="w-full p-4 bg-bg-secondary border border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-accent-primary focus:ring-3 focus:ring-accent-primary/20 transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="startDate" className="text-sm font-medium text-text-secondary ml-1">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-4 bg-bg-secondary border border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-accent-primary focus:ring-3 focus:ring-accent-primary/20 transition-all"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="endDate" className="text-sm font-medium text-text-secondary ml-1">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full p-4 bg-bg-secondary border border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-accent-primary focus:ring-3 focus:ring-accent-primary/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium text-text-secondary ml-1">Trip Description (Optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What's the vibe of this trip?"
              rows={4}
              className="w-full p-4 bg-bg-secondary border border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-accent-primary focus:ring-3 focus:ring-accent-primary/20 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="coverPhoto" className="text-sm font-medium text-text-secondary ml-1">Cover Photo URL (Optional)</label>
            <input
              type="url"
              id="coverPhoto"
              value={coverPhoto}
              onChange={(e) => setCoverPhoto(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full p-4 bg-bg-secondary border border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-accent-primary focus:ring-3 focus:ring-accent-primary/20 transition-all"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button type="button" className="btn-secondary px-8" onClick={() => router.back()}>
              Cancel
            </button>
            <button type="submit" className="btn-primary px-8">
              Create & Add Stops
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
