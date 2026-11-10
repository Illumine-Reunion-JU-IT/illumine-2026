'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Upload, LogOut, LayoutDashboard } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Manage Alumni', href: '/admin/alumni', icon: Users },
    { name: 'Import Data', href: '/admin/import', icon: Upload },
  ];

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[#070707] font-mono text-white mt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-black/40 border-r border-[#BEF3DF]/20 p-6 flex flex-col gap-6">
        <h2 className="text-[#BEF3DF] text-xl font-bold tracking-widest uppercase border-b border-[#BEF3DF]/20 pb-4">
          Admin_Panel
        </h2>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm tracking-wider uppercase transition-colors ${
                  isActive 
                    ? 'bg-[#BEF3DF]/10 text-[#BEF3DF] border-l-2 border-[#BEF3DF]' 
                    : 'text-gray-400 hover:text-[#BEF3DF] hover:bg-white/5 border-l-2 border-transparent'
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-3 px-4 py-3 text-sm tracking-wider uppercase text-red-400 hover:bg-red-400/10 transition-colors border-l-2 border-transparent hover:border-red-400"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
