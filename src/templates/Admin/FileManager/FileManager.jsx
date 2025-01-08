import { useState } from 'react';
import styles from './style.module.scss';

export default function FileManager() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('https://uploads.pixecurity.com/upload.php', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded:', data);
      } else {
        console.error('Upload failed:', await response.text());
      }
    } catch (err) {
      console.error('Upload error:', err);
    }
  };
  
  


  return (
    <div className={styles.fileManagerContainer}>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}
