import Ember from 'ember';
import layout from './ember-collection-wrapper/template';

var EmberListWrapper = Ember.Component.extend({
  layout: layout,
  actions: {
    sliceDidChange: function(startingIndex, visibleCount) {
      if (EmberListWrapper.sliceListener(startingIndex, visibleCount)) {
        EmberListWrapper.sliceListener(startingIndex, visibleCount);
      }
    }
  }
});

export default EmberListWrapper;