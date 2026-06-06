import { Metadata } from 'next';
import React from 'react';
import { getAlumni } from '@/data/alumniData';
import AlumniHero from '@/components/alumni/AlumniHero';
import AlumniList from '@/components/alumni/AlumniList';
import ComingSoon from '@/components/ui/ComingSoon';

export const metadata: Metadata = {
  title: 'Alumni Directory | Illumine 2026',
  description: 'Explore and reconnect with the distinguished graduates of Jadavpur University Department of Information Technology.',
  openGraph: {
    title: 'Alumni Directory | Illumine 2026',
    description: 'Explore and reconnect with the distinguished graduates of Jadavpur University Department of Information Technology.',
    url: 'https://illumine-reunion-ju-it.vercel.app/alumni',
    type: 'website',
    images: [
      {
        url: '/photos/Hero/logo.jpeg',
        width: 800,
        height: 800,
        alt: 'ILLUMINE 2026 Alumni Registry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alumni Directory | Illumine 2026',
    description: 'Explore and reconnect with the distinguished graduates of Jadavpur University Department of Information Technology.',
  },
};

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';
import { AlumniProfile } from '@/types/alumni';

function maskEmail(email: string) {
  if (!email || email.toLowerCase().startsWith('no-email')) return '';
  const [local, domain] = email.split('@');
  if (!domain) return email;
  return `${local.substring(0, Math.min(5, local.length))}*****@${domain}`;
}

function maskPhone(phone: string) {
  if (!phone || phone.toLowerCase().startsWith('no-phone')) return '';
  return `${phone.substring(0, 5)}*****`;
}

export default async function AlumniPage() {
  const session = await getServerSession(authOptions);
  const isVerified = !!session?.user;

  let allData: any[] = [];
  const step = 1000;
  const numChunks = 4; // Fetch up to 4000 records concurrently

  const promises = [];
  for (let i = 0; i < numChunks; i++) {
    const from = i * step;
    promises.push(
      supabaseAdmin
        .from('users')
        .select('id, name, batch, department, company, email, phone, linkedin')
        .eq('role', 'internal')
        .order('batch', { ascending: false })
        .range(from, from + step - 1)
    );
  }

  const results = await Promise.all(promises);
  for (const { data, error } of results) {
    if (error) {
      console.error('Error fetching alumni:', error);
    } else if (data) {
      allData = [...allData, ...data];
    }
  }

  let profiles: AlumniProfile[] = [];

  if (allData.length > 0) {
    profiles = allData.map((user: any) => {
      // Fix IT 2015 -> IT 15 formatting
      let formattedBatch = user.batch || '';
      if (/^IT 20(\d{2})$/i.test(formattedBatch)) {
        formattedBatch = formattedBatch.replace(/^IT 20(\d{2})$/i, 'IT $1');
      }

      // Hide "Not Specified"
      const company = user.company === 'Not Specified' ? '' : user.company;

      const emailVal = user.email || '';
      const emailToUse = isVerified ? (emailVal.toLowerCase().startsWith('no-email') ? '' : emailVal) : maskEmail(emailVal);
      
      const phoneVal = user.phone || '';
      const phoneToUse = isVerified ? (phoneVal.toLowerCase().startsWith('no-phone') ? '' : phoneVal) : maskPhone(phoneVal);

      return {
        id: user.id,
        name: user.name,
        batch: formattedBatch.toUpperCase(),
        department: user.department,
        company: company,
        designation: 'Alumni',
        email: emailToUse,
        phone: phoneToUse,
        linkedin: user.linkedin || '#',
        image: '/default-avatar.png',
        isVerified: true
      };
    });

    profiles.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }

  return (
    <main className="relative min-h-screen bg-[#070707] text-[#d9fff6] pt-28 pb-20 overflow-hidden font-tt-lakes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-6">
        <AlumniHero />
        {!isVerified && (
          <div className="bg-[#BEF3DF]/10 border border-[#BEF3DF]/30 p-4 text-sm text-[#BEF3DF] tracking-wider uppercase mb-6 flex items-center justify-between">
            <span>Viewing as External Visitor. Contact details are masked.</span>
            <a href="/login" className="bg-[#BEF3DF] text-black px-4 py-2 font-bold hover:bg-white transition-colors">
              Verify Access
            </a>
          </div>
        )}
        <AlumniList profiles={profiles} />
      </div>
    </main>
  );
}
