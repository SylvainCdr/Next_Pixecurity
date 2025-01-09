import { useState, useEffect } from "react";
import styles from "./style.module.scss";

export default function FileManager() {
  const [files, setFiles] = useState([]); // Liste des fichiers
  const [uploadStatus, setUploadStatus] = useState(null);

  // Charger les fichiers disponibles
  useEffect(() => {
    fetch("https://uploads.pixecurity.com/upload.php", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setFiles(data))
      .catch((error) => console.error("Error fetching files:", error));
  }, []);

  // Gérer le glisser-déposer
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Fonction pour uploader un fichier
  const uploadFile = async (file) => {
    if (!file) {
      console.error("No file selected for upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://uploads.pixecurity.com/upload.php", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed: " + (await response.text()));
      }

      const data = await response.json();
      console.log("Upload successful:", data);

      // Mettre à jour la liste des fichiers après l'upload
      setFiles((prevFiles) => [...prevFiles, file.name]);
      setUploadStatus("Upload successful!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Upload failed.");
    }
  };

  return (
    <div className={styles.fileManagerContainer}>
      <h1>File Manager</h1>

      {/* Zone de glisser-déposer */}
      <div
        className={styles.dropZone}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p>Drag & drop your files here</p>
      </div>

      {/* Liste des fichiers */}
      <div className={styles.fileList}>
        <h2>Available Files</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a
                href={`https://uploads.pixecurity.com/uploads/${file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {file}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* État de l'upload */}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}
