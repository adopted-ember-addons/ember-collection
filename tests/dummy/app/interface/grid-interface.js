import Ember from 'ember';
import FixedGrid from 'ember-collection/layouts/grid';
import MixedGrid from 'ember-collection/layouts/mixed-grid';
import PercentageColumns from 'ember-collection/layouts/percentage-columns';

export class FixedGridInterface extends FixedGrid {
  get length() {
    return this._size;
  }
  set length (num) {
    Ember.set(this, '_size', num);
  }

  contentSize() {
    let result = super.contentSize(...arguments);
    let [...args] = arguments;
    Ember.set(this, '_contentSize', {args: args, result: result});
    console.log(`contentSize(${args.join(', ')}) => `, result);
    return result;
  }

  indexAt() {
    let result = super.indexAt(...arguments);
    let [...args] = arguments;
    Ember.set(this, '_indexAt', {args: args, result: result});
    console.log(`indexAt(${args.join(', ')}) => `, result);
    return result;
  }

  count() {
    let result = super.count(...arguments);
    let [...args] = arguments;
    Ember.set(this, '_count', {args: args, result: result});
    console.log(`count(${args.join(', ')}) => `, result);
    return result;
  }

  formatItemStyle() {
    let result = super.formatItemStyle(...arguments);
    let [...args] = arguments;
    console.log(`formatItemStyle(${args.join(', ')}) => `, result);
    return result;
  }

  get markdownContentSize() {
    return `/**
 * Size of all items (visible/invisible) in container
 *
 * contentSize(containerWidth, containerHeight)
 */
 contentSize: function(${this._contentSize.args.join(', ')}) {
   return ${this.toString(this._contentSize.result)};
 }`;
  }

  get markdownIndexAt() {
    return `/**
 * Index of the first visible item
 *
 * indexAt(offsetX, offsetY, containerWidth, containerHeight)
 */
 indexAt: function(${this._indexAt.args.join(', ')}) {
   return ${this.toString(this._indexAt.result)};
 }`;
  }

  get markdownCount() {
    return `/**
 * Number of items to display in container
 *
 * count(offsetX, offsetY, containerWidth, containerHeight)
 */
 count: function(${this._count.args.join(', ')}) {
   return ${this.toString(this._count.result)};
 }`;
  }

  toString(result) {
    return JSON.stringify(result).replace(/:/g, ': ').replace(/"/g, '');
  }
}

export class MixedGridInterface extends MixedGrid {
  get length() {
    return this._size;
  }
  set length (num) {
    Ember.set(this, '_size', num);
  }

  contentSize() {
    let result = super.contentSize(...arguments);
    let [...args] = arguments;
    Ember.set(this, '_contentSize', {args: args, result: result});
    console.log(`contentSize(${args.join(', ')}) => `, result);
    return result;
  }

  indexAt() {
    let result = super.indexAt(...arguments);
    let [...args] = arguments;
    Ember.set(this, '_indexAt', {args: args, result: result});
    console.log(`indexAt(${args.join(', ')}) => `, result);
    return result;
  }

  count() {
    let result = super.count(...arguments);
    let [...args] = arguments;
    Ember.set(this, '_count', {args: args, result: result});
    console.log(`count(${args.join(', ')}) => `, result);
    return result;
  }

  formatItemStyle() {
    let result = super.formatItemStyle(...arguments);
    let [...args] = arguments;
    console.log(`formatItemStyle(${args.join(', ')}) => `, result);
    return result;
  }

  get markdownContentSize() {
    return `/**
 * Size of all items (visible/invisible) in container
 *
 * contentSize(containerWidth, containerHeight)
 */
 contentSize: function(${this._contentSize.args.join(', ')}) {
   return ${this.toString(this._contentSize.result)};
 }`;
  }

  get markdownIndexAt() {
    return `/**
 * Index of the first visible item
 *
 * indexAt(offsetX, offsetY, containerWidth, containerHeight)
 */
 indexAt: function(${this._indexAt.args.join(', ')}) {
   return ${this.toString(this._indexAt.result)};
 }`;
  }

  get markdownCount() {
    return `/**
 * Number of items to display in container
 *
 * count(offsetX, offsetY, containerWidth, containerHeight)
 */
 count: function(${this._count.args.join(', ')}) {
   return ${this.toString(this._count.result)};
 }`;
  }

  toString(result) {
    return JSON.stringify(result).replace(/:/g, ': ').replace(/"/g, '');
  }
}

export class PercentageColumnsInterface extends PercentageColumns {
  get length() {
    return this._size;
  }
  set length (num) {
    Ember.set(this, '_size', num);
  }

  contentSize() {
    let result = super.contentSize(...arguments);
    let [...args] = arguments;
    Ember.set(this, '_contentSize', {args: args, result: result});
    console.log(`contentSize(${args.join(', ')}) => `, result);
    return result;
  }

  indexAt() {
    let result = super.indexAt(...arguments);
    let [...args] = arguments;
    Ember.set(this, '_indexAt', {args: args, result: result});
    console.log(`indexAt(${args.join(', ')}) => `, result);
    return result;
  }

  count() {
    let result = super.count(...arguments);
    let [...args] = arguments;
    Ember.set(this, '_count', {args: args, result: result});
    console.log(`count(${args.join(', ')}) => `, result);
    return result;
  }

  formatItemStyle() {
    let result = super.formatItemStyle(...arguments);
    let [...args] = arguments;
    console.log(`formatItemStyle(${args.join(', ')}) => `, result);
    return result;
  }

  get markdownContentSize() {
    return `/**
 * Size of all items (visible/invisible) in container
 *
 * contentSize(containerWidth, containerHeight)
 */
 contentSize: function(${this._contentSize.args.join(', ')}) {
   return ${this.toString(this._contentSize.result)};
 }`;
  }

  get markdownIndexAt() {
    return `/**
 * Index of the first visible item
 *
 * indexAt(offsetX, offsetY, containerWidth, containerHeight)
 */
 indexAt: function(${this._indexAt.args.join(', ')}) {
   return ${this.toString(this._indexAt.result)};
 }`;
  }

  get markdownCount() {
    return `/**
 * Number of items to display in container
 *
 * count(offsetX, offsetY, containerWidth, containerHeight)
 */
 count: function(${this._count.args.join(', ')}) {
   return ${this.toString(this._count.result)};
 }`;
  }

  toString(result) {
    return JSON.stringify(result).replace(/:/g, ': ').replace(/"/g, '');
  }
}
