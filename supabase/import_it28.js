const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const XLSX = require('xlsx');

// 1. Read and parse .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('.env.local file not found at:', envPath);
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split(/\r?\n/).forEach(line => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) return;
  const parts = trimmed.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    let val = parts.slice(1).join('=').trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    } else if (val.startsWith("'") && val.endsWith("'")) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseServiceKey = env['SUPABASE_SERVICE_ROLE_KEY'];

console.log('Supabase URL:', supabaseUrl);
console.log('Has Service Key:', !!supabaseServiceKey);

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Supabase credentials missing in .env.local!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// 2. Read and parse Excel
const excelPath = path.join(__dirname, 'IT _28.xlsx');
if (!fs.existsSync(excelPath)) {
  console.error('Excel file not found at:', excelPath);
  process.exit(1);
}

const workbook = XLSX.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rawRows = XLSX.utils.sheet_to_json(sheet);

console.log(`Successfully read sheet "${sheetName}". Total raw rows: ${rawRows.length}`);

// 3. Process and format rows
const formattedRows = [];
const errors = [];
const seenEmails = new Set();
const seenPhones = new Set();

rawRows.forEach((row, index) => {
  const rowNum = index + 2; // 1-indexed, header is row 1
  const name = row['Name']?.toString().trim();
  const email = row['E-mail']?.toString().trim().toLowerCase();
  const phoneVal = row['Phone number']?.toString().trim();
  const linkedin = row['LinkedIn']?.toString().trim() || null;

  if (!name) {
    errors.push(`Row ${rowNum}: Name is missing.`);
    return;
  }
  if (!email) {
    errors.push(`Row ${rowNum} (${name}): E-mail is missing.`);
    return;
  }
  if (!phoneVal) {
    errors.push(`Row ${rowNum} (${name}): Phone number is missing.`);
    return;
  }

  // Basic email format check
  if (!email.includes('@')) {
    errors.push(`Row ${rowNum} (${name}): E-mail "${email}" is invalid.`);
    return;
  }

  // Handle unique constraints locally first to flag potential duplicates in source data
  if (seenEmails.has(email)) {
    errors.push(`Row ${rowNum} (${name}): Duplicate E-mail "${email}" within Excel file.`);
    return;
  }
  if (seenPhones.has(phoneVal)) {
    errors.push(`Row ${rowNum} (${name}): Duplicate Phone number "${phoneVal}" within Excel file.`);
    return;
  }

  seenEmails.add(email);
  seenPhones.add(phoneVal);

  formattedRows.push({
    name: name,
    batch: '2028',
    department: 'IT',
    company: null,
    linkedin: linkedin,
    email: email,
    phone: phoneVal,
    role: 'internal'
  });
});

console.log(`\nValidation completed. Found ${formattedRows.length} valid rows and ${errors.length} validation errors/warnings:`);
if (errors.length > 0) {
  console.log(errors.slice(0, 10).join('\n'));
  if (errors.length > 10) {
    console.log(`... and ${errors.length - 10} more errors.`);
  }
}

if (formattedRows.length === 0) {
  console.error('No valid rows to import.');
  process.exit(1);
}

// 4. Upsert data to Supabase
async function runImport() {
  console.log(`\nImporting ${formattedRows.length} rows to Supabase "users" table...`);
  
  // We'll insert/upsert in chunks to be safe
  const chunkSize = 50;
  let successCount = 0;

  for (let i = 0; i < formattedRows.length; i += chunkSize) {
    const chunk = formattedRows.slice(i, i + chunkSize);
    const { data, error } = await supabase
      .from('users')
      .upsert(chunk, { onConflict: 'email' })
      .select();

    if (error) {
      console.error(`Error upserting chunk ${i / chunkSize + 1}:`, error);
    } else {
      successCount += data ? data.length : chunk.length;
      console.log(`Uploaded chunk ${i / chunkSize + 1}: +${data ? data.length : chunk.length} records`);
    }
  }

  console.log(`\nSuccessfully imported/upserted ${successCount} out of ${formattedRows.length} records into the alumni database.`);
}

runImport().catch(err => {
  console.error('Import process failed:', err);
});
