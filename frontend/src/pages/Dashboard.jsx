import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DashboardCards from "../components/DashboardCards";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 bg-slate-100 min-h-screen p-8">

          <h2 className="text-3xl font-bold mb-8">
            Dashboard
          </h2>

          <DashboardCards />

        </main>

      </div>
    </>
  );
}

export default Dashboard;