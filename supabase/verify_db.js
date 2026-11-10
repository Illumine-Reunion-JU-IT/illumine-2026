const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local
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

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verify() {
  const { data, error } = await supabase
    .from('users')
    .select('batch, role, count')
    .select('batch, role');

  if (error) {
    console.error('Error fetching users:', error);
    return;
  }

  // Count by batch
  const counts = {};
  data.forEach(user => {
    const key = `${user.role || 'no-role'} | Batch: ${user.batch || 'no-batch'}`;
    counts[key] = (counts[key] || 0) + 1;
  });

  console.log('Database User Counts by Role & Batch:');
  console.log(JSON.stringify(counts, null, 2));
}

verify();
