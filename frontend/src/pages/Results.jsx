import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";
import ComponentTable from "../components/ComponentTable";
import DependencyGraph from "../components/DependencyGraph";
import LicenseTable from "../components/LicenseTable";
import VulnerabilityTable from "../components/VulnerabilityTable";
import MaintenanceTable from "../components/MaintenanceTable";
import AttackPath from "../components/AttackPath";
import AlertDashboard from "../components/AlertDashboard";
import RemediationPlaybook from "../components/RemediationPlaybook";
import { LayoutDashboard, Network, ShieldAlert, Scale, Search, X } from "lucide-react";

function Results() {
  const analysis = JSON.parse(localStorage.getItem("analysis"));
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  if (!analysis) {
    return (
      <div className="flex bg-slate-50 min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar title="Analysis Results" subtitle="Detailed security analysis" />
          <main className="flex-1 flex flex-col justify-center items-center p-8">
            <div className="text-center space-y-4 max-w-sm">
              <div className="inline-flex bg-rose-50 text-rose-600 border border-rose-100 p-4 rounded-full">
                <ShieldAlert size={36} />
              </div>
              <h2 className="text-lg font-bold text-slate-800">No SBOM Analysis Found</h2>
              <p className="text-xs text-slate-550 leading-relaxed">
                You haven't uploaded or analyzed an SBOM file yet. Please visit the upload page to begin scanning.
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Real-time filtering based on search query
  const filteredComponents = (analysis.components || []).filter((comp) =>
    comp.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.licenses?.some((lic) => lic.toLowerCase().includes(searchQuery.toLowerCase())) ||
    comp.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredVulnerabilities = (analysis.vulnerabilities || []).filter((pkg) =>
    pkg.component?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.vulnerabilities?.some(
      (vuln) =>
        vuln.cve_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vuln.severity?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredLicenses = (analysis.licenses || []).filter((item) =>
    item.component?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.license?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.risk?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMaintenance = (analysis.maintenance || []).filter((item) =>
    item.component?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.maintenance?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { id: "overview", label: "Overview & Scorecard", icon: <LayoutDashboard size={15} /> },
    { id: "dependencies", label: "Components & Graph", icon: <Network size={15} /> },
    { id: "security", label: "Vulnerability Scan", icon: <ShieldAlert size={15} /> },
    { id: "compliance", label: "Compliance & Health", icon: <Scale size={15} /> },
  ];

  const getCriticalityBadgeColor = (criticality) => {
    switch (criticality?.toUpperCase()) {
      case "HIGH":
        return "bg-rose-50 text-rose-700 border-rose-100";
      case "MEDIUM":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "LOW":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          title="Analysis Results" 
          subtitle={`Report generated for ${analysis.application?.name || "BOM Package"}`} 
        />

        <main className="flex-1 p-8 overflow-y-auto space-y-8 max-w-[1600px] w-full mx-auto">
          {/* Application Metadata Card */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-600"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md">
                  Target System
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-2">
                  {analysis.application?.name || "Unknown Application"}
                </h2>
                <p className="text-[11px] text-slate-400 font-medium font-mono mt-0.5">
                  UUID: {analysis.application?.app_id || "N/A"}
                </p>
              </div>

              <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${getCriticalityBadgeColor(analysis.application?.criticality)}`}>
                {analysis.application?.criticality || "UNKNOWN"} CRITICALITY
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 pt-5">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Business Owner</span>
                <span className="text-xs font-semibold text-slate-700 mt-1 block">{analysis.application?.business_owner || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Department</span>
                <span className="text-xs font-semibold text-slate-700 mt-1 block">{analysis.application?.department || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Deployment</span>
                <span className="text-xs font-semibold text-slate-700 mt-1 block">{analysis.application?.deployment || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Language</span>
                <span className="text-xs font-semibold text-slate-700 mt-1 block">{analysis.application?.language || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">License Model</span>
                <span className="text-xs font-semibold text-slate-700 mt-1 block">{analysis.application?.license_model || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Search and Tabs Container */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-3">
            {/* Minimalist Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Real-time search filter */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450" size={14} />
              <input
                type="text"
                placeholder="Search packages, CVEs, licenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-250 rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-all"
                  title="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Active Tab Panel */}
          <div className="space-y-8 transition-opacity duration-200">
            {activeTab === "overview" && (
              <div className="space-y-8 animate-fade-in">
                {/* Metric scorecard */}
                <DashboardCards summary={analysis.summary} />
                
                {/* Live alerts dashboard */}
                <AlertDashboard vulnerabilities={analysis.vulnerabilities} />
              </div>
            )}

            {activeTab === "dependencies" && (
              <div className="space-y-8 animate-fade-in">
                {/* Dependency Graph Component */}
                <DependencyGraph graph={analysis.graph} />
                
                {/* Components Listing Table */}
                <ComponentTable components={filteredComponents} />
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8 animate-fade-in">
                {/* Vulnerability Report Table */}
                <VulnerabilityTable vulnerabilities={filteredVulnerabilities} />

                {/* Attack Path Visualizations */}
                <AttackPath attackPaths={analysis.attack_paths || []} />

                {/* Playbooks */}
                <RemediationPlaybook vulnerabilities={analysis.vulnerabilities || []} />
              </div>
            )}

            {activeTab === "compliance" && (
              <div className="space-y-8 animate-fade-in">
                {/* Maintenance Health Status */}
                <MaintenanceTable maintenance={filteredMaintenance} />

                {/* License Analysis and Risk Table */}
                <LicenseTable licenses={filteredLicenses} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Results;