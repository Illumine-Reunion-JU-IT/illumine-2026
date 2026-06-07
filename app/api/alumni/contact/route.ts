import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

// POST: Create a contact request
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { senderName, senderEmail, senderPhone, receiverId, message } = body;

    if (!senderName || !senderEmail || !receiverId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Securely fetch receiver's details from database so client does not have to expose it
    const { data: receiver, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('name, email')
      .eq('id', receiverId)
      .single();

    if (fetchError || !receiver) {
      return NextResponse.json({ error: 'Receiver not found' }, { status: 404 });
    }

    const { data, error } = await supabaseAdmin
      .from('contact_requests')
      .insert([{
        sender_name: senderName,
        sender_email: senderEmail,
        sender_phone: senderPhone || null,
        receiver_id: receiverId,
        receiver_name: receiver.name,
        receiver_email: receiver.email,
        message,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Fetch contact requests (admin only)
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('contact_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
