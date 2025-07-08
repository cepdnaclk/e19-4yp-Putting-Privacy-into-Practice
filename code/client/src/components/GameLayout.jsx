export default function GameLayout({ children }) {
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-900 via-[#22284e] to-slate-900 py-7 text-center">
      {children}
    </div>
  );
}
