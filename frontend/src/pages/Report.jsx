import { Printer, FileText } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Report() {
  const analysis = JSON.parse(localStorage.getItem("analysis"));
  const hasAnalysis = !!analysis;

  const handlePrint = () => {
    window.print();
  };

  const getRiskLevelBadge = (level) => {
    switch (level?.toUpperCase()) {
      case "LOW":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "MEDIUM":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "HIGH":
        return "bg-orange-50 text-orange-700 border-orange-100";
      case "CRITICAL":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-slate-50 text-slate-655 border-slate-200";
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen print:bg-white">
      {/* Hide navigation on print */}
      <div className="print:hidden">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="print:hidden">
          <Navbar 
            title="Executive Report" 
            subtitle={hasAnalysis ? `Compliance scorecard for ${analysis.application?.name || "BOM Package"}` : "Supply chain compliance and risk overview"} 
          />
        </div>

        <main className="flex-1 p-8 overflow-y-auto print:p-0 print:overflow-visible">
          {hasAnalysis ? (
            <div className="max-w-4xl mx-auto space-y-8 animate-fade-in print:space-y-6">
              
              {/* Header Action Row (Hidden on print) */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-5 print:hidden">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Executive Security Report</h2>
                  <p className="text-[11px] text-slate-500 font-medium">Compliance overview and supply chain posture auditing sheet</p>
                </div>
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 bg-indigo-650 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-sm cursor-pointer"
                >
                  <Printer size={14} />
                  Print Report
                </button>
              </div>

              {/* Printable header cover (Only visible on print) */}
              <div className="hidden print:flex items-center justify-between border-b-2 border-slate-805 pb-6">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">SBOM Security Assessment</h1>
                  <p className="text-xs text-slate-500 font-medium mt-1">Generated: {new Date().toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-indigo-600">SBOM Analyzer Suite</span>
                  <p className="text-[10px] text-slate-400 mt-0.5">Automated Risk Auditor</p>
                </div>
              </div>

              {/* 1. Project Information */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 print:border-none print:shadow-none print:p-0">
                <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 print:text-base print:border-slate-300">
                  1. Application Metadata
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider">Application Name</span>
                    <span className="text-slate-850 font-bold mt-1 block">{analysis.application?.name || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider">Application ID</span>
                    <span className="text-slate-650 font-mono mt-1 block truncate" title={analysis.application?.app_id}>{analysis.application?.app_id || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider">Criticality</span>
                    <span className="text-slate-850 font-bold mt-1 block">{analysis.application?.criticality || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider">Business Unit</span>
                    <span className="text-slate-850 font-bold mt-1 block">{analysis.application?.department || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider">Deployment Model</span>
                    <span className="text-slate-850 font-bold mt-1 block">{analysis.application?.deployment || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider">Base Language</span>
                    <span className="text-slate-850 font-bold mt-1 block">{analysis.application?.language || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider">Legal License Model</span>
                    <span className="text-slate-850 font-bold mt-1 block">{analysis.application?.license_model || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider">Lead Owner</span>
                    <span className="text-slate-850 font-bold mt-1 block">{analysis.application?.business_owner || "N/A"}</span>
                  </div>
                </div>
              </div>

              {/* 2. Security Overview & Scorecard */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 print:border-none print:shadow-none print:p-0">
                <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 print:text-base print:border-slate-300">
                  2. Risk Assessment Scorecard
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="bg-slate-50 border border-slate-200/40 rounded-xl p-5 text-center flex flex-col justify-between print:border-slate-200">
                    <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider block">Supply Chain Risk Score</span>
                    <p className="text-4xl font-extrabold text-indigo-650 my-2">{analysis.summary?.risk_score ?? 0}</p>
                    <span className="text-[10px] text-slate-450">Scale: 0 (Secure) to 100 (Critical)</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/40 rounded-xl p-5 text-center flex flex-col justify-between print:border-slate-200">
                    <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider block">Risk Severity Rating</span>
                    <div className="my-2 flex justify-center">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getRiskLevelBadge(analysis.summary?.risk_level)}`}>
                        {analysis.summary?.risk_level ?? "UNKNOWN"}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-450">Categorized risk threat vector level</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/40 rounded-xl p-5 text-center flex flex-col justify-between print:border-slate-200">
                    <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider block">High Threat Packages</span>
                    <p className="text-4xl font-extrabold text-rose-600 my-2">{analysis.summary?.high_risk_packages ?? 0}</p>
                    <span className="text-[10px] text-rose-500/80 font-medium">Requires immediate patch review</span>
                  </div>
                </div>
              </div>

              {/* 3. Component Statistics */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 print:border-none print:shadow-none print:p-0">
                <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 print:text-base print:border-slate-300">
                  3. Ingestion Inventory Metrics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/20">
                    <span className="text-slate-450 font-medium text-[10px] block uppercase">Total Components</span>
                    <span className="text-lg font-bold text-slate-800 mt-1 block">{analysis.summary?.total_components ?? 0}</span>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/20">
                    <span className="text-slate-450 font-medium text-[10px] block uppercase">Direct Connections</span>
                    <span className="text-lg font-bold text-slate-800 mt-1 block">{analysis.summary?.total_dependencies ?? 0}</span>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/20">
                    <span className="text-slate-455 font-medium text-[10px] block uppercase">Total CVE Advisories</span>
                    <span className="text-lg font-bold text-rose-600 mt-1 block">{analysis.summary?.total_vulnerabilities ?? 0}</span>
                  </div>
                  <div className="p-4 border border-slate-100 rounded-xl bg-slate-50/20">
                    <span className="text-slate-450 font-medium text-[10px] block uppercase">High Risk Licenses</span>
                    <span className="text-lg font-bold text-amber-600 mt-1 block">{analysis.summary?.high_risk_packages ?? 0}</span>
                  </div>
                </div>
              </div>

              {/* 4. SBOM Metadata */}
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 print:border-none print:shadow-none print:p-0">
                <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 print:text-base print:border-slate-300">
                  4. Metadata Verification
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider">Format Schema</span>
                    <span className="text-slate-805 font-bold mt-1 block">{analysis.metadata?.bomFormat || "CycloneDX"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider">Schema Version</span>
                    <span className="text-slate-800 font-mono mt-1 block">{analysis.metadata?.specVersion || "1.4"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider">BOM Release Version</span>
                    <span className="text-slate-800 font-mono mt-1 block">{analysis.metadata?.version || "1"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block uppercase text-[9px] tracking-wider">Serial Signature</span>
                    <span className="text-slate-650 font-mono mt-1 block truncate max-w-[150px]" title={analysis.metadata?.serialNumber}>
                      {analysis.metadata?.serialNumber || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-[calc(100vh-12rem)] max-w-sm mx-auto text-center space-y-4">
              <div className="bg-slate-100 border border-slate-200/50 p-4 rounded-full text-slate-400">
                <FileText size={36} className="text-indigo-500" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">No Assessment Report Available</h2>
              <p className="text-xs text-slate-550 leading-relaxed">
                Compliance risk score sheets require a parsed SBOM. Please upload an SBOM file to compile an assessment report.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Report;