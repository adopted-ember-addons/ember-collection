import Ember from 'ember';
import Grid from 'ember-collection/layouts/grid';

export default Ember.Helper.helper(function (params, hash) {
  return new Grid(params[0], params[1]);
});
