import Ember from 'ember';
import { skip } from 'qunit';
import { test, moduleForComponent } from 'ember-qunit';
import { generateContent, sortElementsByPosition } from '../helpers/helpers';
import template from '../templates/fixed-grid';

var content = generateContent(5);

moduleForComponent('ember-collection', 'scrollTop', {integration: true});

test("base case", function(assert) {
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var offsetY = 0;

  Ember.run(() => {
    this.render(template);
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
  });
  assert.equal(this.$('.ember-collection').prop('scrollTop'), 0);
  var positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  assert.equal(
    Ember.$(positionSorted[0]).text().trim(),
    "Item 1", "The first item has not been hidden");

  Ember.run(() => {
    this.set('width', 150);
  });
  assert.equal(this.$('.ember-collection').prop('scrollTop'), 0);
});

skip("scroll but within content length", function(assert) {
  var width = 100, height = 100, itemWidth = 50, itemHeight = 50;
  var offsetY = 100;

  Ember.run(() => {
    this.render(template);
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
  });
  assert.equal(this.$('.ember-collection').prop('scrollTop'), 50);
  var positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  assert.equal(
    Ember.$(positionSorted[0]).text().trim(),
    "", "The first item has been hidden");

  Ember.run(() => {
    this.set('width', 150);
  });

  assert.equal(this.$('.ember-collection').prop('scrollTop'), 0);
  positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  assert.equal(
    Ember.$(positionSorted[0]).text().trim(),
    "Item 1", "The first item has been revealed again.");
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
});
