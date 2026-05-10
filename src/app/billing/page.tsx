"use client";

import { useState } from "react";
import { Search, Filter, ArrowLeft, Download, FileText, CheckCircle, PieChart, Info, DollarSign, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";

const invoiceItems = [
  { id: 1, category: "Hotel", description: "Hotel Booking Paris - Le Meurice", qty: "3 nights", unitCost: 3000, amount: 9000 },
  { id: 2, category: "Travel", description: "Flight Bookings (DEL -> PAR) - Air France", qty: "1 ticket", unitCost: 12000, amount: 12000 },
  { id: 3, category: "Activities", description: "Louvre Museum Private Tour", qty: "4 people", unitCost: 250, amount: 1000 },
  { id: 4, category: "Food", description: "Michelin Dinner Reservation", qty: "1 table", unitCost: 1500, amount: 1500 },
];

export default function BillingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [items, setItems] = useState(invoiceItems);
  const [totalBudget, setTotalBudget] = useState(20000);

  const totalSpent = items.reduce((acc, item) => acc + item.amount, 0);
  const remaining = totalBudget - totalSpent;
  const spentPercentage = Math.round((totalSpent / totalBudget) * 100);
  const isOverBudget = totalSpent > totalBudget;

  const handleEditBudget = () => {
    const newBudget = prompt("Enter new total budget:", totalBudget.toString());
    if (newBudget && !isNaN(Number(newBudget))) {
      setTotalBudget(Number(newBudget));
    }
  };

  const filteredItems = items.filter(item => 
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-20">
      <Navbar />
      
      <div className="pt-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-paragraph" size={20} />
            <input 
              type="text" 
              placeholder="Search invoices, transactions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-6 py-4 rounded-full bg-white border border-stroke focus:border-bg-black outline-none transition-all shadow-sm"
            />
          </div>
          <div className="flex gap-3">
            <button className="px-8 py-4 rounded-full bg-white border border-stroke hover:bg-bg-secondary transition-all font-bold text-sm flex items-center gap-2">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button className="px-8 py-4 rounded-full bg-white border border-stroke hover:bg-bg-secondary transition-all font-bold text-sm">
              Sort By
            </button>
          </div>
        </div>

        <Link href="/dashboard" className="inline-flex items-center gap-2 text-text-paragraph hover:text-bg-black transition-colors mb-8 font-bold text-sm">
          <ArrowLeft size={16} />
          <span>Back to My Trips</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Main Invoice Card */}
          <div className="bg-white rounded-[3.5rem] border border-stroke shadow-sm overflow-hidden">
            <div className="p-10">
              <div className="flex flex-col md:flex-row gap-10 mb-12">
                <div className="relative">
                  <div className="w-48 h-48 rounded-[2.5rem] bg-bg-secondary relative flex items-center justify-center overflow-hidden border border-stroke shadow-inner">
                    <Image 
                      src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80" 
                      alt="Trip Thumbnail" 
                      fill 
                      sizes="192px"
                      priority
                      className="object-cover opacity-80"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-[#059669] text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg border-2 border-white">
                    Dependable Echidna
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-4">Trip to Europe Adventure</h1>
                    <p className="text-text-paragraph text-xs font-medium mb-1">May 25 - Jun 05, 2025 • 4 cities</p>
                    <p className="text-text-paragraph text-[10px] uppercase tracking-widest font-bold">Created by James</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-bold text-text-paragraph uppercase tracking-widest mb-1">Invoice ID</p>
                      <p className="font-bold text-bg-black">INV-xyz-30290</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-text-paragraph uppercase tracking-widest mb-1">Generated Date</p>
                      <p className="font-bold text-bg-black">May 20, 2025</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-paragraph uppercase tracking-widest mb-2">Traveler Details</p>
                    <div className="flex flex-wrap gap-2">
                      {['James', 'Arjun', 'Jerry', 'Cristina'].map(name => (
                        <span key={name} className="px-3 py-1 rounded-lg bg-bg-secondary text-bg-black text-[10px] font-bold">{name}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-paragraph uppercase tracking-widest mb-1">Payment Status</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${isPaid ? 'bg-emerald-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                      <span className={`font-bold text-sm italic ${isPaid ? 'text-emerald-600' : 'text-yellow-600'}`}>
                        {isPaid ? 'Paid' : 'Pending'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Invoice Table */}
              <div className="overflow-hidden rounded-[2rem] border border-stroke mb-10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-bg-secondary/50 border-b border-stroke">
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-paragraph">#</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-paragraph">Category</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-paragraph">Description</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-paragraph">Qty/Details</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-paragraph">Unit Cost</th>
                      <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-text-paragraph">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stroke">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item, idx) => (
                        <tr key={item.id} className="hover:bg-bg-secondary/20 transition-colors">
                          <td className="px-6 py-5 text-sm font-bold text-text-paragraph">{idx + 1}</td>
                          <td className="px-6 py-5">
                            <span className="px-3 py-1 rounded-lg bg-bg-secondary text-[10px] font-black uppercase tracking-widest text-bg-black">{item.category}</span>
                          </td>
                          <td className="px-6 py-5 text-sm font-bold text-bg-black">{item.description}</td>
                          <td className="px-6 py-5 text-sm font-medium text-text-paragraph">{item.qty}</td>
                          <td className="px-6 py-5 text-sm font-bold text-bg-black">${item.unitCost.toLocaleString()}</td>
                          <td className="px-6 py-5 text-sm font-black text-bg-black">${item.amount.toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-text-paragraph font-bold">No transactions found matching "{searchQuery}"</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="bg-bg-secondary/30">
                      <td colSpan={4} className="px-6 py-10"></td>
                      <td className="px-6 py-4 text-sm font-bold text-text-paragraph text-right space-y-2">
                        <p>Subtotal</p>
                        <p>Tax (5%)</p>
                        <p>Discount</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-black text-bg-black space-y-2">
                        <p>${totalSpent.toLocaleString()}</p>
                        <p>${(totalSpent * 0.05).toLocaleString()}</p>
                        <p className="text-error">-$50</p>
                      </td>
                    </tr>
                    <tr className="bg-bg-black text-white relative overflow-hidden">
                      <td colSpan={4} className="px-6 py-6">
                        <div className="flex items-center gap-2">
                          <DollarSign size={24} className="text-white/20" />
                          <span className="text-sm font-bold opacity-60 uppercase tracking-widest">Grand Total</span>
                        </div>
                      </td>
                      <td colSpan={2} className="px-6 py-6 text-right relative">
                        <span className="text-3xl font-black tracking-tighter">${(totalSpent * 1.05 - 50).toLocaleString()}</span>
                        <div className="absolute -top-4 -right-2 px-4 py-2 bg-[#F59E0B] text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg border-2 border-bg-black">
                          Cute Goat
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white border border-stroke hover:bg-bg-secondary transition-all font-bold text-sm shadow-sm group">
                  <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
                  <span>Download Invoice</span>
                </button>
                <button className="flex-1 min-w-[200px] flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-white border border-stroke hover:bg-bg-secondary transition-all font-bold text-sm shadow-sm group">
                  <FileText size={18} className="group-hover:scale-110 transition-transform" />
                  <span>Export as PDF</span>
                </button>
                <button 
                  onClick={() => setIsPaid(!isPaid)}
                  className={`flex-[1.5] min-w-[280px] flex items-center justify-center gap-3 px-8 py-5 rounded-2xl transition-all font-bold text-sm shadow-lg ${isPaid ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-[#059669] text-white shadow-emerald-100 hover:bg-opacity-90'}`}
                >
                  <CheckCircle size={18} />
                  <span>{isPaid ? 'Payment Confirmed' : 'Mark as Paid'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Budget Insights */}
          <aside className="space-y-8">
            <div className="bg-white rounded-[3rem] p-10 border border-stroke shadow-sm relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-bg-secondary rounded-full opacity-30 blur-3xl group-hover:bg-emerald-100 transition-colors duration-1000"></div>
              
              <div className="flex items-center gap-3 mb-10">
                <PieChart size={20} className="text-bg-black" />
                <h3 className="text-xl font-bold tracking-tight">Budget Insights</h3>
              </div>

              <div className="relative w-48 h-48 mx-auto mb-10">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="#F3F4F6" 
                    strokeWidth="12" 
                  />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke={isOverBudget ? "#EF4444" : "#10B981"} 
                    strokeWidth="12" 
                    strokeDasharray="251.2" 
                    strokeDashoffset={251.2 - (Math.min(spentPercentage, 100) / 100) * 251.2} 
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className={`text-3xl font-black tracking-tighter ${isOverBudget ? 'text-error' : 'text-emerald-600'}`}>{spentPercentage}%</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-text-paragraph">{isOverBudget ? 'Over Budget' : 'Spent'}</span>
                </div>
              </div>

              <div className="space-y-5 mb-10">
                <div className="flex justify-between items-center p-4 rounded-2xl bg-bg-secondary/40 border border-stroke">
                  <span className="text-xs font-bold text-text-paragraph uppercase tracking-widest">Total Budget</span>
                  <span className="font-bold">${totalBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-2xl bg-bg-secondary/40 border border-stroke">
                  <span className="text-xs font-bold text-text-paragraph uppercase tracking-widest">Total Spent</span>
                  <span className="font-bold">${totalSpent.toLocaleString()}</span>
                </div>
                <div className={`flex justify-between items-center p-4 rounded-2xl border ${isOverBudget ? 'bg-error/5 border-error/20' : 'bg-emerald-50/50 border-emerald-100'}`}>
                  <span className={`text-xs font-bold uppercase tracking-widest ${isOverBudget ? 'text-error' : 'text-emerald-600'}`}>{isOverBudget ? 'Deficit' : 'Remaining'}</span>
                  <span className={`font-bold ${isOverBudget ? 'text-error' : 'text-emerald-600'}`}>${Math.abs(remaining).toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleEditBudget}
                className="w-full py-4 rounded-2xl border-2 border-bg-black text-bg-black font-bold text-sm hover:bg-bg-black hover:text-white transition-all shadow-sm"
              >
                Manage Budget
              </button>
            </div>

            <div className="bg-bg-black rounded-[3rem] p-10 text-white relative overflow-hidden">
              <Info className="absolute -top-4 -right-4 w-32 h-32 text-white/5 -rotate-12" />
              <h4 className="text-lg font-bold mb-4 relative z-10">Payment Tip</h4>
              <p className="text-white/60 text-sm leading-relaxed mb-6 relative z-10">
                Splitting expenses with travel companions? Use our group split feature to automatically generate individual payment links.
              </p>
              <button className="text-sm font-bold text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all relative z-10">
                Learn more
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
