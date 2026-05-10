"use client";

import Link from "next/link";

// Mock data for Admin
const stats = [
  { label: "Total Users", value: "1,248" },
  { label: "Trips Created", value: "3,892" },
  { label: "Active Trips", value: "450" },
  { label: "Popular Destination", value: "Dehradun, IN" },
];

const recentUsers = [
  { id: 1, name: "Alex Explorer", email: "alex@example.com", joined: "2026-05-01", trips: 4 },
  { id: 2, name: "Sarah Travels", email: "sarah@example.com", joined: "2026-05-05", trips: 1 },
  { id: 3, name: "John Doe", email: "john.doe@example.com", joined: "2026-05-08", trips: 0 },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <header className="mb-12 flex flex-col gap-4">
        <div>
          <h1 className="gradient-text text-4xl mb-1">Admin Analytics</h1>
          <p className="text-text-secondary text-lg">Platform usage and metrics</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl">
            <h3 className="text-text-tertiary text-sm font-medium mb-2">{stat.label}</h3>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
        <h2 className="text-xl font-bold mb-8">Recent Users</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-text-tertiary text-xs uppercase tracking-widest">
                <th className="pb-4 font-semibold">Name</th>
                <th className="pb-4 font-semibold">Email</th>
                <th className="pb-4 font-semibold">Joined Date</th>
                <th className="pb-4 font-semibold text-center">Trips</th>
                <th className="pb-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentUsers.map(user => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white font-medium">{user.name}</td>
                  <td className="py-4 text-text-secondary">{user.email}</td>
                  <td className="py-4 text-text-secondary">{user.joined}</td>
                  <td className="py-4 text-text-secondary text-center">{user.trips}</td>
                  <td className="py-4 text-right">
                    <button className="text-accent-primary hover:text-accent-primary-hover font-semibold transition-colors">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
