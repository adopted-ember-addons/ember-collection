import Ember from 'ember';
import { FixedGridInterface } from '../interface/grid-interface';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default Ember.Controller.extend({
  itemWidth: 100,
  itemHeight: 100,
  containerWidth: 315,
  containerHeight: 600,

  showLayout: false,

  fixedGrid: Ember.computed('itemWidth', 'itemHeight', function() {
    return new FixedGridInterface(this.get('itemWidth'), this.get('itemHeight'));
  }),

  markdown: Ember.computed('fixedGrid._size', 'fixedGrid._contentSize', 'fixedGrid._indexAt', 'fixedGrid._count', function() {
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

    shuffle: function() {
      this.set('model', shuffle(this.get('model').slice(0)));
    },

    makeSquare: function() {
      this.setProperties({
        itemWidth: 100,
        itemHeight: 100,
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

    toggleLayout: function() {
      this.toggleProperty('showLayout');
    }
  }
});
