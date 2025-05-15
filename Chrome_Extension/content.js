chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'update_styles') {
    document.body.style.fontSize = `${request.fontsize}%`;
    document.body.style.lineHeight = request.lineheight;
    document.body.style.fontFamily = request.font_type;
  }

  if (request.action === 'toggle_dark_mode_web') {
    document.body.classList.toggle('dark-mode-web');
  }
});

//css for dark mode cant go into css folder as thats only for popup ui i want to change webpage directly 
if (!document.getElementById('dark_mode_style')) {
  const dark_mode_style = document.createElement('style');
  dark_mode_style.id = 'dark_mode_style'; 
  dark_mode_style.textContent = `
    .dark-mode-web {
      background-color: #121212 !important;
      color: #ffffff !important;
    }

    .dark-mode-web * {
      background-color: transparent !important;
      color: #ffffff !important;
      border-color: #444 !important;
    }
  `;
  document.head.appendChild(dark_mode_style);
}
