import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import {generateContent, sortElementsByPosition} from '../helpers/helpers';
import template from '../templates/fixed-grid';

var nItems = 100;
var itemWidth = 100;
var itemHeight = 40;
var width = 500;
var height = 400;

moduleForComponent('ember-collection', 'manipulate content', {
  integration: true
});

test("replacing the list content", function(assert) {
  var content = generateContent(nItems);
  Ember.run(()=>{
    this.render(template);
    this.setProperties({height, width, itemHeight, itemWidth, content});
    this.set('content', Ember.A([{name: 'The only item'}]));
  });

  Ember.run(()=>{
    assert.equal(this.$('.ember-list-item-view')
      .filter(function(){ return $(this).css('display') !== 'none'; })
      .length, 1, "The rendered list was updated");
    assert.equal(this.$('.ember-list-container').height(), itemHeight, "The scrollable view has the correct height");
  });
});

test("adding to the front of the list content", function(assert) {
  var content = generateContent(nItems);
  Ember.run(()=>{
    this.render(template);
    this.setProperties({height, width, itemHeight, itemWidth, content});
  });
  Ember.run(function() {
    content.unshiftObject({name: "Item -1"});
  });

  var positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  assert.equal(
    Ember.$(positionSorted[0]).text().trim(),
    "Item -1", "The item has been inserted in the list");
  var expectedRows = Math.ceil((nItems + 1) / (width / itemWidth));
  assert.equal(
    this.$('.ember-list-container').height(),
    expectedRows * itemHeight,
    "The scrollable view has the correct height");
});

test("inserting in the middle of visible content", function(assert) {
  var content = generateContent(nItems);
  Ember.run(()=>{
    this.render(template);
    this.setProperties({height, width, itemHeight, itemWidth, content});
  });
  Ember.run(function() {
    content.insertAt(2, {name: "Item 2'"});
  });

  var positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  assert.equal(
    Ember.$(positionSorted[0]).text().trim(),
    "Item 1", "The item has been inserted in the list");
  assert.equal(
    Ember.$(positionSorted[2]).text().trim(),
    "Item 2'", "The item has been inserted in the list");
});

test("clearing the content", function(assert) {
  var content = generateContent(nItems);
  Ember.run(()=>{
    this.render(template);
    this.setProperties({height, width, itemHeight, itemWidth, content});
  });
  Ember.run(function() {
    content.clear();
  });

  assert.equal(this.$('.ember-list-item-view')
    .filter(function(){ return $(this).css('display') !== 'none'; })
    .length, 0, "The rendered list does not contain any elements.");
});

test("deleting the first element", function(assert) {
  var content = generateContent(nItems);
  Ember.run(()=>{
    this.render(template);
    this.setProperties({height, width, itemHeight, itemWidth, content});
  });

  var positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  assert.equal(
    Ember.$(positionSorted[0]).text().trim(),
    "Item 1", "Item 1 has not been removed from the list.");

  Ember.run(function() {
    content.removeAt(0);
  });

  positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  assert.equal(
    Ember.$(positionSorted[0]).text().trim(),
    "Item 2", "Item 1 has been remove from the list.");
});

