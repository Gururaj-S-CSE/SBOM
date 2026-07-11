import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "230px",
        background: "#111827",
        color: "white",
        height: "calc(100vh - 60px)",
        padding: "20px",
      }}
    >
      <h3>Menu</h3>

      <p><Link to="/" style={{ color: "white" }}>Dashboard</Link></p>

      <p><Link to="/upload" style={{ color: "white" }}>Upload SBOM</Link></p>

      <p><Link to="/report" style={{ color: "white" }}>Reports</Link></p>
    </div>
  );
}

export default Sidebar;