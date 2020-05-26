module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,
  launch_in_ci: [
    'Chrome',
    'Firefox'
  ],
  launch_in_dev: [
    'Chrome',
    'Firefox',
    'Safari'
  ],
  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900'
      ].filter(Boolean)
    },
    Firefox: {
      mode: 'ci',
      args: [
        '--headless',
        '--window-size=1440,900'
      ]
    }
  }
};
