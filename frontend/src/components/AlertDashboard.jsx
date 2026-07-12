function AlertDashboard({ vulnerabilities = [] }) {
  const alerts = vulnerabilities.filter(
    (pkg) => pkg.has_vulnerabilities
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Live Security Alerts
      </h2>

      {alerts.length === 0 ? (
        <p className="text-green-600 font-bold">
          ✅ No Active Alerts
        </p>
      ) : (
        <div className="space-y-4">
          {alerts.map((pkg, index) =>
            pkg.vulnerabilities.map((vuln, i) => (
              <div
                key={`${index}-${i}`}
                className="border-l-4 border-red-600 bg-red-50 p-4 rounded"
              >
                <h3 className="font-bold">
                  {pkg.component}
                </h3>

                <p>{vuln.cve_id}</p>

                <p>
                  Severity:
                  <strong> {vuln.severity}</strong>
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default AlertDashboard;