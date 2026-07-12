import { ShieldAlert, CheckCircle2, AlertTriangle } from "lucide-react";

function AlertDashboard({ vulnerabilities = [] }) {
  const alerts = vulnerabilities.filter((pkg) => pkg.has_vulnerabilities);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <ShieldAlert size={16} className="text-rose-500" />
            Live Security Alerts
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">
            Active vulnerability alerts affecting dependencies in this project
          </p>
        </div>
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
          alerts.length === 0 
            ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
            : "bg-rose-50 text-rose-700 border border-rose-100"
        }`}>
          {alerts.length === 0 ? "SECURE" : `${alerts.length} COMPONENT ALERTS`}
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
          <div className="bg-emerald-50 text-emerald-600 p-3 rounded-full border border-emerald-100">
            <CheckCircle2 size={24} />
          </div>
          <h4 className="text-xs font-semibold text-slate-700">No Active Supply Chain Alerts</h4>
          <p className="text-[10px] text-slate-400 max-w-xs leading-relaxed">
            All audited package dependencies conform to secure standards. No active CVE advisories have been flag-triggered.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {alerts.map((pkg, index) =>
            pkg.vulnerabilities.map((vuln, i) => (
              <div
                key={`${index}-${i}`}
                className="relative bg-slate-50 hover:bg-slate-100/50 border border-slate-200/60 rounded-xl p-4 transition-all duration-200 flex gap-3 group"
              >
                <div className={`p-2 rounded-lg h-fit ${
                  vuln.severity === "CRITICAL" || vuln.severity === "HIGH"
                    ? "bg-rose-100 text-rose-600 border border-rose-200/50"
                    : "bg-amber-100 text-amber-600 border border-amber-200/50"
                }`}>
                  <AlertTriangle size={15} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-800 truncate">
                      {pkg.component}
                    </h4>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      vuln.severity === "CRITICAL"
                        ? "bg-rose-100 text-rose-700"
                        : vuln.severity === "HIGH"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {vuln.severity}
                    </span>
                  </div>
                  
                  <p className="text-[10px] font-mono font-semibold text-indigo-600 mt-1 flex items-center gap-1">
                    <span>{vuln.cve_id}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">CVSS {vuln.cvss_score}</span>
                  </p>
                  
                  {vuln.patch_available && (
                    <span className="inline-flex text-[9px] font-semibold text-emerald-650 bg-emerald-50 px-1.5 py-0.5 rounded mt-2 border border-emerald-100/50">
                      Remediation Available
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AlertDashboard;