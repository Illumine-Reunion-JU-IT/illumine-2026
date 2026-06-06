'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AlumniProfile } from '@/types/alumni';
import { useSession } from 'next-auth/react';
import { X, Mail, Phone, MessageSquare, Send, Check, MapPin, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export interface AlumniCardProps {
  profile: AlumniProfile;
  index?: number;
}

const FallbackAvatar: React.FC = () => (
  <div 
    className="w-full h-full bg-gradient-to-br from-[#121626] to-[#0a0d18] flex items-center justify-center relative shadow-inner"
    aria-hidden="true"
  >
    <svg 
      className="w-10 h-10 opacity-30 text-[#BEF3DF] drop-shadow-[0_0_10px_rgba(190,243,223,0.5)]" 
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

export const AlumniCard: React.FC<AlumniCardProps> = ({ profile, index = 0 }) => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <motion.div 
        variants={cardVariants}
        whileHover={{ scale: 1.02, translateY: -4 }}
        className="relative flex flex-col w-full max-w-sm bg-[#0c0f1d]/60 backdrop-blur-md border border-white/10 hover:border-[#BEF3DF]/40 transition-all duration-300 group shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(190,243,223,0.15)] rounded-2xl overflow-hidden"
      >
        {/* Dynamic theme corner borders */}
        <div className="absolute top-0 right-0 w-20 h-[1px] bg-gradient-to-l from-[#BEF3DF]/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 w-20 h-[1px] bg-gradient-to-r from-[#7B61FF]/80 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="p-5 flex items-start gap-4">
          {/* Avatar Ring */}
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#BEF3DF] to-[#7B61FF] rounded-full blur-[10px] opacity-20 group-hover:opacity-60 transition-opacity duration-500" />
            <div className="w-16 h-16 rounded-full border-2 border-white/10 group-hover:border-[#BEF3DF]/50 bg-black/40 overflow-hidden relative z-10 transition-colors duration-300">
              {!profile.image || imgError ? (
                <FallbackAvatar />
              ) : (
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
            
            {profile.isVerified && (
              <div className="absolute -bottom-1 -right-1 z-20 bg-[#BEF3DF] text-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0c0f1d] shadow-[0_0_10px_rgba(190,243,223,0.5)]" title="Verified Alumni">
                <Check size={12} strokeWidth={3} />
              </div>
            )}
          </div>

          {/* Core Info */}
          <div className="flex flex-col flex-grow min-w-0 justify-center">
            <div className="flex items-start justify-between gap-2 w-full mb-1">
              <h3 className="font-tt-lakes text-base sm:text-lg font-bold text-[#f5f5f5] group-hover:text-[#BEF3DF] transition-colors truncate drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]">
                {profile.name}
              </h3>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#7B61FF] bg-[#7B61FF]/10 border border-[#7B61FF]/30 px-2 py-0.5 rounded-full shrink-0 uppercase whitespace-nowrap shadow-[0_0_10px_rgba(123,97,255,0.1)]">
                {profile.batch}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-400 leading-tight truncate mt-1">
              <Briefcase size={12} className="text-gray-500 shrink-0" />
              <p className="truncate">
                <span className="text-gray-300">{profile.designation ? profile.designation : 'Alumni'}</span>
                {profile.company && <span className="text-gray-500"> @ <span className="text-gray-400 font-medium">{profile.company}</span></span>}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent my-1" />

        {/* Contact Info Footer */}
        <div className="p-4 bg-black/20 flex flex-col gap-3">
          <div className="flex flex-col gap-2 text-[11px] font-mono text-gray-400">
            <div className="flex items-center gap-2.5 group/item bg-white/5 px-3 py-2.5 rounded-lg border border-white/5 hover:border-[#BEF3DF]/30 hover:bg-[#BEF3DF]/5 transition-all duration-300">
              <div className="bg-black/40 p-1.5 rounded-md text-gray-500 group-hover/item:text-[#BEF3DF] transition-colors shrink-0 shadow-inner">
                <Mail size={12} />
              </div>
              <span className="truncate group-hover/item:text-gray-200 transition-colors flex-1 text-[11px] sm:text-xs tracking-wide">
                {profile.email ? profile.email : <span className="text-gray-600 italic text-[10px] uppercase tracking-widest">No email</span>}
              </span>
            </div>
            <div className="flex items-center gap-2.5 group/item bg-white/5 px-3 py-2.5 rounded-lg border border-white/5 hover:border-[#BEF3DF]/30 hover:bg-[#BEF3DF]/5 transition-all duration-300">
              <div className="bg-black/40 p-1.5 rounded-md text-gray-500 group-hover/item:text-[#BEF3DF] transition-colors shrink-0 shadow-inner">
                <Phone size={12} />
              </div>
              <span className="truncate group-hover/item:text-gray-200 transition-colors flex-1 text-[11px] sm:text-xs tracking-wide">
                {profile.phone ? profile.phone : <span className="text-gray-600 italic text-[10px] uppercase tracking-widest">No phone</span>}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-2 pt-3 border-t border-white/5">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenContactModal}
              className="flex-1 bg-[#BEF3DF]/10 hover:bg-[#BEF3DF] text-[#BEF3DF] hover:text-black font-mono font-bold text-[10px] tracking-widest uppercase py-2 rounded-lg transition-all duration-300 border border-[#BEF3DF]/20 hover:border-[#BEF3DF] shadow-[0_0_10px_rgba(190,243,223,0.05)] hover:shadow-[0_0_15px_rgba(190,243,223,0.3)] flex items-center justify-center gap-2"
            >
              <Send size={12} /> Connect
            </motion.button>

            {profile.linkedin && profile.linkedin !== '#' && (
              <motion.a
                whileTap={{ scale: 0.95 }}
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#0077b5]/10 hover:bg-[#0077b5] text-[#0077b5] hover:text-white transition-all duration-300 border border-[#0077b5]/30 hover:border-[#0077b5] shadow-[0_0_10px_rgba(0,119,181,0.1)] hover:shadow-[0_0_15px_rgba(0,119,181,0.4)]"
                aria-label={`Visit ${profile.name}'s LinkedIn profile`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.015-.51.09-.69.2-.5.65-1 1.41-1 1 0 1.39.75 1.39 1.86v4.5h2.8M6.5 8.37a1.37 1.37 0 1 0 0-2.75 1.37 1.37 0 0 0 0 2.75M8 18.5V10.13H5.2v8.37H8z" /></svg>
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Secure Contact Modal (Remains untouched logically, just stylized) */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg font-mono">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-[#070707]/90 border border-[#BEF3DF]/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(190,243,223,0.1)] relative overflow-hidden"
          >
            {/* Modal Ambient Glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#BEF3DF]/20 rounded-full blur-[50px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#7B61FF]/20 rounded-full blur-[50px] pointer-events-none" />

            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#BEF3DF]/10 flex items-center justify-center border border-[#BEF3DF]/30 text-[#BEF3DF]">
                  <MessageSquare size={14} />
                </div>
                <h2 className="text-sm font-bold text-[#BEF3DF] uppercase tracking-widest">
                  Connect Securely
                </h2>
              </div>
              <button 
                onClick={() => setShowContactModal(false)} 
                className="text-gray-400 hover:text-white transition-colors w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>

            {success ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="space-y-4 py-8 text-center relative z-10"
              >
                <div className="mx-auto w-16 h-16 rounded-full border-2 border-[#BEF3DF] flex items-center justify-center text-[#BEF3DF] shadow-[0_0_20px_rgba(190,243,223,0.3)]">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <Check size={32} />
                  </motion.div>
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-widest mt-6">
                  Message Dispatched
                </h3>
                <p className="text-gray-400 text-xs tracking-wider leading-relaxed">
                  Your request is queued. Administrators will securely relay your connection details to <span className="text-[#BEF3DF]">{profile.name}</span>.
                </p>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="w-full mt-6 bg-[#BEF3DF] text-black font-bold text-xs uppercase py-3 rounded-lg hover:bg-white transition-colors shadow-[0_0_15px_rgba(190,243,223,0.3)]"
                >
                  Close Window
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs relative z-10">
                <p className="text-gray-400 uppercase tracking-wider text-[10px] mb-4 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/10">
                  Requesting connection with <span className="text-[#BEF3DF] font-bold">{profile.name}</span>. Your details will be shared securely.
                </p>

                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 uppercase tracking-wide">
                    {error}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-gray-400 text-[10px] mb-1.5 uppercase tracking-widest font-bold">Your Name</label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#BEF3DF] focus:ring-1 focus:ring-[#BEF3DF]/50 transition-all placeholder-gray-600"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-[10px] mb-1.5 uppercase tracking-widest font-bold">Your Email</label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#BEF3DF] focus:ring-1 focus:ring-[#BEF3DF]/50 transition-all placeholder-gray-600"
                      placeholder="e.g. john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-[10px] mb-1.5 uppercase tracking-widest font-bold">Your Phone <span className="text-gray-600">(Optional)</span></label>
                    <input
                      type="text"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#BEF3DF] focus:ring-1 focus:ring-[#BEF3DF]/50 transition-all placeholder-gray-600"
                      placeholder="e.g. +91 9876543210"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-[10px] mb-1.5 uppercase tracking-widest font-bold">Message</label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-[#BEF3DF] focus:ring-1 focus:ring-[#BEF3DF]/50 transition-all resize-none placeholder-gray-600"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-[#BEF3DF] disabled:opacity-50 text-black font-bold text-xs uppercase py-3 rounded-lg hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(190,243,223,0.2)] hover:shadow-[0_0_25px_rgba(190,243,223,0.4)]"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <Send size={14} />
                  )}
                  {loading ? 'Transmitting...' : 'Dispatch Message'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default AlumniCard;
