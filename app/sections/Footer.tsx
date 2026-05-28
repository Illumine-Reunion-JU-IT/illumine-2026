"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
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
      "service_yo2rfuq",
      "template_pibz4hd",
      {
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      },
      "uUr1Tvfn4EpmPNeZi"
    );

    alert("Message sent successfully!");

    // Reset form
    setFormData({
      name: "",
      company: "",
      phone: "",
      subject: "",
      message: "",
    });
  } catch (error) {
    console.log(error);

    alert("Failed to send message.");
  }
};

  return (
    <footer className="bg-white text-black border-t border-black py-20 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* LEFT SECTION */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic">
                Contact Us
              </h2>

              <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                Reconnect with old memories, cherished friendships, and the
                spirit of our department at ILLUMINE. Join us as we celebrate
                the journey, achievements, and bonds that continue to inspire
                generations.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* LOCATION */}
              <div className="flex gap-4 group">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                  📍
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm uppercase tracking-wide">
                    Located At
                  </span>

                  <a
                    href="https://maps.google.com/?q=Jadavpur+University+Salt+Lake+Campus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-black transition-colors underline underline-offset-2"
                  >
                    Jadavpur University, Salt Lake Campus, Kolkata, West Bengal
                    700105, India
                  </a>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex gap-4 group">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                  @
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm uppercase tracking-wide">
                    Email Us
                  </span>

                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=illumine.reunion.ju.it@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-black transition-colors underline underline-offset-2"
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
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs">
                  in
                </div>

                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm uppercase tracking-wide group-hover:underline">
                    Follow Us on LinkedIn
                  </span>

                  <span className="text-sm text-gray-600">
                    Jadavpur University - Information Technology Department
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="bg-gray-100/50 p-8 rounded-3xl flex flex-col gap-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic">
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
            >
              {/* NAME */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Name *
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-300/50 border border-gray-300 rounded-sm outline-none focus:bg-gray-300 transition-colors text-sm"
                />
              </div>

              {/* COMPANY */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Company's Name
                </label>

                <input
                  type="text"
                  name="company"
                  placeholder="Company's Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-300/50 border border-gray-300 rounded-sm outline-none focus:bg-gray-300 transition-colors text-sm"
                />
              </div>

              {/* PHONE */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Phone *
                </label>

                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-300/50 border border-gray-300 rounded-sm outline-none focus:bg-gray-300 transition-colors text-sm"
                />
              </div>

              {/* SUBJECT */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Subject *
                </label>

                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-300/50 border border-gray-300 rounded-sm outline-none focus:bg-gray-300 transition-colors text-sm"
                />
              </div>

              {/* MESSAGE */}
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-xs font-bold uppercase text-gray-700">
                  Message *
                </label>

                <textarea
                  rows={5}
                  name="message"
                  required
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-300/50 border border-gray-300 rounded-sm outline-none focus:bg-gray-300 transition-colors text-sm resize-none"
                />
              </div>

              {/* BUTTON */}
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
      </div>
    </footer>
  );
}