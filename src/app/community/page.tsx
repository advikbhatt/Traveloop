"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, MessageSquare, Heart, Share2, MoreHorizontal, User, Users, Compass, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const communityPosts = [
  {
    id: 1,
    user: { name: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", role: "Elite Traveler" },
    content: "Just returned from a 10-day trip to Kyoto. The autumn colors are absolutely peak right now! Highly recommend visiting the Nanzen-ji temple at sunset. #Kyoto #TravelTips",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    likes: 245,
    comments: 42,
    time: "2 hours ago"
  },
  {
    id: 2,
    user: { name: "Marcus Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", role: "Adventure Guide" },
    content: "Found this hidden gem in the Swiss Alps. Not a single tourist in sight! Who wants the coordinates? 🏔️",
    image: "https://images.unsplash.com/photo-1531219432768-9f540ce91ef3?auto=format&fit=crop&w=800&q=80",
    likes: 892,
    comments: 156,
    time: "5 hours ago"
  },
  {
    id: 3,
    user: { name: "Elena Rodriguez", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", role: "Local Expert" },
    content: "Best street food spots in Mexico City? I've compiled a list of the top 5 places that aren't on any tourist maps. Check my blog link in bio!",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    likes: 567,
    comments: 89,
    time: "1 day ago"
  },
];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState(communityPosts);

  const handleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 md:px-12 max-w-[1400px] mx-auto">
        {/* Search & Filter Section (Synced with Home Style) */}
        <div className="w-full mb-16">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-paragraph transition-colors group-focus-within:text-bg-black" size={20} />
              <input 
                type="text" 
                placeholder="Search community posts, travelers, or groups..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-5 rounded-full bg-white border border-stroke focus:border-bg-black outline-none transition-all shadow-sm hover:shadow-md font-medium"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-5 rounded-full bg-white border border-stroke hover:bg-bg-secondary transition-all font-bold text-sm">
                <SlidersHorizontal size={18} />
                <span>Filter</span>
              </button>
              <select className="flex-1 md:flex-none px-6 py-5 rounded-full bg-white border border-stroke hover:border-bg-black outline-none transition-all font-bold text-sm appearance-none cursor-pointer text-center">
                <option>Group by: All</option>
                <option>Group by: Destinations</option>
                <option>Group by: Tips</option>
              </select>
              <select className="flex-1 md:flex-none px-6 py-5 rounded-full bg-white border border-stroke hover:border-bg-black outline-none transition-all font-bold text-sm appearance-none cursor-pointer text-center">
                <option>Sort by: Latest</option>
                <option>Sort by: Trending</option>
                <option>Sort by: Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
          {/* Main Feed */}
          <section>
            <div className="flex items-center gap-4 mb-10">
              <h1 className="text-4xl font-bold tracking-tighter whitespace-nowrap">Community Feed</h1>
              <div className="h-[1px] w-full bg-stroke"></div>
            </div>

            <div className="space-y-10">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-[3.5rem] border border-stroke shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group">
                    <div className="p-8 md:p-10">
                      {/* Post Header */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-bg-secondary shadow-sm">
                            <Image 
                              src={post.user.avatar} 
                              alt={post.user.name} 
                              fill 
                              sizes="56px"
                              className="object-cover" 
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-bg-black">{post.user.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md">
                                {post.user.role}
                              </span>
                              <span className="text-text-paragraph text-[10px]">•</span>
                              <span className="text-text-paragraph text-[10px] font-medium">{post.time}</span>
                            </div>
                          </div>
                        </div>
                        <button className="w-10 h-10 rounded-full hover:bg-bg-secondary flex items-center justify-center transition-colors">
                          <MoreHorizontal size={20} className="text-text-paragraph" />
                        </button>
                      </div>

                      {/* Post Content */}
                      <p className="text-bg-black text-lg leading-relaxed mb-8 font-medium">
                        {post.content}
                      </p>

                      {/* Post Image */}
                      <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden mb-8 border border-stroke">
                        <Image 
                          src={post.image} 
                          alt="Post Content" 
                          fill 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                          priority={post.id === 1}
                          className="object-cover group-hover:scale-105 transition-transform duration-1000" 
                        />
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-6 border-t border-stroke">
                        <div className="flex items-center gap-6">
                          <button 
                            onClick={() => handleLike(post.id)}
                            className="flex items-center gap-2 text-text-paragraph hover:text-error transition-colors group/action"
                          >
                            <div className="w-10 h-10 rounded-full bg-bg-secondary group-hover/action:bg-error/10 flex items-center justify-center transition-colors">
                              <Heart size={20} />
                            </div>
                            <span className="font-bold text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-2 text-text-paragraph hover:text-bg-black transition-colors group/action">
                            <div className="w-10 h-10 rounded-full bg-bg-secondary group-hover/action:bg-bg-black/10 flex items-center justify-center transition-colors">
                              <MessageSquare size={20} />
                            </div>
                            <span className="font-bold text-sm">{post.comments}</span>
                          </button>
                          <button className="flex items-center gap-2 text-text-paragraph hover:text-bg-black transition-colors group/action">
                            <div className="w-10 h-10 rounded-full bg-bg-secondary group-hover/action:bg-bg-black/10 flex items-center justify-center transition-colors">
                              <Share2 size={20} />
                            </div>
                          </button>
                        </div>
                        <button className="px-6 py-3 rounded-full bg-bg-black text-white font-bold text-xs hover:scale-105 transition-all shadow-lg">
                          View Discussion
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center bg-white rounded-[3.5rem] border border-dashed border-stroke">
                  <Search className="mx-auto mb-4 text-stroke" size={48} />
                  <p className="text-text-paragraph font-bold text-xl">No posts found for "{searchQuery}"</p>
                  <p className="text-text-paragraph/60 mt-2">Try searching for a different traveler or topic.</p>
                </div>
              )}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-10">
            {/* Community Stats */}
            <div className="bg-white rounded-[3rem] p-8 border border-stroke shadow-sm">
              <h3 className="text-xl font-bold mb-6 tracking-tight">Community Stats</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users size={18} className="text-text-paragraph" />
                    <span className="text-sm font-medium text-text-paragraph">Members</span>
                  </div>
                  <span className="font-bold">12.4k</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Compass size={18} className="text-text-paragraph" />
                    <span className="text-sm font-medium text-text-paragraph">Destinations</span>
                  </div>
                  <span className="font-bold">1.2k</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star size={18} className="text-text-paragraph" />
                    <span className="text-sm font-medium text-text-paragraph">Daily Posts</span>
                  </div>
                  <span className="font-bold">450+</span>
                </div>
              </div>
            </div>

            {/* Trending Tags */}
            <div className="bg-white rounded-[3rem] p-8 border border-stroke shadow-sm">
              <h3 className="text-xl font-bold mb-6 tracking-tight">Trending Topics</h3>
              <div className="flex flex-wrap gap-2">
                {['#BromoSunrise', '#BaliLife', '#KyotoAutumn', '#BudgetTravel', '#SoloJourney', '#HiddenGems'].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-bg-secondary text-text-paragraph text-xs font-bold hover:bg-bg-black hover:text-white cursor-pointer transition-all">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </main>
  );
}
