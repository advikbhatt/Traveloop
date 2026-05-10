"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
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
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href={`/trips/${params.id}`} className={styles.backLink}>← Back to Itinerary</Link>
          <h1 className="gradient-text">Trip Journal & Notes</h1>
        </div>
      </header>

      <div className={styles.layout}>
        <div className={`glass-panel ${styles.editorPanel}`}>
          <h2>Write a new note</h2>
          <form onSubmit={addNote} className={styles.form}>
            <textarea 
              className={styles.textarea}
              placeholder="Jot down reservations, ideas, or journal entries here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button type="submit" className={`btn-primary ${styles.saveBtn}`}>Save Note</button>
          </form>
        </div>

        <div className={styles.notesList}>
          {notes.map(note => (
            <div key={note.id} className={`glass-panel ${styles.noteCard}`}>
              <div className={styles.noteHeader}>
                <span className={styles.noteDate}>{note.date}</span>
                <button 
                  className={styles.deleteBtn}
                  onClick={() => deleteNote(note.id)}
                  aria-label="Delete note"
                >
                  ×
                </button>
              </div>
              <p className={styles.noteText}>{note.text}</p>
            </div>
          ))}
          {notes.length === 0 && (
            <div className={styles.emptyState}>
              <p>No notes yet. Start writing above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
