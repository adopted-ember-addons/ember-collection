import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('simple');
  this.route('scroll-position');
  this.route('mixed');
  this.route('percentages');
});

export default Router;
