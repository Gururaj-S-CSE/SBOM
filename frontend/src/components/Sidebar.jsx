import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Network,
  FileText,
  ShieldCheck,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Upload SBOM",
      path: "/upload",
      icon: <Upload size={20} />,
    },
    {
      name: "Dependency Graph",
      path: "/graph",
      icon: <Network size={20} />,
    },
    {
      name: "Reports",
      path: "/report",
      icon: <FileText size={20} />,
    },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 min-h-screen shadow-sm">

      {/* Logo */}

      <div className="flex items-center gap-3 p-6 border-b border-gray-200">

        <div className="bg-blue-600 p-3 rounded-xl text-white">
          <ShieldCheck size={24} />
        </div>

        <div>
          <h1 className="font-bold text-xl text-gray-900">
            SBOM Analyzer
          </h1>

          <p className="text-sm text-gray-500">
            Supply Chain Security
          </p>
        </div>

      </div>

      {/* Navigation */}

      <nav className="p-5 space-y-2">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.icon}

            <span>{item.name}</span>
          </NavLink>
        ))}

      </nav>

      {/* Footer */}

      <div className="absolute bottom-6 left-6 text-xs text-gray-400">
        Version 1.0
      </div>

    </aside>
  );
}

export default Sidebar;