function LicenseTable({ licenses = [] }) {
  const getColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-orange-500";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        License Analysis
      </h2>

      <table className="w-full">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className="p-3 text-left">Component</th>
            <th className="p-3 text-left">License</th>
            <th className="p-3 text-left">Risk</th>
          </tr>
        </thead>

        <tbody>
          {licenses.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">{item.component}</td>
              <td className="p-3">{item.license}</td>
              <td className={`p-3 font-semibold ${getColor(item.risk)}`}>
                {item.risk}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LicenseTable;