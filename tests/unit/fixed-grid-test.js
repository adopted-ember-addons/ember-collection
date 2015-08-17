import Ember from 'ember';
import { test, moduleForComponent } from 'ember-qunit';
import {
  generateContent, sortElementsByPosition, renderComponent
} from '../helpers/helpers';

moduleForComponent('ember-list', 'display in fixed grid', {integration: true});

function checkStart(
    width, height, itemWidth, itemHeight, offsetY, content, expectedIndex) {
  var buffer = 0;
  renderComponent(
    this, {width, height, itemWidth, itemHeight, content, offsetY, buffer});
  this.assert.equal(this.get('startingIndex'), expectedIndex);
  var positionSorted = sortElementsByPosition(this.$('.ember-list-item-view'));
  var itemNumber = (expectedIndex + 1) + '';
  var $firstVisible = Ember.$(positionSorted
    .filter(function(){ return $(this).css('display') !== 'none'; })[0]);
  this.assert.equal(  
    $firstVisible.text().trim(), 
    "Item " + itemNumber, "Item " + itemNumber + " is displayed first");
}

test('display 5 in 6', function(assert) {
  this.assert = assert;
  checkStart.call(this, 150, 500, 50, 50, 100, generateContent(5), 0);
});

test('range of viewports and yoffsets',function(assert) {
  var content = generateContent(8);
  this.assert = assert;
  checkStart.call(this, 20, 20, 10, 10,  0, content, 0);
  checkStart.call(this, 10, 70, 10, 10, 10, content, 1);
  checkStart.call(this, 20, 20, 10, 10, 10, content, 2);
  checkStart.call(this, 30, 20, 10, 10, 10, content, 3);
  checkStart.call(this, 40, 20, 10, 10, 10, content, 0);
  checkStart.call(this, 20, 20, 10, 10, 20, content, 4);
  checkStart.call(this, 20, 20, 10, 10, 30, content, 4);
  checkStart.call(this, 20, 10, 10, 10, 30, content, 6);
});