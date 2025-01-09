import { useState, useEffect } from "react";
import styles from "./style.module.scss";

export default function FileManager() {
  const [files, setFiles] = useState([]); // Tableau pour stocker les fichiers sélectionnés
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Fonction pour récupérer les fichiers du serveur
  const getUploadedFiles = async () => {
    try {
      const response = await fetch("https://uploads.pixecurity.com/listFiles.php"); // Requête vers le nouveau script PHP
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

  // Fonction pour uploader plusieurs fichiers
  const uploadFiles = async () => {
    if (files.length === 0) {
      console.error("No files selected for upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("files[]", file)); // Ajouter chaque fichier dans FormData

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

      setUploadStatus("Upload successful!");
      getUploadedFiles(); // Recharger la liste des fichiers après l'upload
    } catch (error) {
      console.error("Error uploading files:", error);
      setUploadStatus("Upload failed.");
    }
  };

  // fonction pour copier le lien de téléchargement
  const copyLink = (url) => {
    navigator.clipboard.writeText(url).then(
      () => {
        
      },
      (error) => {
        console.error("Error copying link:", error);
        alert("Erreur lors de la copie du lien");
      }
    );
  };

  


  return (
    <div className={styles.fileManagerContainer}>
      <h1>Upload de fichiers</h1>
      <input
        type="file"
        onChange={handleFileChange}
        multiple={true} 
      />
      <button onClick={uploadFiles} className={styles.uploadBtn} >Upload</button> 
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
              <th> Action </th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.map((file, index) => (
              <tr key={index}>
<td>
  {file.name.endsWith('.pdf') ? (
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
    <img className={styles.thumbnail} src={file.url} alt={file.name} />
  )}
</td>



                <td>{file.date = new Date().toLocaleDateString()}</td>
                <td>{file.name}</td>
                
                <td>{(file.size / 1000).toFixed(1)} Ko</td>

               
                
                <td>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    Voir/ Télécharger
                  </a>
                </td>
                <td>
                  <button onClick={() => copyLink(file.url)}>Copier url</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       
      </div>
    </div>
  );
}
