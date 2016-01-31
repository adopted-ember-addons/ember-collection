import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('simple');
  this.route('scroll-position');
  this.route('mixed');
  this.route('percentages');
});

export default Router;
