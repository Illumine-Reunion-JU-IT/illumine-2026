import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({ error: 'Search query must be at least 2 characters' }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const isVerified = !!session?.user;

    const trimmedQuery = query.trim();
    let textQuery = trimmedQuery;
    let batchYear: string | null = null;

    // Matches e.g. "it 28", "it-28", "it28", "it 2028", "2028", or just "28", "04", "it04"
    const batchRegex = /(?:^|\s)(?:it\s*[-_]?\s*)?(\d{2,4})(?:\s|$)/i;
    const match = textQuery.match(batchRegex);

    if (match) {
      const fullMatch = match[0];
      const numStr = match[1];
      
      if (numStr.length === 2 || numStr.length === 4) {
        let year = numStr;
        if (year.length === 4) {
          year = year.substring(2); // Normalize 4-digit to 2-digit (e.g. 2028 -> 28)
        }
        batchYear = year;
        // Remove the matched batch keyword from the text query
        textQuery = textQuery.replace(fullMatch, ' ').replace(/\s+/g, ' ').trim();
      }
    }

    let queryBuilder = supabaseAdmin
      .from('users')
      .select('id, name, batch, department, company, email, phone, linkedin')
      .eq('role', 'internal');

    if (batchYear) {
      const batchOrs = [
        `batch.ilike.IT ${batchYear}`,
        `batch.ilike.IT 20${batchYear}`,
        `batch.eq.${batchYear}`,
        `batch.eq.20${batchYear}`
      ].join(',');

      if (textQuery) {
        // Both batch and name search: query by both (logical AND)
        queryBuilder = queryBuilder
          .or(`name.ilike.%${textQuery}%,company.ilike.%${textQuery}%`)
          .or(batchOrs);
      } else {
        // Batch year search only
        queryBuilder = queryBuilder.or(batchOrs);
      }
    } else {
      // Normal search without batch year
      queryBuilder = queryBuilder.or(`name.ilike.%${textQuery}%,company.ilike.%${textQuery}%`);
    }

    const { data, error } = await queryBuilder.limit(100);

    if (error) {
      console.error('Error searching alumni:', error);
      return NextResponse.json({ error: 'Failed to search alumni' }, { status: 500 });
    }

    const profiles = (data || []).map((user: any) => {
      // Standardize batch to IT XX
      let formattedBatch = user.batch || '';
      if (/^IT 20(\d{2})$/i.test(formattedBatch)) {
        formattedBatch = formattedBatch.replace(/^IT 20(\d{2})$/i, 'IT $1');
      }

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

    // Sort alphabetically by name
    profiles.sort((a: any, b: any) => (a.name || '').localeCompare(b.name || ''));

    return NextResponse.json({ profiles });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
