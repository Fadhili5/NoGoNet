import FingerprintJS from '@fingerprintjs/fingerprintjs';

async function getFingerprint() {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    
    console.log("Fingerprint ID:", result.visitorId);
    
    return result.visitorId;
}

// Send fingerprint to background script (optional)
getFingerprint().then(visitorId => {
    chrome.runtime.sendMessage({ type: "FINGERPRINT", visitorId });
});
