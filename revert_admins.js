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

async function revertAdmins() {
  console.log("Reverting Rajdeep...");
  const { data: d1, error: e1 } = await supabase.from('users')
    .update({ batch: 'N/A', department: 'IT' })
    .ilike('name', '%rajdeep%');
  if (e1) console.error(e1);

  console.log("Reverting Krish...");
  const { data: d2, error: e2 } = await supabase.from('users')
    .update({ batch: 'N/A', department: 'IT' })
    .ilike('name', '%krish%');
  if (e2) console.error(e2);

  console.log("Reverting Aritra...");
  const { data: d3, error: e3 } = await supabase.from('users')
    .update({ batch: 'N/A', department: 'IT' })
    .ilike('name', '%aritra%');
  if (e3) console.error(e3);

  console.log("Done reverting admins.");
}

revertAdmins();
