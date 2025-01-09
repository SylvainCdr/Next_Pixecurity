import { useState, useEffect } from "react";
import styles from "./style.module.scss";

export default function FileManager() {
  const [files, setFiles] = useState([]); // Liste des fichiers
  const [uploadStatus, setUploadStatus] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  // Charger les fichiers disponibles depuis le backend
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch("https://uploads.pixecurity.com/upload.php", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch files.");
        }
        const data = await response.json();
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    fetchFiles();
  }, []);

  // Gérer le glisser-déposer
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      uploadFile(file);
    }
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
        className={`${styles.dropZone} ${dragActive ? styles.dragActive : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>Drag & drop your files here, or click to select files.</p>
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
