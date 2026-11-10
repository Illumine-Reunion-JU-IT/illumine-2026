const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^"|"$/g, '');
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const hasConfirmed = process.argv.includes('--yes');
  if (!hasConfirmed) {
    console.error("DANGER: This script wipes all records in the 'users' table and reimports data!");
    console.error("Usage: node scripts/wipe_and_import.js [csvFilePath] --yes");
    process.exit(1);
  }

  const csvPath = process.argv.find(arg => arg.endsWith('.csv')) || 'supabase/IT_28 (2).csv';
  if (!fs.existsSync(csvPath)) {
    console.error(`Error: CSV file not found at '${csvPath}'. Specify a valid path: node scripts/wipe_and_import.js path/to/file.csv --yes`);
    process.exit(1);
  }

  console.log("Wiping database...");
  await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@illumine-ju-it.in';
  const adminPhone = process.env.INITIAL_ADMIN_PHONE || '0000000000';

  console.log("Adding admin...");
  await supabase.from('users').insert({
    name: 'Master Admin',
    email: adminEmail,
    phone: adminPhone,
    role: 'admin',
    batch: 'N/A',
    department: 'IT'
  });

  console.log(`Parsing CSV from ${csvPath}...`);
  const lines = fs.readFileSync(csvPath, 'utf8').split('\n');
  const formattedData = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    let cols = [];
    let current = '';
    let inQuotes = false;
    for (let char of lines[i]) {
      if (char === '"') inQuotes = !inQuotes;
      else if (char === ',' && !inQuotes) {
        cols.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    cols.push(current);

    const name = cols[0]?.trim();
    let email = cols[1]?.trim().toLowerCase();
    let phone = cols[2]?.trim();
    const company = cols[3]?.trim();
    const linkedin = cols[4]?.trim();

    if (!name) continue;

    if (!email || !email.includes('@')) {
      email = `NO-EMAIL-${i}-${crypto.randomUUID()}`;
    }
    if (!phone) {
      phone = `NO-PHONE-${i}-${crypto.randomUUID()}`;
    }

    formattedData.push({
      name,
      email,
      phone,
      company: company || null,
      linkedin: linkedin || null,
      batch: 'IT 28',
      department: 'IT',
      role: 'internal'
    });
  }

  console.log(`Parsed ${formattedData.length} entries.`);

  const uniqueEmailMap = new Map();
  const uniquePhoneMap = new Map();
  for (const row of formattedData) {
    uniqueEmailMap.set(row.email, row);
  }
  for (const row of Array.from(uniqueEmailMap.values())) {
    uniquePhoneMap.set(row.phone, row);
  }
  const finalData = Array.from(uniquePhoneMap.values());

  console.log(`Inserting ${finalData.length} unique entries...`);

  const { error } = await supabase.from('users').insert(finalData);
  if (error) {
    console.error("Error inserting:", error);
    process.exit(1);
  } else {
    console.log("Success! All records imported.");
  }
}

run();

