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
  if (!email || email.startsWith('NO-EMAIL-') || email.startsWith('no-email-')) return '';
  const [local, domain] = email.split('@');
  if (!domain) return email;
  return `${local.substring(0, Math.min(5, local.length))}*****@${domain}`;
}

function maskPhone(phone: string) {
  if (!phone || phone.startsWith('NO-PHONE-')) return '';
  return `${phone.substring(0, 5)}*****`;
}

export default async function AlumniPage() {
  const session = await getServerSession(authOptions);
  const isVerified = !!session?.user;

  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('role', 'internal')
    .order('batch', { ascending: false });

  let profiles: AlumniProfile[] = [];

  if (!error && data) {
    profiles = data.map((user: any) => ({
      id: user.id,
      name: user.name,
      batch: user.batch,
      department: user.department,
      company: user.company || 'Not Specified',
      designation: 'Alumni', // Or from DB if added
      email: isVerified ? ((user.email || '').startsWith('no-email-') ? '' : user.email) : maskEmail(user.email),
      phone: isVerified ? ((user.phone || '').startsWith('NO-PHONE-') ? '' : user.phone) : maskPhone(user.phone),
      linkedin: user.linkedin || '#',
      image: '/default-avatar.png', // Fallback
      isVerified: true
    }));
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
