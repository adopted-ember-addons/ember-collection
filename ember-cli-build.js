/* global require, module */
var path = require('path');
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');
var BabelTranspiler = require('broccoli-babel-transpiler');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');
var Concat = require('broccoli-concat');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });


  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */
  app.import('bower_components/ember/ember-template-compiler.js');

  var addonTree = new Funnel('addon', {
    destDir: '/ember-collection'
  });
  var appTree = new Funnel('app', {
    destDir: 'demo-app'
  });
  var layoutBinPackerPath = path.join(path.dirname(require.resolve('layout-bin-packer')), '..', 'lib', 'layout-bin-packer');
  var layoutBinPackerTree = new Funnel(layoutBinPackerPath, {
    destDir: '/layout-bin-packer'
  });
  var emberCollectionTemplateTree = new Concat(addonTree, {
    inputFiles: ['ember-collection/components/ember-collection/template.hbs'],
    header: 'export default Ember.HTMLBars.compile(`',
    footer: '`)',
    outputFile: 'ember-collection/components/ember-collection/template.js'
  });

  var mergedTrees = new MergeTrees([appTree, emberCollectionTemplateTree, addonTree, layoutBinPackerTree]);

  var transpiledTree = new BabelTranspiler(mergedTrees, {
    loose: true,
    moduleIds: true,
    modules: 'amdStrict'
  });

  var concattedTree = new Concat(transpiledTree, {
    inputFiles: ['**/*.js'],
    outputFile: '/twiddly-file.js'
  });

  return app.toTree(concattedTree);
};
