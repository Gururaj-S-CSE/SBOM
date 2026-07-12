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
function Results() {
  const analysis = JSON.parse(localStorage.getItem("analysis"));

  if (!analysis) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-red-600">
          No SBOM Analysis Found
        </h1>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 bg-slate-100 min-h-screen p-8">

          {/* Page Title */}
          <h1 className="text-4xl font-bold mb-8">
            SBOM Analysis Report
          </h1>

          {/* Application Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Application Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <span className="font-semibold">Application Name:</span>{" "}
                {analysis.application?.name || "N/A"}
              </div>

              <div>
                <span className="font-semibold">Application ID:</span>{" "}
                {analysis.application?.app_id || "N/A"}
              </div>

              <div>
                <span className="font-semibold">Criticality:</span>{" "}
                {analysis.application?.criticality || "N/A"}
              </div>

              <div>
                <span className="font-semibold">Business Owner:</span>{" "}
                {analysis.application?.business_owner || "N/A"}
              </div>

              <div>
                <span className="font-semibold">Department:</span>{" "}
                {analysis.application?.department || "N/A"}
              </div>

              <div>
                <span className="font-semibold">Deployment:</span>{" "}
                {analysis.application?.deployment || "N/A"}
              </div>

              <div>
                <span className="font-semibold">Language:</span>{" "}
                {analysis.application?.language || "N/A"}
              </div>

              <div>
                <span className="font-semibold">License Model:</span>{" "}
                {analysis.application?.license_model || "N/A"}
              </div>

            </div>
          </div>

          {/* Dashboard Cards */}
<DashboardCards summary={analysis.summary} />
<AlertDashboard
    vulnerabilities={analysis.vulnerabilities}
/>
<RemediationPlaybook
    vulnerabilities={analysis.vulnerabilities}
/>
{/* Components Table */}
<ComponentTable
  components={analysis.components || []}
/>

{/* License Table */}
<LicenseTable
  licenses={analysis.licenses || []}
/>

{/* Vulnerability Table */}
<VulnerabilityTable
  vulnerabilities={analysis.vulnerabilities || []}
/>
<RemediationPlaybook
  vulnerabilities={analysis.vulnerabilities || []}
/>

{/* Dependency Graph */}
<DependencyGraph
  graph={analysis.graph}
/>
<DependencyGraph
  graph={analysis.graph}
/>

<AttackPath
  attackPaths={analysis.attack_paths || []}
/>
<MaintenanceTable
    maintenance={analysis.maintenance || []}
/>
        </main>
      </div>
    </>
  );
}

export default Results;