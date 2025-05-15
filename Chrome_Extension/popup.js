document.addEventListener('DOMContentLoaded', () => {
    const font_slider = document.getElementById('fontsizeslider');
    const line_slider = document.getElementById('lineheightslider');
    const font_value = document.getElementById('fontsizevalue');
    const line_value = document.getElementById('lineheightnumber');
    const darkmodethemetoggle = document.getElementById('darkmodethemetoggle'); 
    const darkmode_webtoggle = document.getElementById('darkmode_web_toggle'); 
    const font_select = document.getElementById('font_type_dropdown');
    const body = document.body;
  
    //update values when the slider moves
    font_slider.addEventListener('input', () => {
      font_value.textContent = `${font_slider.value}%`;
      sendUpdate();
    });
  
    line_slider.addEventListener('input', () => {
      line_value.textContent = line_slider.value;
      sendUpdate();
    });

    //update the font when clicked
    font_select.addEventListener('change', () => {
        sendUpdate();
    });
  
    //toggle darkmode for popup
    darkmodethemetoggle.addEventListener('click', () => {
      body.classList.toggle('dark');
    });

    // Website darkmode
    darkmode_webtoggle.addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['content.js']
          }, () => {
            chrome.tabs.sendMessage(tabs[0].id, {
              action: 'toggle_dark_mode_web'
            });
          });
        });
    });
  
    function sendUpdate() {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tabId = tabs[0].id;
      
          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js'] // inject this before sending the message
          }, () => {
            // Send the message to content.js update_styles
            chrome.tabs.sendMessage(tabId, {
              action: 'update_styles',
              fontsize: font_slider.value, 
              lineheight: line_slider.value,
              font_type: font_select.value,
            });
          });
        });
    }
});