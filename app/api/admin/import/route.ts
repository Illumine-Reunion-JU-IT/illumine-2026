import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user as any).role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data } = await req.json();

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    // Map Excel columns to our DB schema
    const formattedData = data.map((row: any) => ({
      name: row.Name?.toString().trim(),
      batch: row.Batch?.toString().trim(),
      department: row.Department?.toString().trim() || 'IT',
      company: row.Company?.toString().trim() || null,
      linkedin: row.LinkedIn?.toString().trim() || null,
      email: row.Email?.toString().trim().toLowerCase(),
      phone: row.Phone?.toString().trim(),
      role: 'internal'
    })).filter(row => row.name && row.email && row.phone); // Require name, email, phone

    if (formattedData.length === 0) {
      return NextResponse.json({ error: 'No valid rows found. Ensure Name, Email, and Phone columns exist and have data.' }, { status: 400 });
    }

    // Upsert into Supabase (insert, or update if email matches)
    const { data: insertedData, error } = await supabaseAdmin
      .from('users')
      .upsert(formattedData, { onConflict: 'email' })
      .select();

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, inserted: insertedData?.length || formattedData.length });
  } catch (error: any) {
    console.error("Import API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
