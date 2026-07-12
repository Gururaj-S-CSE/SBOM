import {
  UserCircle2,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

function Navbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">

      {/* Left Section */}

      <div className="flex items-center gap-4">

        <div className="bg-blue-600 text-white p-3 rounded-xl">
          <ShieldCheck size={26} />
        </div>

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            SBOM Analyzer
          </h1>

          <p className="text-gray-500 text-sm">
            Software Supply Chain Risk Scorer
          </p>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex items-center gap-8">

        <div className="flex items-center gap-2 text-gray-500">

          <CalendarDays size={18} />

          <span>{today}</span>

        </div>

        <div className="flex items-center gap-3">

          <UserCircle2
            size={38}
            className="text-blue-600"
          />

          <div>

            <p className="font-semibold text-gray-800">
              Security Analyst
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;