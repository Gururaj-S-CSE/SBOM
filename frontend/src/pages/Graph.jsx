import { Network } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DependencyGraph from "../components/DependencyGraph";

function Graph() {
  const analysis = JSON.parse(localStorage.getItem("analysis"));
  const hasAnalysis = !!analysis && !!analysis.graph;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar 
          title="Dependency Graph" 
          subtitle={hasAnalysis ? "Interactive dependency hierarchy map" : "No active dependency mapping available"} 
        />

        <main className="flex-1 p-8 overflow-y-auto">
          {hasAnalysis ? (
            <div className="space-y-6">
              <DependencyGraph graph={analysis.graph} />
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-[calc(100vh-12rem)] max-w-sm mx-auto text-center space-y-4">
              <div className="bg-slate-100 border border-slate-200/50 p-4 rounded-full text-slate-400">
                <Network size={36} className="text-indigo-500" />
              </div>
              <h2 className="text-lg font-bold text-slate-800">No Dependency Graph Data</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                We couldn't find any dependency trees. Please upload and analyze a CycloneDX or SPDX bill of materials file first.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Graph;