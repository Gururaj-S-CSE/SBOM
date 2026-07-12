import {
  Boxes,
  Network,
  ShieldAlert,
  TriangleAlert,
  Gauge,
  AlertTriangle,
} from "lucide-react";

function DashboardCards({ summary }) {
  if (!summary) return null;

  const getBadgeColor = (title) => {
    switch (title) {
      case "Risk Score":
        return "bg-purple-100 text-purple-700";
      case "Risk Level":
        return summary.risk_level === "LOW"
          ? "bg-green-100 text-green-700"
          : summary.risk_level === "MEDIUM"
          ? "bg-yellow-100 text-yellow-700"
          : summary.risk_level === "HIGH"
          ? "bg-orange-100 text-orange-700"
          : "bg-red-100 text-red-700";
      case "Components":
        return "bg-blue-100 text-blue-700";
      case "Dependencies":
        return "bg-indigo-100 text-indigo-700";
      case "Vulnerabilities":
        return "bg-red-100 text-red-700";
      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  const cards = [
    {
      title: "Risk Score",
      value: summary.risk_score,
      icon: <Gauge size={26} />,
    },
    {
      title: "Risk Level",
      value: summary.risk_level,
      icon: <ShieldAlert size={26} />,
    },
    {
      title: "Components",
      value: summary.total_components,
      icon: <Boxes size={26} />,
    },
    {
      title: "Dependencies",
      value: summary.total_dependencies,
      icon: <Network size={26} />,
    },
    {
      title: "Vulnerabilities",
      value: summary.total_vulnerabilities,
      icon: <AlertTriangle size={26} />,
    },
    {
      title: "High Risk Packages",
      value: summary.high_risk_packages,
      icon: <TriangleAlert size={26} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-6"
        >
          <div className="flex justify-between items-center mb-5">

            <span className="text-gray-500 text-sm font-medium">
              {card.title}
            </span>

            <div
              className={`p-3 rounded-xl ${getBadgeColor(card.title)}`}
            >
              {card.icon}
            </div>

          </div>

          <h2 className="text-3xl font-bold text-gray-900">
            {card.value}
          </h2>

        </div>
      ))}
    </div>
  );
}

export default DashboardCards;