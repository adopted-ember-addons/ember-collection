import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import {
  generateContent, sortItemsByPosition } from '../helpers/helpers';
import template from '../templates/percentage';

var nItems = 100;
var itemWidth = 100;
var itemHeight = 40;
var width = 500;
var height = 400;
var columns = [25, 50, 15, 10];

moduleForComponent('ember-collection', 'percentage layout', {
  integration: true
});

test("cells have correct width", function(assert) {
  var content = generateContent(nItems);

  Ember.run(()=>{
    this.setProperties({height, width, itemHeight, itemWidth, content, columns});
    this.render(template);
  });

  Ember.run(()=>{
    var items = sortItemsByPosition(this);
    
    assert.equal(items[0].style.width, '25%', 'First Row, First column is 25%');
    assert.equal(items[1].style.width, '50%', 'First Row, Second column is 50%');
    assert.equal(items[2].style.width, '15%', 'First Row, Third column is 15%');
    assert.equal(items[3].style.width, '10%', 'First Row, Fourth column is 10%');
    
    assert.equal(items[4].style.width, '25%', 'Second Row, First column is 25%');
    assert.equal(items[5].style.width, '50%', 'Second Row, Second column is 50%');
    assert.equal(items[6].style.width, '15%', 'Second Row, Third column is 15%');
    assert.equal(items[7].style.width, '10%', 'Second Row, Fourth column is 10%');
    
    assert.equal(items.height(), itemHeight, "The items have the correct height");
  });
});

test("columns can use decimals", function(assert) {
  columns = [33.333, 66.666];
  var content = generateContent(nItems);
  
  Ember.run(()=>{
    this.setProperties({height, width, itemHeight, itemWidth, content, columns});
    this.render(template);
  });

  Ember.run(()=>{
    var items = sortItemsByPosition(this);
    
    assert.equal(items[0].style.width, '33.333%', 'First Row, First column is 33.333%');
    assert.equal(items[1].style.width, '66.666%', 'First Row, Second column is 66.666%');
    assert.equal(items[2].style.width, '33.333%', 'Second Row, First column is 33.333%');
    assert.equal(items[3].style.width, '66.666%', 'Second Row, Second column is 66.666%');
    
    
    assert.equal(items.height(), itemHeight, "The items have the correct height");
  });
});

test("Asserts when columns are larger than 100", function(assert) {
  columns = [99, 10];
  var content = generateContent(nItems);
  
  assert.throws(function() {
    Ember.run(()=>{
      this.setProperties({height, width, itemHeight, itemWidth, content, columns});
      this.render(template);
    });
  });
});