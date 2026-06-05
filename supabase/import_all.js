const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const XLSX = require('xlsx');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split(/\r?\n/).forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const parts = trimmed.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    let val = parts.slice(1).join('=').trim();
    if (val.startsWith('"') && val.endsWith('"') || val.startsWith("'") && val.endsWith("'")) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseServiceKey = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase credentials missing!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function processFile(filename, batchYear, colMap) {
  const excelPath = path.join(__dirname, filename);
  if (!fs.existsSync(excelPath)) {
    console.error('File not found:', excelPath);
    return;
  }

  const workbook = XLSX.readFile(excelPath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawRows = XLSX.utils.sheet_to_json(sheet);

  console.log(`\nProcessing ${filename}...`);
  const formattedRows = [];

  const seenEmails = new Set();
  
  rawRows.forEach((row, idx) => {
    const name = row[colMap.name]?.toString().trim();
    const email = row[colMap.email]?.toString().trim().toLowerCase();
    const phone = row[colMap.phone]?.toString().trim();
    const company = row[colMap.company]?.toString().trim() || null;
    const linkedin = row[colMap.linkedin]?.toString().trim() || null;

    if (!name || !email || !phone || !email.includes('@')) {
      return; // Skip invalid
    }

    if (seenEmails.has(email)) return;
    seenEmails.add(email);

    formattedRows.push({
      name,
      batch: batchYear,
      department: 'IT',
      company,
      linkedin,
      email,
      phone,
      role: 'internal'
    });
  });

  console.log(`Found ${formattedRows.length} valid rows to insert from ${filename}.`);

  const chunkSize = 50;
  let successCount = 0;

  for (let i = 0; i < formattedRows.length; i += chunkSize) {
    const chunk = formattedRows.slice(i, i + chunkSize);
    const { data, error } = await supabase
      .from('users')
      .upsert(chunk, { onConflict: 'email' });

    if (error) {
      console.error(`Error chunk ${i}:`, error);
    } else {
      successCount += chunk.length;
    }
  }
  console.log(`Successfully imported ${successCount} records from ${filename}.`);
}

async function run() {
  await processFile('IT_26.xlsx', 'IT26', {
    name: 'NAME',
    email: 'EMAIL ID',
    phone: 'MOBILE NO'
  });

  await processFile('IT_27.xlsx', 'IT27', {
    name: 'NAME',
    email: 'EMAIL ID',
    phone: 'CONTACT',
    company: 'COMPANY',
    linkedin: 'LINKEDIN PROFILE'
  });

  await processFile('IT_28.xlsx', 'IT28', {
    name: 'Name',
    email: 'E-mail',
    phone: 'Phone number',
    company: 'Company',
    linkedin: 'LinkedIn'
  });
}

run();
