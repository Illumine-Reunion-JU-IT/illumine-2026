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
  console.log("Testing insert 1...");
  const { data: d1, error: e1 } = await supabase.from('users').insert([
    { name: 'Test1', phone: '', email: 'test1@example.com', batch: 'N/A', department: 'IT', role: 'internal' }
  ]);
  console.log(e1 ? "Error: " + JSON.stringify(e1) : "Success 1");

  console.log("Testing insert 2...");
  const { data: d2, error: e2 } = await supabase.from('users').insert([
    { name: 'Test2', phone: '', email: 'test2@example.com', batch: 'N/A', department: 'IT', role: 'internal' }
  ]);
  console.log(e2 ? "Error: " + JSON.stringify(e2) : "Success 2");
}

testInsert();
