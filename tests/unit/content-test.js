import ArrayProxy from '@ember/array/proxy';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import {
  generateContent, sortItemsByPosition, findItems, findVisibleItems, findContainer,
  checkContent } from '../helpers/helpers';
import fixedGridTemplate from '../templates/fixed-grid';
import indexedTemplate from '../templates/indexed';


var nItems = 100;
var itemWidth = 100;
var itemHeight = 40;
var width = 500;
var renderedWidth = 520; // adjusted for scrollbar
var height = 400;

module('manipulate content', function(hooks) {
  setupRenderingTest(hooks);

  test("replacing the list content", async function(assert) {
    var content = generateContent(nItems);

    this.setProperties({height, width: renderedWidth, itemHeight, itemWidth, content});
    await render(fixedGridTemplate);
    this.set('content', A([{name: 'The only item'}]));
    await settled();

    assert.equal(findItems(this.element)
      .filter(function(elem) { return getComputedStyle(elem).display !== 'none'; })
      .length, 1, "The rendered list was updated");

    assert.equal(
      findItems(this.element)[0].getBoundingClientRect().height,
      itemHeight,
      "The items have the correct height");
    checkContent(this, assert, 0, 1);
  });

  test("adding to the front of the list content", async function(assert) {
    var content = generateContent(nItems);

    this.setProperties({height, width: renderedWidth, itemHeight, itemWidth, content});
    await render(fixedGridTemplate);

    content.unshiftObject({name: "Item -1"});
    await settled();

    var positionSorted = sortItemsByPosition(this.element);

    assert.dom(positionSorted[0])
      .hasTextContaining("Item -1", "The item has been inserted in the list");

    var expectedRows = Math.ceil((nItems + 1) / (width / itemWidth));

    assert.equal(
      findContainer(this.element).getBoundingClientRect().height,
      expectedRows * itemHeight,
      "The scrollable view has the correct height");
    checkContent(this, assert, 0, 50);
  });

  test("inserting in the middle of visible content", async function(assert) {
    var content = generateContent(nItems);

    this.setProperties({height, width: renderedWidth, itemHeight, itemWidth, content});
    await render(fixedGridTemplate);

    content.insertAt(2, {name: "Item 2'"});
    await settled();

    var positionSorted = sortItemsByPosition(this.element);
    assert.dom(positionSorted[0])
      .hasTextContaining("Item 1", "The item has been inserted in the list");

    assert.dom(positionSorted[2])
      .hasTextContaining("Item 2'", "The item has been inserted in the list");

    checkContent(this, assert, 0, 50);
  });

  test("clearing the content", async function(assert) {
    var content = generateContent(nItems);

    this.setProperties({height, width: renderedWidth, itemHeight, itemWidth, content});
    await render(fixedGridTemplate);

    content.clear();
    await settled();

    assert.equal(findItems(this.element)
      .filter(function(elem) { return getComputedStyle(elem).display !== 'none'; })
      .length, 0, "The rendered list does not contain any elements.");
  });

  test("deleting the first element", async function(assert) {
    var content = generateContent(nItems);

    this.setProperties({height, width: renderedWidth, itemHeight, itemWidth, content});
    await render(fixedGridTemplate);

    var positionSorted = sortItemsByPosition(this.element);

    assert.dom(positionSorted[0])
      .hasTextContaining("Item 1", "Item 1 has not been removed from the list.");

    content.removeAt(0);
    await settled();

    positionSorted = sortItemsByPosition(this.element);

    assert.dom(positionSorted[0])
      .hasTextContaining("Item 2", "Item 1 has been remove from the list.");
      checkContent(this, assert, 0, 50);
  });

  test("working with an ArrayProxy", async function(assert) {
    var content = ArrayProxy.create({content: A(generateContent(nItems)) });

    this.setProperties({height, width: renderedWidth, itemHeight, itemWidth, content});
    await render(fixedGridTemplate);

    assert.equal(findItems(this.element)
      .filter(function(elem) { return getComputedStyle(elem).display !== 'none'; })
      .length, 60, "The rendered list was updated");

    assert.equal(
      findItems(this.element)[0].getBoundingClientRect().height,
      itemHeight,
      "The items have the correct height");
    checkContent(this, assert, 0, 50);
  });

  test("indexes update correctly", async function(assert) {
    var content = generateContent(30);
    var filterIndexes  = [];

    this.setProperties({height, width, itemHeight, itemWidth, content, filterIndexes});
    await render(indexedTemplate);

    this.set('content', [content[1], content[3], content[7], content[13]]);
    await settled();

    function joinContent(context) {
      return findVisibleItems(context).map(item => item.textContent).join('').split(':').sort().join(':');
    }

    assert.equal(joinContent(this.element), ":0:1:2:3", "The indexes updated correctly");

    this.set('content', [content[1], content[3], content[7], content[13], content[27]]);
    await settled();

    assert.equal(joinContent(this.element), ":0:1:2:3:4", "The indexes updated correctly");
  });
});

