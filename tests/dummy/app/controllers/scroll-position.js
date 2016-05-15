import Ember from 'ember';
import Grid from 'ember-collection/layouts/grid';

class GridInterface extends Grid {
  get length() {
    return this.size;
  }
  set length (num) {
    Ember.set(this, 'size', num);
  }

  contentSize(w, h) {
    let result = Grid.prototype.contentSize.call(this, w, h);
    let args = Array.prototype.slice.call(arguments);
    Ember.set(this, '_contentSize', {args: args, result: result});
    console.log(`contentSize(${w}, ${h}) => `, result);
    return result;
  }

  indexAt(x, y, w, h) {
    let result = Grid.prototype.indexAt.call(this, x, y, w, h);
    let args = Array.prototype.slice.call(arguments);
    Ember.set(this, '_indexAt', {args: args, result: result});
    console.log(`indexAt(${x}, ${y}, ${w}, ${h}) => `, result);
    return result;
  }

  count(x, y, w, h) {
    let result = Grid.prototype.count.call(this, x, y, w, h);
    let args = Array.prototype.slice.call(arguments);
    Ember.set(this, '_count', {args: args, result: result});
    console.log(`count(${x}, ${y}, ${w}, ${h}) => `, result);
    return result;
  }

  formatItemStyle(itemIndex, clientWidth, clientHeight) {
    let formatItemStyle = Grid.prototype.formatItemStyle.call(this, itemIndex, clientWidth, clientHeight);
    console.log(`formatItemStyle(${itemIndex}, ${clientWidth}, ${clientHeight}) => `, formatItemStyle);
    return formatItemStyle;
  }
}

export default Ember.Controller.extend({
  itemWidth: 100,
  itemHeight: 100,
  containerWidth: 315,
  containerHeight: 600,
  scrollLeft: 0,
  scrollTop: 0,

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
    }
  },

  grid: Ember.computed('itemWidth', 'itemHeight', function() {
    return new GridInterface(this.get('itemWidth'), this.get('itemHeight'));
  }),

  markdown: Ember.computed('grid.size', 'grid._contentSize', 'grid._indexAt', 'grid._count', function() {
    if(this.get('grid.size') < 1){return '';}
    return this.getGridContentSize() + '\n' +
      this.getGridIndexAt() + '\n' +
      this.getGridCount();
  }),

  /*
   Reactive Javascript Markdown Strings
   TODO: Style this better or move to a mixin?
  */

  getGridContentSize() {
    let result = Grid.prototype.contentSize.apply(
      this.get('grid'), this.get('grid._contentSize.args')
    );
    return `\n\
/**
 * Size of the content area
 *
 * contentSize(containerWidth, containerHeight)
 */
 contentSize: function(${this.get('grid._contentSize.args').join(', ')}) {
   return ${this.toString(result)};
 }`;
  },

  getGridIndexAt() {
    let result = Grid.prototype.indexAt.apply(
      this.get('grid'), this.get('grid._indexAt.args')
    );
    return `/**
 * Index of the first visible item
 *
 * indexAt(offsetX, offsetY, containerWidth, containerHeight)
 */
 indexAt: function(${this.get('grid._indexAt.args').join(', ')}) {
   return ${this.toString(result)};
 }`;
  },

  getGridCount() {
    let result = Grid.prototype.count.apply(
      this.get('grid'), this.get('grid._count.args')
    );
    return `/**
 * Return the number of items to display
 *
 * count(offsetX, offsetY, containerWidth, containerHeight)
 */
 count: function(${this.get('grid._count.args').join(', ')}) {
   return ${this.toString(result)};
 }`;
  },

  toString(result) {
    return JSON.stringify(result).replace(/:/g, ': ').replace(/"/g, '');
  }
});
