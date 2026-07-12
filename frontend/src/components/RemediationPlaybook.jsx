import { useState } from "react";
import { CheckSquare, Square, Wrench } from "lucide-react";

function RemediationPlaybook({ vulnerabilities = [] }) {
  const alerts = vulnerabilities.filter((pkg) => pkg.has_vulnerabilities);
  
  // Track checked steps for each vulnerability path to make it interactive!
  // Key format: `${pkgName}-${cveId}-${stepIndex}`
  const [checkedSteps, setCheckedSteps] = useState({});

  const toggleStep = (pkgName, cveId, stepIndex) => {
    const key = `${pkgName}-${cveId}-${stepIndex}`;
    setCheckedSteps((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const steps = [
    { text: "Locate and download the patched/latest stable version of the package.", desc: "Verify compatible upgrade targets with project dependencies." },
    { text: "Update package manager lockfiles or manifest declarations.", desc: "Run upgrade commands (e.g. npm update, pip install -U, or pom.xml update)." },
    { text: "Rebuild the application environment and execute static test suites.", desc: "Verify no breaking changes are introduced by the minor/major package bumps." },
    { text: "Re-generate the CycloneDX/SPDX SBOM file and re-upload here.", desc: "Confirm the vulnerability has been removed from the dependency listing." },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
        <div className="bg-indigo-50 text-indigo-600 p-2 rounded-lg border border-indigo-100/50">
          <Wrench size={16} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800">
            Interactive Remediation Playbook
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">
            Step-by-step checklist guide to patch, rebuild, and re-generate secure artifacts
          </p>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="text-center py-6 text-slate-450 text-xs font-semibold">
          🎉 All dependencies are secure. No playbooks needed!
        </div>
      ) : (
        <div className="space-y-6">
          {alerts.map((pkg, index) =>
            pkg.vulnerabilities.map((vuln, vIdx) => {
              const cve = vuln.cve_id;
              
              // Calculate completion percentage
              const total = steps.length;
              const completed = steps.filter((_, sIdx) => checkedSteps[`${pkg.component}-${cve}-${sIdx}`]).length;
              const pct = Math.round((completed / total) * 100);

              return (
                <div
                  key={`${index}-${vIdx}`}
                  className="border border-slate-200/60 rounded-xl overflow-hidden hover:shadow-sm transition-all duration-200"
                >
                  {/* Header bar */}
                  <div className="bg-slate-50 border-b border-slate-200/60 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-800">{pkg.component}</h4>
                        <span className="bg-indigo-50 border border-indigo-100 text-indigo-750 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded">
                          {cve}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                        Remediation protocol for {vuln.severity} threat advisory
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-semibold text-slate-500 font-mono">
                        {completed}/{total} Steps ({pct}%)
                      </span>
                      <div className="w-20 h-2 bg-slate-200/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Checklist steps */}
                  <div className="p-5 divide-y divide-slate-100">
                    {steps.map((step, sIdx) => {
                      const isChecked = !!checkedSteps[`${pkg.component}-${cve}-${sIdx}`];
                      return (
                        <div
                          key={sIdx}
                          onClick={() => toggleStep(pkg.component, cve, sIdx)}
                          className="flex items-start gap-3.5 py-3 first:pt-0 last:pb-0 cursor-pointer select-none group"
                        >
                          <div className="mt-0.5 text-slate-400 group-hover:text-indigo-600 transition-colors">
                            {isChecked ? (
                              <CheckSquare size={16} className="text-indigo-600 fill-indigo-50" />
                            ) : (
                              <Square size={16} />
                            )}
                          </div>
                          
                          <div>
                            <p className={`text-xs font-semibold leading-normal ${
                              isChecked ? "text-slate-400 line-through decoration-slate-300" : "text-slate-705"
                            }`}>
                              {step.text}
                            </p>
                            <p className={`text-[10px] mt-0.5 ${
                              isChecked ? "text-slate-350" : "text-slate-450"
                            }`}>
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default RemediationPlaybook;