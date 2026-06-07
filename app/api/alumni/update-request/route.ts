import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, batch, email, phone, updateType, correctDetails } = body;

    // Validate required fields
    if (!name || !batch || !email || !updateType || !correctDetails) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('profile_update_requests')
      .insert([{
        alumni_name: name,
        alumni_batch: batch,
        contact_email: email,
        contact_phone: phone || null,
        update_type: updateType,
        correct_details: correctDetails,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) {
      console.error('Database Error:', error.message);
      return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('API Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
