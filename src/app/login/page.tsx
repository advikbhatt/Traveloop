"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <div className="min-h-screen flex items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,122,255,0.15)_0%,transparent_50%),radial-gradient(circle_at_0%_100%,rgba(94,92,230,0.1)_0%,transparent_40%)]">
      <div className="glass-panel w-full max-w-[420px] p-8 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="text-center mb-2">
          <h1 className="gradient-text text-4xl mb-2">Traveloop</h1>
          <p className="text-text-secondary text-[0.95rem]">
            {isLogin ? "Welcome back, explorer." : "Start your journey today."}
          </p>
        </div>

        {error && (
          <div className="bg-error/10 border border-error/30 text-error p-3 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-text-secondary ml-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full p-4 bg-bg-secondary border border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-accent-primary focus:ring-3 focus:ring-accent-primary/20 transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" readonly className="text-xs font-medium text-text-secondary ml-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-4 bg-bg-secondary border border-white/10 rounded-xl text-text-primary focus:outline-none focus:border-accent-primary focus:ring-3 focus:ring-accent-primary/20 transition-all"
              required
            />
          </div>

          {isLogin && (
            <div className="text-right text-[0.85rem]">
              <a href="#" className="text-accent-primary hover:text-accent-primary-hover transition-colors">Forgot Password?</a>
            </div>
          )}

          <button type="submit" className="btn-primary mt-2 w-full disabled:opacity-70" disabled={loading}>
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-[0.9rem] text-text-secondary mt-2">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="text-accent-primary font-semibold hover:underline"
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>

        <div className="flex items-center text-center text-text-secondary text-[0.85rem] my-2 before:content-[''] before:flex-1 before:border-b before:border-white/10 after:content-[''] after:flex-1 after:border-b after:border-white/10">
          <span className="px-4">or</span>
        </div>

        <button 
          type="button" 
          className="flex items-center justify-center gap-2 w-full p-3 bg-white text-[#3c4043] rounded-full font-medium text-[1rem] border border-[#dadce0] hover:bg-[#f8f9fa] hover:shadow-sm transition-all" 
          onClick={handleGoogleLogin}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
