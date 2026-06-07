'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Phone, Building2, Send, CheckCircle2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const updateTypes = [
  { id: 'Email', icon: Mail, label: 'Email Address' },
  { id: 'Phone', icon: Phone, label: 'Phone Number' },
  { id: 'Company', icon: Building2, label: 'Company / Role' },
  { id: 'Other', icon: ShieldCheck, label: 'Other Details' }
];

export default function UpdateRecordPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    email: '',
    phone: '',
    updateType: '',
    correctDetails: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.batch)) return;
    if (step === 2 && !formData.updateType) return;
    setStep(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.correctDetails) return;
    
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/alumni/update-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Batches from IT 04 to IT 28
  const batches = Array.from({ length: 25 }, (_, i) => `IT ${String(i + 4).padStart(2, '0')}`);

  return (
    <main className="min-h-screen bg-[#070707] text-white pt-32 pb-20 overflow-hidden font-tt-lakes relative flex items-center justify-center">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-[#BEF3DF]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#7B61FF]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-2xl w-full px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#BEF3DF]/10 border border-[#BEF3DF]/30 text-[#BEF3DF] text-xs uppercase tracking-widest font-bold mb-6"
          >
            <ShieldCheck size={14} />
            Data Rectification Portal
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tight"
          >
            Update Your Legacy.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 font-mono text-sm max-w-md mx-auto"
          >
            Notice something wrong with your profile in the directory? Submit the correct details below and our admins will verify and update it.
          </motion.p>
        </div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 30 }}
          className="bg-[#0c0f1d]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Glass glare effect */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-10"
            >
              <div className="w-20 h-20 bg-[#BEF3DF]/20 rounded-full flex items-center justify-center mb-6 border border-[#BEF3DF]/30">
                <CheckCircle2 size={40} className="text-[#BEF3DF]" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Request Submitted!</h2>
              <p className="text-gray-400 font-mono text-sm mb-8 max-w-xs">
                Your profile update request has been securely sent to our admins. We will process it shortly.
              </p>
              <Link href="/alumni" className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                Return to Directory
              </Link>
            </motion.div>
          ) : (
            <div className="relative">
              {/* Progress Bar */}
              <div className="flex gap-2 mb-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step >= i ? 'bg-[#BEF3DF]' : 'bg-white/10'}`} />
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* STEP 1: Identification */}
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col gap-6"
                  >
                    <h2 className="text-xl font-bold">First, who are you?</h2>
                    
                    <div className="space-y-4 font-mono">
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BEF3DF]/50 transition-colors"
                          placeholder="Enter your registered full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Graduating Batch</label>
                        <select 
                          value={formData.batch}
                          onChange={e => setFormData({...formData, batch: e.target.value})}
                          className="w-full bg-[#0c0f1d] border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BEF3DF]/50 transition-colors appearance-none"
                        >
                          <option value="" disabled>Select your batch</option>
                          {batches.map(b => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button 
                      onClick={handleNext}
                      disabled={!formData.name || !formData.batch}
                      className="mt-4 w-full py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                    >
                      Continue <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: What needs fixing? */}
                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col gap-6"
                  >
                    <h2 className="text-xl font-bold">What needs to be updated?</h2>
                    
                    <div className="grid grid-cols-2 gap-4 font-mono">
                      {updateTypes.map(type => {
                        const Icon = type.icon;
                        const isSelected = formData.updateType === type.id;
                        return (
                          <button
                            key={type.id}
                            onClick={() => setFormData({...formData, updateType: type.id})}
                            className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-3 transition-all duration-300 ${
                              isSelected 
                                ? 'bg-[#BEF3DF]/10 border-[#BEF3DF] text-[#BEF3DF] shadow-[0_0_20px_rgba(190,243,223,0.2)]' 
                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                          >
                            <Icon size={24} />
                            <span className="text-xs uppercase tracking-wider font-bold">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex gap-4 mt-4">
                      <button 
                        onClick={() => setStep(1)}
                        className="w-1/3 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
                      >
                        Back
                      </button>
                      <button 
                        onClick={handleNext}
                        disabled={!formData.updateType}
                        className="w-2/3 py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
                      >
                        Continue <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Provide details */}
                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col gap-6"
                  >
                    <h2 className="text-xl font-bold">Provide the correct details.</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 font-mono">
                      
                      <div>
                        <label className="block text-xs text-[#BEF3DF] uppercase tracking-widest mb-2 font-bold flex items-center gap-2">
                          <CheckCircle2 size={14} /> New {formData.updateType} Details
                        </label>
                        <textarea 
                          value={formData.correctDetails}
                          onChange={e => setFormData({...formData, correctDetails: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BEF3DF]/50 transition-colors min-h-[100px] resize-none"
                          placeholder={`Please enter your correct ${formData.updateType.toLowerCase()} here...`}
                        />
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <label className="block text-xs text-gray-500 uppercase tracking-widest mb-2">Your Current Contact Email (For updates)</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#BEF3DF]/50 transition-colors"
                          placeholder="We will notify you here"
                        />
                      </div>

                      {errorMsg && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-sans">
                          {errorMsg}
                        </div>
                      )}

                      <div className="flex gap-4 mt-6">
                        <button 
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-1/3 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
                        >
                          Back
                        </button>
                        <button 
                          type="submit"
                          disabled={!formData.email || !formData.correctDetails || isSubmitting}
                          className="w-2/3 py-4 rounded-xl bg-[#BEF3DF] text-black font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white transition-colors"
                        >
                          {isSubmitting ? 'Submitting...' : (
                            <>Submit Request <Send size={16} /></>
                          )}
                        </button>
                      </div>

                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )}
        </motion.div>

      </div>
    </main>
  );
}
