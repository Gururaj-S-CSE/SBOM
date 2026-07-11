import { Bell, UserCircle2 } from "lucide-react";

function Navbar() {
  return (
    <header className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 shadow-md">
      <h1 className="text-2xl font-bold text-cyan-400">
        🛡️ SBOM Analyzer
      </h1>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer hover:text-cyan-400" />
        <UserCircle2 size={32} />
      </div>
    </header>
  );
}

export default Navbar;