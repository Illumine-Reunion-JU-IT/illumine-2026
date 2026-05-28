"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-white text-black border-t border-black py-20 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        {/* Top Section: High-Fidelity Contact & Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: CONTACT US */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
                Contact Us
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                If you're working on a product, brand, or startup and need
                reliable design support, feel free to get in touch. I'm open to
                discussing projects, ongoing design support, and potential
                collaborations.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Contact Item: Location */}
              <div className="flex gap-4 group">
                <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 flex items-center justify-center text-white">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.238l-.01.018c-.02.02-1.703.98-3.43 1.415a1 1 0 11-1.43-1.415l.01-.018a1 1 0 011.43 0l.01.018c.14.04.28.08.42.12.14.04.28.08.42.12a1 1 0 011.43 1.415l.01.018c.02.02 1.703-.98 3.43-1.415a1 1 0 11-1.43 1.415l-.01.018z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l-2-2m0 0l-2 2m2-2v6m0 0l2-2m0 0l2 2"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm uppercase tracking-wide">
                    Located At
                  </span>
                  <span className="text-sm text-gray-600">
                    Kolkata, West Bengal, India
                  </span>
                </div>
              </div>

              {/* Contact Item: Email */}
              <div className="flex gap-4 group">
                <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 flex items-center justify-center text-white">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm uppercase tracking-wide">
                    Email Me
                  </span>
                  <a
                    href="mailto:dipramb9090@gmail.com"
                    className="text-sm text-gray-600 hover:text-black transition-colors underline underline-offset-2"
                  >
                    dipramb9090@gmail.com
                  </a>
                </div>
              </div>

              {/* Contact Item: Phone */}
              <div className="flex gap-4 group">
                <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 flex items-center justify-center text-white">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.506 1.21l-2.257.513a11.042 11.042 0 006.113 6.113l.512-2.257a1 1 0 011.21-.506l4.493-1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-3.28a1 1 0 01-.948-.684l-1.498-4.493a1 1 0 01.506-1.21l2.257-.513a11.042 11.042 0 00-6.113-6.113l-.512 2.257a1 1 0 01-1.21.506l-4.493 1.498a1 1 0 01-.684-.948V5z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm uppercase tracking-wide">
                    Call Me
                  </span>
                  <span className="text-sm text-gray-600">
                    +91 923 269 6735
                  </span>
                </div>
              </div>

              {/* Contact Item: LinkedIn */}
              <div className="flex gap-4 group">
                <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                  in
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm uppercase tracking-wide">
                    Follow me on Linkedin
                  </span>
                  <span className="text-sm text-gray-600">Dipram Biswas</span>
                </div>
              </div>

              {/* Contact Item: Behance */}
              <div className="flex gap-4 group">
                <div className="w-8 h-8 rounded-full bg-black flex-shrink-0 flex items-center justify-center text-white font-bold text-xs">
                  Bē
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm uppercase tracking-wide">
                    Visit My Profile
                  </span>
                  <a
                    href="https://www.behance.net/diprambiswas9090"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-black transition-colors underline underline-offset-2"
                  >
                    www.behance.net/diprambiswas9090
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: SEND A MESSAGE */}
          <div className="bg-gray-100/50 p-8 rounded-3xl flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">
              Send a Message
            </h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Name */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 bg-gray-300/50 border border-gray-300 rounded-sm outline-none focus:bg-gray-300 transition-colors text-sm"
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Company's name
                </label>
                <input
                  type="text"
                  placeholder="Company's name"
                  className="w-full px-4 py-2 bg-gray-300/50 border border-gray-300 rounded-sm outline-none focus:bg-gray-300 transition-colors text-sm"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Phone *
                </label>
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-2 bg-gray-300/50 border border-gray-300 rounded-sm outline-none focus:bg-gray-300 transition-colors text-sm"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Email ID *
                </label>
                <input
                  type="email"
                  placeholder="Email ID"
                  className="w-full px-4 py-2 bg-gray-300/50 border border-gray-300 rounded-sm outline-none focus:bg-gray-300 transition-colors text-sm"
                />
              </div>

              {/* Subject - Full Width */}
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Subject *
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-2 bg-gray-300/50 border border-gray-300 rounded-sm outline-none focus:bg-gray-300 transition-colors text-sm"
                />
              </div>

              {/* Message - Full Width */}
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter your message"
                  className="w-full px-4 py-2 bg-gray-300/50 border border-gray-300 rounded-sm outline-none focus:bg-gray-300 transition-colors text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center md:col-span-2 mt-4">
                <button
                  type="submit"
                  className="px-12 py-3 bg-gray-600 text-white font-bold rounded-full hover:bg-gray-700 transition-all active:scale-95 uppercase tracking-widest text-xs"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section: Traditional Footer Layout */}
        <div className="border-t border-black pt-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="bg-gray-300 px-8 py-3 inline-block font-bold text-2xl uppercase w-fit">
              LOGO
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm uppercase tracking-wide">
                About Me
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed max-w-xs">
                Designing product interfaces, brand systems, and visual
                communication—focused on clarity, consistency, and long-term
                usability.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-sm uppercase tracking-wide">
                Follow Me
              </h4>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="w-8 h-8 bg-black rounded-sm flex items-center justify-center text-white font-bold text-xs hover:bg-gray-800 transition-colors"
                >
                  in
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-black rounded-sm flex items-center justify-center text-white font-bold text-xs hover:bg-gray-800 transition-colors"
                >
                  Bē
                </a>
              </div>
            </div>
          </div>

          {/* Services Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-2">
              Services
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                "Product Interface Design",
                "Brand & Visual Systems",
                "Marketing & Growth Creatives",
                "End-to-End Design Support",
                "Engagement Model",
              ].map((item) => (
                <li
                  key={item}
                  className="text-xs text-gray-600 hover:text-black cursor-pointer transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Works Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-2">
              Works
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                "Product Interface Design",
                "Brand & Visual Systems",
                "Marketing & Growth Creatives",
                "End-to-End Design Support",
                "Engagement Model",
              ].map((item) => (
                <li
                  key={item}
                  className="text-xs text-gray-600 hover:text-black cursor-pointer transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Mini Contact Column */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold uppercase tracking-wide border-b border-black pb-2">
              Contact Me
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-[10px]">📞</span> +91 923 269 6735
              </li>
              <li className="flex items-center gap-2 text-xs text-gray-600">
                <span className="text-[10px]">✉️</span> dipramb9090@gmail.com
              </li>
            </ul>

            {/* Minimal Quick Message */}
            <div className="mt-6 relative flex items-center">
              <input
                type="text"
                placeholder="Enter your message"
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-xs outline-none focus:ring-1 focus:ring-black transition-all"
              />
              <div className="absolute right-1 top-1 bottom-1 w-7 h-7 bg-black rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
