import { UploadCloud } from "lucide-react";
import { useState } from "react";

function UploadBox() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        Upload SBOM File
      </h2>

      <label
        className="border-2 border-dashed border-blue-400 rounded-xl h-64 flex flex-col justify-center items-center cursor-pointer hover:bg-blue-50 transition"
      >

        <UploadCloud size={60} className="text-blue-600 mb-4"/>

        <p className="text-lg font-semibold">
          Drag & Drop SBOM JSON
        </p>

        <p className="text-gray-500">
          or click to browse
        </p>

        <input
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleFileChange}
        />

      </label>

      {fileName && (
        <p className="mt-5 text-green-600 font-semibold">
          Selected File: {fileName}
        </p>
      )}

      <div className="mt-8">

        <h3 className="font-semibold">
          Supported Formats
        </h3>

        <ul className="mt-2 list-disc ml-5 text-gray-600">
          <li>CycloneDX JSON</li>
          <li>SPDX JSON</li>
        </ul>

      </div>

      <button
        className="mt-8 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg"
      >
        Analyze SBOM
      </button>

    </div>
  );
}

export default UploadBox;