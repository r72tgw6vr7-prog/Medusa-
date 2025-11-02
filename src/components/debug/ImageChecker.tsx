import React, { useEffect, useState } from 'react';

// Add type declaration for Vite's import.meta.env
interface ImportMetaEnv {
  DEV: boolean;
  PROD: boolean;
  MODE: string;
}

interface ImageCheckResult {
  url: string;
  exists: boolean;
  status?: number;
  error?: string;
}

// Create a component to check if images exist
export const ImageChecker: React.FC = () => {
  const [results, setResults] = useState<ImageCheckResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imagesToCheck = [
      // Team member images - artist folder
      '/images/artists/eli.jpg',
      '/images/artists/aaron.jpg',
      '/images/artists/oliver.jpg',
      '/images/artists/vive.jpg',
      '/images/artists/angie.jpg',
      '/images/artists/debi.jpg',
      '/images/artists/loui.jpg',
      '/images/artists/sasha.jpg',

      // Team member images - team folder
      '/images/team/Eli-luquez.jpg',
      '/images/team/AAron.jpg',
      '/images/team/Oli.jpg',
      '/images/team/Vive.jpg',
      '/images/team/ANGIE.jpg',
      '/images/team/Debi.jpg',
      '/images/team/Loui.jpg',
      '/images/team/Sasha.jpg',
    ];

    const checkImage = async (url: string): Promise<ImageCheckResult> => {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        return {
          url,
          exists: response.ok,
          status: response.status,
        };
      } catch (error) {
        return {
          url,
          exists: false,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    };

    const checkAllImages = async () => {
      const checks = await Promise.all(imagesToCheck.map((url) => checkImage(url)));
      setResults(checks);
      setLoading(false);

      // Log results to console for debugging
      if (import.meta.env.DEV) {
        console.groupCollapsed('Image Check Results');
        console.table(checks);
        console.groupEnd();
      }

      // Also create a visibility marker in the DOM
      const marker = document.createElement('div');
      marker.id = 'image-check-marker';
      marker.style.position = 'fixed';
      marker.style.top = '0';
      marker.style.right = '0';
      marker.style.padding = '5px';
      marker.style.background = 'rgba(0,0,0,0.5)';
      marker.style.color = 'white';
      marker.style.zIndex = '9999';
      marker.textContent = `Images checked: ${checks.filter((c) => c.exists).length}/${checks.length} OK`;
      document.body.appendChild(marker);
    };

    checkAllImages();
  }, []);

  if (loading) {
    return <div>Checking image URLs...</div>;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        zIndex: 1000,
        maxHeight: '300px',
        overflow: 'auto',
      }}
    >
      <h3>Image URL Check Results</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {results.map((result, index) => (
          <li key={index} style={{ margin: '5px 0', color: result.exists ? 'green' : 'red' }}>
            {result.url}: {result.exists ? '✅' : '❌'}
            {result.status && ` (${result.status})`}
            {result.error && ` - ${result.error}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageChecker;
