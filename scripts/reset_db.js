const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables from process.env or .env.local if present
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

async function resetDB() {
  const hasConfirmed = process.argv.includes('--yes');
  if (!hasConfirmed) {
    console.error("DANGER: This script wipes all records in the 'users' table!");
    console.error("To execute, re-run with the confirmation flag: node scripts/reset_db.js --yes");
    process.exit(1);
  }

  console.log("Wiping all existing records from 'users' table...");
  const { error: deleteError } = await supabase
    .from('users')
    .delete()
    .not('id', 'is', null);

  if (deleteError) {
    console.error("Error wiping database:", deleteError);
    process.exit(1);
  }
  console.log("Successfully wiped all user data.");

  const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@illumine-ju-it.in';
  const adminPhone = process.env.INITIAL_ADMIN_PHONE || '0000000000';

  console.log(`Inserting Master Admin (${adminEmail})...`);
  const { error: insertError } = await supabase.from('users').insert([
    {
      name: 'Master Admin',
      email: adminEmail,
      phone: adminPhone,
      batch: 'N/A',
      department: 'IT',
      role: 'admin',
      company: '',
      linkedin: ''
    }
  ]);

  if (insertError) {
    console.error("Error inserting admin:", insertError);
    process.exit(1);
  } else {
    console.log("Master Admin inserted successfully.");
  }
}

resetDB();
