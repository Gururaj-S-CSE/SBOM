import { useState, useEffect } from "react";
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
import { LayoutDashboard, Network, ShieldAlert, Scale, Search, X, Layers, AlertTriangle, CheckCircle2, Cpu } from "lucide-react";
import api from "../api/api";

function Results() {
  const analysis = JSON.parse(localStorage.getItem("analysis"));
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  const [correlationData, setCorrelationData] = useState(null);
  const [correlationLoading, setCorrelationLoading] = useState(false);
  const [selectedPkgName, setSelectedPkgName] = useState("");
  const [selectedAppId, setSelectedAppId] = useState("");

  const fetchCorrelations = async () => {
    try {
      setCorrelationLoading(true);
      const response = await api.get("/correlations");
      setCorrelationData(response.data);
      
      // Select default package and app for the dropdowns
      if (response.data) {
        const vulnPkgs = response.data.all_packages.filter(p => p.vulnerable);
        if (vulnPkgs.length > 0) {
          setSelectedPkgName(vulnPkgs[0].name);
        }
        if (response.data.applications.length > 0) {
          setSelectedAppId(response.data.applications[0].app_id);
        }
      }
    } catch (err) {
      console.error("Failed to fetch correlation data:", err);
    } finally {
      setCorrelationLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "correlation" && !correlationData) {
      fetchCorrelations();
    }
  }, [activeTab, correlationData]);

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
    { id: "correlation", label: "Multi-System Correlation", icon: <Layers size={15} /> },
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

            {activeTab === "correlation" && (
              <div className="space-y-8 animate-fade-in">
                {/* Intro Card */}
                <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-slate-800 shadow-md flex items-center justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold flex items-center gap-2">
                      <Layers size={18} className="text-indigo-400" />
                      Cross-System Security Risk Linking
                    </h3>
                    <p className="text-xs text-slate-350 max-w-2xl leading-relaxed">
                      Supply chain vulnerability correlation evaluates package dependencies across all registered application catalogs. Easily locate shared vulnerability vector footprints and query risk overlap propagation across system environments.
                    </p>
                  </div>
                </div>

                {correlationLoading ? (
                  <div className="bg-white rounded-2xl border border-slate-200/60 p-12 text-center text-slate-455 font-semibold flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    Loading cross-application risk mapping...
                  </div>
                ) : correlationData ? (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <div className="bg-white rounded-2xl border border-slate-200/60 p-5 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Monitored Systems</span>
                          <h4 className="text-2xl font-extrabold text-slate-800">{correlationData.applications?.length || 0}</h4>
                        </div>
                        <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shrink-0"><Cpu size={20} /></div>
                      </div>

                      <div className="bg-white rounded-2xl border border-slate-200/60 p-5 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Shared Vulnerable Packages</span>
                          <h4 className="text-2xl font-extrabold text-rose-600">{correlationData.shared_vulnerable?.length || 0}</h4>
                        </div>
                        <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 shrink-0"><AlertTriangle size={20} /></div>
                      </div>

                      <div className="bg-white rounded-2xl border border-slate-200/60 p-5 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider block">Total Unique Packages</span>
                          <h4 className="text-2xl font-extrabold text-emerald-600">{correlationData.all_packages?.length || 0}</h4>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0"><CheckCircle2 size={20} /></div>
                      </div>
                    </div>

                    {/* Interactive Q&A Panel */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      
                      {/* Q1: Is this vulnerable package used in other applications? */}
                      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Is this vulnerable package used in any other applications?
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Select a library to discover its blast radius across other environments</p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <select
                              value={selectedPkgName}
                              onChange={(e) => setSelectedPkgName(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-3 rounded-xl cursor-pointer"
                            >
                              <option value="">Select a vulnerable package...</option>
                              {correlationData.all_packages.filter(p => p.vulnerable).map((pkg) => (
                                <option key={pkg.name} value={pkg.name}>
                                  {pkg.name} ({pkg.severity} severity)
                                </option>
                              ))}
                            </select>
                          </div>

                          {selectedPkgName ? (
                            (() => {
                              const pkg = correlationData.all_packages.find(p => p.name.toLowerCase() === selectedPkgName.toLowerCase());
                              if (!pkg) return null;
                              return (
                                <div className="space-y-3">
                                  <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4 text-xs space-y-2">
                                    <div className="flex justify-between items-center">
                                      <span className="font-semibold text-slate-800">Library: {pkg.name}</span>
                                      <span className="font-bold text-rose-600 text-[10px] bg-rose-50 border border-rose-100 px-2 py-0.5 rounded uppercase">
                                        {pkg.severity} RISK
                                      </span>
                                    </div>
                                    <p className="text-[10px] text-slate-400">CVEs: {pkg.cves?.join(", ") || "N/A"}</p>
                                  </div>

                                  <div className="space-y-2">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Affected Applications</span>
                                    <div className="divide-y divide-slate-100 border border-slate-200/60 rounded-xl overflow-hidden bg-white">
                                      {pkg.apps.map((app) => (
                                        <div key={app.app_id} className="flex justify-between items-center p-3 text-xs">
                                          <div className="flex flex-col">
                                            <span className="font-semibold text-slate-800">{app.app_name}</span>
                                            <span className="text-[9px] text-slate-400 font-mono mt-0.5">{app.app_id}</span>
                                          </div>
                                          <span className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                                            v{app.version}
                                          </span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              );
                            })()
                          ) : (
                            <p className="text-center py-6 text-slate-405 text-xs italic">Select a package to see results</p>
                          )}
                        </div>
                      </div>

                      {/* Q2: Which applications share the same vulnerable dependency? */}
                      <div className="bg-white rounded-2xl border border-slate-200/60 p-6 space-y-4">
                        <div className="border-b border-slate-100 pb-3">
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                            Which applications share the same vulnerable dependency?
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">Find systems exposed to similar supply chain library threats</p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <select
                              value={selectedAppId}
                              onChange={(e) => setSelectedAppId(e.target.value)}
                              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-3 rounded-xl cursor-pointer"
                            >
                              <option value="">Select an application...</option>
                              {correlationData.applications.map((app) => (
                                <option key={app.app_id} value={app.app_id}>
                                  {app.app_name} ({app.criticality} criticality)
                                </option>
                              ))}
                            </select>
                          </div>

                          {selectedAppId ? (
                            (() => {
                              // Find all vulnerable packages used by selectedAppId
                              const currentAppVulnPkgs = correlationData.all_packages.filter(
                                pkg => pkg.vulnerable && pkg.apps.some(a => a.app_id === selectedAppId)
                              );

                              if (currentAppVulnPkgs.length === 0) {
                                return <p className="text-center py-6 text-emerald-600 text-xs font-semibold">🎉 No vulnerable packages are used by this application.</p>;
                              }

                              // Find other applications that use any of these vulnerable packages
                              const sharedMap = {};
                              currentAppVulnPkgs.forEach(pkg => {
                                pkg.apps.forEach(a => {
                                  if (a.app_id !== selectedAppId) {
                                    if (!sharedMap[a.app_id]) {
                                      sharedMap[a.app_id] = {
                                        app_id: a.app_id,
                                        app_name: a.app_name,
                                        shared_packages: []
                                      };
                                    }
                                    sharedMap[a.app_id].shared_packages.push({
                                      name: pkg.name,
                                      version: a.version,
                                      severity: pkg.severity
                                    });
                                  }
                                });
                              });

                              const sharedApps = Object.values(sharedMap);

                              return (
                                <div className="space-y-4">
                                  <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4 text-xs">
                                    <span className="font-bold text-rose-700 uppercase block mb-1">Active Exposure</span>
                                    This app uses <strong className="text-rose-700">{currentAppVulnPkgs.length}</strong> vulnerable package(s): {currentAppVulnPkgs.map(p => p.name).join(", ")}.
                                  </div>

                                  <div className="space-y-2">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Sharing Applications</span>
                                    {sharedApps.length > 0 ? (
                                      <div className="divide-y divide-slate-100 border border-slate-200/60 rounded-xl overflow-hidden bg-white max-h-56 overflow-y-auto">
                                        {sharedApps.map((app) => (
                                          <div key={app.app_id} className="p-3 text-xs space-y-2">
                                            <div className="flex justify-between items-center">
                                              <div className="flex flex-col">
                                                <span className="font-semibold text-slate-800">{app.app_name}</span>
                                                <span className="text-[9px] text-slate-400 mt-0.5">{app.app_id}</span>
                                              </div>
                                              <span className="bg-rose-100 border border-rose-200 text-rose-700 text-[9px] font-bold px-2 py-0.5 rounded">
                                                {app.shared_packages.length} Shared Vulnerability
                                              </span>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                              {app.shared_packages.map(p => (
                                                <span key={p.name} className="bg-slate-100 text-slate-655 border border-slate-200 text-[9px] font-medium px-2 py-0.5 rounded">
                                                  {p.name} (v{p.version})
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-center py-6 text-slate-400 text-xs italic">No other applications share vulnerable packages with this system.</p>
                                    )}
                                  </div>
                                </div>
                              );
                            })()
                          ) : (
                            <p className="text-center py-6 text-slate-400 text-xs italic">Select an application to see results</p>
                          )}
                        </div>
                      </div>

                    </div>

                    {/* Shared Vulnerable Packages Inventory Table */}
                    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100">
                        <h3 className="text-sm font-bold text-slate-800">
                          Cross-Application Vulnerable Packages Inventory
                        </h3>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Overview of all vulnerable libraries shared across multiple software applications
                        </p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200/60 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              <th className="px-6 py-3.5">Package</th>
                              <th className="px-6 py-3.5">Severity</th>
                              <th className="px-6 py-3.5">CVE IDs</th>
                              <th className="px-6 py-3.5">Systems Sharing</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-150 text-xs text-slate-650">
                            {correlationData.shared_vulnerable?.length === 0 ? (
                              <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-slate-400 font-medium">
                                  No shared vulnerable dependencies identified across systems.
                                </td>
                              </tr>
                            ) : (
                              correlationData.shared_vulnerable.map((pkg) => (
                                <tr key={pkg.name} className="hover:bg-slate-50/50 transition-colors">
                                  <td className="px-6 py-3.5 font-bold text-slate-800">{pkg.name}</td>
                                  <td className="px-6 py-3.5">
                                    <span className={`inline-flex items-center gap-1 font-bold text-[9px] px-2 py-0.5 border rounded-md ${
                                      pkg.severity === "CRITICAL" || pkg.severity === "HIGH"
                                        ? "bg-rose-50 text-rose-700 border-rose-100"
                                        : "bg-amber-50 text-amber-700 border-amber-100"
                                    }`}>
                                      {pkg.severity}
                                    </span>
                                  </td>
                                  <td className="px-6 py-3.5 font-mono text-[10px] text-slate-450">{pkg.cves?.join(", ") || "N/A"}</td>
                                  <td className="px-6 py-3.5">
                                    <div className="flex flex-wrap gap-1.5">
                                      {pkg.apps.map(a => (
                                        <span key={a.app_id} className="bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold px-2 py-0.5 rounded text-[9px]">
                                          {a.app_name} (v{a.version})
                                        </span>
                                      ))}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Systems Posture Table */}
                    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
                      <div className="px-6 py-5 border-b border-slate-100">
                        <h3 className="text-sm font-bold text-slate-800">
                          Cross-Application Vulnerability Posture
                        </h3>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Overview of the relative risk profile and library counts for all monitored catalog applications
                        </p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                          <thead>
                            <tr className="bg-slate-50 border-b border-slate-200/60 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                              <th className="px-6 py-3.5">App Name</th>
                              <th className="px-6 py-3.5">ID</th>
                              <th className="px-6 py-3.5">Criticality</th>
                              <th className="px-6 py-3.5">Total Dependencies</th>
                              <th className="px-6 py-3.5">Total CVEs</th>
                              <th className="px-6 py-3.5">High/Critical CVEs</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-150 text-xs text-slate-650">
                            {correlationData.applications.map((app) => (
                              <tr key={app.app_id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-3.5 font-bold text-slate-800">{app.app_name}</td>
                                <td className="px-6 py-3.5 font-mono text-[10px] text-slate-450">{app.app_id}</td>
                                <td className="px-6 py-3.5">
                                  <span className={`inline-flex items-center gap-1 font-bold text-[9px] px-2 py-0.5 border rounded-md ${
                                    app.criticality === "CRITICAL"
                                      ? "bg-rose-50 text-rose-700 border-rose-100"
                                      : app.criticality === "HIGH"
                                      ? "bg-orange-50 text-orange-700 border-orange-100"
                                      : "bg-amber-50 text-amber-700 border-amber-100"
                                  }`}>
                                    {app.criticality}
                                  </span>
                                </td>
                                <td className="px-6 py-3.5 font-semibold text-slate-800">{app.total_dependencies}</td>
                                <td className="px-6 py-3.5 font-semibold text-rose-600">
                                  {app.total_vulnerabilities > 0 ? `${app.total_vulnerabilities} CVEs` : "0 (Secure)"}
                                </td>
                                <td className="px-6 py-3.5 font-semibold text-rose-700">
                                  {app.high_critical_vulnerabilities > 0 ? `${app.high_critical_vulnerabilities} High/Crit` : "0"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-center py-12 text-slate-400 text-xs italic">Unable to load correlation data</p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Results;