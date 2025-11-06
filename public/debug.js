// This script will help identify why the page is blank
document.addEventListener('DOMContentLoaded', () => {
  // Create error display
  const debugDiv = document.createElement('div');
  debugDiv.style.position = 'fixed';
  debugDiv.style.top = '20px';
  debugDiv.style.left = '20px';
  debugDiv.style.padding = '20px';
  debugDiv.style.background = '#333';
  debugDiv.style.color = '#fff';
  debugDiv.style.zIndex = '9999';
  debugDiv.style.maxWidth = '80%';
  debugDiv.style.maxHeight = '80%';
  debugDiv.style.overflow = 'auto';
  debugDiv.style.fontFamily = 'monospace';
  debugDiv.style.fontSize = '14px';
  debugDiv.style.borderRadius = '4px';
  debugDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  
  debugDiv.innerHTML = '<h3>Debug Info</h3>';
  
  // Check for React root
  const rootElement = document.getElementById('root');
  debugDiv.innerHTML += `<p>Root element exists: ${rootElement ? 'Yes' : 'No'}</p>`;
  
  // Check for React loading
  debugDiv.innerHTML += `<p>React loaded: ${window.React ? 'Yes' : 'No'}</p>`;
  debugDiv.innerHTML += `<p>ReactDOM loaded: ${window.ReactDOM ? 'Yes' : 'No'}</p>`;
  
  // Network status
  debugDiv.innerHTML += `<p>Online status: ${navigator.onLine ? 'Online' : 'Offline'}</p>`;
  
  // Environment info
  debugDiv.innerHTML += `<p>Environment: ${process?.env?.NODE_ENV || 'Not available'}</p>`;
  debugDiv.innerHTML += `<p>Build time: ${new Date().toISOString()}</p>`;
  
  // Check CSP headers
  debugDiv.innerHTML += `<p>CSP: ${document.querySelector('meta[http-equiv="Content-Security-Policy"]')?.content || 'Not found in meta'}</p>`;
  
  // Check JS errors
  window.addEventListener('error', function(e) {
    const errorInfo = document.createElement('div');
    errorInfo.style.color = '#ff6b6b';
    errorInfo.style.marginTop = '10px';
    errorInfo.innerHTML = `<strong>Error:</strong> ${e.message}<br><code>${e.filename}:${e.lineno}:${e.colno}</code>`;
    debugDiv.appendChild(errorInfo);
  });
  
  document.body.appendChild(debugDiv);
});

// Add this script to index.html before the app loads
(function() {
  const scriptTag = document.createElement('script');
  scriptTag.src = '/debug.js';
  document.head.prepend(scriptTag);
})();
