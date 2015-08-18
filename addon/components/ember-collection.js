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
  classNames: ['ember-list'],

  init() {
    this._super();
    this.offsetX = 0;
    this.offsetY = 0;
    this.width = 0;
    this.height = 0;
    this.contentElement = undefined;
    Ember.set(this, 'cells', Ember.A([]));
    this.cellMap = Object.create(null);
    this.startingIndex = undefined;
    this.visibleCount = undefined;
    // XXX bug: didReceiveAttrs received before init! redo initial attrs setup
    if (this.attrs != null) {
      this.didReceiveAttrs();
    }
  },
  didInitAttrs() {
    this._super();
    this.buffer = this.getAttr('buffer') | 5;
    this.offsetX = this.getAttr('offset-x') | 0;
    this.offsetY = this.getAttr('offset-y') | 0;
    this.width = this.getAttr('width') | 0;
    this.height = this.getAttr('height') | 0;
  },

  didReceiveAttrs() {
    this._super();
    // Reset cells when cell layout or items array changes
    var buffer = this.getAttr('buffer') | 5;
    var cellLayout = this.getAttr('cell-layout');
    var items = this.getAttr('items');
    var contentWidth = this.getAttr('width') | 0;
    var contentHeight = this.getAttr('height') | 0;
    var offsetX = this.getAttr('offset-x') | 0;
    var offsetY = this.getAttr('offset-y') | 0;
    var calculateSize = false;

    if (this.cellLayout !== cellLayout || this.items !== items) {
      this.set('items', items);
      this.cellLayout = cellLayout;
      calculateSize = true;
    }
    if (contentWidth !== this.width || contentHeight !== this.height ||
        buffer !== this.buffer) {
      this.set('width', contentWidth);
      this.set('height', contentHeight);
      this.buffer = buffer;
      this.calculateBounds();
      calculateSize = true;
    }
    if (offsetX !== this.offsetY || offsetY !== this.offsetY) {
      this.offsetX = offsetX;
      this.offsetY = offsetY;
      calculateSize = true;
    }
    if (calculateSize) {
      this.calculateBounds();
      this.calculateContentSize();
    }
  },
  itemsDidChange: Ember.observer('items.[]', function() {
    this.rerender();
  }),
  didInsertElement() {
    this._super();
    this.contentElement = this.element.firstElementChild;
    this.calculateBounds();      // viewport setup
    this.calculateContentSize(); // content size
    this.initContentOffset();    // content scroll in viewport
    this.setupScroller();

    var component = this;
    function callback() {
      var element = component.element;
      if (element) {
        var offsetX = element.scrollLeft;
        var offsetY = element.scrollTop;

        if (offsetX !== component.offsetX || offsetY !== component.offsetY) {
          component.offsetX = offsetX;
          component.offsetY = offsetY;

          var index = component.cellLayout.indexAt(offsetX, offsetY, component.width, component.height);
          var count = component.cellLayout.count(offsetX, offsetY, component.width, component.height);
          if (index !== component.currentIndex || count !== component.currentCount) {
            component.currentIndex = index;
            component.currentCount = count;
            Ember.run(component, 'rerender');
          }
        }
      }
      requestAnimationFrame(callback);
    }
    callback();
  },
  setupScroller() {
    //this.element.addEventListener('scroll', Ember.run.bind(this, 'updateOffset'));
    // TODO save for teardown
  },
  willRender() {
    if (!this.items) { return; }
    if (this.cellLayout.length !== this.items.length) {
      this.cellLayout.length = this.items.length;
      this.calculateContentSize();
    }

    var priorMap = this.cellMap;
    var cellMap = Object.create(null);

    var startingIndex = this.cellLayout.indexAt(
      this.offsetX, this.offsetY, this.width, this.height);
    var visibleCount = this.cellLayout.count(
      this.offsetX, this.offsetY, this.width, this.height);
    var items = this.items;
    // adjust for buffer
    var index = Math.max(startingIndex - this.buffer, 0);
    var count = Math.min(visibleCount + this.buffer, Ember.get(items, 'length') - index);
    var i, pos, width, height, style, itemIndex, itemKey, cell;

    var newItems = [];

    for (i=0; i<count; i++) {
      itemIndex = index+i;
      itemKey = decodeEachKey(items[itemIndex], '@identity');
      if (priorMap) {
        cell = priorMap[itemKey];
      }
      if (cell) {
        pos = this.cellLayout.positionAt(itemIndex, this.width, this.height);
        width = this.cellLayout.widthAt(itemIndex, this.width, this.height);
        height = this.cellLayout.heightAt(itemIndex, this.width, this.height);
        style = formatStyle(pos, width, height);
        Ember.set(cell, 'style', style);
        Ember.set(cell, 'hidden', false);
        Ember.set(cell, 'key', itemKey);
        cellMap[itemKey] = cell;
      } else {
        newItems.push(itemIndex);
      }
    }

    for (i=0; i<this.cells.length; i++) {
      cell = this.cells[i];
      if (!cellMap[cell.key]) {
        if (newItems.length) {
          itemIndex = newItems.pop();
          itemKey = decodeEachKey(items[itemIndex], '@identity');
          pos = this.cellLayout.positionAt(itemIndex, this.width, this.height);
          width = this.cellLayout.widthAt(itemIndex, this.width, this.height);
          height = this.cellLayout.heightAt(itemIndex, this.width, this.height);
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
      pos = this.cellLayout.positionAt(itemIndex, this.width, this.height);
      width = this.cellLayout.widthAt(itemIndex, this.width, this.height);
      height = this.cellLayout.heightAt(itemIndex, this.width, this.height);
      style = formatStyle(pos, width, height);
      cell = new Cell(itemKey, items[itemIndex], itemIndex, style);
      cellMap[itemKey] = cell;
      this.cells.pushObject(cell);
    }
    this.cellMap = cellMap;
    if (startingIndex !== this.startingIndex || visibleCount !== this.visibleCount) {
      this.startingIndex = startingIndex;
      this.visibleCount = visibleCount;
      if (this.attrs.sliceDidChange != null) {
        this.attrs.sliceDidChange(startingIndex, visibleCount);
      }
    }
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
    if (this.width > 0) {
      this.element.style.width = this.width + 'px';
    }
    if (this.height > 0) {
      this.element.style.height = this.height + 'px';
    }
  },
  calculateContentSize() {
    var cellLayout = this.get('cellLayout');
    if (this.contentElement == null || cellLayout == null || this.width == null || this.height == null) { return; }
    var contentWidth = cellLayout.contentWidth(this.width);
    var contentHeight = cellLayout.contentHeight(this.width);
    this.contentElement.style.width = contentWidth + 'px';
    this.contentElement.style.height = contentHeight + 'px';
    this.initContentOffset();
  },
  initContentOffset() {
    if (this.element == null) { return; }
    if (this.offsetX > 0) {
      this.element.scrollLeft = this.offsetX;
    }
    if (this.offsetY > 0 && this.cellLayout != null) {
      this.element.scrollTop = Math.min(
        this.offsetY, this.cellLayout.maxScroll(this.width, this.height));
    }
  }
});
