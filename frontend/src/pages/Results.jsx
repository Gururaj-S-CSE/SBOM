import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ComponentTable from "../components/ComponentTable";
import DependencyGraph from "../components/DependencyGraph";
import LicenseTable from "../components/LicenseTable";
import VulnerabilityTable from "../components/VulnerabilityTable";
function Results() {
  const analysis = JSON.parse(localStorage.getItem("analysis"));

  if (!analysis) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">
          No SBOM Uploaded
        </h1>
      </div>
    );
  }

  console.log("Analysis:", analysis);
  console.log("Graph:", analysis.graph);

  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 bg-slate-100 min-h-screen p-8">

          <h1 className="text-4xl font-bold mb-8">
            Analysis Results
          </h1>

          {/* Summary Cards */}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

            <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg">Components</h3>

              <p className="text-4xl font-bold mt-2">
                {analysis.summary?.total_components ?? 0}
              </p>
            </div>

            <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg">Dependencies</h3>

              <p className="text-4xl font-bold mt-2">
                {analysis.summary?.total_dependencies ?? 0}
              </p>
            </div>

            <div className="bg-red-600 text-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg">Vulnerabilities</h3>

              <p className="text-4xl font-bold mt-2">
                {analysis.summary?.total_vulnerabilities ?? 0}
              </p>
            </div>

            <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg">High Risk</h3>

              <p className="text-4xl font-bold mt-2">
                {analysis.summary?.high_risk_packages ?? 0}
              </p>
            </div>

          </div>

          {/* Components Table */}

          <ComponentTable
            components={analysis.components || []}
          />
<LicenseTable licenses={analysis.licenses} />

<VulnerabilityTable vulnerabilities={analysis.vulnerabilities} />

          {/* Dependency Graph */}

          <DependencyGraph
            graph={analysis.graph}
          />
          

        </main>
      </div>
    </>
  );
}

export default Results;