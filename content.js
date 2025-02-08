(async () => {
    // Load FingerprintJS
    const FingerprintJS = await import(chrome.runtime.getURL("fingerprint.js"));
  
    // Initialize the FingerprintJS agent
    const fp = await FingerprintJS.load();
    const result = await fp.get();
  
    console.log("Fingerprint ID:", result.visitorId);
  
    // Send visitor fingerprint to background.js for logging
    chrome.runtime.sendMessage({ fingerprint: result.visitorId, url: window.location.href });
  })();
  