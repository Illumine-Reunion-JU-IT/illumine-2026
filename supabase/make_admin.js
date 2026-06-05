const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Read and parse .env.local
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

async function makeAdmin(email, phone) {
  const { data, error } = await supabase
    .from('users')
    .update({ role: 'admin' })
    .match({ email: email, phone: phone })
    .select();

  if (error) {
    console.error(`Error updating user ${email}:`, error.message);
  } else if (data && data.length > 0) {
    console.log(`Successfully granted admin access to ${data[0].name} (${email})`);
  } else {
    console.log(`User not found with email: ${email} and phone: ${phone}. Proceeding to create them as admin...`);
    // If they aren't in the DB yet, insert them
    const { data: insertData, error: insertError } = await supabase
      .from('users')
      .insert([{
        name: email.split('@')[0], // placeholder name
        batch: 'N/A',
        department: 'IT',
        email: email,
        phone: phone,
        role: 'admin'
      }])
      .select();
      
    if (insertError) {
      console.error(`Error inserting new admin ${email}:`, insertError.message);
    } else if (insertData && insertData.length > 0) {
      console.log(`Successfully created new admin: ${insertData[0].email}`);
    }
  }
}

async function run() {
  await makeAdmin('rajdeepdasyear2006@gmail.com', '7439121680');
}

run();
