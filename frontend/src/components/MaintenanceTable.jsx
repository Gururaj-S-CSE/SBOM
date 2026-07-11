function MaintenanceTable({ maintenance = [] }) {
  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "ACTIVE":
        return "text-green-600";
      case "UNMAINTAINED":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Maintenance Status
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className="p-3 text-left">Component</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Last Updated</th>
          </tr>
        </thead>

        <tbody>
          {maintenance.map((item, index) => (
            <tr key={index} className="border-b hover:bg-slate-100">
              <td className="p-3">{item.component}</td>

              <td
                className={`p-3 font-semibold ${getStatusColor(
                  item.maintenance
                )}`}
              >
                {item.maintenance}
              </td>

              <td className="p-3">
                {item.last_updated}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MaintenanceTable;