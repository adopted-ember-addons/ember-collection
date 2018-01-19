const getChannelURL = require('ember-source-channel-url');

module.exports = function() {
  return getChannelURL('canary').then(url => {
    return {
      useYarn: true,
      scenarios: [
        {
          name: 'ember-canary',
          npm: {
            devDependencies: {
              'ember-source': url
            }
          }
        },
      ]
    };
  });
};
