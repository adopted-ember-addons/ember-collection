import Ember from 'ember';
import PercentageColumns from 'ember-collection/layouts/percentage-columns';

export default Ember.Helper.helper(function (params, hash) {
  return new PercentageColumns(params[0], params[1], params[2]);
});