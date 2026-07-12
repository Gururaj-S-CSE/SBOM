import { ShieldAlert, CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";

function LicenseTable({ licenses = [] }) {
  const getRiskBadge = (risk) => {
    const r = risk?.toLowerCase();
    switch (r) {
      case "low":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-md">
            <CheckCircle2 size={10} />
            LOW RISK
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-bold px-2 py-0.5 rounded-md">
            <AlertTriangle size={10} />
            MEDIUM RISK
          </span>
        );
      case "high":
        return (
          <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 border border-orange-100 text-[10px] font-bold px-2 py-0.5 rounded-md">
            <ShieldAlert size={10} />
            HIGH RISK
          </span>
        );
      case "critical":
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-100 text-[10px] font-bold px-2 py-0.5 rounded-md">
            <ShieldAlert size={10} />
            CRITICAL RISK
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-md">
            <HelpCircle size={10} />
            UNKNOWN
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            License Risks & Auditing
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">
            Risk rating for package licenses (e.g. restrictive copyleft vs permissive copyleft)
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/60 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <th className="px-6 py-3.5">Component</th>
              <th className="px-6 py-3.5">Assigned License</th>
              <th className="px-6 py-3.5">Legal Risk Level</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-150 text-xs text-slate-650">
            {licenses.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-slate-400 font-medium">
                  No license audits available.
                </td>
              </tr>
            ) : (
              licenses.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5 font-semibold text-slate-800">{item.component}</td>
                  <td className="px-6 py-3.5 font-semibold">
                    <span className="bg-slate-100 text-slate-650 border border-slate-200 px-2.5 py-1 rounded-lg font-mono text-[10px]">
                      {item.license}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    {getRiskBadge(item.risk)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LicenseTable;