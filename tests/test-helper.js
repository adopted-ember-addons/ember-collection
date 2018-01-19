import Ember from 'ember';

import App from '../app';
import config from '../config/environment';
import { start } from 'ember-cli-qunit';

import {
  setApplication
} from '@ember/test-helpers';

setApplication(App.create(config.APP));
start();

// ensure Ember.Test.adapter.exception properly re-throws
// this is required for Ember 2.11.3 through 2.16
Ember.Test.adapter.exception = error => {
  throw error;
};
