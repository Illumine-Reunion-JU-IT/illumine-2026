const fs = require('fs');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, '');
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log("Wiping database...");
  await supabase.from('users').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  
  console.log("Adding admin...");
  await supabase.from('users').insert({
    name: 'Master Admin',
    email: 'admin@illumine-ju-it.in',
    phone: '6969696969',
    role: 'admin',
    batch: 'N/A',
    department: 'IT'
  });

  console.log("Parsing CSV...");
  const lines = fs.readFileSync('supabase/IT_28 (2).csv', 'utf8').split('\n');
  const formattedData = [];
  
  for(let i=1; i<lines.length; i++) {
    if(!lines[i].trim()) continue;
    // split by comma but preserve commas inside quotes (just in case)
    let cols = [];
    let current = '';
    let inQuotes = false;
    for(let char of lines[i]) {
      if(char === '"') inQuotes = !inQuotes;
      else if(char === ',' && !inQuotes) {
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
    
    if(!name) continue;
    
    if(!email || !email.includes('@')) {
       email = `NO-EMAIL-${i}-${crypto.randomUUID()}`;
    }
    if(!phone) {
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
  
  console.log(`Parsed ${formattedData.length} students.`);
  
  const uniqueEmailMap = new Map();
  const uniquePhoneMap = new Map();
  for (const row of formattedData) {
    uniqueEmailMap.set(row.email, row);
  }
  for (const row of Array.from(uniqueEmailMap.values())) {
    uniquePhoneMap.set(row.phone, row);
  }
  const finalData = Array.from(uniquePhoneMap.values());
  
  console.log(`Inserting ${finalData.length} unique students...`);
  
  const { data, error } = await supabase.from('users').insert(finalData);
  if(error) {
     console.error("Error inserting:", error);
  } else {
     console.log("Success! All students inserted.");
  }
}
run();
