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

  const cards = [
    {
      title: "Risk Score",
      value: summary.risk_score,
      color: "bg-purple-600",
      icon: <Gauge size={28} />,
    },
    {
      title: "Risk Level",
      value: summary.risk_level,
      color:
        summary.risk_level === "LOW"
          ? "bg-green-600"
          : summary.risk_level === "MEDIUM"
          ? "bg-yellow-500"
          : summary.risk_level === "HIGH"
          ? "bg-orange-500"
          : "bg-red-600",
      icon: <ShieldAlert size={28} />,
    },
    {
      title: "Components",
      value: summary.total_components,
      color: "bg-blue-600",
      icon: <Boxes size={28} />,
    },
    {
      title: "Dependencies",
      value: summary.total_dependencies,
      color: "bg-indigo-600",
      icon: <Network size={28} />,
    },
    {
      title: "Vulnerabilities",
      value: summary.total_vulnerabilities,
      color: "bg-red-600",
      icon: <AlertTriangle size={28} />,
    },
    {
      title: "High Risk Packages",
      value: summary.high_risk_packages,
      color: "bg-orange-600",
      icon: <TriangleAlert size={28} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} text-white rounded-xl shadow-lg p-6`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">{card.title}</h3>
            {card.icon}
          </div>

          <h1 className="text-4xl font-bold">
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default DashboardCards;