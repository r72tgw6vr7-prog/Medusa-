import React, { useEffect, useState } from 'react';

interface FileInfo {
  name: string;
  lastModified?: string;
  size?: number;
  type?: string;
  status?: string;
  error?: string;
}

const BuildStateMonitor: React.FC = () => {
  const [fileInfo, setFileInfo] = useState<FileInfo[]>([]);
  const [buildInfo, setBuildInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    // Function to check file info
    const checkFiles = async () => {
      const filesToCheck = [
        '/src/components/TeamGrid.tsx',
        '/src/components/TeamGrid.css',
        '/public/images/artists/aaron.jpg',
        '/public/images/artists/eli.jpg',
        '/public/images/artists/oliver.jpg',
        '/public/images/artists/vive.jpg',
        '/public/images/team/AAron.jpg',
        '/public/images/team/Eli-luquez.jpg',
        '/public/images/team/Oli.jpg',
        '/public/images/team/Vive.jpg',
      ];

      const results: FileInfo[] = [];

      for (const file of filesToCheck) {
        try {
          const response = await fetch(file, { method: 'HEAD' });
          if (response.ok) {
            results.push({
              name: file,
              lastModified: response.headers.get('last-modified') || undefined,
              size: parseInt(response.headers.get('content-length') || '0') || undefined,
              type: response.headers.get('content-type') || undefined,
              status: String(response.status),
            });
          } else {
            results.push({
              name: file,
              status: String(response.status),
              error: response.statusText,
            });
          }
        } catch (err) {
          results.push({
            name: file,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }

      setFileInfo(results);
    };

    // Function to collect build info
    const collectBuildInfo = () => {
      const info: Record<string, any> = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        windowDimensions: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        documentReadyState: document.readyState,
        performanceTiming: {},
      };

      // Add performance timing info if available
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        info.performanceTiming = {
          navigationStart: timing.navigationStart,
          domLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
          windowLoaded: timing.loadEventEnd - timing.navigationStart,
        };
      }

      // Get CSS variables to verify they've been loaded
      const computedStyle = getComputedStyle(document.documentElement);
      info.cssVariables = {
        brandGold: computedStyle.getPropertyValue('--brand-gold'),
        brandBackground: computedStyle.getPropertyValue('--brand-background'),
        brandWhite: computedStyle.getPropertyValue('--brand-white'),
      };

      // Check if our components are in the DOM
      info.componentsPresent = {
        teamGrid: Boolean(document.querySelector('.team-section')),
        teamHeading: Boolean(document.querySelector('.team-heading')),
        teamCards: document.querySelectorAll('.team-card').length,
      };

      setBuildInfo(info);
    };

    checkFiles();
    collectBuildInfo();

    // Add visible indicator to the DOM
    const indicator = document.createElement('div');
    indicator.id = 'build-state-indicator';
    indicator.style.position = 'fixed';
    indicator.style.bottom = '10px';
    indicator.style.left = '10px';
    indicator.style.padding = '8px';
    indicator.style.background = 'rgba(0,0,0,0.7)';
    indicator.style.color = 'white';
    indicator.style.fontSize = '12px';
    indicator.style.borderRadius = '4px';
    indicator.style.zIndex = '9999';
    indicator.textContent = `Build verified: ${new Date().toLocaleTimeString()}`;
    document.body.appendChild(indicator);

    return () => {
      const indicator = document.getElementById('build-state-indicator');
      if (indicator) {
        indicator.remove();
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        left: '10px',
        width: '300px',
        maxHeight: '400px',
        overflowY: 'auto',
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '15px',
        borderRadius: '5px',
        zIndex: '9999',
        fontSize: '12px',
      }}
    >
      <h3>Build State Monitor</h3>

      <div>
        <h4>Component Status:</h4>
        <ul>
          <li>TeamGrid Present: {buildInfo.componentsPresent?.teamGrid ? '✅' : '❌'}</li>
          <li>Team Cards Count: {buildInfo.componentsPresent?.teamCards || 0}</li>
        </ul>
      </div>

      <div>
        <h4>CSS Variables:</h4>
        <ul>
          <li>--brand-gold: {buildInfo.cssVariables?.brandGold}</li>
          <li>--brand-background: {buildInfo.cssVariables?.brandBackground}</li>
        </ul>
      </div>

      <div>
        <h4>File Status:</h4>
        <ul>
          {fileInfo.map((file, index) => (
            <li key={index}>
              {file.name}: {file.error ? '❌' : '✅'}
              {file.lastModified && (
                <span> - {new Date(file.lastModified).toLocaleTimeString()}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4>Performance:</h4>
        <ul>
          <li>DOM Loaded: {buildInfo.performanceTiming?.domLoaded}ms</li>
          <li>Window Loaded: {buildInfo.performanceTiming?.windowLoaded}ms</li>
        </ul>
      </div>
    </div>
  );
};

export default BuildStateMonitor;
