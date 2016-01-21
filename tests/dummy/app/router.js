import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('simple');
  this.route('scroll-position');
  this.route('mixed');
});

export default Router;
