import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UploadBox from "../components/UploadBox";

function Upload() {
  return (
    <>
      <Navbar />

      <div className="flex">

        <Sidebar />

        <main className="flex-1 bg-slate-100 min-h-screen p-8">

          <h1 className="text-3xl font-bold mb-8">
            Upload SBOM
          </h1>

          <UploadBox />

        </main>

      </div>
    </>
  );
}

export default Upload;