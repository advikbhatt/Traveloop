"use client";

import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import DiscoveryLayout from "@/components/discovery/DiscoveryLayout";
import Moments from "@/components/home/Moments";
import Tours from "@/components/home/Tours";
import Testimonials from "@/components/home/Testimonials";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <DiscoveryLayout />
      <div className="space-y-0">
        <Moments />
        <Tours />
        <Testimonials />
        <HowItWorks />
      </div>
      <Footer />
    </main>
  );
}
