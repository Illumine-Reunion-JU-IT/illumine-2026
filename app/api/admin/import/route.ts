import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
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

    const getValue = (row: any, aliases: string[]) => {
      // Create a case-insensitive map of the row's keys
      const lowerRow: Record<string, any> = {};
      for (const k in row) {
        if (row.hasOwnProperty(k)) {
          lowerRow[k.toLowerCase().trim()] = row[k];
        }
      }

      for (const alias of aliases) {
        const lowerAlias = alias.toLowerCase().trim();
        if (lowerRow[lowerAlias] !== undefined && lowerRow[lowerAlias] !== null) {
          return lowerRow[lowerAlias];
        }
      }
      return '';
    };

    const normalizePhone = (value: any) => {
      if (value === undefined || value === null) return '';
      // Safely convert to string before applying regex
      return String(value).trim().replace(/[^0-9+]/g, '');
    };

    const normalizeString = (value: any) => {
      if (value === undefined || value === null) return '';
      // Safely convert to string
      return String(value).trim();
    };

    // Map Excel columns to our DB schema with smart aliases
    const formattedData = data.map((row: any) => {
      const name = normalizeString(getValue(row, ['name', 'student name', 'full name', 'student\'s name', 'student name ']));
      const batch = normalizeString(getValue(row, ['batch', 'batch name', 'graduation batch', 'batch/grad year']));
      const department = normalizeString(getValue(row, ['department', 'dept', 'branch']));
      const company = normalizeString(getValue(row, ['company', 'organisation', 'organization', 'employer']));
      const linkedin = normalizeString(getValue(row, ['linkedin', 'linkedin profile', 'linkedin url', 'linkedin link']));
      const email = normalizeString(getValue(row, ['email', 'email id', 'e-mail', 'email address', 'e-mail id'])).toLowerCase();
      const phone = normalizePhone(getValue(row, ['phone', 'mobile', 'mobile no', 'mobile number', 'contact', 'contact number', 'phone number', 'contact no.', 'ph no']));

      return {
        name,
        batch: batch || 'N/A',
        department: department || 'IT',
        company: company || null,
        linkedin: linkedin || null,
        email: email || null,
        phone: phone || null,
        role: 'internal'
      };
    }).filter(row => row.name); // Only require a name! Allow missing email/phone

    if (formattedData.length === 0) {
      return NextResponse.json({ error: 'No valid rows found. Please ensure the CSV/Excel file has at least a "Name" column.' }, { status: 400 });
    }

    const rowsWithEmail = formattedData.filter(row => row.email);
    const rowsWithoutEmail = formattedData.filter(row => !row.email);

    let insertedCount = 0;
    if (rowsWithEmail.length > 0) {
      const { data: insertedData, error } = await supabaseAdmin
        .from('users')
        .upsert(rowsWithEmail, { onConflict: 'email' })
        .select();

      if (error) {
        console.error('Supabase upsert error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      insertedCount += insertedData?.length || rowsWithEmail.length;
    }

    if (rowsWithoutEmail.length > 0) {
      const { data: insertedData, error } = await supabaseAdmin
        .from('users')
        .insert(rowsWithoutEmail)
        .select();

      if (error) {
        console.error('Supabase insert error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      insertedCount += insertedData?.length || rowsWithoutEmail.length;
    }

    return NextResponse.json({ success: true, inserted: insertedCount });


  } catch (error: any) {
    console.error("Import API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
