/* jshint node:true */

module.exports = {
  useYarn: true,
  scenarios: [
    {
      name: 'ember-canary',
      allowedToFail: true,
      dependencies: {
        'ember': 'canary'
      },
      resolutions: {
        'ember': 'canary'
      }
    },
  ]
};
