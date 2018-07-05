import { A } from '@ember/array';
import Component from '@ember/component';
import { set, get } from '@ember/object';
import layout from './ember-collection/template';
import identity from '../utils/identity';
import needsRevalidate from '../utils/needs-revalidate';

class Cell {
  constructor(key, item, index, style) {
    this.key = key;
    this.hidden = false;
    this.item = item;
    this.index = index;
    this.style = style;
  }
}

function noop() {}

export default Component.extend({
  layout: layout,

  init() {
    // State pulled from attrs is prefixed with an underscore
    // so that there's no chance of shadowing the attrs proxy.
    this._buffer = undefined;
    this._cellLayout = undefined;
    this._rawItems = undefined;
    this._items = undefined;
    this._scrollLeft = undefined;
    this._scrollTop = undefined;
    this._clientWidth = undefined;
    this._clientHeight = undefined;
    this._contentSize = undefined;

    // this.firstCell = undefined;
    // this.lastCell = undefined;
    // this.cellCount = undefined;
    this.contentElement = undefined;
    this._cells = A();
    this._cellMap = Object.create(null);

    // TODO: Super calls should always be at the top of the constructor.
    // I had to move the super call after the properties were defined to
    // work around what I believe is a bug in the attrs proxy. The problem
    // seems to arise when you:
    //
    //   1. Call this._super() immediately.
    //   2. Set a property on `this` that is both not in the
    //      initial attrs hash and not on the prototype.
    this._super();

    // initialize from passed in attrs
    let buffer = this.getAttr('buffer'); // getIntAttr('buffer', 5)
    this._buffer = (typeof buffer === 'number') ? buffer : 5;
    this._scrollLeft = this.getAttr('scroll-left') | 0;
    this._scrollTop = this.getAttr('scroll-top') | 0;
    this._clientWidth = this.getAttr('estimated-width') | 0;
    this._clientHeight = this.getAttr('estimated-height') | 0;
    this._scrollChange = this.getAttr('scroll-change');
  },

  _needsRevalidate(){
    if (this._isGlimmer2()) {
      this.rerender();
    } else {
      needsRevalidate(this);
    }
  },

  didReceiveAttrs() {
    // Work around emberjs/ember.js#11992. Affects <=1.13.8 and <=2.0.0.
    // This will likely be patched in 1.13.9 and 2.0.1.
    this._super();

    this.updateItems();
    this.updateScrollPosition();
  },

  willDestroyElement() {
    if (this._items && this._items.removeArrayObserver) {
      this._items.removeArrayObserver(this, {
        willChange: noop,
        didChange: '_needsRevalidate'
      });
    }
  },

  updateItems(){
    this._cellLayout = this.getAttr('cell-layout');
    var rawItems = this.getAttr('items');

    if (this._rawItems !== rawItems) {
      if (this._items && this._items.removeArrayObserver) {
        this._items.removeArrayObserver(this, {
          willChange: noop,
          didChange: '_needsRevalidate'
        });
      }
      this._rawItems = rawItems;
      var items = A(rawItems);
      this.set('_items', items);

      if (items && items.addArrayObserver) {
        items.addArrayObserver(this, {
          willChange: noop,
          didChange: '_needsRevalidate'
        });
      }
    }
  },

  updateScrollPosition(){
    if (!this._scrollChange) { return; } // don't process bound scroll coords unless our action is being handled
    let scrollLeftAttr = this.getAttr('scroll-left');
    if (scrollLeftAttr !== undefined) {
      scrollLeftAttr = parseInt(scrollLeftAttr, 10);
      if (this._scrollLeft !== scrollLeftAttr) {
        this.set('_scrollLeft', scrollLeftAttr);
      }
    }

    let scrollTopAttr = this.getAttr('scroll-top');
    if (scrollTopAttr !== undefined) {
      scrollTopAttr = parseInt(scrollTopAttr, 10);
      if (this._scrollTop !== scrollTopAttr) {
        // console.log('updateScrollPosition', this._scrollTop, scrollTopAttr);
        this.set('_scrollTop', scrollTopAttr);
      }
    }
  },

  updateContentSize() {
    var cellLayout = this._cellLayout;
    var contentSize = cellLayout.contentSize(this._clientWidth, this._clientHeight);
    if (this._contentSize === undefined ||
        contentSize.width !== this._contentSize.width ||
        contentSize.height !== this._contentSize.height) {
      this.set('_contentSize', contentSize);
    }
  },

  willRender: function() {
    this.updateCells();
    this.updateContentSize();
  },

  updateCells() {
    if (!this._items) { return; }
    const numItems = get(this._items, 'length');
    if (this._cellLayout.length !== numItems) {
      this._cellLayout.length = numItems;
    }

    var priorMap = this._cellMap;
    var cellMap = Object.create(null);

    var index = this._cellLayout.indexAt(this._scrollLeft, this._scrollTop, this._clientWidth, this._clientHeight);
    var count = this._cellLayout.count(this._scrollLeft, this._scrollTop, this._clientWidth, this._clientHeight);
    var items = this._items;
    var bufferBefore = Math.min(index, this._buffer);
    index -= bufferBefore;
    count += bufferBefore;
    count = Math.min(count + this._buffer, get(items, 'length') - index);
    var i, style, itemIndex, itemKey, cell;

    var newItems = [];

    for (i=0; i<count; i++) {
      itemIndex = index+i;
      itemKey = identity(items.objectAt(itemIndex));
      if (priorMap) {
        cell = priorMap[itemKey];
      }
      if (cell) {
        style = this._cellLayout.formatItemStyle(itemIndex, this._clientWidth, this._clientHeight);
        set(cell, 'style', style);
        set(cell, 'hidden', false);
        set(cell, 'key', itemKey);
        set(cell, 'index', itemIndex);
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
          let item = items.objectAt(itemIndex);
          itemKey = identity(item);
          style = this._cellLayout.formatItemStyle(itemIndex, this._clientWidth, this._clientHeight);
          set(cell, 'style', style);
          set(cell, 'key', itemKey);
          set(cell, 'index', itemIndex);
          set(cell, 'item', item);
          set(cell, 'hidden', false);
          cellMap[itemKey] = cell;
        } else {
          set(cell, 'hidden', true);
          set(cell, 'style', 'height: 0; display: none;');
        }
      }
    }

    for (i=0; i<newItems.length; i++) {
      itemIndex = newItems[i];
      let item = items.objectAt(itemIndex);
      itemKey = identity(item);
      style = this._cellLayout.formatItemStyle(itemIndex, this._clientWidth, this._clientHeight);
      cell = new Cell(itemKey, item, itemIndex, style);
      cellMap[itemKey] = cell;
      this._cells.pushObject(cell);
    }
    this._cellMap = cellMap;
  },

  _isGlimmer2() {
    return !this._renderNode;
  },

  actions: {
    scrollChange(scrollLeft, scrollTop) {
      if (this._scrollChange) {
        // console.log('ember-collection sendAction scroll-change', scrollTop);
        // TODO: Migrate to closure actions...
        // eslint-disable-next-line
        this.sendAction('scroll-change', scrollLeft, scrollTop);
      } else {
        if (scrollLeft !== this._scrollLeft ||
            scrollTop !== this._scrollTop) {
          set(this, '_scrollLeft', scrollLeft);
          set(this, '_scrollTop', scrollTop);
          this._needsRevalidate();
        }
      }
    },
    clientSizeChange(clientWidth, clientHeight) {
      if (this._clientWidth !== clientWidth ||
          this._clientHeight !== clientHeight) {
        set(this, '_clientWidth', clientWidth);
        set(this, '_clientHeight', clientHeight);
        this._needsRevalidate();
      }
    }
  }
});
