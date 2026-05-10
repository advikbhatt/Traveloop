"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getTripById, getExpensesForTrip, addExpense, updateTripBudget, Expense, Trip } from "@/lib/db-services";

export default function BudgetScreen() {
  const params = useParams();
  const tripId = params.id as string;
  
  const [trip, setTrip] = useState<Trip | null>(null);
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [isAdding, setIsAdding] = useState(false);
  const [expName, setExpName] = useState("");
  const [expAmt, setExpAmt] = useState("");
  const [expCat, setExpCat] = useState<Expense['category']>("Other");

  const loadData = async () => {
    const tripData = await getTripById(tripId);
    const expenses = await getExpensesForTrip(tripId);
    setTrip(tripData);
    setExpenseList(expenses);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [tripId]);

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(expAmt);
    if (!expName || isNaN(amt)) return;
    
    await addExpense({
      tripId,
      name: expName,
      amount: amt,
      category: expCat,
      dateAdded: new Date().toISOString()
    });
    
    setExpName("");
    setExpAmt("");
    setIsAdding(false);
    loadData(); // reload lists
  };

  const handleEditBudget = async () => {
     const input = prompt("Enter new total budget amount (INR):", trip?.totalBudget?.toString() || "25000");
     if (input && !isNaN(Number(input))) {
        await updateTripBudget(tripId, Number(input));
        loadData();
     }
  };

  if (loading) return <div className="p-24 text-center animate-pulse text-text-secondary">Synchronizing Ledger...</div>;

  const totalBudget = trip?.totalBudget || 25000;
  
  // Compute aggregations dynamically
  const categoryMap: Record<string, number> = {
    Transport: 0, Accommodation: 0, Activities: 0, Meals: 0, Other: 0
  };
  
  let totalSpent = 0;
  expenseList.forEach(exp => {
     categoryMap[exp.category] = (categoryMap[exp.category] || 0) + exp.amount;
     totalSpent += exp.amount;
  });

  const remaining = totalBudget - totalSpent;
  const isOverBudget = remaining < 0;
  const numDays = 7; // Hardcoded duration simulation for per-day computation
  const averagePerDay = Math.round(totalSpent / numDays);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <header className="mb-10 flex flex-col gap-4">
        <Link href={`/trips/${tripId}`} className="text-text-paragraph hover:text-bg-black transition-colors text-sm font-medium flex items-center gap-2">
          <span>←</span> Back to Itinerary
        </Link>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="gradient-text text-4xl font-extrabold tracking-tight">{trip?.name || 'Trip'} Budget</h1>
            <p className="text-text-paragraph mt-1">Dynamic cloud-synced expenditure tracking.</p>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={() => setIsAdding(!isAdding)} className="btn-secondary text-xs py-2 px-4">
                {isAdding ? 'Cancel' : '+ Record Expense'}
             </button>
             <button onClick={handleEditBudget} className="btn-primary text-xs py-2 px-4">Set Limit</button>
          </div>
        </div>
      </header>

      {isAdding && (
         <form onSubmit={handleAddExpense} className="bg-white border border-stroke p-6 rounded-2xl mb-8 flex flex-wrap gap-4 items-end shadow-sm">
            <div className="flex flex-col gap-2 flex-1 min-w-[200px]">
               <label className="text-xs font-bold text-text-paragraph uppercase">Purpose</label>
               <input type="text" value={expName} onChange={e=>setExpName(e.target.value)} required placeholder="Flight, Dinner, etc." className="bg-bg-secondary p-3 rounded-xl border border-stroke text-bg-black outline-none"/>
            </div>
            <div className="flex flex-col gap-2 w-32">
               <label className="text-xs font-bold text-text-paragraph uppercase">Cost (₹)</label>
               <input type="number" value={expAmt} onChange={e=>setExpAmt(e.target.value)} required placeholder="0.00" className="bg-bg-secondary p-3 rounded-xl border border-stroke text-bg-black outline-none"/>
            </div>
            <div className="flex flex-col gap-2 w-48">
               <label className="text-xs font-bold text-text-paragraph uppercase">Group</label>
               <select value={expCat} onChange={e=>setExpCat(e.target.value as any)} className="bg-bg-secondary p-3 rounded-xl border border-stroke text-bg-black outline-none cursor-pointer">
                  <option value="Transport">Transport</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Activities">Activities</option>
                  <option value="Meals">Meals</option>
                  <option value="Other">Other</option>
               </select>
            </div>
            <button type="submit" className="btn-primary h-12 px-8 text-xs">Save</button>
         </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
         <div className="bg-white border border-stroke p-6 rounded-2xl shadow-sm">
            <p className="text-text-paragraph text-xs font-bold uppercase tracking-widest mb-1">Utilized</p>
            <h3 className="text-3xl font-extrabold text-bg-black">₹{totalSpent.toLocaleString()}</h3>
            <p className="text-text-paragraph text-xs mt-2">Out of ₹{totalBudget.toLocaleString()} cap</p>
         </div>
         
         <div className="bg-white border border-stroke p-6 rounded-2xl relative overflow-hidden shadow-sm">
            <p className="text-text-paragraph text-xs font-bold uppercase tracking-widest mb-1">Headroom</p>
            <h3 className={`text-3xl font-extrabold ${isOverBudget ? 'text-error' : 'text-success'}`}>
               {isOverBudget ? '-' : ''}₹{Math.abs(remaining).toLocaleString()}
            </h3>
            <div className={`absolute top-0 right-0 w-1 h-full ${isOverBudget ? 'bg-error' : 'bg-success'}`} />
         </div>

         <div className="bg-white border border-stroke p-6 rounded-2xl shadow-sm">
            <p className="text-text-paragraph text-xs font-bold uppercase tracking-widest mb-1">Daily Average</p>
            <h3 className="text-3xl font-extrabold text-bg-black">₹{averagePerDay.toLocaleString()}</h3>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-stroke p-8 rounded-3xl shadow-sm">
            <h2 className="text-xl font-bold mb-8 text-bg-black">Ledger Detail</h2>
            
            <div className="flex flex-col gap-6">
               {Object.entries(categoryMap).map(([category, amount]) => {
                  if (totalSpent === 0 && amount === 0) return null;
                  const percentage = totalSpent === 0 ? 0 : Math.round((amount / totalSpent) * 100);
                  const color = getCategoryColor(category);
                  return (
                     <div key={category} className="flex flex-col gap-2">
                        <div className="flex justify-between text-sm font-medium">
                           <span className="text-bg-black flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                              {category}
                           </span>
                           <span className="text-text-paragraph">₹{amount.toLocaleString()} <span className="ml-2 opacity-60">({percentage}%)</span></span>
                        </div>
                        <div className="h-3 w-full bg-bg-secondary rounded-full overflow-hidden">
                           <div 
                              className="h-full rounded-full transition-all duration-700 ease-out"
                              style={{ width: `${percentage}%`, background: color }}
                           />
                        </div>
                     </div>
                  );
               })}
               {totalSpent === 0 && <p className="text-center py-10 text-text-paragraph italic">No expenses recorded yet.</p>}
            </div>
          </div>

          {/* LIST OF RECENT TRANSACTIONS */}
          <div className="bg-white border border-stroke p-6 rounded-2xl shadow-sm">
             <h3 className="text-sm font-bold uppercase text-text-paragraph mb-4">Log</h3>
             <ul className="flex flex-col gap-3">
                {expenseList.slice().reverse().map(exp => (
                   <li key={exp.id} className="flex justify-between items-center bg-bg-secondary p-3 rounded-xl border border-stroke text-sm">
                      <span className="text-bg-black font-semibold">{exp.name}</span>
                      <div className="flex items-center gap-3">
                         <span className="text-xs text-text-paragraph px-2 py-0.5 bg-white border border-stroke rounded-md">{exp.category}</span>
                         <span className="font-bold text-bg-black">₹{exp.amount.toLocaleString()}</span>
                      </div>
                   </li>
                ))}
             </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
           <div className="bg-white border border-stroke p-8 rounded-3xl flex flex-col items-center text-center sticky top-24 shadow-sm">
              <h3 className="text-lg font-bold mb-6 text-bg-black">Budget Spent</h3>
              {(() => {
                 const usedPct = Math.min(100, Math.round((totalSpent / totalBudget) * 100));
                 return (
                  <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-[12px] border-bg-secondary"
                       style={{
                          background: `conic-gradient(${isOverBudget ? '#FF453A' : '#101010'} 0% ${usedPct}%, transparent ${usedPct}% 100%)`,
                          backgroundClip: 'content-box'
                       }}>
                     <div className="absolute inset-0 rounded-full bg-white m-3 flex items-center justify-center flex-col shadow-inner">
                        <span className="text-2xl font-extrabold text-bg-black">{usedPct}%</span>
                        <span className="text-[10px] uppercase text-text-paragraph tracking-widest font-bold">{isOverBudget ? 'Over Limit' : 'Used'}</span>
                     </div>
                  </div>
                 );
              })()}
           </div>
        </div>

      </div>
    </div>
  );
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'Transport': return '#5E5CE6';
    case 'Accommodation': return '#101010';
    case 'Activities': return '#FF9F0A';
    case 'Meals': return '#32D74B';
    default: return '#8E8E93';
  }
}

