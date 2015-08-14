import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import {
  generateContent, sortElementsByPosition, defaultTemplate
  } from '../helpers/helpers';
var template = defaultTemplate;

moduleForComponent('ember-list', 'display in fixed grid', {integration: true});

test('display 5 in 6', function(assert) {
  var width = 150, height = 500, itemWidth = 50, itemHeight = 50;
  var offsetY = 100;
  var content = generateContent(5);

  Ember.run(()=>{
    this.render(template);
    this.setProperties({
      width, height, itemWidth, itemHeight, content, offsetY})
  });
  var positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  debugger  
  assert.equal(
    Ember.$(positionSorted[0]).text().trim(), 
    "Item 1", "The first item has not been hidden");

});