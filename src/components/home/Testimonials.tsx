"use client";

import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Alya Rahman",
    text: "Breathtaking sunrise and amazing guides. Truly unforgettable!",
    image: "https://images.unsplash.com/photo-1530172202330-0b30ddcfc7b5?auto=format&fit=crop&w=400&q=80",
    tilt: "-rotate-3"
  },
  {
    id: 2,
    name: "Ahmad Fauzi",
    text: "Sunrise was incredible and guides were so helpful. Highly recommended!",
    image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=400&q=80",
    tilt: "rotate-2"
  },
  {
    id: 3,
    name: "Rizky Aditya",
    text: "Professional guides and stunning views. Loved every moment!",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80",
    tilt: "-rotate-1"
  },
  {
    id: 4,
    name: "Siti Nurhaliza",
    text: "Every moment was magical. Bromo is a must-see!",
    image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&w=400&q=80",
    tilt: "rotate-3"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white overflow-hidden">
      <div className="w-full text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 bg-gray-50 text-black text-xs font-bold mb-6">
          <span>Captured Memories</span>
          <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px]">✨</div>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight">
          Capture Your Mount Bromo <br />
          Journey Forever
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Relive every sunrise, trail, and volcanic moment with professional photo and video documentation crafted to preserve your adventure beautifully.
        </p>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-8 px-4">
        {reviews.map((review) => (
          <div key={review.id} className={`flex-1 max-w-[320px] transition-transform duration-500 hover:rotate-0 hover:scale-105 ${review.tilt}`}>
            <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-50">
              <div className="relative h-[380px] rounded-[2rem] overflow-hidden mb-6">
                <Image src={review.image} alt={review.name} fill className="object-cover" />
              </div>
              <div className="px-4 pb-4">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className="text-yellow-400 text-xs">★</span>
                  ))}
                </div>
                <h4 className="text-black font-bold text-sm mb-2">{review.name}</h4>
                <p className="text-gray-400 text-[10px] leading-relaxed italic">"{review.text}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
