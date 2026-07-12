import { Box, Layers, Cpu } from "lucide-react";

function ComponentTable({ components = [] }) {
  const getComponentTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "application":
        return <Cpu size={14} className="text-indigo-500" />;
      case "framework":
        return <Layers size={14} className="text-violet-500" />;
      default:
        return <Box size={14} className="text-slate-450" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Components Inventory
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">
            List of all scanned packages, libraries, and frameworks ({components.length} total)
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200/60 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              <th className="px-6 py-3.5">Component Name</th>
              <th className="px-6 py-3.5">Version</th>
              <th className="px-6 py-3.5">License</th>
              <th className="px-6 py-3.5">Type</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-150 text-xs text-slate-650">
            {components.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-400 font-medium">
                  No components match the active query.
                </td>
              </tr>
            ) : (
              components.map((component, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="px-6 py-3.5 font-semibold text-slate-805">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-slate-50 border border-slate-100 p-1.5 rounded-lg flex items-center justify-center">
                        {getComponentTypeIcon(component.type)}
                      </div>
                      <span>{component.name}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-3.5 font-mono text-slate-500 font-medium">
                    {component.version || "N/A"}
                  </td>
                  
                  <td className="px-6 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {component.licenses && component.licenses.length > 0 ? (
                        component.licenses.map((lic, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                          >
                            {lic}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic">N/A</span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-3.5">
                    <span className="bg-indigo-50/50 text-indigo-700 border border-indigo-100/50 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md">
                      {component.type || "library"}
                    </span>
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

export default ComponentTable;