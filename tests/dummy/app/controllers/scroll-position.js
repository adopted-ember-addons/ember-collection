import Ember from 'ember';
import Grid from 'ember-collection/layouts/grid';

class GridInterface extends Grid {
  get length() {
    return this.size;
  }
  set length (num) {
    Ember.set(this, 'size', num);
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
    let contentSize = this.get('grid').contentSize(
      this.get('containerWidth'),
      this.get('containerHeight')
    );
    return `/**
   * Return an object that describes the size of the content area
   */
  contentSize: function(clientWidth, clientHeight) {
    // clientWidth  => ${this.get('containerWidth')}
    // clientHeight => ${this.get('containerHeight')}
    return { width: ${contentSize.width}, height: ${contentSize.height} };
  }`;
  },

  getGridIndexAt() {
    let indexAt = this.get('grid').indexAt(
      this.get('scrollLeft'),
      this.get('scrollTop'),
      this.get('containerWidth'),
      this.get('containerHeight')
    );
    return `/**
   * Return the index of the first item shown.
   */
  indexAt(offsetX, offsetY, clientWidth, clientHeight) {
    // offsetX  => ${this.get('scrollLeft')}
    // offsetY  => ${this.get('scrollTop')}
    return ${indexAt};
  }`;
  },

  getGridCount() {
    let count = this.get('grid').count(
      this.get('scrollLeft'),
      this.get('scrollTop'),
      this.get('containerWidth'),
      this.get('containerHeight')
    );
    return `/**
   *  Return the number of items to display
   */
  count(offsetX, offsetY, width, height) {
    // offsetX  => ${this.get('scrollLeft')}
    // offsetY  => ${this.get('scrollTop')}
    // width    => ${this.get('itemWidth')}
    // height   => ${this.get('itemHeight')}
    return ${count};
  }`;
  }
});
