"use client";

import { useState } from "react";
import { Search, Filter, SlidersHorizontal, Plus, RotateCcw, Share2, CheckSquare, Square, ChevronDown, MoreVertical } from "lucide-react";
import Navbar from "@/components/home/Navbar";

const initialChecklist = {
  documents: [
    { id: 1, text: "Passport", completed: true },
    { id: 2, text: "Flight Tickets (printed)", completed: true },
    { id: 3, text: "Travel insurance", completed: true },
    { id: 4, text: "Hotel booking confirmation", completed: false },
  ],
  clothing: [
    { id: 5, text: "Casual Shirts", completed: true },
    { id: 6, text: "Trousers / jeans", completed: false },
    { id: 7, text: "Comfortable walking shoes", completed: false },
    { id: 8, text: "Light jacket / windbreaker", completed: false },
  ],
  electronics: [
    { id: 9, text: "Phone charger", completed: true },
    { id: 10, text: "Universal power adapter", completed: false },
    { id: 11, text: "Earphone / headphones", completed: false },
  ]
};

export default function ChecklistPage() {
  const [checklist, setChecklist] = useState(initialChecklist);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (category: keyof typeof checklist, id: number) => {
    setChecklist({
      ...checklist,
      [category]: checklist[category].map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    });
  };

  const addItem = (category: keyof typeof checklist) => {
    const text = prompt(`Add new item to ${category}:`);
    if (!text) return;
    
    const newItem = {
      id: Math.max(...Object.values(checklist).flat().map(i => i.id)) + 1,
      text,
      completed: false
    };

    setChecklist({
      ...checklist,
      [category]: [...checklist[category], newItem]
    });
  };

  const resetAll = () => {
    const reset = {};
    (Object.keys(checklist) as Array<keyof typeof checklist>).forEach(cat => {
      reset[cat] = checklist[cat].map(item => ({ ...item, completed: false }));
    });
    setChecklist(reset as typeof checklist);
  };

  const filteredChecklist = (category: keyof typeof checklist) => {
    return checklist[category].filter(item => 
      item.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const totalItems = Object.values(checklist).flat().length;
  const completedItems = Object.values(checklist).flat().filter(i => i.completed).length;
  const progressPercent = Math.round((completedItems / totalItems) * 100);

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-24">
      <Navbar />
      
      <div className="pt-24 px-6 md:px-12 max-w-[1000px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-12">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-paragraph group-focus-within:text-bg-black transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search items in your checklist..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-6 py-4 rounded-full bg-white border border-stroke focus:border-bg-black outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-3">
            <button className="p-4 rounded-full bg-white border border-stroke hover:bg-bg-secondary transition-all">
              <SlidersHorizontal size={20} className="text-bg-black" />
            </button>
            <button className="p-4 rounded-full bg-white border border-stroke hover:bg-bg-secondary transition-all">
              <Filter size={20} className="text-bg-black" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[3.5rem] border border-stroke shadow-sm overflow-hidden relative mb-12">
          {/* Badge Tag */}
          <div className="absolute top-10 right-10">
            <div className="px-6 py-2.5 rounded-full bg-[#6366F1] text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-200 border-2 border-white">
              Euphoric Crane
            </div>
          </div>

          <div className="p-10 md:p-14">
            <div className="mb-12">
              <h1 className="text-3xl font-black tracking-tighter mb-4">Packing Checklist</h1>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="relative inline-block w-full max-w-sm mb-4">
                    <button className="w-full flex items-center justify-between px-6 py-4 rounded-2xl bg-bg-secondary border border-stroke font-bold text-sm">
                      <span>Trip: Paris & Rome Adventure</span>
                      <ChevronDown size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-paragraph">Packing Progress</span>
                      <span className="text-sm font-black text-bg-black">{completedItems}/{totalItems} items packed</span>
                    </div>
                    <div className="h-4 w-full bg-bg-secondary rounded-full overflow-hidden border border-stroke shadow-inner">
                      <div 
                        className="h-full bg-bg-black transition-all duration-1000 ease-out relative"
                        style={{ width: `${progressPercent}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {(Object.keys(checklist) as Array<keyof typeof checklist>).map((category) => (
                <section key={category}>
                  <div className="flex items-center justify-between mb-6 border-b border-stroke pb-4">
                    <h3 className="text-xl font-bold capitalize tracking-tight flex items-center gap-3">
                      <div className="w-2 h-8 bg-bg-black rounded-full"></div>
                      {category}
                    </h3>
                    <span className="text-xs font-black text-text-paragraph bg-bg-secondary px-3 py-1 rounded-full border border-stroke">
                      {checklist[category].filter(i => i.completed).length}/{checklist[category].length}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredChecklist(category).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => toggleItem(category, item.id)}
                        className={`group flex items-center gap-4 p-5 rounded-3xl border transition-all text-left ${
                          item.completed 
                            ? 'bg-bg-secondary/30 border-stroke/50 opacity-60' 
                            : 'bg-white border-stroke hover:border-bg-black hover:shadow-md'
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                          item.completed ? 'bg-bg-black text-white' : 'bg-bg-secondary text-text-paragraph group-hover:bg-bg-black group-hover:text-white'
                        }`}>
                          {item.completed ? <CheckSquare size={18} /> : <Square size={18} />}
                        </div>
                        <span className={`font-bold text-sm transition-all ${item.completed ? 'line-through' : ''}`}>
                          {item.text}
                        </span>
                        {!item.completed && (
                          <div className="ml-auto w-8 h-8 rounded-full hover:bg-bg-secondary flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                            <MoreVertical size={14} className="text-text-paragraph" />
                          </div>
                        )}
                      </button>
                    ))}
                    
                    <button 
                      onClick={() => addItem(category)}
                      className="flex items-center gap-4 p-5 rounded-3xl border-2 border-dashed border-stroke text-text-paragraph hover:border-bg-black hover:text-bg-black transition-all text-left group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-bg-secondary flex items-center justify-center group-hover:bg-bg-black group-hover:text-white transition-all">
                        <Plus size={18} />
                      </div>
                      <span className="font-bold text-sm uppercase tracking-widest">Add item</span>
                    </button>
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        {/* Global Actions */}
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => addItem('documents')}
            className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-bg-black text-white hover:bg-opacity-90 transition-all font-bold text-sm shadow-xl shadow-black/10"
          >
            <Plus size={18} />
            <span>Add Item to Checklist</span>
          </button>
          <button 
            onClick={resetAll}
            className="flex-1 min-w-[150px] flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white border border-stroke hover:bg-bg-secondary transition-all font-bold text-sm shadow-sm"
          >
            <RotateCcw size={18} />
            <span>Reset All</span>
          </button>
          <button className="flex-1 min-w-[150px] flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white border border-stroke hover:bg-bg-secondary transition-all font-bold text-sm shadow-sm">
            <Share2 size={18} />
            <span>Share Checklist</span>
          </button>
        </div>
      </div>
    </main>
  );
}
