import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DependencyGraph from "../components/DependencyGraph";

function Graph() {
  return (
    <>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 bg-slate-100 min-h-screen p-8">
          <h1 className="text-3xl font-bold mb-8">
            Dependency Graph
          </h1>

          <DependencyGraph />
        </main>
      </div>
    </>
  );
}

export default Graph;