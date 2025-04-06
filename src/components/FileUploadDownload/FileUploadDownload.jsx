import React, { useState } from 'react';
import axios from 'axios';

const FileUploadDownload = () => {
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [progress, setProgress] = useState(0);
    const [downloadName, setDownloadName] = useState('Video.mp4');

    const uploadFile = async () => {
        if (!file) return alert("Select a file first");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:8080/laptops/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (e) => {
                    setProgress(Math.round((e.loaded * 100) / e.total));
                }
            });
            alert(res.data);
            setProgress(0);
        } catch (err) {
            alert("Upload failed");
            setProgress(0);
        }
    };

    const downloadFile = async () => {

        try {
            const res = await axios.get(`http://localhost:8080/laptops/download/${downloadName}`, {
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', downloadName);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            alert("Download failed");
        }
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
            <h2>Upload a File</h2>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button type='button' onClick={uploadFile} style={{ marginLeft: '1rem' }}>Upload</button>
            {progress > 0 && <div>Uploading: {progress}%</div>}

            <hr style={{ margin: '2rem 0' }} />

            <h2>Macbook M4 Max Review</h2>
            <button type='button' onClick={downloadFile} style={{ marginLeft: '1rem' }}>Download</button>
        </div>
    );
};

export default FileUploadDownload;
