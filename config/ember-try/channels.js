/* jshint node:true */

module.exports = {
  useYarn: true,
  scenarios: [
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'release'
        },

        resolutions: {
          'ember': 'release'
        }
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        'ember': 'beta'
      },
      resolutions: {
        'ember': 'beta'
      }
    }
  ]
};
