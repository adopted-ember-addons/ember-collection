import Ember from 'ember';
import layout from './ember-list-template';

class LayoutAttributes {
  constructor(index, x, y, width, height) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

class Cell {
  constructor(key, item, index, style) {
    this.key = key;
    this.item = item;
    this.index = index;
    this.style = style;
  }
}

export default Ember.Component.extend({
  layout: layout,
  init() {
    this._super();
    // this.firstCell = undefined;
    // this.lastCell = undefined;
    // this.cellCount = undefined;
    this.offsetX = 0;
    this.offsetY = 0;
    this.width = 0;
    this.height = 0;
    this.contentElement = undefined;
    this.cells = [];
  },
  didInitAttrs() {
    this.offsetX = this.attrs['offset-x'] | 0;
    this.offsetY = this.attrs['offset-y'] | 0;
    this.width = this.attrs['width'] | 0;
    this.height = this.attrs['height'] | 0;
    this.cellLayout = this.attrs['cell-layout'];
  },
  didInsertElement() {
    this.contentElement = this.element.firstElementChild;
    this.initBounds();
    this.initContentSize();
    // content size
    this.initContentOffset();
    this.setupScroller();
  },
  setupScroller() {
    this.element.addEventListener('scroll', Ember.run.bind(this, 'updateOffset'));
    // TODO save for teardown
  },
  updateOffset() {
    if (this.element) {
      this.offsetX = this.element.scrollLeft;
      this.offsetY = this.element.scrollTop;
      this.rerender();
    }
  },
  willRender() {
    this.cellLayout.length = this.getAttr('items').length;
    var index = this.cellLayout.indexAt(this.offsetX, this.offsetY, this.width, this.height);
    var count = this.cellLayout.count(this.offsetX, this.offsetY, this.width, this.height);
    var items = this.getAttr('items');
    this.set('cells', []);
    for (var i=0; i<count; i++) {
      var pos = this.cellLayout.positionAt(index+i, this.width, this.height);
      var width = this.cellLayout.widthAt(index+i, this.width, this.height);
      var height = this.cellLayout.heightAt(index+i, this.width, this.height);
      this.cells.push(new Cell(i,items[index + i], index+i,
        'position: absolute; top: 0; left: 0; transform: translate('+pos.x+'px, '+pos.y+'px); width: '+width+'px; height: '+height+'px;'));
    }
  },
  initBounds() {
    // TODO measure clientWidth and clientHeight vs offsetWidth and offsetHeight
    this.element.style.overflow = 'auto';
    this.element.style.position = 'relative';
    this.element.style.boxSizing = 'border-box';
    if (this.width > 0) {
      this.element.style.width = this.width + 'px';
    }
    if (this.height > 0) {
      this.element.style.height = this.height + 'px';
    }
  },
  initContentSize() {
    var contentWidth = this.cellLayout.contentWidth(this.width, this.height);
    var contentHeight = this.cellLayout.contentHeight(this.width, this.height);
    this.contentElement.style.width = contentWidth + 'px';
    this.contentElement.style.height = contentHeight + 'px';
  },
  initContentOffset() {
    if (this.offsetX > 0) {
      this.element.scrollLeft = this.offsetX;
    }
    if (this.offsetY > 0) {
      this.element.scrollTop = this.offsetY;
    }
  }
});
