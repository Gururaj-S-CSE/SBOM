import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function UploadBox() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

 const handleUpload = async () => {
  if (!selectedFile) {
    alert("Please select an SBOM file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    setLoading(true);

    const response = await api.post("/analyze", formData);

    console.log(response.data);

    localStorage.setItem(
      "analysis",
      JSON.stringify(response.data)
    );

    navigate("/results");

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data.error || "Backend Error");
    } else {
      alert("Unable to connect to backend.");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">

      <h2 className="text-3xl font-bold mb-6">
        Upload SBOM File
      </h2>

      <label
        className="border-2 border-dashed border-cyan-500 rounded-xl h-72 flex flex-col justify-center items-center cursor-pointer hover:bg-cyan-50 transition"
      >
        <UploadCloud size={70} className="text-cyan-600 mb-5" />

        <p className="text-xl font-semibold">
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
        <div className="mt-5 text-green-600 font-semibold">
          Selected File: {fileName}
        </div>
      )}

      <div className="mt-8">

        <h3 className="font-bold">
          Supported Formats
        </h3>

        <ul className="list-disc ml-6 mt-2 text-gray-600">
          <li>CycloneDX JSON</li>
          <li>SPDX JSON</li>
        </ul>

      </div>

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-8 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg disabled:bg-gray-400"
      >
        {loading ? "Analyzing..." : "Analyze SBOM"}
      </button>

    </div>
  );
}

export default UploadBox;