// Advanced error logger for production debugging
window.onerror = function(message, source, lineno, colno, error) {
  // Create error log element if it doesn't exist
  let errorLog = document.getElementById('error-log');
  if (!errorLog) {
    errorLog = document.createElement('div');
    errorLog.id = 'error-log';
    errorLog.style.position = 'fixed';
    errorLog.style.bottom = '10px';
    errorLog.style.left = '10px';
    errorLog.style.right = '10px';
    errorLog.style.maxHeight = '50vh';
    errorLog.style.overflow = 'auto';
    errorLog.style.padding = '20px';
    errorLog.style.backgroundColor = '#ff0000';
    errorLog.style.color = '#ffffff';
    errorLog.style.fontFamily = 'monospace';
    errorLog.style.fontSize = '14px';
    errorLog.style.zIndex = '100000';
    errorLog.style.borderRadius = '4px';
    document.body.appendChild(errorLog);
  }

  // Log the error
  const errorElement = document.createElement('div');
  errorElement.style.marginBottom = '10px';
  errorElement.style.padding = '10px';
  errorElement.style.backgroundColor = 'rgba(255,255,255,0.2)';
  errorElement.style.borderRadius = '4px';

  errorElement.innerHTML = `
    <strong>Error:</strong> ${message}<br>
    <strong>Source:</strong> ${source}<br>
    <strong>Line:</strong> ${lineno}, <strong>Column:</strong> ${colno}<br>
    <strong>Stack:</strong> ${error && error.stack ? error.stack.replace(/\\n/g, '<br>') : 'No stack trace'}
  `;
  
  errorLog.appendChild(errorElement);
  
  // Attempt to send to console as well
  console.error(message, error);
  
  return false; // Let the error propagate
};

// Check for missing modules
document.addEventListener('DOMContentLoaded', function() {
  const requiredModules = [
    { name: 'React', global: 'React' },
    { name: 'ReactDOM', global: 'ReactDOM' },
    { name: 'App', check: () => document.getElementById('root')?.children.length > 0 }
  ];
  
  setTimeout(() => {
    // Check if app has rendered after a delay
    if (document.getElementById('root')?.children.length === 0) {
      const missingModules = requiredModules.filter(module => {
        if (module.check) {
          return !module.check();
        }
        return !window[module.global];
      });
      
      if (missingModules.length > 0) {
        const errorLog = document.getElementById('error-log') || document.createElement('div');
        errorLog.id = 'error-log';
        errorLog.style.position = 'fixed';
        errorLog.style.bottom = '10px';
        errorLog.style.left = '10px';
        errorLog.style.right = '10px';
        errorLog.style.padding = '20px';
        errorLog.style.backgroundColor = '#ff0000';
        errorLog.style.color = '#ffffff';
        errorLog.style.fontFamily = 'monospace';
        errorLog.style.fontSize = '14px';
        errorLog.style.zIndex = '100000';
        
        errorLog.innerHTML += '<h3>Missing Dependencies</h3>';
        missingModules.forEach(module => {
          errorLog.innerHTML += `<p>${module.name} not loaded</p>`;
        });
        
        document.body.appendChild(errorLog);
      }
    }
  }, 2000);
});
