const fs = require('fs');
const files = [
  'app/alumni/page.tsx',
  'app/api/admin/alumni/route.ts',
  'app/api/admin/import/route.ts',
  'app/api/admin/stats/route.ts',
  'app/api/alumni/contact/route.ts'
];
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/import \{ authOptions \} from '@\/app\/api\/auth\/\[\.\.\.nextauth\]\/route';/g, "import { authOptions } from '@/lib/auth';");
  fs.writeFileSync(f, c);
});
console.log('Done');
