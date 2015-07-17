/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-list-view',
  init: function(name) {
    var assets_path = require('path').join('layout-bin-packer','index.js');
    this.treePaths['vendor'] = require.resolve('layout-bin-packer').replace(assets_path, '');
  },

  included: function(app) {
    this.app.import('vendor/layout-bin-packer/index.js');
  }
};
