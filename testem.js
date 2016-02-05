/* jshint node:true */

var fs = require('fs');
var path = require('path');
var existsSync = require('exists-sync');
var mkdirp = require('mkdirp');

var isCI = !!process.env['CI'];

var options = {
  "framework": "qunit",
  "test_page": "tests/index.html?hidepassed",
  "disable_watching": true,
  "xunit_intermediate_output": true,
  "report_file": "test-results.xml",
  "launch_in_ci": [
    "Chrome",
    "Firefox",
    "PhantomJS"
  ],
  "launch_in_dev": [
    "Chrome",
    "Firefox",
    "Safari",
    "PhantomJS"
  ]
};

if (isCI) {
  var testReportsPath = path.join(process.env['CIRCLE_TEST_REPORTS'], process.env.SCENARIO_GROUP);

  if (!existsSync(testReportsPath)) {
    mkdirp.sync(testReportsPath);
  }

  options['reporter'] = 'xunit';
  options['report_file'] = path.join(testReportsPath, process.env.EMBER_TRY_CURRENT_SCENARIO + '.xml');
}

module.exports = options;
