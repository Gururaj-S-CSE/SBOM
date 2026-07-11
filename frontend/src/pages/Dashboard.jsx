import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ padding: "30px", flex: 1 }}>
          <h1>Dashboard</h1>

          <p>Welcome to the SBOM Analyzer Dashboard.</p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;