import { ChevronRight, ShieldAlert, AlertTriangle } from "lucide-react";

function AttackPath({ attackPaths = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
        <div className="bg-rose-50 text-rose-600 p-2 rounded-lg border border-rose-100/50">
          <ShieldAlert size={16} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Critical Attack Paths
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">
            Visualizing package chain propagation paths that expose the system to vulnerabilities
          </p>
        </div>
      </div>

      {attackPaths.length === 0 ? (
        <div className="text-center py-6 text-slate-400 text-xs font-semibold">
          ✅ No critical attack paths detected.
        </div>
      ) : (
        <div className="space-y-4">
          {attackPaths.map((path, index) => (
            <div
              key={index}
              className="border border-slate-200/60 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3.5">
                <span className="bg-slate-900 text-white text-[9px] font-bold px-2 py-0.5 rounded">
                  CHAIN #{index + 1}
                </span>
                <span className="text-[10px] font-semibold text-rose-600 flex items-center gap-1">
                  <AlertTriangle size={12} />
                  Risk Exposure Path
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {path.path.map((node, i) => {
                  const isFirst = i === 0;
                  const isLast = i === path.path.length - 1;
                  
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`px-3 py-1.5 rounded-xl font-mono text-[10px] font-semibold border transition-colors ${
                        isLast
                          ? "bg-rose-50 text-rose-700 border-rose-200"
                          : isFirst
                          ? "bg-indigo-50 text-indigo-700 border-indigo-150"
                          : "bg-white text-slate-700 border-slate-250"
                      }`}>
                        {node}
                      </div>

                      {!isLast && (
                        <span className="text-slate-350 flex items-center justify-center">
                          <ChevronRight size={14} className="stroke-[2.5]" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AttackPath;