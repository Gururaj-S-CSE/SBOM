import api from "../api/api";

const handleUpload = async () => {
  if (!selectedFile) return;

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await api.post("/upload", formData);

    console.log(response.data);

  } catch (error) {
    console.error(error);
  }
};