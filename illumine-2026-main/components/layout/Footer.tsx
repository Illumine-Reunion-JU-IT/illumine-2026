import React from 'react';
import localFont from 'next/font/local';

// Removed Plus and GlitchLogo, kept the others
import TerminalText from '../ui/TerminalText';
import SmallCircle from '../ui/SmallCircle';

// Restored Mechsuit font
const mechsuit = localFont({ 
  src: '../../public/fonts/Mechsuit.otf',
  display: 'swap',
});

const ttLakes = localFont({
  src: [
    { path: '../../public/fonts/TT-Lakes-Neue-Trial-Regular.ttf', weight: '400' },
    { path: '../../public/fonts/TT-Lakes-Neue-Trial-Medium.ttf', weight: '500' },
  ],
  display: 'swap',
});

const Footer = () => {
  return (
    <footer id="footer" className={`relative w-full bg-black/60 backdrop-blur-xl text-white border-t border-white/10 overflow-hidden ${ttLakes.className}`}>
      
      {/* Subtle top gradient fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/30 to-black/80 pointer-events-none -z-10"></div>

      {/* Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Column 1: System Identity */}
        <div className="flex flex-col space-y-4 border-b border-white/10 pb-6 md:border-b-0 md:pb-0 lg:border-r lg:border-white/5 lg:pr-4">
          
          {/* Restored pure text logo with Mechsuit */}
          <h2 className={`text-3xl sm:text-2xl tracking-wider text-[#FFFFFF] ${mechsuit.className}`}>
            ILLUMINE
          </h2>
          
          <div className="text-[#888888] text-xs tracking-widest uppercase flex flex-col space-y-1">
            <span>NODE: IT DEPT</span>
            <span>JADAVPUR UNIVERSITY</span>
            <span>FLAG: SILVER JUBILEE</span>
          </div>
          <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-white/5 w-fit">
            
            {/* Status dot using <SmallCircle /> */}
            <div className="animate-pulse text-[#7B61FF] flex items-center justify-center w-3 h-3">
              <SmallCircle /> 
            </div>
            
            <span className="text-[#7B61FF] text-xs tracking-widest uppercase">SYS_STATUS: ONLINE</span>
          </div>
        </div>

        {/* Column 2: Directory */}
        <div className="flex flex-col space-y-4 border-b border-white/10 pb-6 md:border-b-0 md:pb-0 lg:border-r lg:border-white/5 lg:px-4">
          
          <TerminalText 
            text=">> /root/nav_links"
            className="!relative !block !text-[#555555] tracking-widest uppercase"
          />
          
          <ul className="flex flex-col space-y-2 text-sm text-[#CCCCCC]">
            <li><a href="/" className="hover:text-[#7B61FF] transition-colors duration-300 flex items-center gap-2"><span className="text-[#555555]">[ ]</span> Home</a></li>
            <li><a href="/about" className="hover:text-[#7B61FF] transition-colors duration-300 flex items-center gap-2"><span className="text-[#555555]">[ ]</span> About</a></li>
            <li><a href="/" className="hover:text-[#7B61FF] transition-colors duration-300 flex items-center gap-2"><span className="text-[#555555]">[ ]</span> Events</a></li>
            <li><a href="/alumni" className="hover:text-[#7B61FF] transition-colors duration-300 flex items-center gap-2"><span className="text-[#555555]">[ ]</span> Alumni</a></li>
            <li><a href="/magazine" className="hover:text-[#7B61FF] transition-colors duration-300 flex items-center gap-2"><span className="text-[#555555]">[ ]</span> Magazine</a></li>
          </ul>
        </div>

        {/* Column 3: Comm-Link */}
        <div className="flex flex-col space-y-4 border-b border-white/10 pb-6 md:border-b-0 md:pb-0 lg:border-r lg:border-white/5 lg:px-4">
          
          <TerminalText 
            text=">> /network/comm_link"
            className="!relative !block !text-[#555555] tracking-widest uppercase"
          />
          
          <div className="flex flex-col space-y-2 text-sm text-[#CCCCCC] font-light">
            <p className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[#555555]">LOC:</span> <span className="text-right">Jadavpur University</span>
            </p>
            <p className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[#555555]">CAMPUS:</span> <span className="text-right">Salt Lake Campus</span>
            </p>
            <p className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-[#555555]">TGT:</span> <span className="text-right">Dec 2026</span>
            </p>
          </div>
        </div>

        {/* Column 4: Social Protocols */}
        <div className="flex flex-col space-y-4 lg:px-4">
          
          <TerminalText 
            text=">> /social_protocols"
            className="!relative !block !text-[#555555] tracking-widest uppercase"
          />
          
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-[#CCCCCC]">
            <a href="https://www.instagram.com/illumine_ju_it?igsh=MXczemN2azl0eTRpNQ==" className="hover:text-[#7B61FF] hover:border-[#7B61FF] border border-[#333333] px-3 py-2 transition-all duration-300 w-[calc(50%-6px)] sm:w-auto text-center flex-grow">INSTAGRAM</a>
            <a href="https://www.facebook.com/share/g/1KdTjTvRDw/" className="hover:text-[#7B61FF] hover:border-[#7B61FF] border border-[#333333] px-3 py-2 transition-all duration-300 w-[calc(50%-6px)] sm:w-auto text-center flex-grow">FACEBOOK</a>
            <a href="mailto:illumine.reunion.ju.it@gmail.com" className="hover:text-[#7B61FF] hover:border-[#7B61FF] border border-[#333333] px-3 py-2 transition-all duration-300 w-[calc(50%-6px)] sm:w-auto text-center flex-grow">MAIL</a>
            <a href="https://www.linkedin.com/in/ju-it" className="hover:text-[#7B61FF] hover:border-[#7B61FF] border border-[#333333] px-3 py-2 transition-all duration-300 w-[calc(50%-6px)] sm:w-auto text-center flex-grow">LINKEDIN</a>
          </div>
        </div>

      </div>

      {/* Bottom Sign-off */}
      <div className="border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row justify-between items-center text-[10px] sm:text-xs tracking-widest text-[#555555] gap-4 lg:gap-0">
          <p className="text-center lg:text-left uppercase leading-relaxed">
            Copyright © Illumine 2026 OC<br className="lg:hidden" />
            <span className="hidden lg:inline">, </span>
            Department of Information Technology, Jadavpur University
          </p>
          <p className="flex items-center gap-2">
            EXECUTION: TECH TEAM <span className="inline-block w-1 h-3 bg-[#7B61FF] animate-pulse"></span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;