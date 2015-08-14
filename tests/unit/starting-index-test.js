import {test, moduleForComponent} from 'ember-qunit';
import {generateContent, renderComponent} from '../helpers/helpers';

moduleForComponent('ember-list', 'startingIndex', {integration: true});

test("base case", function(assert){
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var content = generateContent(5);
  renderComponent(this, {
    width, height, itemWidth, itemHeight, content});
  assert.equal(this.get('startingIndex'), 0);
});

test("scroll but within content length", function(assert){
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var content = generateContent(5);
  var offsetY = 100;

  renderComponent(this, {
    width, height, itemWidth, itemHeight, content, offsetY});
  assert.equal(this.get('startingIndex'), 0);
});

test("scroll but beyond content length", function(assert){
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var content = generateContent(20);
  var offsetY = 100;

  renderComponent(this, {
    width, height, itemWidth, itemHeight, content, offsetY});
  assert.equal(this.get('startingIndex'), 0);
});


test("larger list", function(assert){
  var width = 500, height = 100, itemWidth = 50, itemHeight = 50;
  var content = generateContent(50);
  var offsetY = 100;
  
  renderComponent(this, {
    width, height, itemWidth, itemHeight, content, offsetY});
  assert.equal(this.get('startingIndex'), 20);
});

test("larger list (2)", function(assert){
  var width = 100, height = 200, itemWidth = 50, itemHeight = 100;
  var content = generateContent(50);
  var offsetY = 100;
  
  renderComponent(this, {
    width, height, itemWidth, itemHeight, content, offsetY});
  assert.equal(this.get('startingIndex'), 2);
});

