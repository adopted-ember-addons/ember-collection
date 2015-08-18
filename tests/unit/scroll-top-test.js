import Ember from 'ember';
import {test, moduleForComponent} from 'ember-qunit';
import {
  generateContent, sortElementsByPosition, renderComponent
  } from '../helpers/helpers';

var content = generateContent(5);

moduleForComponent('ember-list', 'scrollTop', {integration: true});

test("base case", function(assert){
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var offsetY = 0;
  renderComponent(this, {
    width, height, itemWidth, itemHeight, content, offsetY});

  assert.equal(this.$('.ember-list').prop('scrollTop'), 0);
  var positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  assert.equal(
    Ember.$(positionSorted[0]).text().trim(), 
    "Item 1", "The first item has not been hidden");

  Ember.run(()=>{
    this.set('width', 150);
  });
  assert.equal(this.$('.ember-list').prop('scrollTop'), 0);
});

test("scroll but within content length", function(assert){
  var width = 100, height = 100, itemWidth = 50, itemHeight = 50;
  var offsetY = 100;

  renderComponent(this, {
    width, height, itemWidth, itemHeight, content, offsetY});

  assert.equal(
    this.$('.ember-list').prop('scrollTop'), 50, 'Scrolled one row.');
  Ember.run(()=>{
    this.set('width', 150);
  });
  assert.equal(
    this.$('.ember-list').prop('scrollTop'), 0, 'No scroll with wider list.');
  var positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  assert.equal(
    Ember.$(positionSorted[0]).text().trim(), 
    "Item 1", "The first item is not visible but in buffer.");
});
test("scroll within content length, beyond buffer", function(assert){
  var width = 100, height = 100, itemWidth = 50, itemHeight = 50;
  var offsetY = 0;

  renderComponent(this, {
    width, height, itemWidth, itemHeight, content: generateContent(10), offsetY});
  Ember.run(()=>{ this.set('offsetY', 150);});
  assert.equal(
    this.$('.ember-list').prop('scrollTop'), 150, 'scrolled to item 7');
  var positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  assert.equal(
    Ember.$(positionSorted[0]).text().trim(), 
    "", "The first 2 items have been dropped.");

  Ember.run(()=>{
    this.set('width', 200);
  });
  assert.equal(
    this.$('.ember-list').prop('scrollTop'), 50, 'Scrolled down one row.');
  positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  assert.equal(
    Ember.$(positionSorted[0]).text().trim(), 
    "Item 1", "The first item is in buffer again.");
});


test("scroll but beyond content length", function(assert){
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var offsetY = 1000;

  renderComponent(this, {
    width, height, itemWidth, itemHeight, content, offsetY});
  assert.equal(this.$('.ember-list').prop('scrollTop'), 0);

  Ember.run(()=>{
    this.set('width', 150);
  });
  assert.equal(this.$('.ember-list').prop('scrollTop'), 0);
});
