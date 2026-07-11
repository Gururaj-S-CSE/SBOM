function Navbar() {
  return (
    <nav
      style={{
        height: "60px",
        background: "#1f2937",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <h2>🛡️ SBOM Analyzer</h2>

      <div>Team Dashboard</div>
    </nav>
  );
}

export default Navbar;