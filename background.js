chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.fingerprint) {
      console.log(`User Fingerprint: ${message.fingerprint} visited ${message.url}`);
  
      // Store fingerprint + URL in local storage (optional)
      chrome.storage.local.get({ logs: [] }, (data) => {
        data.logs.push({ fingerprint: message.fingerprint, url: message.url, time: new Date().toISOString() });
        chrome.storage.local.set({ logs: data.logs });
      });
    }
  });
  
chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1],
        addRules: [
        {
            id: 1,
            priority: 1,
            action: { type: "block" },
            condition: {
            urlFilter: "*betting*",
            resourceTypes: ["main_frame"]
            }
        }
        ]
    });
    });  