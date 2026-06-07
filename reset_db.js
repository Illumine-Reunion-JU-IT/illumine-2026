const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, '');
  }
});

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function resetDB() {
  console.log("Wiping all existing records from 'users' table...");
  // Supabase delete() requires a condition. A common hack is matching not null or id > 0.
  // We can just use neq('id', 'some-uuid-that-does-not-exist') or not.is('id', null)
  const { error: deleteError } = await supabase.from('users')
    .delete()
    .not('id', 'is', null);

  if (deleteError) {
    console.error("Error wiping database:", deleteError);
    return;
  }
  console.log("Successfully wiped all data.");

  console.log("Inserting Master Admin...");
  const { data, error: insertError } = await supabase.from('users').insert([
    {
      name: 'Master Admin',
      email: 'admin@illumine-ju-it.in',
      phone: '6969696969',
      batch: 'N/A',
      department: 'IT',
      role: 'admin',
      company: '',
      linkedin: ''
    }
  ]);

  if (insertError) {
    console.error("Error inserting admin:", insertError);
  } else {
    console.log("Successfully inserted admin@illumine-ju-it.in with phone 6969696969");
  }
}

resetDB();
