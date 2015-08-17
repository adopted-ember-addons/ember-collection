import Ember from 'ember';
import layout from './ember-collection-wrapper/template';

var EmberListWrapper = Ember.Component.extend({
  layout: layout,
  actions: {
    startingIndexDidChange: function (idx) {
      if (EmberListWrapper.startingIndexListener != null) {
        EmberListWrapper.startingIndexListener(idx);
      }
    },
    visibleCountDidChange: function (count) {
      if (EmberListWrapper.visibleCountListener != null) {
        EmberListWrapper.visibleCountListener(count);
      }
    }
  }
});

export default EmberListWrapper;