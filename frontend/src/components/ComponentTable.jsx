function ComponentTable({ components = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Components
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-800 text-white">
            <th className="p-3 text-left">Package</th>
            <th className="p-3 text-left">Version</th>
            <th className="p-3 text-left">License</th>
            <th className="p-3 text-left">Type</th>
          </tr>
        </thead>

        <tbody>
          {components.map((component, index) => (
            <tr
              key={index}
              className="border-b hover:bg-slate-100"
            >
              <td className="p-3">{component.name}</td>
              <td className="p-3">{component.version}</td>
              <td className="p-3">
                <td className="p-3">
  {component.licenses?.join(", ") || "N/A"}
</td>
              </td>
              <td className="p-3">{component.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComponentTable;