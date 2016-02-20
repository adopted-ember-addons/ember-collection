/* jshint node:true */

module.exports = {
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
