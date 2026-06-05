'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { UploadCloud, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ImportDataPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

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
      
      // Expected columns: Name, Batch, Department, Company, LinkedIn, Email, Phone
      const json = XLSX.utils.sheet_to_json(worksheet);

      const res = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: json })
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to import data');
      }

      setMessage({ type: 'success', text: `Successfully imported ${result.inserted} records.` });
    } catch (error: any) {
      console.error("Import error:", error);
      setMessage({ type: 'error', text: error.message || 'An error occurred during import.' });
    } finally {
      setLoading(false);
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-6 font-mono max-w-3xl">
      <h1 className="text-3xl font-bold text-[#BEF3DF] tracking-widest uppercase border-b border-white/10 pb-4">
        Import Alumni Data
      </h1>

      <div className="bg-black/40 border border-[#BEF3DF]/20 p-8 rounded-sm relative">
        <p className="text-gray-400 mb-6 text-sm uppercase tracking-wider">
          Upload an Excel file (.xlsx or .xls) to bulk import or update alumni records. 
          The file must contain the following exact column headers: <br />
          <span className="text-[#BEF3DF] mt-2 block font-bold">
            Name, Batch, Department, Company, LinkedIn, Email, Phone
          </span>
        </p>

        {message && (
          <div className={`p-4 mb-6 text-sm flex items-center gap-3 uppercase tracking-wider border ${
            message.type === 'success' 
              ? 'bg-[#BEF3DF]/10 text-[#BEF3DF] border-[#BEF3DF]/30' 
              : 'bg-red-500/10 text-red-400 border-red-500/30'
          }`}>
            {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            {message.text}
          </div>
        )}

        <div className="border-2 border-dashed border-white/20 hover:border-[#BEF3DF]/50 transition-colors bg-white/5 p-12 flex flex-col items-center justify-center relative cursor-pointer group text-center">
          <input 
            type="file" 
            accept=".xlsx, .xls, .csv" 
            onChange={handleFileUpload} 
            disabled={loading}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
          />
          <UploadCloud className="text-gray-500 group-hover:text-[#BEF3DF] mb-4 transition-colors" size={48} />
          <p className="text-white text-lg tracking-widest uppercase mb-2">
            {loading ? 'Processing File...' : 'Click or drag file to upload'}
          </p>
          <p className="text-gray-500 text-xs uppercase tracking-wider">
            Supports .xlsx, .xls, .csv up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
}
