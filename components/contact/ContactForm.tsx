'use client';

import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { buttonClipPath } from '@/data/Paths/heroPaths';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await emailjs.send(
        'service_yo2rfuq',
        'template_pibz4hd',
        {
          name: formData.name,
          company: formData.company,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        'uUr1Tvfn4EpmPNeZi'
      );

      alert('Message sent successfully!');

      // Reset form
      setFormData({
        name: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.log(error);
      alert('Failed to send message.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full text-[#d9fff6] font-tt-lakes">
      
      {/* ── LEFT SECTION: INFORMATION ── */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl font-mechsuit tracking-wider uppercase text-[#B6BBFF] drop-shadow-[0_0_10px_rgba(182,187,255,0.3)]">
            Contact Us
          </h2>

          <p className="text-sm text-[#B6BBFF]/80 leading-relaxed max-w-md">
            Reconnect with old memories, cherished friendships, and the
            spirit of our department at ILLUMINE. Join us as we celebrate
            the journey, achievements, and bonds that continue to inspire
            generations.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* LOCATION */}
          <div className="flex gap-4 group">
            <div className="w-10 h-10 border border-[#bef3df]/30 bg-[#bef3df]/5 flex items-center justify-center text-[#bef3df] shrink-0 font-tt-lakes shadow-[0_0_10px_rgba(190,243,223,0.1)]" aria-hidden="true">
              📍
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-bold text-xs uppercase tracking-widest text-[#bef3df]">
                Located At
              </span>

              <a
                href="https://maps.google.com/?q=Jadavpur+University+Salt+Lake+Campus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#B6BBFF]/75 hover:text-[#bef3df] transition-colors underline underline-offset-4 decoration-[#bef3df]/20"
              >
                Jadavpur University, Salt Lake Campus, Kolkata, West Bengal
                700105, India
              </a>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex gap-4 group">
            <div className="w-10 h-10 border border-[#bef3df]/30 bg-[#bef3df]/5 flex items-center justify-center text-[#bef3df] shrink-0 font-tt-lakes shadow-[0_0_10px_rgba(190,243,223,0.1)]" aria-hidden="true">
              @
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-bold text-xs uppercase tracking-widest text-[#bef3df]">
                Email Us
              </span>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=illumine.reunion.ju.it@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#B6BBFF]/75 hover:text-[#bef3df] transition-colors underline underline-offset-4 decoration-[#bef3df]/20"
              >
                illumine.reunion.ju.it@gmail.com
              </a>
            </div>
          </div>

          {/* LINKEDIN */}
          <a
            href="https://www.linkedin.com/in/ju-it"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-4 group"
          >
            <div className="w-10 h-10 border border-[#bef3df]/30 bg-[#bef3df]/5 flex items-center justify-center text-[#bef3df] shrink-0 font-tt-lakes shadow-[0_0_10px_rgba(190,243,223,0.1)]" aria-hidden="true">
              in
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-bold text-xs uppercase tracking-widest text-[#bef3df] group-hover:underline">
                Follow Us on LinkedIn
              </span>

              <span className="text-sm text-[#B6BBFF]/60">
                Jadavpur University - Information Technology Department
              </span>
            </div>
          </a>
        </div>
      </div>

      {/* ── RIGHT SECTION: FORM ── */}
      <div className="bg-[#0c0f1d]/50 backdrop-blur-md p-8 rounded-none flex flex-col gap-8 w-full border border-[#6265fe]/30 relative overflow-hidden shadow-[inset_0_0_20px_rgba(98,101,254,0.05),0_0_20px_rgba(0,0,0,0.3)]">
        {/* HUD Corner Tech Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#bef3df]/50" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#bef3df]/50" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#bef3df]/50" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#bef3df]/50" />

        <h2 className="text-2xl md:text-3xl font-mechsuit tracking-wider uppercase text-[#bef3df] drop-shadow-[0_0_10px_rgba(190,243,223,0.2)]">
          Send a Message
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
        >
          {/* NAME */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6265fe]">
              Name *
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-[#6265fe]/30 rounded-none outline-none focus:border-[#bef3df]/80 focus:bg-black/60 transition-all text-sm text-[#d9fff6] placeholder-[#555555] font-tt-lakes shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* COMPANY */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6265fe]">
              Company&apos;s Name
            </label>

            <input
              type="text"
              name="company"
              placeholder="Company's Name"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-[#6265fe]/30 rounded-none outline-none focus:border-[#bef3df]/80 focus:bg-black/60 transition-all text-sm text-[#d9fff6] placeholder-[#555555] font-tt-lakes shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* PHONE */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6265fe]">
              Phone *
            </label>

            <input
              type="tel"
              name="phone"
              required
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-[#6265fe]/30 rounded-none outline-none focus:border-[#bef3df]/80 focus:bg-black/60 transition-all text-sm text-[#d9fff6] placeholder-[#555555] font-tt-lakes shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* SUBJECT */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6265fe]">
              Subject *
            </label>

            <input
              type="text"
              name="subject"
              required
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-[#6265fe]/30 rounded-none outline-none focus:border-[#bef3df]/80 focus:bg-black/60 transition-all text-sm text-[#d9fff6] placeholder-[#555555] font-tt-lakes shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col gap-1 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#6265fe]">
              Message *
            </label>

            <textarea
              rows={5}
              name="message"
              required
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-black/40 border border-[#6265fe]/30 rounded-none outline-none focus:border-[#bef3df]/80 focus:bg-black/60 transition-all text-sm resize-none text-[#d9fff6] placeholder-[#555555] font-tt-lakes shadow-[inset_0_0_8px_rgba(0,0,0,0.5)]"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-center md:col-span-2 mt-4">
            <button
              type="submit"
              style={{ clipPath: buttonClipPath }}
              className="px-12 py-4 bg-[#6265fe] hover:bg-[#7b7efe] text-white font-tt-lakes font-bold transition-all active:scale-98 uppercase tracking-widest text-xs cursor-pointer shadow-[0_0_15px_rgba(98,101,254,0.3)] hover:shadow-[0_0_20px_rgba(123,126,254,0.5)]"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default ContactForm;
