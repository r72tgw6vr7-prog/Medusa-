import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

// ⚠️ WARNING: This component should NOT be included in production builds
// For development/testing only. Use proper authentication in production.
const CREDENTIALS = {
  email: import.meta.env.VITE_ADMIN_EMAIL || '',
  password: import.meta.env.VITE_ADMIN_PASSWORD || '',
};

interface ImageItem {
  id: string;
  url: string;
  category: string;
  uploadedDate: string;
}

export function AdminUploadPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('tattoos');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Ungültige Anmeldedaten');
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      setError('');

      try {
        const uploadPromises = acceptedFiles.map(async (file) => {
          // Create form data for the file
          const formData = new FormData();
          formData.append('file', file);

          // Upload to Vercel Blob
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });

          if (!response.ok) throw new Error('Upload fehlgeschlagen');

          const { url } = await response.json();

          // Create new image entry
          const newImage: ImageItem = {
            id: uuidv4(),
            url,
            category,
            uploadedDate: new Date().toISOString(),
          };

          // Update manifest
          const manifestResponse = await fetch('/api/update-manifest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: newImage }),
          });

          if (!manifestResponse.ok) throw new Error('Manifest Update fehlgeschlagen');

          return newImage;
        });

        await Promise.all(uploadPromises);
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload fehlgeschlagen');
      } finally {
        setUploading(false);
      }
    },
    [category],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    disabled: uploading,
  });

  if (!isLoggedIn) {
    return (
      <div className='max-w-md mx-auto mt-8 p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-[var(--brand-gold)]/20'>
        <h2 className='text-2xl font-bold mb-8 text-[var(--brand-gold)]'>Admin Login</h2>
        <form onSubmit={handleLogin} className='space-y-8'>
          <div>
            <label className='block text-sm font-medium text-gray-200 mb-0'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-0 py-0 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[var(--brand-gold)]'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-200 mb-0'>Passwort</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-0 py-0 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[var(--brand-gold)]'
            />
          </div>
          {error && <p className='text-red-400 text-sm'>{error}</p>}
          <button
            type='submit'
            className='w-full bg-[var(--brand-gold)] text-black py-0 px-8 rounded-md hover:bg-[#B8941F] transition-colors font-medium transition duration-200 ease-out'
          >
            Anmelden
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto mt-8 p-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border-2 border-[var(--brand-gold)]/20'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-[var(--brand-gold)]'>Fotos hochladen</h2>
        <button
          onClick={() => setIsLoggedIn(false)}
          className='text-gray-400 hover:text-white transition-colors transition duration-200 ease-out'
        >
          Abmelden
        </button>
      </div>

      <div className='mb-8'>
        <label className='block text-sm font-medium text-gray-200 mb-0'>Kategorie</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='w-full px-0 py-0 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-[var(--brand-gold)]'
        >
          <option value='tattoos'>Tattoos</option>
          <option value='piercings'>Piercings</option>
          <option value='studio'>Studio</option>
        </select>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-[var(--brand-gold)] bg-[var(--brand-gold)]/10' : 'border-gray-600 hover:border-[var(--brand-gold)]/50'}
          ${uploading ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center gap-0'>
          {uploading ? (
            <>
              <Loader2 className='w-10 h-10 text-[var(--brand-gold)] animate-spin' />
              <p className='text-gray-300'>Hochladen...</p>
            </>
          ) : (
            <>
              {isDragActive ? (
                <>
                  <Upload className='w-10 h-10 text-[var(--brand-gold)]' />
                  <p className='text-[var(--brand-gold)]'>Fotos hier ablegen...</p>
                </>
              ) : (
                <>
                  <ImageIcon className='w-10 h-10 text-gray-400' />
                  <p className='text-gray-300'>Fotos hierher ziehen oder klicken zum Auswählen</p>
                  <p className='text-gray-400 text-sm'>JPG, PNG oder WEBP</p>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {error && (
        <div className='mt-8 p-0 bg-red-500/10 border border-red-500/20 rounded-md'>
          <p className='text-red-400 text-sm'>{error}</p>
        </div>
      )}
    </div>
  );
}

export default AdminUploadPanel;
