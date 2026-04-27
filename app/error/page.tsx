export default function ErrorPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white flex items-center justify-center px-6">
      <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl shadow-black/30">
        <h1 className="text-3xl font-semibold tracking-tight">Page Error</h1>
        <p className="mt-4 text-sm text-slate-300">An unexpected error occurred.</p>
      </div>
    </main>
  );
}
