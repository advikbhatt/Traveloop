"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Google authentication failed.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-6 font-display overflow-hidden">
      {/* Background Image - Blurred Bromo */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1602154663343-89fe0bf541ab?auto=format&fit=crop&w=1920&q=80" 
          alt="Bromo Background"
          fill
          className="object-cover scale-110 blur-xl brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-[480px] animate-in fade-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-10">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-black font-extrabold text-2xl tracking-tighter">B</span>
            </div>
            <span className="text-white text-3xl font-extrabold tracking-tighter">BromoRise</span>
          </Link>
          <h2 className="text-white text-3xl font-bold tracking-tight">
            {isLogin ? "Welcome back" : "Join the adventure"}
          </h2>
          <p className="text-white/60 mt-2 font-medium">
            {isLogin ? "Enter your details to continue your journey" : "Create an account to start exploring"}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-10 rounded-[3rem] shadow-2xl">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-4 rounded-2xl text-sm mb-6 text-center animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-white/80 text-xs font-bold uppercase tracking-widest ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-4 bg-black/20 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-all"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white/80 text-xs font-bold uppercase tracking-widest ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 bg-black/20 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-all"
                required
              />
            </div>

            {isLogin && (
              <button type="button" className="text-white/60 text-xs font-bold uppercase tracking-widest text-right hover:text-white transition-colors">
                Forgot Password?
              </button>
            )}

            <button 
              type="submit" 
              className="mt-4 bg-white text-black p-5 rounded-2xl font-extrabold text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all disabled:opacity-50 shadow-xl"
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login Now" : "Sign Up"}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="bg-transparent px-4 text-white/40 font-bold">Or continue with</span>
            </div>
          </div>

          <button 
            type="button" 
            onClick={handleGoogleLogin}
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-white font-bold hover:bg-white/10 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-white/60 text-sm font-medium">
            {isLogin ? "New to BromoRise?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white font-bold hover:underline underline-offset-4"
            >
              {isLogin ? "Create account" : "Sign in instead"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
