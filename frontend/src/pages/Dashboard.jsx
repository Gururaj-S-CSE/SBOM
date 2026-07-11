import { Link } from "react-router-dom";
import { Upload } from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 bg-slate-100 min-h-screen p-8">
          <h2 className="text-3xl font-bold mb-8">
            SBOM Analyzer Dashboard
          </h2>

          {/* Dashboard Summary Cards */}
          <DashboardCards />

          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Welcome to SBOM Analyzer
            </h3>

            <p className="text-gray-600 leading-7 mb-6">
              Upload a CycloneDX Software Bill of Materials (SBOM) file to
              analyze software components, dependency relationships,
              vulnerabilities, license risks, and generate an interactive
              dependency graph.
            </p>

            <Link
              to="/upload"
              className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition"
            >
              <Upload size={20} />
              Upload SBOM
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;