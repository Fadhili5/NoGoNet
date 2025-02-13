// Constants for SMS API
const SMS_API_CONFIG = {
  baseUrl: "https://api.tililtech.com/sms/v3/sendsms",
  apiKey: "API_KEY",  // Replace with your actual API key
  shortcode: "Tilil"
};

// Test function that we know works
async function testSendSMS() {
  console.log('Starting SMS test...');
  
  const testData = {
    api_key: SMS_API_CONFIG.apiKey,
    service: 0,
    mobile: "0707548787",
    response_type: "json",
    shortcode: SMS_API_CONFIG.shortcode,
    message: "Test SMS from extension"
  };

  try {
    console.log('Sending test request with data:', testData);
    
    const response = await fetch(SMS_API_CONFIG.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(testData),
      mode: 'cors'
    });

    console.log('Raw response:', response);
    const responseText = await response.text();
    console.log('Response text:', responseText);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${responseText}`);
    }

    const responseData = JSON.parse(responseText);
    console.log('Parsed response data:', responseData);
    return responseData;
  } catch (error) {
    console.error('Test SMS failed:', error);
    throw error;
  }
}

// Function to handle blocked site detection
async function handleBlockedSite(url, fingerprint) {
  console.log('Handling blocked site:', { url, fingerprint });
  
  try {
    // Prepare SMS data using the same format as our working test
    const smsData = {
      api_key: SMS_API_CONFIG.apiKey,
      service: 0,
      mobile: "0707548787", // Replace with actual number
      response_type: "json",
      shortcode: SMS_API_CONFIG.shortcode,
      message: `Alert: Blocked access attempt to ${url} by user ${fingerprint}`
    };

    // Use the same fetch configuration as our working test
    const response = await fetch(SMS_API_CONFIG.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(smsData),
      mode: 'cors'
    });

    const responseText = await response.text();
    console.log('SMS send response:', responseText);

    // Log to storage
    chrome.storage.local.get({ logs: [] }, (data) => {
      data.logs.push({
        fingerprint: fingerprint,
        url: url,
        time: new Date().toISOString(),
        smsStatus: responseText
      });
      
      chrome.storage.local.set({ logs: data.logs }, () => {
        chrome.action.setBadgeText({ text: '!' });
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon128.png',
          title: 'Restricted Site Alert',
          message: `Access to ${url} was blocked and SMS alert was sent.`
        });
      });
    });

  } catch (error) {
    console.error('Error handling blocked site:', error);
  }
}

// Install event listener
chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed/updated');
  
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: Array.from({ length: 15 }, (_, i) => i + 1), // Remove rules 1-15
    addRules: [
      // Original rules
      {
        id: 1,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*betting*",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 2,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*gambling*",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 3,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*casino*",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 4,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*illegal*",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 5,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*porn*",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 6,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*xxx*",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 7,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*adult*",
          resourceTypes: ["main_frame"]
        }
      },
      // TikTok rules
      {
        id: 8,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*tiktok.com*",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 9,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*musical.ly*",
          resourceTypes: ["main_frame"]
        }
      },
      // Drug-related rules
      {
        id: 10,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*drugs*",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 11,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*cocaine*",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 12,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*heroin*",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 13,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*marijuana*",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 14,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*cannabis*",
          resourceTypes: ["main_frame"]
        }
      },
      {
        id: 15,
        priority: 1,
        action: { type: "block" },
        condition: {
          urlFilter: "*darknet*",
          resourceTypes: ["main_frame"]
        }
      }
    ]
  });
});

// Message listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message);
  
  if (message.fingerprint) {
    // Immediately handle the blocked site
    handleBlockedSite(message.url, message.fingerprint)
      .then(() => console.log('Blocked site handled successfully'))
      .catch(error => console.error('Error handling blocked site:', error));
    
    return true; // Keep message channel open for async response
  }
  
  if (message.action === "getLogs") {
    chrome.storage.local.get({ logs: [] }, (data) => {
      sendResponse({ logs: data.logs });
    });
    return true;
  }
});

// Add listener for blocked requests
chrome.declarativeNetRequest.onRuleMatchedDebug?.addListener(
  (info) => {
    console.log('Rule matched:', info);
    handleBlockedSite(info.request.url, 'Rule match detection')
      .then(() => console.log('Handled rule match'))
      .catch(error => console.error('Error handling rule match:', error));
  }
);