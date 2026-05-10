"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Localized Indian context mock data
const initialNotes = [
  { id: 1, text: "Cab booking confirmed for pick-up at 9:00 AM from Jolly Grant Airport. Driver: Rahul (+91 98XXX).", date: "15 Dec 2026", timestamp: "10:30 AM", tag: "Transport" },
  { id: 2, text: "Remember to try the local street momos near Rajpur Road! Recommended by hotel staff.", date: "16 Dec 2026", timestamp: "04:45 PM", tag: "Food" },
];

export default function TripNotes() {
  const params = useParams();
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState("");
  const [selectedTag, setSelectedTag] = useState("General");

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    const now = new Date();
    const note = {
      id: Date.now(),
      text: newNote,
      date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      tag: selectedTag
    };
    
    setNotes([note, ...notes]);
    setNewNote("");
    setSelectedTag("General");
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <header className="mb-10">
        <Link href={`/trips/${params.id}`} className="text-text-paragraph hover:text-bg-black transition-colors text-sm font-medium flex items-center gap-2 mb-3">
           <span>←</span> Back to Itinerary
        </Link>
        <h1 className="gradient-text text-4xl font-extrabold tracking-tight">Digital Travel Journal</h1>
        <p className="text-text-paragraph mt-1 text-sm">Save localized logistics, ideas, and magical memories instantly.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 items-start">
        {/* CREATOR COLUMN */}
        <div className="bg-white border border-stroke p-6 rounded-2xl sticky top-24 shadow-sm">
          <h2 className="text-lg font-bold mb-5 text-bg-black">Create Entry</h2>
          <form onSubmit={addNote} className="flex flex-col gap-4">
            <select 
               value={selectedTag} 
               onChange={e => setSelectedTag(e.target.value)}
               className="bg-bg-secondary border border-stroke text-bg-black p-3 rounded-xl text-xs font-bold focus:outline-none cursor-pointer"
            >
               <option value="General">General Memo</option>
               <option value="Transport">Transport & Logistics</option>
               <option value="Lodging">Hotel / Check-in</option>
               <option value="Food">Dining Recs</option>
            </select>
            
            <textarea 
              className="w-full p-4 bg-bg-secondary border border-stroke rounded-xl text-bg-black focus:outline-none focus:ring-2 focus:ring-accent-primary/10 transition-all resize-none min-h-[180px] text-sm leading-relaxed"
              placeholder="Write your reminder or story here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button type="submit" className="btn-primary w-full text-xs uppercase tracking-widest py-3 font-bold">Save to Journal</button>
          </form>
        </div>

        {/* FEED COLUMN */}
        <div className="flex flex-col gap-4">
          {notes.map(note => (
            <div key={note.id} className="bg-white border border-stroke p-5 rounded-xl hover:bg-bg-secondary transition-colors group relative flex gap-5 items-start shadow-sm">
               
               <div className="flex flex-col items-center text-center pt-1 min-w-[70px]">
                  <span className="text-[10px] font-bold text-bg-black uppercase tracking-widest mb-1 bg-bg-secondary border border-stroke px-2 py-0.5 rounded-md">
                     {note.tag}
                  </span>
               </div>

               <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                     <div className="flex items-center gap-2">
                        <span className="text-bg-black font-bold text-xs">{note.date}</span>
                        <span className="text-text-paragraph text-[10px]">•</span>
                        <span className="text-text-paragraph text-[10px]">{note.timestamp}</span>
                     </div>
                     <button 
                        className="text-error text-xs opacity-0 group-hover:opacity-100 transition-opacity font-bold hover:underline"
                        onClick={() => deleteNote(note.id)}
                     >
                        Delete
                     </button>
                  </div>
                  <p className="text-text-paragraph text-sm font-medium leading-relaxed whitespace-pre-wrap pr-4">{note.text}</p>
               </div>
            </div>
          ))}
          
          {notes.length === 0 && (
            <div className="py-16 rounded-2xl border border-dashed border-stroke flex flex-col items-center justify-center text-center">
               <div className="text-3xl mb-3 opacity-40">📝</div>
               <p className="text-text-paragraph font-bold text-sm">Nothing written down yet for this trip.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
