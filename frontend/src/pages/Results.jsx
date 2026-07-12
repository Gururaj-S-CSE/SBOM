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

       <main className="flex-1 bg-gray-50 min-h-screen p-10">

          {/* Page Title */}
          <h1 className="text-4xl font-bold mb-8">
            SBOM Analysis Report
          </h1>

          {/* Application Information */}
          {/* Application Information */}

<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-8">

  <div className="flex items-center justify-between mb-6">

    <div>

      <h2 className="text-3xl font-bold text-gray-900">
        {analysis.application?.name || "Unknown Application"}
      </h2>

      <p className="text-gray-500 mt-1">
        Application ID: {analysis.application?.app_id || "N/A"}
      </p>

    </div>

    <span
      className={`px-4 py-2 rounded-full text-sm font-semibold ${
        analysis.application?.criticality === "HIGH"
          ? "bg-red-100 text-red-700"
          : analysis.application?.criticality === "MEDIUM"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {analysis.application?.criticality}
    </span>

  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

    <div className="bg-gray-50 rounded-xl p-4">

      <p className="text-gray-500 text-sm">
        Business Owner
      </p>

      <p className="font-semibold mt-1">
        {analysis.application?.business_owner}
      </p>

    </div>

    <div className="bg-gray-50 rounded-xl p-4">

      <p className="text-gray-500 text-sm">
        Department
      </p>

      <p className="font-semibold mt-1">
        {analysis.application?.department}
      </p>

    </div>

    <div className="bg-gray-50 rounded-xl p-4">

      <p className="text-gray-500 text-sm">
        Deployment
      </p>

      <p className="font-semibold mt-1">
        {analysis.application?.deployment}
      </p>

    </div>

    <div className="bg-gray-50 rounded-xl p-4">

      <p className="text-gray-500 text-sm">
        Language
      </p>

      <p className="font-semibold mt-1">
        {analysis.application?.language}
      </p>

    </div>

    <div className="bg-gray-50 rounded-xl p-4">

      <p className="text-gray-500 text-sm">
        License Model
      </p>

      <p className="font-semibold mt-1">
        {analysis.application?.license_model}
      </p>

    </div>

  </div>

</div>

          {/* Dashboard Cards */}
<DashboardCards summary={analysis.summary} />
<AlertDashboard
    vulnerabilities={analysis.vulnerabilities}
/>

{/* Components Table */}
<ComponentTable
  components={analysis.components || []}
/>
{/* Dependency Graph */}
<DependencyGraph
  graph={analysis.graph}
/>
<AttackPath
  attackPaths={analysis.attack_paths || []}
/>
{/* Vulnerability Table */}
<VulnerabilityTable
  vulnerabilities={analysis.vulnerabilities || []}
/>
<RemediationPlaybook
  vulnerabilities={analysis.vulnerabilities || []}
/>
<MaintenanceTable
    maintenance={analysis.maintenance || []}
/>
{/* License Table */}
<LicenseTable
  licenses={analysis.licenses || []}
/>









        </main>
      </div>
    </>
  );
}

export default Results;