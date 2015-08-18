import Ember from 'ember';
import layout from './ember-collection/template';
var decodeEachKey = Ember.__loader.require('ember-htmlbars/utils/decode-each-key')['default'];

class Cell {
  constructor(key, item, index, style) {
    this.key = key;
    this.hidden = false;
    this.item = item;
    this.index = index;
    this.style = style;
  }
}

function formatStyle(pos, width, height) {
  return 'position: absolute; top: 0; left: 0;' +
    ' -webkit-transform: translate('+pos.x+'px, '+pos.y+'px);' +
    ' -moz-transform: translate('+pos.x+'px, '+pos.y+'px);' +
    ' -ms-transform: translate('+pos.x+'px, '+pos.y+'px);' +
    ' -o-transform: translate('+pos.x+'px, '+pos.y+'px);' +
    ' transform: translate('+pos.x+'px, '+pos.y+'px);' +
    ' width: '+width+'px; height: '+height+'px;';
}

export default Ember.Component.extend({
  layout: layout,

  init() {
    // State pulled from attrs is prefixed with an underscore
    // so that there's no chance of shadowing the attrs proxy.
    this._buffer = undefined;
    this._cellLayout = undefined;
    this._items = undefined;
    this._offsetX = undefined;
    this._offsetY = undefined;
    this._width = undefined;
    this._height = undefined;

    // this.firstCell = undefined;
    // this.lastCell = undefined;
    // this.cellCount = undefined;
    this.contentElement = undefined;
    this._cells = [];
    this._cellMap = Object.create(null);
    this.animationFrameRequest = null;

    // TODO: Super calls should always be at the top of the constructor.
    // I had to move the super call after the properties were defined to
    // work around what I believe is a bug in the attrs proxy. The problem
    // seems to arise when you:
    //
    //   1. Call this._super() immediately.
    //   2. Set a property on `this` that is both not in the
    //      initial attrs hash and not on the prototype.
    this._super();
  },

  didInitAttrs() {
    let buffer = this.getAttr('buffer');
    this._buffer = (typeof buffer === 'number') ? buffer : 5;
    this._offsetX = this.getAttr('offset-x') | 0;
    this._offsetY = this.getAttr('offset-y') | 0;
    this._width = this.getAttr('width') | 0;
    this._height = this.getAttr('height') | 0;
  },

  didReceiveAttrs() {
    // Work around emberjs/ember.js#11992. Affects <=1.13.8 and <=2.0.0.
    // This will likely be patched in 1.13.9 and 2.0.1.
    this._super();

    // Reset cells when cell layout or items array changes
    var cellLayout = this.getAttr('cell-layout');
    var items = this.getAttr('items');
    var contentWidth = this.getAttr('width');
    var contentHeight = this.getAttr('height');
    var calculateSize = false;

    if (this._cellLayout !== cellLayout || this._items !== items) {
      this.set('_items', items);
      this._cellLayout = cellLayout;
      calculateSize = true;
    }
    if (contentWidth !== this._width || contentHeight !== this._height) {
      this._width = contentWidth;
      this._height = contentHeight;
      this.calculateBounds();
      calculateSize = true;
    }
    if (calculateSize) {
       Ember.run.scheduleOnce('afterRender', this, 'calculateContentSize');
    }
  },

  didInsertElement() {
    this._super();
    this.contentElement = this.element.firstElementChild;
    this.calculateBounds();
    this.calculateContentSize();
    // content size
    this.initContentOffset();

    let callback = () => {
      var element = this.element;
      if (element) {
        var offsetX = element.scrollLeft;
        var offsetY = element.scrollTop;

        if (offsetX !== this._offsetX || offsetY !== this._offsetY) {
          this._offsetX = offsetX;
          this._offsetY = offsetY;

          var index = this._cellLayout.indexAt(offsetX, offsetY, this._width, this._height);
          var count = this._cellLayout.count(offsetX, offsetY, this._width, this._height);
          if (index !== this.currentIndex || count !== this.currentCount) {
            this.currentIndex = index;
            this.currentCount = count;
            Ember.run(this, 'rerender');
          }
        }
      }
      this.animationFrameRequest = requestAnimationFrame(callback);
    };

    callback();
  },

  cells: Ember.computed('_items.[]', function() {
    return this.updateCells();
  }),

  willDestroyElement() {
    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }
  },

  willRender: function() {
    this.notifyPropertyChange('cells');
  },

  updateCells() {
    if (!this._items) { return; }
    if (this._cellLayout.length !== this._items.length) {
      this._cellLayout.length = this._items.length;
      this.calculateContentSize();
    }

    var priorMap = this._cellMap;
    var cellMap = Object.create(null);

    var index = this._cellLayout.indexAt(this._offsetX, this._offsetY, this._width, this._height);
    var count = this._cellLayout.count(this._offsetX, this._offsetY, this._width, this._height);
    var items = this._items;
    index = Math.max(index - this._buffer, 0);
    count = Math.min(count + this._buffer, Ember.get(items, 'length') - index);
    var i, pos, width, height, style, itemIndex, itemKey, cell;

    var newItems = [];

    for (i=0; i<count; i++) {
      itemIndex = index+i;
      itemKey = decodeEachKey(items[itemIndex], '@identity');
      if (priorMap) {
        cell = priorMap[itemKey];
      }
      if (cell) {
        pos = this._cellLayout.positionAt(itemIndex, this._width, this._height);
        width = this._cellLayout.widthAt(itemIndex, this._width, this._height);
        height = this._cellLayout.heightAt(itemIndex, this._width, this._height);
        style = formatStyle(pos, width, height);
        Ember.set(cell, 'style', style);
        Ember.set(cell, 'hidden', false);
        Ember.set(cell, 'key', itemKey);
        cellMap[itemKey] = cell;
      } else {
        newItems.push(itemIndex);
      }
    }

    for (i=0; i<this._cells.length; i++) {
      cell = this._cells[i];
      if (!cellMap[cell.key]) {
        if (newItems.length) {
          itemIndex = newItems.pop();
          itemKey = decodeEachKey(items[itemIndex], '@identity');
          pos = this._cellLayout.positionAt(itemIndex, this._width, this._height);
          width = this._cellLayout.widthAt(itemIndex, this._width, this._height);
          height = this._cellLayout.heightAt(itemIndex, this._width, this._height);
          style = formatStyle(pos, width, height);
          Ember.set(cell, 'style', style);
          Ember.set(cell, 'key', itemKey);
          Ember.set(cell, 'index', itemIndex);
          Ember.set(cell, 'item', items[itemIndex]);
          Ember.set(cell, 'hidden', false);
          cellMap[itemKey] = cell;
        } else {
          Ember.set(cell, 'hidden', true);
          Ember.set(cell, 'style', 'height: 0; display: none;');
        }
      }
    }

    for (i=0; i<newItems.length; i++) {
      itemIndex = newItems[i];
      itemKey = decodeEachKey(items[itemIndex], '@identity');
      pos = this._cellLayout.positionAt(itemIndex, this._width, this._height);
      width = this._cellLayout.widthAt(itemIndex, this._width, this._height);
      height = this._cellLayout.heightAt(itemIndex, this._width, this._height);
      style = formatStyle(pos, width, height);
      cell = new Cell(itemKey, items[itemIndex], itemIndex, style);
      cellMap[itemKey] = cell;
      this._cells.pushObject(cell);
    }
    this._cellMap = cellMap;
    return this._cells;
  },
  calculateBounds() {
    // make sure rendered before accessing style.
    if (this.element == null) { return; }

    // TODO measure clientWidth and clientHeight vs offsetWidth and offsetHeight
    this.element.style.overflow = 'scroll';
    this.element.style.webkitOverflowScrolling = 'touch';
    this.element.style.webkitTransform = 'translate3d(0px, 0px, 0px) scale(1)';
    this.element.style.mozTransform = 'translate3d(0px, 0px, 0px) scale(1)';
    this.element.style.msTransform = 'translate3d(0px, 0px, 0px) scale(1)';
    this.element.style.oTransform = 'translate3d(0px, 0px, 0px) scale(1)';
    this.element.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
    this.element.style.position = 'relative';
    this.element.style.boxSizing = 'border-box';
    if (this._width > 0) {
      this.element.style.width = this._width + 'px';
    }
    if (this._height > 0) {
      this.element.style.height = this._height + 'px';
    }
  },
  calculateContentSize() {
    var cellLayout = this._cellLayout;
    if (cellLayout == null || this._width == null || this._height == null || this.contentElement === undefined) { return; }
    var contentWidth = cellLayout.contentWidth(this._width);
    var contentHeight = cellLayout.contentHeight(this._width);
    this.contentElement.style.width = contentWidth + 'px';
    this.contentElement.style.height = contentHeight + 'px';
  },
  initContentOffset() {
    if (this._offsetX > 0) {
      this.element.scrollLeft = this._offsetX;
    }
    if (this._offsetY > 0) {
      this.element.scrollTop = this._offsetY;
    }
  }
});
