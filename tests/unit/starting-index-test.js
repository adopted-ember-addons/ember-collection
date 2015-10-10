import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import { generateContent } from '../helpers/helpers';
import template from '../templates/fixed-grid-scroll-change';

moduleForComponent('ember-collection', 'startingIndex', {
  integration: true,
  beforeEach: function() {
    this.startingIndex = 0;
    this.on('scrollChange', (scrollTop, scrollLeft, scrollIndex) => {
      this.startingIndex = scrollIndex;
    });
  }
});

test("when not scrolling through content", function(assert) {
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var content = generateContent(5);

  Ember.run(() => {
    this.setProperties({ width, height, itemWidth, itemHeight, content });
    this.render(template);
  });

  assert.equal(this.startingIndex, 0);
});

test("when content does not fill the container", function(assert) {
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var content = generateContent(5);
  var offsetY = 100;

  Ember.run(() => {
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    this.render(template);
  });

  assert.equal(this.startingIndex, 0);
});

test("when content fills exactly the container", function(assert) {
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var content = generateContent(20);
  var offsetY = 100;

  Ember.run(() => {
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    this.render(template);
  });

  assert.equal(this.startingIndex, 0);
});

test("when scrolling past the first row", function(assert) {
  var width = 100, height = 200, itemWidth = 50, itemHeight = 100;
  var content = generateContent(50);
  var offsetY = 100;

  Ember.run(() => {
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    this.render(template);
  });

  assert.equal(this.startingIndex, 2);
});

test("when scrolling past the first two rows", function(assert) {
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var content = generateContent(50);
  var offsetY = 100;

  Ember.run(() => {
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    this.render(template);
  });

  assert.equal(this.startingIndex, 4);
});
