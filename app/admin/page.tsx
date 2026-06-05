'use client';

import { useEffect, useState } from 'react';
import { Users, UserCheck, ShieldAlert, Mail, Loader2 } from 'lucide-react';

interface ContactRequest {
  id: string;
  sender_name: string;
  sender_email: string;
  sender_phone: string | null;
  receiver_name: string;
  receiver_email: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, admins: 0, internal: 0 });
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [reqLoading, setReqLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data) setStats(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    async function fetchRequests() {
      try {
        const res = await fetch('/api/alumni/contact');
        const data = await res.json();
        if (data && Array.isArray(data)) setRequests(data);
      } catch (e) {
        console.error(e);
      } finally {
        setReqLoading(false);
      }
    }

    fetchStats();
    fetchRequests();
  }, []);

  return (
    <div className="space-y-8 font-mono text-white">
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold text-[#BEF3DF] tracking-widest uppercase">
          Admin Overview
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Directory Users" value={stats.total} icon={<Users size={24} />} loading={loading} />
        <StatCard title="Internal Verified Alumni" value={stats.internal} icon={<UserCheck size={24} />} loading={loading} />
        <StatCard title="Administrators" value={stats.admins} icon={<ShieldAlert size={24} />} loading={loading} />
      </div>

      {/* Requests Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#BEF3DF] uppercase tracking-wider flex items-center gap-2">
          <Mail size={20} /> Secure Contact Requests Queue
        </h2>
        
        <div className="bg-black/40 border border-[#BEF3DF]/15 rounded-sm overflow-hidden mb-8">
          {reqLoading ? (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center gap-2">
              <Loader2 className="animate-spin text-[#BEF3DF]" size={20} />
              <span className="text-xs uppercase tracking-widest">Loading Requests...</span>
            </div>
          ) : requests.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-xs uppercase tracking-widest">
              No connection requests found in the queue.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs uppercase tracking-wider">
                <thead>
                  <tr className="border-b border-[#BEF3DF]/20 bg-white/5 text-[#BEF3DF]/80 font-bold">
                    <th className="p-4">Sender</th>
                    <th className="p-4">Message Details</th>
                    <th className="p-4">Alumni Recipient</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-bold text-white">{req.sender_name}</div>
                        <div className="lowercase text-gray-500 text-[10px]">{req.sender_email}</div>
                        {req.sender_phone && <div className="text-gray-500 text-[10px]">{req.sender_phone}</div>}
                      </td>
                      <td className="p-4 max-w-sm">
                        <p className="normal-case leading-relaxed text-gray-400 line-clamp-2" title={req.message}>
                          {req.message}
                        </p>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-bold text-white">{req.receiver_name}</div>
                        <div className="lowercase text-gray-500 text-[10px]">{req.receiver_email}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap text-gray-400">
                        {new Date(req.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Admin Panel Guide */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="text-xl font-bold text-[#BEF3DF] uppercase tracking-wider flex items-center gap-2">
          Admin Panel Guide
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="bg-black/40 border border-white/10 p-6 rounded-sm space-y-3">
            <h3 className="text-white font-bold tracking-wider uppercase border-b border-white/10 pb-2">1. Manage Alumni Data</h3>
            <p className="text-gray-400 leading-relaxed">
              Navigate to the <span className="text-[#BEF3DF] font-bold">Manage Alumni</span> tab on the left. This is your primary database view. 
              Here you can see all alumni records from every batch (e.g., IT26, IT27, IT28). 
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
              <li>Use the search bar to find students by name, email, or company.</li>
              <li>Click the pencil icon to edit any student's phone number, email, company, or LinkedIn.</li>
              <li>Click the trash icon to remove a record entirely.</li>
              <li>Click "Add Record" to manually insert a new alumnus.</li>
            </ul>
          </div>

          <div className="bg-black/40 border border-white/10 p-6 rounded-sm space-y-3">
            <h3 className="text-white font-bold tracking-wider uppercase border-b border-white/10 pb-2">2. Bulk Import Data</h3>
            <p className="text-gray-400 leading-relaxed">
              Navigate to the <span className="text-[#BEF3DF] font-bold">Import Data</span> tab on the left. If you have a large Excel file containing new alumni (e.g., the next graduating batch), you can upload it here.
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
              <li>Ensure your Excel file has columns: <strong className="text-white">Name, Batch, Department, Company, LinkedIn, Email, Phone</strong>.</li>
              <li>Drag and drop the file, and the database will automatically update.</li>
              <li>Existing records will be updated if the email matches.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, loading }: { title: string, value: number, icon: React.ReactNode, loading: boolean }) {
  return (
    <div className="bg-black/40 border border-[#BEF3DF]/20 p-6 flex items-center justify-between relative overflow-hidden"
         style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 10%, 100% 100%, 5% 100%, 0% 90%)' }}>
      <div className="absolute top-0 left-0 w-1 h-full bg-[#BEF3DF]/50" />
      <div>
        <p className="text-gray-400 text-xs uppercase tracking-wider mb-2">{title}</p>
        {loading ? (
          <div className="h-8 w-16 bg-white/10 animate-pulse rounded" />
        ) : (
          <p className="text-4xl font-bold text-white">{value}</p>
        )}
      </div>
      <div className="text-[#BEF3DF]/50">
        {icon}
      </div>
    </div>
  );
}
