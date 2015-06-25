/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-list-view',
  included: function(app) {
    this._super.included(app);
    app.import('vendor/layout-bin-packer/index.js');
  }
};
