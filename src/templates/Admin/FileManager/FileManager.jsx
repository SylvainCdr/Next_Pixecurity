import { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Swal from "sweetalert2";

export default function FileManager() {
  const [files, setFiles] = useState([]); // Tableau pour stocker les fichiers sélectionnés
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fonction pour récupérer les fichiers du serveur
  const getUploadedFiles = async () => {
    try {
      const response = await fetch(
        "https://uploads.pixecurity.com/listFiles.php"
      ); // Requête vers le nouveau script PHP
      const data = await response.json();

      if (Array.isArray(data)) {
        // Vérifier que 'created_at' est une chaîne de date valide et trier
        data.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA; // Tri décroissant (les plus récents en premier)
        });

        console.log("Uploaded files:", data);
        setUploadedFiles(data);
      } else {
        console.error("Unexpected data format:", data);
        setUploadedFiles([]); // Valeur par défaut vide en cas de format inattendu
      }
    } catch (error) {
      console.error("Error fetching uploaded files:", error);
      setUploadedFiles([]); // Valeur par défaut vide en cas d'erreur
    }
  };

  // Appeler la fonction pour récupérer les fichiers déjà uploadés au montage du composant
  useEffect(() => {
    getUploadedFiles();
  }, []);

  // Gérer la sélection de fichiers
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files)); // Convertir FileList en tableau
  };

  // Gérer le drag and drop
  const handleDragOver = (e) => {
    e.preventDefault(); // Permet de déposer le fichier
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files); // Récupérer les fichiers déposés
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]); // Ajouter les fichiers déposés
  };

  // Fonction pour uploader plusieurs fichiers
  const uploadFiles = async () => {
    if (files.length === 0) {
      console.error("No files selected for upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files[]", file)); // Ajouter chaque fichier dans FormData

    try {
      const response = await fetch(
        "https://uploads.pixecurity.com/upload.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed: " + (await response.text()));
      }

      const data = await response.json();
      console.log("Upload successful:", data);
// alert swal
Swal.fire({
  icon: 'success',
  title: 'Fichiers téléchargés avec succès',
  showConfirmButton: false,
  timer: 1500
})
      getUploadedFiles(); // Recharger la liste des fichiers après l'upload
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("Upload failed.");
    }
  };

  // Fonction pour supprimer un fichier
  const deleteFile = async (fileName) => {
    if (!fileName) {
      console.error("No file specified for deletion.");
      return;
    }
  
    const formData = new FormData();
    formData.append("fileName", fileName);
  
    try {
      const response = await fetch("https://uploads.pixecurity.com/deleteFile.php", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete file: " + (await response.text()));
      }
  
      const data = await response.json();
      console.log("File deleted:", data);
  
      Swal.fire({
        icon: 'success',
        title: 'Fichier supprimé avec succès',
        showConfirmButton: false,
        timer: 1500
      });
  
      // Mettre à jour la liste des fichiers en supprimant le fichier localement
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file.name !== fileName)
      );
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };
  

  // fonction pour copier le lien de téléchargement
  const copyLink = (url) => {
    navigator.clipboard.writeText(url).then(
      () => {},
      (error) => {
        console.error("Error copying link:", error);
        alert("Erreur lors de la copie du lien");
      }
    );
  };

  return (
    <div className={styles.fileManagerContainer}>
      <h1>Upload de fichiers</h1>

      {/* Zone de drag and drop */}
      <div
        className={styles.dropZone}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p>Faites glisser et déposez vos fichiers ici</p>
      </div>

      {/* Zone de sélection de fichiers */}
      <input type="file" onChange={handleFileChange} multiple={true} />
      <button onClick={uploadFiles} className={styles.uploadBtn}>
      <i class="fa-solid fa-upload"></i>    {" "} {" "}Upload
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
      {files.length > 0 && (
        <div className={styles.selectedFiles}>
          <h2>Sélection:</h2>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2>Fichiers disponibles:</h2>

        <table>
          <thead>
            <tr>
              <th>Aperçu</th>
              <th>Date</th>
              <th>Nom de fichier</th>
              <th>Taille</th>
              <th>Voir</th>
              <th> Actions </th>
              <th> </th>
         
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((file, index) => (
              <tr key={index}>
                <td>
                  {file.name.endsWith(".pdf") ? (
                    <div className={styles.thumbnailContainer}>
                      <img
                        className={styles.thumbnail}
                        src={`https://uploads.pixecurity.com/files/thumbnails/${file.name.replace(/\+/g, "_")}.jpg`}
                      />
                      <img
                        className={styles.pdfIcon}
                        src="https://cdn-icons-png.flaticon.com/512/4726/4726010.png"
                        alt="PDF icon"
                      />
                    </div>
                  ) : (
                    <img
                      className={styles.thumbnail}
                      src={file.url}
                    
                    />
                  )}
                </td>

                <td>{(file.date = new Date().toLocaleDateString())}</td>

                <td>{file.name.length > 70 ? file.name.substring(0, 70) + "..." : file.name}</td>
              

                <td>{(file.size / 1000).toFixed(1)} Ko</td>

                <td>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    Voir/ Télécharger
                  </a>
                </td>

                <td>
                  <button onClick={() => copyLink(file.url)} className={styles.copyButton}>Copier url</button>
                </td>
                <td>

                  <button onClick={() => deleteFile(file.name)} className={styles.deleteBtn}>Supprimer</button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
