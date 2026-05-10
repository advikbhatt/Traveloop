"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data
const initialNotes = [
  { id: 1, text: "Flight lands at Terminal 2. Catch the RER B train to Gare du Nord.", date: "2026-06-10" },
  { id: 2, text: "Reservation at Le Jules Verne for 8:00 PM on Thursday. Confirmation code: XJ92KL", date: "2026-06-11" },
];

export default function TripNotes() {
  const params = useParams();
  const [notes, setNotes] = useState(initialNotes);
  const [newNote, setNewNote] = useState("");

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    const note = {
      id: Date.now(),
      text: newNote,
      date: new Date().toISOString().split('T')[0]
    };
    
    setNotes([note, ...notes]);
    setNewNote("");
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <header className="mb-12 flex flex-col gap-4">
        <Link href={`/trips/${params.id}`} className="text-text-tertiary hover:text-white transition-colors text-sm font-medium">← Back to Itinerary</Link>
        <h1 className="gradient-text text-4xl font-bold">Trip Journal & Notes</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 items-start">
        <div className="glass-panel p-8 rounded-3xl sticky top-6 shadow-2xl shadow-black/40">
          <h2 className="text-xl font-bold mb-6">New Note</h2>
          <form onSubmit={addNote} className="flex flex-col gap-4">
            <textarea 
              className="w-full p-5 bg-bg-secondary border border-white/10 rounded-2xl text-text-primary focus:outline-none focus:border-accent-primary focus:ring-3 focus:ring-accent-primary/20 transition-all resize-none min-h-[200px] text-sm leading-relaxed"
              placeholder="Jot down reservations, ideas, or journal entries here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button type="submit" className="btn-primary w-full shadow-lg">Save Note</button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          {notes.map(note => (
            <div key={note.id} className="glass-panel p-6 rounded-2xl hover:bg-white/5 transition-all group border-l-4 border-l-accent-primary">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-text-tertiary uppercase tracking-widest">{note.date}</span>
                <button 
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-error/10 text-error hover:bg-error hover:text-white transition-all opacity-0 group-hover:opacity-100"
                  onClick={() => deleteNote(note.id)}
                  aria-label="Delete note"
                >
                  ×
                </button>
              </div>
              <p className="text-text-primary text-[0.95rem] leading-relaxed whitespace-pre-wrap">{note.text}</p>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 text-center">
              <p className="text-text-tertiary">No notes yet. Start writing on the left!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
