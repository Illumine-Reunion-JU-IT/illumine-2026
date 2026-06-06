'use client';

import { useState, Suspense } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugLog, setDebugLog] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/alumni';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDebugLog('1. Initiating sign in...');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        phone,
      });

      if (res?.error) {
        setError(res.error);
        setDebugLog('Sign in failed: ' + res.error);
        setLoading(false);
        return;
      }

      setDebugLog('2. Sign in successful. Fetching session...');

      // Fetch session to determine role using NextAuth's built-in getSession
      const session = await getSession();

      if (!session) {
        setError('Session could not be retrieved. Check Vercel NEXTAUTH_SECRET.');
        setDebugLog('Session fetch returned null.');
        setLoading(false);
        return;
      }

      setDebugLog(`3. Session retrieved. Role: ${session?.user?.role}. Redirecting...`);

      if (session?.user?.role === 'admin') {
        const destination = callbackUrl.startsWith('/') ? callbackUrl : '/admin';
        // Hard redirect to avoid Next.js caching or silent middleware bounces
        window.location.href = destination;
      } else {
        window.location.href = '/alumni';
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <>
        {debugLog && (
          <div className="mb-4 p-2 bg-blue-900/30 border border-blue-500/50 text-blue-300 text-xs tracking-wider font-mono break-words">
            {debugLog}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 text-red-400 text-xs uppercase tracking-wider">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[#BEF3DF]/70 text-xs uppercase tracking-widest mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/60 border border-white/10 px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#BEF3DF] transition-colors"
              placeholder="e.g. alumni@example.com"
            />
          </div>
          <div>
            <label className="block text-[#BEF3DF]/70 text-xs uppercase tracking-widest mb-1">Phone Number</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-black/60 border border-white/10 px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#BEF3DF] transition-colors"
              placeholder="e.g. 9876543210"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-[#BEF3DF] hover:bg-white text-black font-bold text-sm tracking-widest uppercase py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)',
            }}
          >
            {loading ? 'Verifying...' : 'Access Directory'}
          </button>
        </form>
    </>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#070707] flex items-center justify-center font-mono p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-black/40 border border-[#BEF3DF]/30 p-8 shadow-[0_0_20px_rgba(190,243,223,0.1)] relative"
        style={{
          clipPath: 'polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)',
        }}
      >
        <div className="absolute top-0 right-0 w-3 h-[2px] bg-[#BEF3DF]" />
        <div className="absolute bottom-0 left-0 w-3 h-[2px] bg-[#BEF3DF]" />

        <h1 className="text-2xl text-[#BEF3DF] font-bold mb-2 tracking-widest uppercase">Verify Access</h1>
        <p className="text-gray-400 text-sm mb-6 uppercase tracking-wider">
          Enter your registered Email and Phone Number to access the full Alumni Directory.
        </p>

        <Suspense fallback={<div className="text-[#BEF3DF] text-sm tracking-widest">LOADING...</div>}>
          <LoginForm />
        </Suspense>
      </motion.div>
    </main>
  );
}
