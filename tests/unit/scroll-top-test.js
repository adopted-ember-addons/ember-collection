import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import { generateContent, sortItemsByPosition, checkContent } from '../helpers/helpers';
import template from '../templates/fixed-grid';

var content = generateContent(5);

moduleForComponent('ember-collection', 'scrollTop', {
  integration: true
});

test("base case", function(assert) {
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var offsetY = 0;

  Ember.run(() => {
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    this.render(template);
  });

  assert.equal(this.$('.ember-collection').prop('scrollTop'), 0);

  var positionSorted = sortItemsByPosition(this);

  assert.equal(
    Ember.$(positionSorted[0]).text().trim(),
    "Item 1", "The first item has not been hidden");

  Ember.run(() => {
    this.set('width', 150);
  });

  assert.equal(this.$('.ember-collection').prop('scrollTop'), 0);
  checkContent(this, assert, 0, 5);
});

test("scroll but within content length", function(assert){
  var width = 100, height = 100, itemWidth = 50, itemHeight = 50;
  var offsetY = 100;

  Ember.run(() => {
    this.render(template);
    this.setProperties({
      width, height, itemWidth, itemHeight, content, offsetY });
  });

  assert.equal(
    this.$('.ember-collection').prop('scrollTop'), 50, 'Scrolled one row.');

  Ember.run(()=>{
    this.set('width', 150);
  });

  assert.equal(
    this.$('.ember-collection').prop('scrollTop'), 0, 'No scroll with wider list.');

  var positionSorted = sortItemsByPosition(this);

  assert.equal(
    Ember.$(positionSorted[0]).text().trim(),
    "Item 1", "The first item is not visible but in buffer.");
  checkContent(this, assert, 0, 5);
});

test("scroll within content length, beyond buffer", function(assert){
  var width = 100, height = 100, itemWidth = 50, itemHeight = 50;
  var offsetY = 0;

  Ember.run(() => {
    this.render(template);
    this.setProperties({
      width, height, itemWidth, itemHeight, offsetY,
      content: generateContent(10) });
  });

  Ember.run(()=>{ this.set('offsetY', 150);});
  assert.equal(
    this.$('.ember-collection').prop('scrollTop'), 150, 'scrolled to item 7');

  var positionSorted = sortItemsByPosition(this);

  assert.equal(
    Ember.$(positionSorted[0]).text().trim(),
    "", "The first 2 items have been dropped.");

  Ember.run(()=>{
    this.set('width', 200);
  });

  assert.equal(
    this.$('.ember-collection').prop('scrollTop'), 50, 'Scrolled down one row.');

  positionSorted = sortItemsByPosition(this);

  assert.equal(
    Ember.$(positionSorted[0]).text().trim(),
    "Item 1", "The first item is in buffer again.");
  checkContent(this, assert, 0, 5);
});

test("scroll but beyond content length", function(assert) {
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var offsetY = 1000;

  Ember.run(() => {
    this.render(template);
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
  });

  assert.equal(this.$('.ember-collection').prop('scrollTop'), 0);

  Ember.run(() => {
    this.set('width', 150);
  });

  assert.equal(this.$('.ember-collection').prop('scrollTop'), 0);
  checkContent(this, assert, 0, 5);
});
