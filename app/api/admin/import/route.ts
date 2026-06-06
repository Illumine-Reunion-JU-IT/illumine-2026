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

    const getValue = (row: any, keys: string[]) => {
      for (const key of keys) {
        if (row[key] !== undefined && row[key] !== null) {
          return row[key];
        }
      }
      return '';
    };

    const normalizePhone = (value: any) => {
      if (value === undefined || value === null) return '';
      return String(value).trim().replace(/[^0-9+]/g, '');
    };

    const normalizeString = (value: any) => {
      if (value === undefined || value === null) return '';
      return String(value).trim();
    };

    // Map Excel columns to our DB schema
    const formattedData = data.map((row: any) => {
      const name = normalizeString(getValue(row, ['Name', 'name', 'NAME', 'Student Name', 'Full Name']));
      const batch = normalizeString(getValue(row, ['Batch', 'batch', 'BATCH', 'Batch Name', 'Graduation Batch', 'Batch/Grad Year']));
      const department = normalizeString(getValue(row, ['Department', 'department', 'DEPARTMENT', 'Dept', 'DEPT', 'Branch']));
      const company = normalizeString(getValue(row, ['Company', 'company', 'COMPANY', 'Organisation', 'Organization', 'Employer']));
      const linkedin = normalizeString(getValue(row, ['LinkedIn', 'linkedin', 'LINKEDIN PROFILE', 'LinkedIn URL', 'LinkedIn Profile', 'Linkedin']));
      const email = normalizeString(getValue(row, ['Email', 'email', 'EMAIL', 'Email Address', 'EMAIL ID', 'E-mail', 'EmailAddress'])).toLowerCase();
      const phone = normalizePhone(getValue(row, ['Phone', 'phone', 'PHONE', 'Mobile', 'Mobile Number', 'Mobile No', 'MobileNumber', 'Contact', 'Contact Number', 'Phone number', 'Phone No', 'MOBILE NO', 'CONTACT']));

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
    }).filter(row => row.name && (row.email || row.phone));

    if (formattedData.length === 0) {
      return NextResponse.json({ error: 'No valid rows found. Ensure Name and at least one of Email or Phone are provided.' }, { status: 400 });
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
