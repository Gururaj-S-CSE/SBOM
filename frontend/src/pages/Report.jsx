import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Report() {
  const analysis = JSON.parse(localStorage.getItem("analysis"));

  if (!analysis) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">
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
            SBOM Report
          </h1>

          {/* Metadata */}

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Metadata
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <p>
                <strong>SBOM Format:</strong>{" "}
                {analysis.metadata?.bomFormat}
              </p>

              <p>
                <strong>Specification:</strong>{" "}
                {analysis.metadata?.specVersion}
              </p>

              <p>
                <strong>Version:</strong>{" "}
                {analysis.metadata?.version}
              </p>

              <p>
                <strong>Serial Number:</strong>{" "}
                {analysis.metadata?.serialNumber || "N/A"}
              </p>

            </div>
          </div>

          {/* Summary */}

          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-4">
              Analysis Summary
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

        </main>
      </div>
    </>
  );
}

export default Report;