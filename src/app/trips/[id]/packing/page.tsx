"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
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
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href={`/trips/${params.id}`} className={styles.backLink}>← Back to Itinerary</Link>
          <h1 className="gradient-text">Packing Checklist</h1>
        </div>
        <div className={styles.progressCounter}>
          {packedCount} / {items.length} Packed
        </div>
      </header>

      <div className={`glass-panel ${styles.checklistCard}`}>
        <form onSubmit={addItem} className={styles.addForm}>
          <input 
            type="text" 
            placeholder="Add an item to pack..." 
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className="btn-primary">Add</button>
        </form>

        <div className={styles.list}>
          {items.map(item => (
            <div key={item.id} className={`${styles.listItem} ${item.packed ? styles.packed : ''}`}>
              <label className={styles.checkboxLabel}>
                <input 
                  type="checkbox" 
                  checked={item.packed}
                  onChange={() => toggleItem(item.id)}
                  className={styles.checkbox}
                />
                <span className={styles.itemText}>{item.text}</span>
              </label>
              <span className={styles.categoryBadge}>{item.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
