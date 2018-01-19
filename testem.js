var options = {
  "framework": "qunit",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "launch_in_ci": [
    "Chrome",
    "Firefox",
  ],
  "launch_in_dev": [
    "Chrome",
    "Firefox",
    "Safari",
  ],
  browser_args: {
    Chrome: {
      mode: 'ci',
      args: [
        '--disable-gpu',
        '--headless',
        '--no-sandbox',
        '--remote-debugging-port=0',
        '--window-size=1440,900'
      ]
    },
    Firefox: {
      mode: 'ci',
      args: [
        '--headless',
        '--window-size=1440,900'
      ]
    },
  }
};

module.exports = options;
