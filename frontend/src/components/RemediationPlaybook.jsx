function RemediationPlaybook({ vulnerabilities = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Remediation Playbook
      </h2>

      {vulnerabilities.map((pkg) =>

        pkg.has_vulnerabilities &&
        pkg.vulnerabilities.map((vuln, index) => (

          <div
            key={index}
            className="border rounded-lg p-5 mb-5"
          >

            <h3 className="font-bold text-red-600">
              {pkg.component}
            </h3>

            <p>
              CVE:
              <strong> {vuln.cve_id}</strong>
            </p>

            <ol className="list-decimal ml-6 mt-3">

              <li>
                Upgrade package
              </li>

              <li>
                Use latest secure version
              </li>

              <li>
                Rebuild project
              </li>

              <li>
                Upload new SBOM
              </li>

            </ol>

          </div>

        ))

      )}

    </div>
  );
}

export default RemediationPlaybook;