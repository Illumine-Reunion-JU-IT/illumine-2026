'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { UploadCloud, AlertCircle, CheckCircle2, FileText, Loader2, ArrowRight, Trash2 } from 'lucide-react';

export default function ImportDataPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const [step, setStep] = useState<1 | 2>(1); // 1: Upload, 2: Preview

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      
      const rawJson = XLSX.utils.sheet_to_json(worksheet);
      
      const normalizeCell = (row: any, keywords: string[]) => {
        for (const key of Object.keys(row)) {
          const normalized = key.toString().trim().toLowerCase();
          const cleanKey = normalized.replace(/[^a-z0-9]/g, '');
          
          if (!cleanKey) continue; // CRITICAL FIX: prevent empty strings from matching everything

          for (const keyword of keywords) {
            const normalizedKeyword = keyword.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (cleanKey === normalizedKeyword || cleanKey.includes(normalizedKeyword) || normalizedKeyword.includes(cleanKey)) {
              return row[key];
            }
          }
        }
        return undefined;
      };

      const normalizePhone = (value: any) => {
        if (value === undefined || value === null) return '';
        const str = String(value).trim();
        return str.replace(/[^0-9+]/g, '');
      };

      const formatted = rawJson.map((row: any, index: number) => {
        // Try to guess columns based on common CSV/Excel headers
        const name = String(normalizeCell(row, ['Name', 'Student Name', 'Full Name']) || '').trim();
        const email = String(normalizeCell(row, ['Email', 'E-mail', 'Email Address', 'EmailId', 'Email Id', 'EMAIL ID']) || '').trim().toLowerCase();
        const phone = normalizePhone(normalizeCell(row, ['Phone', 'Mobile', 'Mobile Number', 'Mobile No', 'Contact', 'Contact Number', 'Phone number', 'Phone No', 'ph no']));
        const batch = String(normalizeCell(row, ['Batch', 'Batch Name', 'Graduation Batch', 'Batch/Grad Year', 'Batch / Grad Year']) || 'Unknown').trim();
        const department = String(normalizeCell(row, ['Department', 'Dept', 'Branch']) || 'IT').trim();
        const company = String(normalizeCell(row, ['Company', 'Organisation', 'Organization', 'Employer']) || '').trim();
        const linkedin = String(normalizeCell(row, ['LinkedIn', 'LinkedIn URL', 'LinkedIn Profile', 'Linkedin']) || '').trim();

        return {
          _id: index,
          name,
          email,
          phone,
          batch,
          department,
          company,
          linkedin,
          role: 'internal'
        };
      });

      // Validation
      const errors: string[] = [];
      const warnings: string[] = [];
      const seenEmails = new Set<string>();
      const seenPhones = new Set<string>();

      for (const row of formatted) {
        if (!row.name) {
          errors.push(`Row ${row._id + 1}: Missing Name (Row will be skipped)`);
          continue;
        }

        if (row.email) {
          if (!row.email.includes('@')) {
            errors.push(`Row ${row._id + 1}: Invalid Email format for ${row.name}`);
          } else if (seenEmails.has(row.email)) {
            errors.push(`Row ${row._id + 1}: Duplicate Email in file (${row.email})`);
          }
        }

        if (row.phone) {
          if (seenPhones.has(row.phone)) {
            errors.push(`Row ${row._id + 1}: Duplicate Phone in file (${row.phone})`);
          }
        }

        if (!row.email && !row.phone) {
          warnings.push(`Row ${row._id + 1}: Missing both Email and Phone for ${row.name}. (Will be imported as a name-only record)`);
        }

        if (row.email) seenEmails.add(row.email);
        if (row.phone) seenPhones.add(row.phone);
      }

      setParsedData(formatted);
      setValidationErrors([...errors, ...warnings]);
      setStep(2);
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Failed to parse file. ' + error.message });
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  const handleConfirmImport = async () => {
    setLoading(true);
    setMessage(null);
    try {
      // Filter out obvious bad rows before sending to backend (only require name now)
      const validData = parsedData.filter(row => row.name);

      // Backend will handle duplicate checking against DB
      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: validData })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to import data');
      }

      setMessage({ type: 'success', text: `Successfully imported ${result.inserted} valid records.` });
      setStep(1);
      setParsedData([]);
      setValidationErrors([]);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'An error occurred during import.' });
    } finally {
      setLoading(false);
    }
  };

  const cancelImport = () => {
    setStep(1);
    setParsedData([]);
    setValidationErrors([]);
    setMessage(null);
  };

  return (
    <div className="space-y-6 font-mono w-full">
      <div className="border-b border-white/10 pb-4 flex justify-between items-end">
        <h1 className="text-3xl font-bold text-[#BEF3DF] tracking-widest uppercase">
          Import Alumni Data
        </h1>
        <div className="text-sm text-gray-500 uppercase tracking-wider">
          Step {step} of 2
        </div>
      </div>

      {message && (
        <div className={`p-4 text-sm flex items-center gap-3 uppercase tracking-wider border ${
          message.type === 'success' 
            ? 'bg-[#BEF3DF]/10 text-[#BEF3DF] border-[#BEF3DF]/30' 
            : 'bg-red-500/10 text-red-400 border-red-500/30'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {message.text}
        </div>
      )}

      {step === 1 && (
        <div className="bg-black/40 border border-[#BEF3DF]/20 p-8 rounded-sm relative max-w-3xl">
          <p className="text-gray-400 mb-6 text-sm uppercase tracking-wider leading-relaxed">
            Upload an Excel file (.xlsx, .xls) or CSV to bulk import records. <br />
            Our smart parser automatically detects standard columns like: <br />
            <span className="text-[#BEF3DF] mt-2 block font-bold">
              Name, Batch, Department, Company, LinkedIn, Email, Phone
            </span>
          </p>

          <div className="border-2 border-dashed border-white/20 hover:border-[#BEF3DF]/50 transition-colors bg-white/5 p-16 flex flex-col items-center justify-center relative cursor-pointer group text-center">
            <input 
              type="file" 
              accept=".xlsx, .xls, .csv" 
              onChange={handleFileUpload} 
              disabled={loading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
            />
            {loading ? (
              <Loader2 className="animate-spin text-[#BEF3DF] mb-4" size={48} />
            ) : (
              <UploadCloud className="text-gray-500 group-hover:text-[#BEF3DF] mb-4 transition-colors" size={48} />
            )}
            <p className="text-white text-lg tracking-widest uppercase mb-2">
              {loading ? 'Analyzing File...' : 'Click or Drag File to Upload'}
            </p>
            <p className="text-gray-500 text-xs uppercase tracking-wider">
              Supports .xlsx, .csv up to 10MB
            </p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-black/40 border border-white/10 p-4">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Total Records Found</p>
              <p className="text-3xl text-white font-bold">{parsedData.length}</p>
            </div>
            <div className="bg-black/40 border border-white/10 p-4">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Validation Errors</p>
              <p className={`text-3xl font-bold ${validationErrors.length > 0 ? 'text-red-400' : 'text-[#BEF3DF]'}`}>
                {validationErrors.length}
              </p>
            </div>
            <div className="bg-[#BEF3DF]/5 border border-[#BEF3DF]/20 p-4 flex flex-col justify-center gap-2">
              <button 
                onClick={handleConfirmImport}
                disabled={loading}
                className="w-full bg-[#BEF3DF] hover:bg-white text-black font-bold uppercase tracking-widest py-2 text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                Confirm Import
              </button>
              <button 
                onClick={cancelImport}
                disabled={loading}
                className="w-full bg-transparent border border-white/20 text-white hover:border-white uppercase tracking-widest py-2 text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <Trash2 size={16} /> Discard
              </button>
            </div>
          </div>

          {validationErrors.length > 0 && (
            <div className="bg-red-500/5 border border-red-500/20 p-4 max-h-48 overflow-y-auto">
              <h3 className="text-red-400 font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
                <AlertCircle size={16} /> Attention Required
              </h3>
              <ul className="list-disc list-inside text-xs text-red-300/80 space-y-1 font-mono">
                {validationErrors.slice(0, 100).map((err, i) => <li key={i}>{err}</li>)}
                {validationErrors.length > 100 && <li>...and {validationErrors.length - 100} more errors.</li>}
              </ul>
              <p className="text-xs text-gray-500 mt-3 uppercase">Note: Rows with missing Name, Email, or Phone will be automatically skipped during import.</p>
            </div>
          )}

          <div className="bg-black/40 border border-white/10 rounded-sm overflow-hidden">
            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
              <FileText size={18} className="text-[#BEF3DF]" />
              <h3 className="text-[#BEF3DF] font-bold uppercase tracking-widest text-sm">Data Preview (First 50 Rows)</h3>
            </div>
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-left border-collapse text-xs uppercase tracking-wider relative">
                <thead className="sticky top-0 bg-[#070707] shadow-md z-10 border-b border-white/10">
                  <tr className="text-[#BEF3DF]/80 font-bold">
                    <th className="p-3">#</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Batch</th>
                    <th className="p-3">Company</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {parsedData.slice(0, 50).map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-3 text-gray-500">{i + 1}</td>
                      <td className="p-3 font-bold text-white whitespace-nowrap">{row.name || <span className="text-red-400">MISSING</span>}</td>
                      <td className="p-3 lowercase whitespace-nowrap">{row.email || <span className="text-red-400">MISSING</span>}</td>
                      <td className="p-3 whitespace-nowrap">{row.phone || <span className="text-red-400">MISSING</span>}</td>
                      <td className="p-3 whitespace-nowrap">{row.batch}</td>
                      <td className="p-3 whitespace-nowrap truncate max-w-[150px]">{row.company || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
