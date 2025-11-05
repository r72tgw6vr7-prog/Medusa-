// Simple diagnostic script to help find errors
window.addEventListener('error', function(e) {
  const errorDiv = document.createElement('div');
  errorDiv.style.position = 'fixed';
  errorDiv.style.top = '20px';
  errorDiv.style.left = '20px';
  errorDiv.style.right = '20px';
  errorDiv.style.padding = '20px';
  errorDiv.style.background = '#f44336';
  errorDiv.style.color = 'white';
  errorDiv.style.zIndex = '9999';
  errorDiv.style.borderRadius = '4px';
  errorDiv.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
  
  errorDiv.innerHTML = `
    <h3>JavaScript Error Detected</h3>
    <p><strong>Message:</strong> ${e.message}</p>
    <p><strong>Source:</strong> ${e.filename}</p>
    <p><strong>Line:</strong> ${e.lineno}, <strong>Column:</strong> ${e.colno}</p>
    <p><strong>Stack:</strong></p>
    <pre style="overflow:auto;max-height:200px;">${e.error?.stack || 'No stack available'}</pre>
  `;
  
  document.body.appendChild(errorDiv);
});

console.log('Diagnostic script loaded!');

// Check for CSP issues
if (window.location.protocol === 'http:' && window.location.hostname === 'localhost') {
  console.log('Running on localhost development server');
  
  // Create a visual indicator
  const statusDiv = document.createElement('div');
  statusDiv.style.position = 'fixed';
  statusDiv.style.bottom = '20px';
  statusDiv.style.right = '20px';
  statusDiv.style.padding = '10px 20px';
  statusDiv.style.background = '#4CAF50';
  statusDiv.style.color = 'white';
  statusDiv.style.zIndex = '9999';
  statusDiv.style.borderRadius = '4px';
  statusDiv.style.fontSize = '14px';
  statusDiv.style.fontFamily = 'sans-serif';
  
  statusDiv.textContent = 'Diagnostic Script Active';
  
  document.body.appendChild(statusDiv);
}
