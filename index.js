/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-collection',

  treeForVendor: function() {
		var assets_path = require('path').join('layout-bin-packer','index.js');
    return require.resolve('layout-bin-packer').replace(assets_path, '');
  },

  included: function(app) {
    this.app.import('vendor/layout-bin-packer/index.js');
    this.app.import('bower_components/ember/ember-template-compiler.js');
  }
};
