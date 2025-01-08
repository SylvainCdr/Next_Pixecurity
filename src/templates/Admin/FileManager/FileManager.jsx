import { useState } from 'react';
import styles from './style.module.scss';

export default function FileManager() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  console.log(file);

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
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  
  
  


  return (
    <div className={styles.fileManagerContainer}>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={() => uploadFile(file)}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}
