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
    let contentSize = Grid.prototype.contentSize.call(this, w, h);
    console.log(`contentSize(${w}, ${h}) => `, contentSize);
    return contentSize;
  }

  indexAt(x, y, w, h) {
    let indexAt = Grid.prototype.indexAt.call(this, x, y, w, h);
    console.log(`indexAt(${x}, ${y}, ${w}, ${h}) => `, indexAt);
    return indexAt;
  }

  count(x, y, w, h) {
    let count = Grid.prototype.count.call(this, x, y, w, h);
    console.log(`count(${x}, ${y}, ${w}, ${h}) => `, count);
    return count;
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

  markdown: Ember.computed('grid.size', 'containerWidth', 'containerHeight', 'scrollLeft', 'scrollTop', function() {
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
    let containerWidth = this.get('containerWidth');
    let containerHeight = this.get('containerHeight');
    let contentSize = Grid.prototype.contentSize.call(
      this.get('grid'), containerWidth, containerHeight
    );
    return `\n\
/**
 * Return an object that describes the size of the content area
 * contentSize: function(clientWidth, clientHeight) {
 */
 contentSize: function(${containerWidth}, ${containerHeight}) {
   return { width: ${contentSize.width}, height: ${contentSize.height} };
 }`;
  },

  getGridIndexAt() {
    let offsetX = this.get('scrollLeft');
    let offsetY = this.get('scrollTop');
    let clientWidth = this.get('containerWidth');
    let clientHeight = this.get('containerHeight');
    let indexAt = Grid.prototype.indexAt.call(
      this.get('grid'), offsetX, offsetY, clientWidth, clientHeight
    );
    return `/**
 * Return the index of the first item shown.
 * indexAt(offsetX, offsetY, clientWidth, clientHeight)
 */
 indexAt(${offsetX}, ${offsetY}, ${clientWidth}, ${clientHeight}) {
   return ${indexAt};
 }`;
  },

  getGridCount() {
    let offsetX = this.get('scrollLeft');
    let offsetY = this.get('scrollTop');
    let width = this.get('containerWidth');
    let height = this.get('containerHeight');
    let count = Grid.prototype.count.call(
      this.get('grid'), offsetX, offsetY, width, height
    );
    return `/**
 *  Return the number of items to display
 *  count(offsetX, offsetY, width, height)
 */
 count(${offsetX}, ${offsetY}, ${width}, ${height}) {
   return ${count};
 }`;
  }
});
