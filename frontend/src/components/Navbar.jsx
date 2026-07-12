import {
  UserCircle2,
  CalendarDays,
  Shield,
} from "lucide-react";
import { useLocation } from "react-router-dom";

function Navbar({ title, subtitle }) {
  const location = useLocation();
  const path = location.pathname;

  let pageTitle = title;
  let pageSubtitle = subtitle;

  if (!pageTitle) {
    if (path === "/") {
      pageTitle = "Dashboard";
      pageSubtitle = "Supply chain security overview & metrics";
    } else if (path === "/upload") {
      pageTitle = "Upload SBOM";
      pageSubtitle = "Ingest CycloneDX or SPDX bills of materials";
    } else if (path === "/results") {
      pageTitle = "Analysis Results";
      pageSubtitle = "Component risks, vulnerabilities, and licensing";
    } else if (path === "/graph") {
      pageTitle = "Dependency Graph";
      pageSubtitle = "Interactive dependency relationships & attack paths";
    } else if (path === "/report") {
      pageTitle = "Executive Report";
      pageSubtitle = "High-level compliance & threat summary";
    } else {
      pageTitle = "SBOM Analyzer";
      pageSubtitle = "Software Supply Chain Risk Scorer";
    }
  }

  const today = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-30">
      {/* Contextual Title Area */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex bg-indigo-50 text-indigo-600 p-2 rounded-lg border border-indigo-100">
          <Shield size={18} />
        </div>
        <div>
          <h1 className="text-base font-semibold text-slate-900 leading-tight">
            {pageTitle}
          </h1>
          <p className="text-[11px] text-slate-500 font-medium">
            {pageSubtitle}
          </p>
        </div>
      </div>

      {/* Right User & Meta Area */}
      <div className="flex items-center gap-6">
        {/* Date Display */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200/50 px-3 py-1.5 rounded-lg">
          <CalendarDays size={14} className="text-slate-400" />
          <span>{today}</span>
        </div>

        {/* Vertical Divider */}
        <div className="h-6 w-px bg-slate-200"></div>

        {/* User profile */}
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <UserCircle2 size={30} className="text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-none">
              Security Analyst
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;