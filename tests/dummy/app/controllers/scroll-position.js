import Ember from 'ember';
import { FixedGridInterface } from '../interface/grid-interface';

export default Ember.Controller.extend({
  itemWidth: 100,
  itemHeight: 100,
  containerWidth: 315,
  containerHeight: 600,
  scrollLeft: 0,
  scrollTop: 0,

  showLayout: false,

  fixedGrid: Ember.computed('itemWidth', 'itemHeight', function() {
    return new FixedGridInterface(this.get('itemWidth'), this.get('itemHeight'));
  }),

  code: Ember.computed('fixedGrid._size', 'fixedGrid._contentSize', 'fixedGrid._indexAt', 'fixedGrid._count', function() {
    if(!(this.get('fixedGrid._size') || 0)){ return ''; }
    return '\n' +
      this.get('fixedGrid.markdownContentSize') + '\n' +
      this.get('fixedGrid.markdownIndexAt') + '\n' +
      this.get('fixedGrid.markdownCount');
  }),

  actions: {
    updateContainerWidth: function(value) {
      this.set('containerWidth', parseInt(value, 10));
    },

    updateContainerHeight: function(value) {
      this.set('containerHeight', parseInt(value, 10));
    },

    makeSquare: function() {
      this.setProperties({
        itemWidth: 100,
        itemHeight: 100
      });
    },

    makeRow: function() {
      this.setProperties({
        itemWidth: 300,
        itemHeight: 100
      });
    },

    makeLongRect: function() {
      this.setProperties({
        itemWidth: 100,
        itemHeight: 50
      });
    },

    makeTallRect: function() {
      this.setProperties({
        itemWidth: 50,
        itemHeight: 100
      });
    },

    scrollChange: function(scrollLeft, scrollTop){
      this.setProperties({
        scrollLeft: scrollLeft,
        scrollTop: scrollTop
      });
    },

    toggleLayout: function() {
      this.toggleProperty('showLayout');
    }
  }
});
