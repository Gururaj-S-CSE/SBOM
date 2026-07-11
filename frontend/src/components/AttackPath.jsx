function AttackPath({ attackPaths = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Attack Paths
      </h2>

      {attackPaths.length === 0 ? (
        <p className="text-green-600 font-semibold">
          ✅ No attack paths detected.
        </p>
      ) : (
        <div className="space-y-6">
          {attackPaths.map((path, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-slate-50"
            >
              <p className="font-semibold mb-3">
                Path {index + 1}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {path.path.map((node, i) => (
                  <div
                    key={i}
                    className="flex items-center"
                  >
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                      {node}
                    </div>

                    {i !== path.path.length - 1 && (
                      <span className="mx-3 text-2xl font-bold text-red-600">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AttackPath;