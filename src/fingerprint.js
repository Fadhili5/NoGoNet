import FingerprintJS from '@fingerprintjs/fingerprintjs';

(async () => {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    console.log("Fingerprint ID:", result.visitorId);

    // Send to background script
    chrome.runtime.sendMessage({ fingerprint: result.visitorId, url: window.location.href });
})();