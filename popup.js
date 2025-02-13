document.addEventListener('DOMContentLoaded', function() {
    // Clear badge when loaded
    chrome.action.setBadgeText({ text: '' });
  
    // Fetch and display logs on popup load
    chrome.runtime.sendMessage({ action: "getLogs" }, function(response) {
      const logs = response.logs;
      const logsList = document.getElementById('logsList');
      if (logsList) {
        logs.forEach(log => {
          const logItem = document.createElement('li');
          logItem.textContent = `Fingerprint: ${log.fingerprint}, URL: ${log.url}, Time: ${log.time}`;
          logsList.appendChild(logItem);
        });
      } else {
        console.error('Logs list element not found');
      }
    });
  });

  // Function to show blocked popup
function showBlockedPopup(url, reason) {
    chrome.windows.create({
        url: `popup.html?url=${encodeURIComponent(url)}&reason=${encodeURIComponent(reason)}`,
        type: 'popup',
        width: 440,
        height: 400
    });
}