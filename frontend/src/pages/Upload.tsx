import { useState } from 'react';

export default function Upload() {
  const [status, setStatus] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setStatus('Uploading and analyzing with AI...');
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/documents/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setStatus(`Successfully uploaded ${file.name}.\n\nAI Summary: ${data.summary || 'No summary generated.'}`);
      } else {
        setStatus(`Upload failed: ${response.statusText}`);
      }
    } catch (err) {
      setStatus('Upload failed');
    }
  };

  return (
    <div>
      <h2>Upload Document</h2>
      <div className="card">
        <input 
          type="file" 
          onChange={handleUpload} 
          data-testid="file-input" 
          accept=".pdf"
        />
        <button className="button" style={{ marginLeft: '1rem' }} data-testid="upload-button">Upload</button>
        {status && <div data-testid="upload-status" style={{ marginTop: '1rem', color: 'green' }}>{status}</div>}
      </div>
    </div>
  );
}
