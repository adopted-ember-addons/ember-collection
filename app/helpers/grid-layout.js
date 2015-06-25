import Ember from 'ember';
import Grid from 'ember-list-view/layouts/grid';

export default Ember.Helper.helper(function (params, hash) {
  return new Grid(hash.width, hash.height);
});
