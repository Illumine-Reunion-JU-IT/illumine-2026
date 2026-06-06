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

const supabase = createClient(supabaseUrl, supabaseKey);

async function testInsert() {
  console.log("Testing insert alphanumeric phone...");
  const { data: d1, error: e1 } = await supabase.from('users').insert([
    { name: 'TestAlpha', phone: 'MISSING-1234', email: 'testalpha@example.com', batch: 'N/A', department: 'IT', role: 'internal' }
  ]);
  console.log(e1 ? "Error: " + JSON.stringify(e1) : "Success");
}

testInsert();
