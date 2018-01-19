import ArrayProxy from '@ember/array/proxy';
import $ from 'jquery';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { test, moduleForComponent } from 'ember-qunit';
import {
  generateContent, sortItemsByPosition, findItems, findVisibleItems, findContainer,
  checkContent } from '../helpers/helpers';
import fixedGridTemplate from '../templates/fixed-grid';
import indexedTemplate from '../templates/indexed';


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

  run(()=>{
    this.setProperties({height, width, itemHeight, itemWidth, content});
    this.render(fixedGridTemplate);
    this.set('content', A([{name: 'The only item'}]));
  });

  run(()=>{
    assert.equal(findItems(this)
      .filter(function(){ return $(this).css('display') !== 'none'; })
      .length, 1, "The rendered list was updated");

    assert.equal(findItems(this).height(), itemHeight, "The items have the correct height");
    checkContent(this, assert, 0, 1);
  });
});

test("adding to the front of the list content", function(assert) {
  var content = generateContent(nItems);

  run(()=>{
    this.setProperties({height, width, itemHeight, itemWidth, content});
    this.render(fixedGridTemplate);
  });

  run(function() {
    content.unshiftObject({name: "Item -1"});
  });

  var positionSorted = sortItemsByPosition(this);
  assert.equal(
    $(positionSorted[0]).text().trim(),
    "Item -1", "The item has been inserted in the list");

  var expectedRows = Math.ceil((nItems + 1) / (width / itemWidth));

  assert.equal(
    findContainer(this).height(),
    expectedRows * itemHeight,
    "The scrollable view has the correct height");
    checkContent(this, assert, 0, 50);
});

test("inserting in the middle of visible content", function(assert) {
  var content = generateContent(nItems);

  run(()=>{
    this.setProperties({height, width, itemHeight, itemWidth, content});
    this.render(fixedGridTemplate);
  });

  run(function() {
    content.insertAt(2, {name: "Item 2'"});
  });

  var positionSorted = sortItemsByPosition(this);
  assert.equal(
    $(positionSorted[0]).text().trim(),
    "Item 1", "The item has been inserted in the list");

  assert.equal(
    $(positionSorted[2]).text().trim(),
    "Item 2'", "The item has been inserted in the list");

  checkContent(this, assert, 0, 50);
});

test("clearing the content", function(assert) {
  var content = generateContent(nItems);

  run(()=>{
    this.setProperties({height, width, itemHeight, itemWidth, content});
    this.render(fixedGridTemplate);
  });

  run(function() {
    content.clear();
  });

  assert.equal(findItems(this)
    .filter(function(){ return $(this).css('display') !== 'none'; })
    .length, 0, "The rendered list does not contain any elements.");
});

test("deleting the first element", function(assert) {
  var content = generateContent(nItems);

  run(()=>{
    this.setProperties({height, width, itemHeight, itemWidth, content});
    this.render(fixedGridTemplate);
  });

  var positionSorted = sortItemsByPosition(this);

  assert.equal(
    $(positionSorted[0]).text().trim(),
    "Item 1", "Item 1 has not been removed from the list.");

  run(function() {
    content.removeAt(0);
  });

  positionSorted = sortItemsByPosition(this);

  assert.equal(
    $(positionSorted[0]).text().trim(),
    "Item 2", "Item 1 has been remove from the list.");
    checkContent(this, assert, 0, 50);
});

test("working with an ArrayProxy", function(assert) {
  var content = ArrayProxy.create({content: A(generateContent(nItems)) });

  run(()=>{
    this.setProperties({height, width, itemHeight, itemWidth, content});
    this.render(fixedGridTemplate);
  });

  run(()=>{
    assert.equal(findItems(this)
      .filter(function(){ return $(this).css('display') !== 'none'; })
      .length, 60, "The rendered list was updated");

    assert.equal(findItems(this).height(), itemHeight, "The items have the correct height");
    checkContent(this, assert, 0, 50);
  });
});

test("indexes update correctly", function(assert) {
  var content = generateContent(30);
  var filterIndexes  = [];

  run(()=>{
    this.setProperties({height, width, itemHeight, itemWidth, content, filterIndexes});
    this.render(indexedTemplate);
  });

  run(()=>{
    this.set('content', [content[1], content[3], content[7], content[13]]);
  });

  run(()=>{
    assert.equal(
      findVisibleItems(this).text().split(':').sort().join(":"), ":0:1:2:3", "The indexes updated correctly"
    );
  });

  run(()=>{
    this.set('content', [content[1], content[3], content[7], content[13], content[27]]);
  });

  run(()=>{
    assert.equal(
      findVisibleItems(this).text().split(':').sort().join(":"), ":0:1:2:3:4", "The indexes updated correctly"
    );
  });
});

