import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import { generateContent } from '../helpers/helpers';
import hbs from 'htmlbars-inline-precompile';

var itemWidth = 50;
var itemHeight = 100;
var width = 100;
var height = 400;

var content = generateContent(30);

moduleForComponent('ember-collection', 'slice did change', {integration: true});

test("base case", function(assert) {
  var offsetY = 0;
  var startingIndex, visibleCount;
  this.set('sliceDidChange', function (index, count){
    startingIndex = index;
    visibleCount = count;
  });
  Ember.run(() => {
    this.render(hbs`{{#ember-collection
    items=content
    cell-layout=(fixed-grid-layout itemWidth itemHeight)
    width=width
    height=height
    offset-x=offsetX
    offset-y=offsetY
    sliceDidChange=(action sliceDidChange)
    class="ember-collection"
    as |item| ~}}
  <div class="list-item">{{item.name}}</div>
{{~/ember-collection~}}`);
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
  });
  assert.equal(startingIndex, 0, 'without scroll starts at top');
  assert.equal(visibleCount, 10, '10 elements (including padding) displayed');
});

test("scroll down", function(assert) {
  var offsetY = 0;
  var startingIndex, visibleCount;
  this.set('sliceDidChange', function (index, count){
    startingIndex = index;
    visibleCount = count;
  });
  Ember.run(() => {
    this.render(hbs`{{#ember-collection
    items=content
    cell-layout=(fixed-grid-layout itemWidth itemHeight)
    width=width
    height=height
    offset-x=offsetX
    offset-y=offsetY
    sliceDidChange=(action sliceDidChange)
    class="ember-collection"
    as |item| ~}}
  <div class="list-item">{{item.name}}</div>
{{~/ember-collection~}}`);
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
  });
  assert.equal(startingIndex, 0, 'Without scroll starts at top.');
  assert.equal(visibleCount, 10, '10 elements (including padding) displayed.');
  Ember.run(() => {
    this.set('offsetY', 100);
  });
  assert.equal(startingIndex, 2, 'After scroll, one line down.');
  assert.equal(visibleCount, 10, '10 elements (including padding) displayed.');

});


test("change height", function(assert) {
  var offsetY = 0;
  var startingIndex, visibleCount;
  this.set('sliceDidChange', function (index, count){
    startingIndex = index;
    visibleCount = count;
  });
  Ember.run(() => {
    this.render(hbs`{{#ember-collection
    items=content
    cell-layout=(fixed-grid-layout itemWidth itemHeight)
    width=width
    height=height
    offset-x=offsetX
    offset-y=offsetY
    sliceDidChange=(action sliceDidChange)
    class="ember-collection"
    as |item| ~}}
  <div class="list-item">{{item.name}}</div>
{{~/ember-collection~}}`);
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
  });
  assert.equal(startingIndex, 0, 'without scroll starts at top');
  assert.equal(visibleCount, 10, '10 elements (including padding) displayed');
  Ember.run(() => {
    this.set('height', 300);
  });
  assert.equal(startingIndex, 0, 'After height change still at top.');
  assert.equal(visibleCount, 8, 'now 6 elements (including padding) displayed.');

});
