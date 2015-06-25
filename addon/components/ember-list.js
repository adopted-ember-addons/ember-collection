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

function formatStyle(pos, width, height) {
  return 'position: absolute; top: 0; left: 0; -webkit-transform: translate('+pos.x+'px, '+pos.y+'px); width: '+width+'px; height: '+height+'px;';
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
    this.cellMap = Object.create(null);
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

    var priorMap = this.cellMap;
    var cellMap = Object.create(null);

    var index = this.cellLayout.indexAt(this.offsetX, this.offsetY, this.width, this.height);
    var count = this.cellLayout.count(this.offsetX, this.offsetY, this.width, this.height);
    var items = this.getAttr('items');
    var i, pos, width, height, style, itemIndex, cell;

    var newItems = [];

    for (i=0; i<count; i++) {
      itemIndex = index+i;

      cell = priorMap[itemIndex];
      if (priorMap[itemIndex]) {
        // TODO don't assume item index is a stable key
        // this is just quick and dirty code at the moment to see dom reuse
        pos = this.cellLayout.positionAt(itemIndex, this.width, this.height);
        width = this.cellLayout.widthAt(itemIndex, this.width, this.height);
        height = this.cellLayout.heightAt(itemIndex, this.width, this.height);
        style = formatStyle(pos, width, height);
        Ember.set(cell, 'style', style);
        cellMap[itemIndex] = cell;
      } else {
        newItems.push(itemIndex);
      }
    }

    for (i=0; i<this.cells.length; i++) {
      cell = this.cells[i];
      if (!cellMap[cell.index]) {
        if (newItems.length) {
          itemIndex = newItems.pop();
          pos = this.cellLayout.positionAt(itemIndex, this.width, this.height);
          width = this.cellLayout.widthAt(itemIndex, this.width, this.height);
          height = this.cellLayout.heightAt(itemIndex, this.width, this.height);
          style = formatStyle(pos, width, height);
          Ember.set(cell, 'style', style);
          Ember.set(cell, 'index', itemIndex);
          Ember.set(cell, 'item', items[itemIndex]);
          cellMap[itemIndex] = cell;
        } else {
          Ember.set(cell, 'style', 'height: 0; display: none;');
        }
      }
    }

    for (i=0; i<newItems.length; i++) {
      itemIndex = newItems[i];
      pos = this.cellLayout.positionAt(itemIndex, this.width, this.height);
      width = this.cellLayout.widthAt(itemIndex, this.width, this.height);
      height = this.cellLayout.heightAt(itemIndex, this.width, this.height);
      style = formatStyle(pos, width, height);
      cell = new Cell(this.cells.length, items[itemIndex], itemIndex, style);
      cellMap[itemIndex] = cell;
      this.cells.push(cell);
    }

    this.cellMap = cellMap;
  },
  initBounds() {
    // TODO measure clientWidth and clientHeight vs offsetWidth and offsetHeight
    this.element.style.overflow = 'scroll';
    this.element.style.webkitOverflowScrolling = 'touch';
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
