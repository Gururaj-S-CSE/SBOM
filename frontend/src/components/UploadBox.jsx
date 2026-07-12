import { UploadCloud, FileJson, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function UploadBox() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState("");
  const [isDragActive, setIsDragActive] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const processFile = (file) => {
    if (file && file.type === "application/json" || file.name.endsWith(".json")) {
      setSelectedFile(file);
      setFileName(file.name);
      setFileSize(formatFileSize(file.size));
    } else {
      alert("Please upload a valid JSON SBOM file.");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    processFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedFile(null);
    setFileName("");
    setFileSize("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select or drag an SBOM file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      setLoadingStage("Uploading SBOM file...");

      // Artificial delay steps to showcase a beautiful stage transition loader
      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoadingStage("Parsing components & dependencies...");

      await new Promise((resolve) => setTimeout(resolve, 800));
      setLoadingStage("Analyzing licenses and checking vulnerabilities...");

      const response = await api.post("/analyze", formData);

      console.log(response.data);

      localStorage.setItem("analysis", JSON.stringify(response.data));

      setLoadingStage("Finalizing risk dashboard...");
      await new Promise((resolve) => setTimeout(resolve, 500));

      navigate("/results");
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.error || "Backend Analysis Error");
      } else {
        alert("Unable to connect to backend server. Please verify it is running on port 5000.");
      }
    } finally {
      setLoading(false);
      setLoadingStage("");
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-8 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">
          Analyze Software Bill of Materials
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
          Scan CycloneDX or SPDX files to identify security vulnerabilities, license risks, and graph application dependencies.
        </p>
      </div>

      {/* Drag & Drop Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl h-64 flex flex-col justify-center items-center cursor-pointer transition-all duration-200 ${isDragActive
            ? "border-indigo-500 bg-indigo-50/50"
            : selectedFile
              ? "border-emerald-500 bg-emerald-50/10"
              : "border-slate-300 hover:border-slate-400 hover:bg-slate-50/40"
          }`}
      >
        <input
          type="file"
          accept=".json"
          id="sbom-file-input"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={loading}
        />

        {!selectedFile ? (
          <div className="flex flex-col items-center p-6 text-center pointer-events-none">
            <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-full text-slate-400 mb-4 transition-transform group-hover:scale-105">
              <UploadCloud size={32} className="text-indigo-500" />
            </div>
            <p className="text-sm font-semibold text-slate-700">
              Drag & Drop SBOM File
            </p>
            <p className="text-xs text-slate-400 mt-1">
              or click to browse local files
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center p-6 text-center">
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-full text-emerald-600 mb-4 relative">
              <FileJson size={32} />
              <button
                onClick={handleRemoveFile}
                disabled={loading}
                className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full p-1 hover:bg-rose-600 transition-colors shadow-sm"
                title="Remove file"
              >
                <X size={12} />
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-800 max-w-sm truncate">
              {fileName}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">{fileSize}</p>
          </div>
        )}
      </div>

      {/* Supported Formats Section */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200/40 rounded-xl">
          <div className="bg-indigo-100 text-indigo-700 p-2 rounded-lg text-xs font-bold">CDX</div>
          <div>
            <h4 className="text-xs font-semibold text-slate-800 leading-tight">CycloneDX</h4>
            <span className="text-[10px] text-slate-400">JSON bomFormat supported</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200/40 rounded-xl">
          <div className="bg-violet-100 text-violet-700 p-2 rounded-lg text-xs font-bold">SPDX</div>
          <div>
            <h4 className="text-xs font-semibold text-slate-800 leading-tight">SPDX Standards</h4>
            <span className="text-[10px] text-slate-400">JSON schema supported</span>
          </div>
        </div>
      </div>

      {/* Upload & Loading States Button */}
      <div className="mt-8 flex justify-center">
        {loading ? (
          <div className="flex flex-col items-center gap-3 w-full">
            <button
              disabled
              className="bg-slate-100 border border-slate-200 text-slate-400 px-8 py-3 rounded-xl font-medium flex items-center justify-center gap-3 w-full cursor-not-allowed"
            >
              <Loader2 size={18} className="animate-spin text-indigo-500" />
              <span>{loadingStage || "Analyzing SBOM..."}</span>
            </button>
            <span className="text-[10px] text-slate-400 animate-pulse">
              This might take a few moments
            </span>
          </div>
        ) : (
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className={`w-full font-medium px-8 py-3 rounded-xl transition duration-250 ${selectedFile
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10 cursor-pointer"
                : "bg-slate-100 text-slate-450 border border-slate-200 cursor-not-allowed"
              }`}
          >
            Start SBOM Analysis
          </button>
        )}
      </div>
    </div>
  );
}

export default UploadBox;