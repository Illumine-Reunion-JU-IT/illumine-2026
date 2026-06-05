'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      phone,
    });

    if (res?.error) {
      setError(res.error);
      setLoading(false);
    } else {
      router.push('/alumni');
      router.refresh();
    }
  };

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
      </motion.div>
    </main>
  );
}
