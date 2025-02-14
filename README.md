# betting-site-detector
# Restricted Site Detector Chrome Extension

A powerful Chrome extension designed to protect users by detecting and blocking access to harmful websites while providing real-time SMS notifications to guardians or administrators.

## Features

- Blocks access to harmful websites including:
  - Gambling and betting sites
  - Adult content
  - Drug-related content
  - TikTok and similar platforms
  - Other restricted content

- Real-time monitoring and alerts:
  - SMS notifications when blocked sites are accessed
  - User fingerprinting for accurate tracking
  - Works even in incognito mode
  - Detailed access logs

- User-friendly interface:
  - Clear blocking notifications
  - Detailed reason for site blocking
  - Easy-to-use admin panel

## Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/restricted-site-detector.git
```

2. Configure the extension:
   - Open `background.js`
   - Replace `YOUR_API_KEY` with your Tilil Technologies API key
   - Update the phone number for SMS notifications

3. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" at the top right
   - Click "Load unpacked"
   - Select the extension directory

## Configuration

### SMS Notifications Setup
1. Sign up for a Tilil Technologies account
2. Get your API key from the dashboard
3. Update the config in `background.js`:
```javascript
const SMS_API_CONFIG = {
  baseUrl: "https://api.tililtech.com/sms/v3/sendsms",
  apiKey: "YOUR_API_KEY",
  shortcode: "Tilil"
};
```

### Customizing Blocked Sites
You can modify the blocked sites in `background.js`. Find the rules section and add or modify as needed:
```javascript
{
  id: [number],
  priority: 1,
  action: { type: "block" },
  condition: {
    urlFilter: "*your-site-pattern*",
    resourceTypes: ["main_frame"]
  }
}
```

## Usage

### For Administrators
1. Install the extension
2. Configure the phone number for notifications
3. Monitor the extension icon for alerts
4. Check the logs in the popup panel

### For Users
When attempting to access a restricted site:
1. A popup will appear explaining why the site is blocked
2. The administrator will receive an SMS notification
3. The access attempt will be logged

## File Structure

```
restricted-site-detector/
├── manifest.json          # Extension configuration
├── background.js         # Main extension logic
├── popup.html           # Extension popup interface
├── content.js          # Content scripts
├── blocked.html       # Blocking notification page
├── dist/             # Bundled files
└── icons/           # Extension icons
```

## Dependencies

- FingerprintJS for user tracking
- Tilil Technologies API for SMS
- Chrome Extension APIs

## Permissions Required

The extension requires these permissions:
- Storage
- ActiveTab
- Scripting
- WebRequest
- DeclarativeNetRequest
- Notifications

## Troubleshooting

Common issues and solutions:

1. **SMS not sending:**
   - Check your API key
   - Verify internet connection
   - Ensure correct phone number format

2. **Sites not blocking:**
   - Reload the extension
   - Check console for errors
   - Verify rules are properly configured

3. **Popup not showing:**
   - Check if Chrome is blocking popups
   - Verify HTML files are in correct location
   - Check console for error messages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
