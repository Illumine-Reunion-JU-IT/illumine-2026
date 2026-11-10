import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

// Helper to check admin session
async function checkAdmin() {
  const session = await getServerSession(authOptions);
  return session && (session.user as any).role === 'admin';
}

export async function GET(req: Request) {
  if (!await checkAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  if (!await checkAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, batch, department, company, linkedin, email, phone, role } = body;

    if (!name || (!email && !phone)) {
      return NextResponse.json({ error: 'Name and at least one of email or phone are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([{
        name,
        batch: batch || 'N/A',
        department: department || 'IT',
        company: company || null,
        linkedin: linkedin || null,
        email: email ? email.toLowerCase() : `NO-EMAIL-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        phone: phone || `NO-PHONE-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        role: role || 'internal'
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!await checkAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, batch, department, company, linkedin, email, phone, role } = body;

    if (!id || !name || (!email && !phone)) {
      return NextResponse.json({ error: 'ID, Name, and at least one of email or phone are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('users')
      .update({
        name,
        batch,
        department,
        company: company || null,
        linkedin: linkedin || null,
        email: email ? email.toLowerCase() : `NO-EMAIL-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        phone: phone || `NO-PHONE-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        role
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!await checkAdmin()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
