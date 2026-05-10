"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function BudgetScreen() {
  const params = useParams();

  // Mock data
  const totalBudget = 2500;
  const expenses = {
    Transport: 800,
    Accommodation: 1000,
    Activities: 400,
    Food: 300,
  };
  
  const totalSpent = Object.values(expenses).reduce((a, b) => a + b, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <header className="mb-12 flex flex-col gap-4">
        <Link href={`/trips/${params.id}/build`} className="text-text-tertiary hover:text-white transition-colors text-sm font-medium">← Back to Builder</Link>
        <h1 className="gradient-text text-4xl font-bold">Budget & Costs</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Overview Card */}
        <div className="glass-panel p-8 rounded-3xl shadow-xl shadow-black/40">
          <h2 className="text-xl font-bold mb-8">Total Budget Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
            <div className="flex flex-col">
              <span className="text-text-tertiary text-xs font-bold uppercase tracking-wider mb-2">Total Budget</span>
              <span className="text-3xl font-bold text-white">${totalBudget}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-text-tertiary text-xs font-bold uppercase tracking-wider mb-2">Estimated Cost</span>
              <span className="text-3xl font-bold text-white">${totalSpent}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-text-tertiary text-xs font-bold uppercase tracking-wider mb-2">Remaining</span>
              <span className={`text-3xl font-bold ${remaining >= 0 ? 'text-success' : 'text-error'}`}>
                ${remaining}
              </span>
            </div>
          </div>
          
          <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
            <div 
              className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,122,255,0.4)]" 
              style={{ 
                width: `${Math.min((totalSpent / totalBudget) * 100, 100)}%`, 
                backgroundColor: remaining >= 0 ? '#007AFF' : '#FF453A' 
              }}
            />
          </div>
          <div className="mt-4 flex justify-between text-xs text-text-tertiary font-medium">
            <span>0%</span>
            <span>{Math.round((totalSpent / totalBudget) * 100)}% Spent</span>
            <span>100%</span>
          </div>
        </div>

        {/* Breakdown Card */}
        <div className="glass-panel p-8 rounded-3xl shadow-xl shadow-black/40 h-fit">
          <h2 className="text-xl font-bold mb-8">Cost Breakdown</h2>
          <ul className="flex flex-col gap-5">
            {Object.entries(expenses).map(([category, amount]) => (
              <li key={category} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]" style={{ backgroundColor: getCategoryColor(category) }} />
                  <span className="text-text-primary font-medium group-hover:text-white transition-colors">{category}</span>
                </div>
                <span className="text-white font-bold">${amount}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center">
            <span className="text-text-secondary font-bold">Total</span>
            <span className="text-xl font-bold text-white">${totalSpent}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getCategoryColor(category: string) {
  switch (category) {
    case 'Transport': return '#007AFF';
    case 'Accommodation': return '#5E5CE6';
    case 'Activities': return '#FF9F0A';
    case 'Food': return '#32D74B';
    default: return '#A0A0A0';
  }
}
