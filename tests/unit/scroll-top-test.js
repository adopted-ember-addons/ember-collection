import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import {
  findScrollable,
  generateContent,
  sortItemsByPosition,
  checkContent
} from '../helpers/helpers';
import template from '../templates/fixed-grid';

var raf = window.requestAnimationFrame;
if (raf === undefined) {
    raf = function(callback) {
        setTimeout(callback, 16);
    };
}

var size;
// lifted from antiscroll MIT license
function scrollbarSize() {
  if (size === undefined) {
    let div = document.createElement('div');

    div.classList.add('antiscroll-inner');
    div.style = 'width:50px;height:50px;overflow-y:scroll;position:absolute;top:-200px;left:-200px;';
    div.innerHTML = '<div style="height:100px;width:100%"/>';

    document.body.appendChild(div);
    
    var w1 = div.offsetWidth;
    var w2 = div.querySelector('div').offsetWidth;
    div.remove();

    size = w1 - w2;
  }

  return size;
}

function resolveAfterRaf() {
  return new Promise(resolve => raf(resolve));
}

var content = generateContent(5);

module('scrollTop', function(hooks) {
  setupRenderingTest(hooks);

  test("base case", async function(assert) {
    var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
    var offsetY = 0;

    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    await render(template);

    assert.equal(findScrollable(this.element).scrollTop, 0);

    var positionSorted = sortItemsByPosition(this.element);

    assert.dom(positionSorted[0])
      .hasTextContaining("Item 1", "The first item has not been hidden");

    this.set('width', 150);
    await settled();

    assert.equal(findScrollable(this.element).scrollTop, 0);
    checkContent(this, assert, 0, 5);
  });

  test("scroll but within content length", async function(assert){
    var width = 100+scrollbarSize(), height = 100, itemWidth = 50, itemHeight = 50;
    var offsetY = 100;

    this.setProperties({
      width, height, itemWidth, itemHeight, content, offsetY });
    await render(template);

    await resolveAfterRaf();

    assert.equal(findScrollable(this.element).scrollTop, 50, 'Scrolled one row.');

    this.set('width', 150+scrollbarSize());

    await resolveAfterRaf();
    assert.equal(findScrollable(this.element).scrollTop, 0, 'No scroll with wider list.');

    var positionSorted = sortItemsByPosition(this.element);

    assert.dom(positionSorted[0])
      .hasTextContaining("Item 1", "The first item is not visible but in buffer.");
    checkContent(this, assert, 0, 5);
  });

  test("scroll within content length, beyond buffer", async function(assert){
    var width = 100+scrollbarSize(), height = 100, itemWidth = 50, itemHeight = 50;
    var offsetY = 0;

    this.setProperties({
      width, height, itemWidth, itemHeight, offsetY,
      buffer: 0,
      content: generateContent(10) });
    await render(template);

    let positionSorted = sortItemsByPosition(this.element);
    assert.dom(positionSorted[0])
      .hasTextContaining("Item 1", "The first cell should be the first item.");

    findScrollable(this.element).scrollTop = 150;
    await resolveAfterRaf();

    assert.equal(findScrollable(this.element).scrollTop, 150, 'scrolled to item 7');

    positionSorted = sortItemsByPosition(this.element, true);

    assert.dom(positionSorted[0])
      .hasTextContaining("Item 7", "The items before what is on screen is not visible.");

    this.set('width', 200+scrollbarSize());
    await resolveAfterRaf();

    assert.equal(findScrollable(this.element).scrollTop, 50, 'Scrolled down one row.');
    positionSorted = sortItemsByPosition(this.element, true);
    assert.dom(positionSorted[0])
      .hasTextContaining("Item 5", "The fifth item is first rendered.");
    checkContent(this, assert, 4, 5);
  });

  test("scroll but beyond content length", async function(assert) {
    var width = 100+scrollbarSize(), height = 500, itemWidth = 50, itemHeight = 50;
    var offsetY = 1000;

    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    await render(template);

    assert.equal(findScrollable(this.element).scrollTop, 0);

    this.set('width', 150+scrollbarSize());
    await settled();

    assert.equal(findScrollable(this.element).scrollTop, 0);
    checkContent(this, assert, 0, 5);
  });
});
