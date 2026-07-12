import { Activity, ShieldAlert, HelpCircle } from "lucide-react";

function MaintenanceTable({ maintenance = [] }) {
  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    switch (s) {
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
            <Activity size={10} />
            ACTIVE
          </span>
        );
      case "UNMAINTAINED":
        return (
          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-100 text-[10px] font-bold px-2.5 py-0.5 rounded-md">
            <ShieldAlert size={10} />
            DEPRECATED / STALE
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-md">
            <HelpCircle size={10} />
            {status || "UNKNOWN"}
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Maintenance Health Auditing
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">
            Scans package release activity and identifies unmaintained/outdated libraries
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/60 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <th className="px-6 py-3.5">Component</th>
              <th className="px-6 py-3.5">Activity Status</th>
              <th className="px-6 py-3.5">Last Release Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-150 text-xs text-slate-650">
            {maintenance.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-slate-400 font-medium">
                  No maintenance audits available.
                </td>
              </tr>
            ) : (
              maintenance.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3.5 font-semibold text-slate-800">{item.component}</td>
                  
                  <td className="px-6 py-3.5">
                    {getStatusBadge(item.maintenance)}
                  </td>

                  <td className="px-6 py-3.5 font-mono text-slate-500 font-medium">
                    {item.last_updated || "N/A"}
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

export default MaintenanceTable;