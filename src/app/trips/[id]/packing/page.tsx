"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data
const initialItems = [
  { id: 1, text: "Passport", category: "Documents", packed: true },
  { id: 2, text: "Travel Adapter", category: "Electronics", packed: false },
  { id: 3, text: "Jacket", category: "Clothing", packed: false },
];

export default function PackingChecklist() {
  const params = useParams();
  const [items, setItems] = useState(initialItems);
  const [newItemText, setNewItemText] = useState("");

  const toggleItem = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemText.trim()) return;
    setItems([...items, { id: Date.now(), text: newItemText, category: "Other", packed: false }]);
    setNewItemText("");
  };

  const packedCount = items.filter(i => i.packed).length;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link href={`/trips/${params.id}`} className="text-text-tertiary hover:text-white transition-colors text-sm font-medium mb-2 inline-block">← Back to Itinerary</Link>
          <h1 className="gradient-text text-4xl font-bold">Packing Checklist</h1>
        </div>
        <div className="bg-accent-primary/10 text-accent-primary px-6 py-3 rounded-full border border-accent-primary/20 font-bold tracking-tight">
          {packedCount} / {items.length} Packed
        </div>
      </header>

      <div className="glass-panel p-8 rounded-3xl shadow-2xl shadow-black/40">
        <form onSubmit={addItem} className="flex gap-4 mb-10">
          <input 
            type="text" 
            placeholder="Add an item to pack..." 
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            className="flex-1 p-4 bg-bg-secondary border border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-accent-primary transition-all"
          />
          <button type="submit" className="btn-primary px-8">Add</button>
        </form>

        <div className="flex flex-col gap-3">
          {items.map(item => (
            <div 
              key={item.id} 
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                item.packed 
                ? 'bg-white/5 border-transparent opacity-60' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <label className="flex items-center gap-4 flex-1 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={item.packed}
                  onChange={() => toggleItem(item.id)}
                  className="w-5 h-5 rounded border-white/20 bg-bg-secondary text-accent-primary focus:ring-accent-primary transition-all"
                />
                <span className={`text-[0.95rem] font-medium ${item.packed ? 'line-through text-text-tertiary' : 'text-text-primary'}`}>
                  {item.text}
                </span>
              </label>
              <span className="px-3 py-0.5 rounded-full bg-white/10 text-text-tertiary text-[0.65rem] font-bold uppercase tracking-widest">
                {item.category}
              </span>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-center py-10 text-text-tertiary italic">Your checklist is empty. Add items above!</p>
          )}
        </div>
      </div>
    </div>
  );
}
