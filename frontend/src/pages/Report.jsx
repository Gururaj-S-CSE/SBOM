import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Report() {
  const analysis = JSON.parse(localStorage.getItem("analysis"));

  if (!analysis) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-red-600">
          No Analysis Available
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

          <h1 className="text-4xl font-bold mb-8">
            SBOM Security Report
          </h1>

          {/* Application Information */}

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">
              Application Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <p>
                <strong>Application Name:</strong>{" "}
                {analysis.application?.name || "N/A"}
              </p>

              <p>
                <strong>Application ID:</strong>{" "}
                {analysis.application?.app_id || "N/A"}
              </p>

              <p>
                <strong>Business Owner:</strong>{" "}
                {analysis.application?.business_owner || "N/A"}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {analysis.application?.department || "N/A"}
              </p>

              <p>
                <strong>Criticality:</strong>{" "}
                {analysis.application?.criticality || "N/A"}
              </p>

              <p>
                <strong>Deployment:</strong>{" "}
                {analysis.application?.deployment || "N/A"}
              </p>

              <p>
                <strong>Language:</strong>{" "}
                {analysis.application?.language || "N/A"}
              </p>

              <p>
                <strong>License Model:</strong>{" "}
                {analysis.application?.license_model || "N/A"}
              </p>

            </div>

          </div>

          {/* Risk Summary */}

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">
              Risk Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-purple-100 rounded-lg p-5">
                <h3 className="font-semibold text-gray-700">
                  Risk Score
                </h3>

                <p className="text-3xl font-bold text-purple-700">
                  {analysis.summary?.risk_score ?? "N/A"}
                </p>
              </div>

              <div className="bg-green-100 rounded-lg p-5">
                <h3 className="font-semibold text-gray-700">
                  Risk Level
                </h3>

                <p className="text-3xl font-bold text-green-700">
                  {analysis.summary?.risk_level ?? "N/A"}
                </p>
              </div>

              <div className="bg-red-100 rounded-lg p-5">
                <h3 className="font-semibold text-gray-700">
                  High Risk Packages
                </h3>

                <p className="text-3xl font-bold text-red-700">
                  {analysis.summary?.high_risk_packages ?? 0}
                </p>
              </div>

            </div>

          </div>

          {/* Security Overview */}

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">
              Security Overview
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="border rounded-lg p-5 bg-slate-50">

                <h3 className="font-semibold mb-2">
                  Overall Security
                </h3>

                <p className="text-xl font-bold text-purple-600">
                  {analysis.summary?.risk_level}
                </p>

                <p className="text-gray-600">
                  Risk Score: {analysis.summary?.risk_score}
                </p>

              </div>

              <div className="border rounded-lg p-5 bg-slate-50">

                <h3 className="font-semibold mb-2">
                  Vulnerability Status
                </h3>

                <p className="text-xl font-bold text-red-600">
                  {analysis.summary?.total_vulnerabilities} Vulnerabilities
                </p>

                <p className="text-gray-600">
                  High Risk Packages: {analysis.summary?.high_risk_packages}
                </p>

              </div>

            </div>

          </div>

          {/* Component Statistics */}

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

            <h2 className="text-2xl font-bold mb-4">
              Component Statistics
            </h2>

            <ul className="space-y-3">

              <li>
                Total Components:
                <strong>
                  {" "}
                  {analysis.summary?.total_components}
                </strong>
              </li>

              <li>
                Total Dependencies:
                <strong>
                  {" "}
                  {analysis.summary?.total_dependencies}
                </strong>
              </li>

              <li>
                Total Vulnerabilities:
                <strong>
                  {" "}
                  {analysis.summary?.total_vulnerabilities}
                </strong>
              </li>

              <li>
                High Risk Packages:
                <strong>
                  {" "}
                  {analysis.summary?.high_risk_packages}
                </strong>
              </li>

            </ul>

          </div>

          {/* SBOM Metadata */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-4">
              SBOM Metadata
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <p>
                <strong>Format:</strong>{" "}
                {analysis.metadata?.bomFormat || "N/A"}
              </p>

              <p>
                <strong>Specification:</strong>{" "}
                {analysis.metadata?.specVersion || "N/A"}
              </p>

              <p>
                <strong>Version:</strong>{" "}
                {analysis.metadata?.version || "N/A"}
              </p>

              <p>
                <strong>Serial Number:</strong>{" "}
                {analysis.metadata?.serialNumber || "N/A"}
              </p>

            </div>

          </div>

        </main>
      </div>
    </>
  );
}

export default Report;