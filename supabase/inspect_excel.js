const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, 'IT _28.xlsx');
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

console.log('Sheet Name:', sheetName);
console.log('Total Rows:', data.length);
if (data.length > 0) {
  console.log('Headers (Keys of first row):', Object.keys(data[0]));
  console.log('Sample Row 1:', data[0]);
  console.log('Sample Row 2:', data[1]);
} else {
  console.log('No data found in sheet.');
}
