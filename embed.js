(function() {
  const iframe = document.createElement('iframe');
  iframe.src = "https://TU_USUARIO.github.io/agent-virtual/";
  iframe.style.position = 'fixed';
  iframe.style.bottom = '0';
  iframe.style.right = '0';
  iframe.style.width = '300px';
  iframe.style.height = '400px';
  iframe.style.border = 'none';
  iframe.style.zIndex = '9999';
  document.body.appendChild(iframe);
})();
