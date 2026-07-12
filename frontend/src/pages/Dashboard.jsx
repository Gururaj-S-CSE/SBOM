import { Link } from "react-router-dom";
import { Upload, ArrowRight, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";

function Dashboard() {
  const analysis = JSON.parse(localStorage.getItem("analysis"));
  const hasAnalysis = !!analysis;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          title="Dashboard" 
          subtitle={hasAnalysis ? `Active Analysis: ${analysis.application?.name || "BOM File"}` : "Get started with software supply chain scanning"}
        />

        <main className="flex-1 p-8 overflow-y-auto">
          {hasAnalysis ? (
            <div className="space-y-8 animate-fade-in">
              {/* Active analysis banner */}
              <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-8 text-white border border-slate-800 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    Analysis Active
                  </span>
                  <h3 className="text-xl font-bold mt-3">
                    SBOM Analysis for {analysis.application?.name || "Loaded Package"}
                  </h3>
                  <p className="text-xs text-slate-350 mt-1 max-w-xl">
                    Review vulnerabilities, licensing risks, and dependency graphs. Last analyzed project is ready to view.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link
                    to="/results"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition duration-200"
                  >
                    View Results
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    to="/upload"
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl border border-slate-700/50 transition duration-200"
                  >
                    Upload New
                  </Link>
                </div>
              </div>

              {/* Active Project Metrics Header */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                  Active Analysis Scorecard
                </h4>
                <DashboardCards summary={analysis.summary} />
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-12 py-8 animate-fade-in">
              {/* Welcome Section */}
              <div className="text-center space-y-4">
                <div className="inline-flex bg-indigo-50 text-indigo-600 border border-indigo-100 p-3 rounded-full mb-2">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  Welcome to SBOM Analyzer
                </h2>
                <p className="text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
                  Evaluate and secure your software supply chain by parsing CycloneDX and SPDX files. Instantly audit components, licenses, vulnerabilities, and project health.
                </p>
                <div className="pt-4">
                  <Link
                    to="/upload"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl shadow-md shadow-indigo-600/10 transition duration-200"
                  >
                    <Upload size={16} />
                    Upload SBOM File
                  </Link>
                </div>
              </div>

              {/* Features Steps */}
              <div className="grid md:grid-cols-3 gap-6 pt-6">
                <div className="bg-white rounded-2xl border border-slate-200/50 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="bg-slate-50 border border-slate-100 text-slate-650 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm">
                      01
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm">Ingest Bill of Materials</h3>
                    <p className="text-xs text-slate-500 leading-normal">
                      Drop standard CycloneDX or SPDX JSON reports. We map out components, library structures, and dependency relations.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/50 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="bg-slate-50 border border-slate-100 text-slate-650 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm">
                      02
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm">Vulnerability & License Scan</h3>
                    <p className="text-xs text-slate-500 leading-normal">
                      Audit dependencies against known security threats and evaluate licensing risk categories (e.g. restrictive copyleft vs permissive).
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/50 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="bg-slate-50 border border-slate-100 text-slate-650 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm">
                      03
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm">Remediation Playbook</h3>
                    <p className="text-xs text-slate-500 leading-normal">
                      Explore supply chain graphs, identify vulnerable attack paths, and generate checklist playbooks to upgrade libraries safely.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;