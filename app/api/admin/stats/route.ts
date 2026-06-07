import { NextResponse as Response } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any).role !== 'admin') {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { count: total, error: err1 } = await supabaseAdmin.from('users').select('*', { count: 'exact', head: true });
  const { count: admins, error: err2 } = await supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).eq('role', 'admin');
  const { count: internal, error: err3 } = await supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).eq('role', 'internal');

  if (err1 || err2 || err3) {
    return Response.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }

  return Response.json({
    total: total || 0,
    admins: admins || 0,
    internal: internal || 0
  });
}
