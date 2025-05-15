chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "injectstyles") {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["content.js"]
          });
        }
      });
    }
  });