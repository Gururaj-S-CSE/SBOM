import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Network,
  FileText,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-800 text-white min-h-screen p-5">
      <h2 className="text-xl font-semibold mb-8">Navigation</h2>

      <nav className="flex flex-col gap-4">

        <Link to="/" className="flex items-center gap-3 hover:text-cyan-400">
          <LayoutDashboard size={20}/>
          Dashboard
        </Link>

        <Link to="/upload" className="flex items-center gap-3 hover:text-cyan-400">
          <Upload size={20}/>
          Upload SBOM
        </Link>

        <Link to="/graph" className="flex items-center gap-3 hover:text-cyan-400">
          <Network size={20}/>
          Dependency Graph
        </Link>

        <Link to="/report" className="flex items-center gap-3 hover:text-cyan-400">
          <FileText size={20}/>
          Reports
        </Link>

      </nav>
    </aside>
  );
}

export default Sidebar;