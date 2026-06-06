'use client';

import { useEffect, useState } from 'react';
import { Users, Plus, Pencil, Trash2, X, Check, Loader2, Search } from 'lucide-react';

interface UserRecord {
  id: string;
  name: string;
  batch: string;
  department: string;
  company: string | null;
  linkedin: string | null;
  email: string;
  phone: string;
  role: string;
}

export default function ManageAlumniPage() {
  const [alumni, setAlumni] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  
  // Modal / Form state
  const [showModal, setShowModal] = useState(false);
  const [editingAlumnus, setEditingAlumnus] = useState<UserRecord | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    batch: '',
    department: 'IT',
    company: '',
    linkedin: '',
    email: '',
    phone: '',
    role: 'internal'
  });

  const fetchAlumni = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/alumni');
      if (!res.ok) throw new Error('Failed to fetch alumni');
      const data = await res.json();
      setAlumni(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching alumni');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleOpenAddModal = () => {
    setEditingAlumnus(null);
    setFormData({
      name: '',
      batch: '',
      department: 'IT',
      company: '',
      linkedin: '',
      email: '',
      phone: '',
      role: 'internal'
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (alumnus: UserRecord) => {
    setEditingAlumnus(alumnus);
    setFormData({
      name: alumnus.name,
      batch: alumnus.batch,
      department: alumnus.department,
      company: alumnus.company || '',
      linkedin: alumnus.linkedin || '',
      email: alumnus.email,
      phone: alumnus.phone,
      role: alumnus.role
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAlumnus(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const res = await fetch(`/api/admin/alumni?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete alumnus');
      }

      setAlumni(prev => prev.filter(item => item.id !== id));
    } catch (err: any) {
      alert(err.message || 'An error occurred');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || (!formData.email.trim() && !formData.phone.trim())) {
      setError('Name and at least one of Email or Phone are required.');
      return;
    }

    try {
      const isEditing = !!editingAlumnus;
      const url = '/api/admin/alumni';
      const method = isEditing ? 'PUT' : 'POST';
      const payload = isEditing 
        ? { ...formData, id: editingAlumnus.id }
        : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Operation failed');
      }

      if (isEditing) {
        setAlumni(prev => prev.map(item => item.id === editingAlumnus.id ? result : item));
      } else {
        setAlumni(prev => [result, ...prev]);
      }

      setShowModal(false);
      setEditingAlumnus(null);
    } catch (err: any) {
      setError(err.message || 'Operation failed');
    }
  };

  const filteredAlumni = alumni.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.phone.includes(query) ||
      item.batch.toLowerCase().includes(query) ||
      (item.company && item.company.toLowerCase().includes(query)) ||
      item.department.toLowerCase().includes(query)
    );
  });

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredAlumni.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} records?`)) return;

    try {
      setLoading(true);
      // In a real app, this should be a single bulk DELETE endpoint.
      // For now, we use a Promise.all over the existing endpoint
      await Promise.all(selectedIds.map(id => 
        fetch(`/api/admin/alumni?id=${id}`, { method: 'DELETE' })
      ));

      setAlumni(prev => prev.filter(item => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    } catch (err: any) {
      alert(err.message || 'An error occurred during bulk delete');
    } finally {
      setLoading(false);
    }
  };

  const exportData = (format: 'csv' | 'excel') => {
    const dataToExport = selectedIds.length > 0 
      ? filteredAlumni.filter(item => selectedIds.includes(item.id))
      : filteredAlumni;

    if (dataToExport.length === 0) return alert('No data to export');

    if (format === 'csv') {
      const headers = ['Name', 'Role', 'Batch', 'Department', 'Company', 'Email', 'Phone', 'LinkedIn'];
      const csvContent = [
        headers.join(','),
        ...dataToExport.map(row => [
          `"${row.name}"`, 
          row.role, 
          row.batch, 
          `"${row.department}"`, 
          `"${row.company || ''}"`, 
          row.email, 
          row.phone, 
          `"${row.linkedin || ''}"`
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'alumni_export.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (format === 'excel') {
      import('xlsx').then(XLSX => {
        const worksheet = XLSX.utils.json_to_sheet(dataToExport.map(row => ({
          Name: row.name,
          Role: row.role,
          Batch: row.batch,
          Department: row.department,
          Company: row.company || '',
          Email: row.email,
          Phone: row.phone,
          LinkedIn: row.linkedin || ''
        })));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Alumni");
        XLSX.writeFile(workbook, "alumni_export.xlsx");
      });
    }
  };

  return (
    <div className="space-y-6 font-mono">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold text-[#BEF3DF] tracking-widest uppercase">
          Manage Alumni Directory
        </h1>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-[#BEF3DF] hover:bg-white text-black font-bold text-xs uppercase px-4 py-2.5 transition-all duration-300 shrink-0"
          style={{ clipPath: 'polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)' }}
        >
          <Plus size={14} /> Add Record
        </button>
      </div>

      {/* Search, Filters, and Bulk Actions */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#BEF3DF]/50">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="SEARCH ALUMNI BY NAME, BATCH, EMAIL, PHONE, COMPANY..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-[#BEF3DF]/25 pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#BEF3DF] transition-colors text-xs uppercase tracking-wider"
            />
          </div>
          
          {/* Export Buttons */}
          <div className="flex gap-2 shrink-0">
            <button onClick={() => exportData('csv')} className="px-4 py-3 border border-white/10 hover:border-[#BEF3DF] text-xs uppercase tracking-widest text-gray-400 hover:text-[#BEF3DF] transition-colors bg-black/40">
              Export CSV
            </button>
            <button onClick={() => exportData('excel')} className="px-4 py-3 border border-white/10 hover:border-[#BEF3DF] text-xs uppercase tracking-widest text-gray-400 hover:text-[#BEF3DF] transition-colors bg-black/40">
              Export Excel
            </button>
          </div>
        </div>

        {/* Bulk Actions Menu (visible only when items are selected) */}
        {selectedIds.length > 0 && (
          <div className="bg-[#BEF3DF]/10 border border-[#BEF3DF]/30 p-3 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-[#BEF3DF] font-bold">
              {selectedIds.length} Record(s) Selected
            </span>
            <div className="flex gap-3">
              <button onClick={handleBulkDelete} className="text-xs uppercase tracking-widest bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-3 py-1.5 transition-colors flex items-center gap-2">
                <Trash2 size={14} /> Bulk Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-black/40 border border-[#BEF3DF]/10 rounded-sm overflow-x-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 text-gray-500 gap-3">
            <Loader2 className="animate-spin text-[#BEF3DF]" size={24} />
            <span className="text-xs uppercase tracking-widest">Loading Records...</span>
          </div>
        ) : filteredAlumni.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-xs uppercase tracking-widest">
            No alumni records found.
          </div>
        ) : (
          <table className="w-full border-collapse text-left text-xs uppercase tracking-wider">
            <thead>
              <tr className="border-b border-[#BEF3DF]/20 bg-white/5 text-[#BEF3DF]/80">
                <th className="p-4">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={selectedIds.length === filteredAlumni.length && filteredAlumni.length > 0}
                    className="accent-[#BEF3DF]" 
                  />
                </th>
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Role</th>
                <th className="p-4 font-bold">Batch</th>
                <th className="p-4 font-bold">Dept</th>
                <th className="p-4 font-bold">Company</th>
                <th className="p-4 font-bold">Email</th>
                <th className="p-4 font-bold">Phone</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-300">
              {filteredAlumni.map((item) => (
                <tr key={item.id} className={`transition-colors ${selectedIds.includes(item.id) ? 'bg-[#BEF3DF]/5' : 'hover:bg-white/5'}`}>
                  <td className="p-4">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(item.id)}
                      onChange={() => handleSelectRow(item.id)}
                      className="accent-[#BEF3DF]"
                    />
                  </td>
                  <td className="p-4 font-bold text-white whitespace-nowrap">{item.name}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 border ${
                      item.role === 'admin' 
                        ? 'border-red-500/30 bg-red-500/10 text-red-400' 
                        : 'border-[#BEF3DF]/30 bg-[#BEF3DF]/10 text-[#BEF3DF]'
                    }`}>
                      {item.role}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap">{item.batch}</td>
                  <td className="p-4 whitespace-nowrap">{item.department}</td>
                  <td className="p-4 whitespace-nowrap truncate max-w-[150px]" title={item.company || '-'}>
                    {item.company || '-'}
                  </td>
                  <td className="p-4 lowercase whitespace-nowrap">{item.email}</td>
                  <td className="p-4 whitespace-nowrap">{item.phone}</td>
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1 text-gray-400 hover:text-[#BEF3DF] transition-colors"
                        title="Edit Record"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div 
            className="w-full max-w-lg bg-[#070707] border border-[#BEF3DF]/30 p-8 shadow-[0_0_30px_rgba(190,243,223,0.15)] relative"
            style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 5%, 100% 100%, 5% 100%, 0% 95%)' }}
          >
            <div className="absolute top-0 right-0 w-4 h-[2px] bg-[#BEF3DF]" />
            <div className="absolute bottom-0 left-0 w-4 h-[2px] bg-[#BEF3DF]" />

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#BEF3DF] uppercase tracking-widest">
                {editingAlumnus ? 'Edit Record' : 'Add Record'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-[#BEF3DF] transition-colors">
                <X size={20} />
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs uppercase tracking-wider">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#BEF3DF]/70 mb-1 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-[#BEF3DF]"
                  />
                </div>
                <div>
                  <label className="block text-[#BEF3DF]/70 mb-1 uppercase tracking-wider">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-[#BEF3DF]"
                  >
                    <option value="internal">internal (Alumni/Student)</option>
                    <option value="admin">admin (Administrator)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#BEF3DF]/70 mb-1 uppercase tracking-wider">Batch/Grad Year *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2026"
                    value={formData.batch}
                    onChange={(e) => setFormData(prev => ({ ...prev, batch: e.target.value }))}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-[#BEF3DF]"
                  />
                </div>
                <div>
                  <label className="block text-[#BEF3DF]/70 mb-1 uppercase tracking-wider">Department *</label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-[#BEF3DF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#BEF3DF]/70 mb-1 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-[#BEF3DF]"
                  />
                </div>
                <div>
                  <label className="block text-[#BEF3DF]/70 mb-1 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-[#BEF3DF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#BEF3DF]/70 mb-1 uppercase tracking-wider">Company / Org</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-[#BEF3DF]"
                  />
                </div>
                <div>
                  <label className="block text-[#BEF3DF]/70 mb-1 uppercase tracking-wider">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.linkedin}
                    onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                    className="w-full bg-black border border-white/10 px-3 py-2 text-white focus:outline-none focus:border-[#BEF3DF]"
                  />
                </div>
              </div>

              <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
                Email or Phone must be provided for each record.
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-white/20 hover:border-white text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#BEF3DF] text-black font-bold hover:bg-white transition-colors"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
