import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
            background: "#f5f7fb",
            minHeight: "100vh",
          }}
        >
          <h1>SBOM Security Dashboard</h1>

          <DashboardCards />
        </div>
      </div>
    </>
  );
}

export default Dashboard;