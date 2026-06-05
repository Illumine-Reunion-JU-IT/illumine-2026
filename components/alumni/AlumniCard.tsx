'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AlumniProfile } from '@/types/alumni';
import { useSession } from 'next-auth/react';
import { X, Mail, Phone, MessageSquare, Send, Check } from 'lucide-react';

export interface AlumniCardProps {
  profile: AlumniProfile;
}

const FallbackAvatar: React.FC = () => (
  <div 
    className="w-full h-full bg-[#121626] flex items-center justify-center relative"
    aria-hidden="true"
  >
    <svg 
      className="w-8 h-8 opacity-25 text-[#BEF3DF]" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1} 
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
      />
    </svg>
  </div>
);

export const AlumniCard: React.FC<AlumniCardProps> = ({ profile }) => {
  const [imgError, setImgError] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const { data: session } = useSession();

  // Contact request form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Auto-populate sender info if logged in
  useEffect(() => {
    if (session?.user) {
      setSenderName(session.user.name || '');
      setSenderEmail(session.user.email || '');
    }
  }, [session]);

  const handleOpenContactModal = () => {
    setSuccess(false);
    setError('');
    setMessage(`Hi ${profile.name}, I would love to connect with you to discuss career opportunities and seek guidance. Let's get in touch!`);
    setShowContactModal(true);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/alumni/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          senderName,
          senderEmail,
          senderPhone,
          receiverId: profile.id,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send contact request');

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div 
        className="relative flex items-center gap-5 p-5 bg-[#0c0f1d]/75 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 w-full max-w-sm hover:-translate-y-0.5 group shadow-[inset_0_0_10px_rgba(255,255,255,0.01)]"
        style={{
          clipPath: 'polygon(0% 0%, 93% 0%, 100% 12%, 100% 100%, 7% 100%, 0% 88%)',
        }}
      >
        {/* Dynamic theme corner borders */}
        <div className="absolute top-0 right-0 w-3 h-[1px] bg-indigo-500/50 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 w-3 h-[1px] bg-indigo-500/50 pointer-events-none" aria-hidden="true" />

        {/* Portrait Box */}
        <div 
          className="w-16 h-16 shrink-0 border border border-white/15 bg-black/40 overflow-hidden relative"
          style={{
            clipPath: 'polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)',
          }}
        >
          {!profile.image || imgError ? (
            <FallbackAvatar />
          ) : (
            <Image
              src={profile.image}
              alt={profile.name}
              fill
              sizes="64px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Details Box */}
        <div className="flex flex-col flex-grow min-w-0 justify-center">
          
          {/* Name & Batch */}
          <div className="flex items-baseline justify-between gap-2 w-full mb-1">
            <h3 className="font-tt-lakes text-sm sm:text-base font-bold text-[#BEF3DF] group-hover:text-white transition-colors truncate">
              {profile.name}
            </h3>
            <span className="text-[9px] font-mono font-bold tracking-wider text-indigo-400 border border-indigo-400/30 px-1.5 py-0.5 bg-indigo-400/5 shrink-0 uppercase">
              {profile.batch}
            </span>
          </div>

          {/* Designation / Company */}
          {(profile.designation || profile.company) ? (
            <p className="font-tt-lakes text-[11px] sm:text-xs text-gray-400 leading-tight truncate mb-2">
              {profile.designation ? profile.designation : 'Alumni'}
              {profile.company && <span className="text-gray-500"> @ {profile.company}</span>}
            </p>
          ) : (
            <p className="font-tt-lakes text-[11px] sm:text-xs text-gray-500 leading-tight mb-2">
              JU IT Alumni Member
            </p>
          )}

          {/* Email & Phone */}
          <div className="flex flex-col gap-1 mt-1 mb-2 text-[10px] font-mono text-[#BEF3DF]/70">
            <div className="flex items-center gap-2">
              <span className="opacity-50">MAIL_</span>
              <span className={profile.isVerified ? "text-[#BEF3DF]" : "text-gray-400"}>
                {profile.email || "NO_DATA"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="opacity-50">COMM_</span>
              <span className={profile.isVerified ? "text-[#BEF3DF]" : "text-gray-400"}>
                {profile.phone || "NO_DATA"}
              </span>
            </div>
          </div>

          {/* Links & Actions */}
          <div className="flex items-center gap-4 mt-1">
            {profile.linkedin && profile.linkedin !== '#' && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${profile.name}'s LinkedIn profile`}
                className="text-[10px] font-mono font-extrabold tracking-widest text-[#64ffda] hover:text-white transition-colors duration-300 flex items-center gap-1.5"
              >
                <span>CONNECT</span>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.015-.51.09-.69.2-.5.65-1 1.41-1 1 0 1.39.75 1.39 1.86v4.5h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.13H5.2v8.37H8z" />
                </svg>
              </a>
            )}
            
            <button 
              className="text-[10px] font-mono font-extrabold tracking-widest bg-white/5 hover:bg-[#BEF3DF] hover:text-black text-white px-2 py-1 transition-colors duration-300 border border-white/10 hover:border-[#BEF3DF]"
              onClick={handleOpenContactModal}
            >
              PING_ALUMNI
            </button>
          </div>
        </div>
      </div>

      {/* Secure Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm font-mono">
          <div 
            className="w-full max-w-md bg-[#070707] border border-[#BEF3DF]/30 p-8 shadow-[0_0_30px_rgba(190,243,223,0.15)] relative"
            style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)' }}
          >
            <div className="absolute top-0 right-0 w-4 h-[2px] bg-[#BEF3DF]" />
            <div className="absolute bottom-0 left-0 w-4 h-[2px] bg-[#BEF3DF]" />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-[#BEF3DF]" />
                <h2 className="text-sm font-bold text-[#BEF3DF] uppercase tracking-widest">
                  Secure Connect Request
                </h2>
              </div>
              <button 
                onClick={() => setShowContactModal(false)} 
                className="text-gray-400 hover:text-[#BEF3DF] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {success ? (
              <div className="space-y-4 py-4 text-center">
                <div className="mx-auto w-12 h-12 rounded-full border-2 border-[#BEF3DF] flex items-center justify-center text-[#BEF3DF] animate-pulse">
                  <Check size={24} />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Request Sent Successfully!
                </h3>
                <p className="text-gray-400 text-xs uppercase tracking-wide leading-relaxed">
                  Your message has been queued. The administrator will forward your connection details to {profile.name} securely.
                </p>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="w-full mt-4 bg-[#BEF3DF] text-black font-bold text-xs uppercase py-2.5 hover:bg-white transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <p className="text-gray-400 uppercase tracking-wider text-[10px] mb-2 leading-relaxed">
                  You are sending a connection request to <span className="text-white font-bold">{profile.name}</span>. Your contact details will be shared securely.
                </p>

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 uppercase tracking-wide">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-[#BEF3DF]/70 mb-1 uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-[#BEF3DF]"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-[#BEF3DF]/70 mb-1 uppercase tracking-wider">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-[#BEF3DF]"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-[#BEF3DF]/70 mb-1 uppercase tracking-wider">Your Phone (Optional)</label>
                  <input
                    type="text"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-[#BEF3DF]"
                    placeholder="Enter your contact number"
                  />
                </div>

                <div>
                  <label className="block text-[#BEF3DF]/70 mb-1 uppercase tracking-wider">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-[#BEF3DF] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-[#BEF3DF] disabled:opacity-50 text-black font-bold text-xs uppercase py-3 hover:bg-white transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={12} />
                  {loading ? 'Sending Request...' : 'Send Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AlumniCard;
