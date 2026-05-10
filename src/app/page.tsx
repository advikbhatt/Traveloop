"use client";

import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import Moments from "@/components/home/Moments";
import Tours from "@/components/home/Tours";
import Testimonials from "@/components/home/Testimonials";
import HowItWorks from "@/components/home/HowItWorks";
import Footer from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Moments />
      <Tours />
      <Testimonials />
      <HowItWorks />
      <Footer />
    </main>
  );
}
