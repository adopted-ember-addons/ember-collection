import Ember from 'ember';
import MixedGrid from 'ember-list-view/layouts/mixed-grid';

export default Ember.Helper.helper(function (params, hash) {
  return new MixedGrid(params[0]);
});
