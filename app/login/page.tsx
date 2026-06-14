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
  const [showLegacy, setShowLegacy] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/alumni';

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    setDebugLog('Initiating Google sign in...');
    try {
      await signIn('google', { callbackUrl });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during Google sign in.');
      setLoading(false);
    }
  };

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

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-[#1A1A1A] hover:bg-white/10 border border-[#BEF3DF]/30 hover:border-[#BEF3DF]/80 text-[#BEF3DF] hover:text-white font-bold text-sm tracking-widest uppercase py-3.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(190,243,223,0.05)] cursor-pointer"
            style={{
              clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)',
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.555 0-6.437-2.882-6.437-6.437s2.882-6.437 6.437-6.437c1.554 0 2.978.552 4.093 1.467l3.056-3.056C19.23 2.222 15.937 1 12.24 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.207 0 10.963-4.354 10.963-11.24 0-.61-.067-1.196-.188-1.755H12.24z"
              />
            </svg>
            Sign In with Google
          </button>

          <div className="flex items-center my-6 py-2">
            <div className="flex-grow border-t border-white/10" />
            <span className="mx-4 text-gray-500 text-[9px] tracking-widest uppercase font-mono">OR</span>
            <div className="flex-grow border-t border-white/10" />
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowLegacy(!showLegacy)}
              className="text-gray-500 hover:text-[#BEF3DF] text-[9px] tracking-widest uppercase transition-colors duration-300 font-mono cursor-pointer"
            >
              {showLegacy ? 'Hide Legacy Credentials' : 'Use Legacy Credentials'}
            </button>
          </div>

          {showLegacy && (
            <form onSubmit={handleLogin} className="space-y-4 pt-4 border-t border-white/5">
              <div>
                <label className="block text-[#BEF3DF]/70 text-[10px] uppercase tracking-widest mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#BEF3DF] transition-colors text-sm"
                  placeholder="e.g. alumni@example.com"
                />
              </div>
              <div>
                <label className="block text-[#BEF3DF]/70 text-[10px] uppercase tracking-widest mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#BEF3DF] transition-colors text-sm"
                  placeholder="e.g. 9876543210"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 bg-[#BEF3DF] hover:bg-white text-black font-bold text-xs tracking-widest uppercase py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                style={{
                  clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)',
                }}
              >
                {loading ? 'Verifying...' : 'Access Directory'}
              </button>
            </form>
          )}
        </div>
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
