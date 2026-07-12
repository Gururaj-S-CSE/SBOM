import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Network,
  FileText,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { useEffect, useState } from "react";

function Sidebar() {
  const [hasAnalysis, setHasAnalysis] = useState(false);

  // Check localStorage for analysis on mount and when path updates
  useEffect(() => {
    const checkAnalysis = () => {
      const analysis = localStorage.getItem("analysis");
      setHasAnalysis(!!analysis);
    };

    checkAnalysis();
    // Listen for custom storage events or simple intervals to keep in sync
    window.addEventListener("storage", checkAnalysis);
    return () => window.removeEventListener("storage", checkAnalysis);
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Upload SBOM",
      path: "/upload",
      icon: <Upload size={18} />,
    },
    ...(hasAnalysis
      ? [
          {
            name: "Analysis Results",
            path: "/results",
            icon: <BarChart3 size={18} />,
          },
        ]
      : []),
    {
      name: "Dependency Graph",
      path: "/graph",
      icon: <Network size={18} />,
    },
    {
      name: "Reports",
      path: "/report",
      icon: <FileText size={18} />,
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-400 min-h-screen sticky top-0 flex flex-col border-r border-slate-800">
      {/* Brand Logo Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-850 bg-slate-950">
        <div className="bg-gradient-to-tr from-indigo-500 to-indigo-600 p-2.5 rounded-xl text-white shadow-md shadow-indigo-500/10">
          <ShieldCheck size={20} className="animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-base text-white tracking-wide leading-none">
            SBOM Analyzer
          </h1>
          <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase mt-1 block">
            Supply Chain Security
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "hover:bg-slate-800/60 hover:text-slate-200"
              }`
            }
          >
            <span className="transition-transform duration-200 group-hover:scale-105">
              {item.icon}
            </span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-slate-850 bg-slate-950/50 flex flex-col gap-1">
        <div className="text-[11px] text-slate-500 font-medium">
          SBOM Analyzer Platform
        </div>
        <div className="text-[10px] text-slate-600">
          v1.0.0 • Secure Build
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;