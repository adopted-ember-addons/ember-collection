import Ember from 'ember';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  generateContent, sortItemsByPosition, itemPositions } from '../helpers/helpers';
import template from '../templates/percentage';

var itemWidth = 100;
var itemHeight = 50;
var width = 1000;
var height = 400;

// Since we are testing percentage based layouts we only want to test the top / left.
// The widths are calculated by percentages so then can be difficult to reproduce the browsers rounding
function extractTopLeft(items) {
    return items.map(function(item) {
        return {top: item.top, left: item.left};
    });
}

module('percentage layout', function(hooks) {
  setupRenderingTest(hooks);

  test("cells have correct width", async function(assert) {
    let columns = [25, 50, 15, 10];
    let content = generateContent(8);

    this.setProperties({height, width, itemHeight, itemWidth, content, columns});
    await render(template);

    let items = sortItemsByPosition(this.element);
    let positions = extractTopLeft(itemPositions(this.element));

    // test the positioning done by the layout.
    assert.deepEqual(positions, [
        {top: 0, left: 0},
        {top: 0, left: 250},
        {top: 0, left: 750},
        {top: 0, left: 900},
        {top: 50, left: 0},
        {top: 50, left: 250},
        {top: 50, left: 750},
        {top: 50, left: 900},
    ]);

    // test that the widths match what was provided in `columns`
    assert.equal(items[0].style.width, '25%');
    assert.equal(items[1].style.width, '50%');
    assert.equal(items[2].style.width, '15%');
    assert.equal(items[3].style.width, '10%');
    assert.equal(items[4].style.width, '25%');
    assert.equal(items[5].style.width, '50%');
    assert.equal(items[6].style.width, '15%');
    assert.equal(items[7].style.width, '10%');

    assert.equal(items[0].getBoundingClientRect().height, itemHeight);
  });

  test("columns can use decimals", async function(assert) {
    let columns = [33.333, 66.666];
    let content = generateContent(6);

    this.setProperties({height, width, itemHeight, itemWidth, content, columns});
    await render(template);

    let items = sortItemsByPosition(this.element);
    let positions = extractTopLeft(itemPositions(this.element));

    // test the positioning done by the layout
    assert.deepEqual(positions, [
        {top: 0, left: 0},
        {top: 0, left: 333},
        {top: 50, left: 0},
        {top: 50, left: 333},
        {top: 100, left: 0},
        {top: 100, left: 333}
    ]);

    // test that the widths match what was provided in `columns`
    assert.equal(items[0].style.width, '33.333%');
    assert.equal(items[1].style.width, '66.666%');
    assert.equal(items[2].style.width, '33.333%');
    assert.equal(items[3].style.width, '66.666%');
    assert.equal(items[0].getBoundingClientRect().height, itemHeight);

  });

  test("Asserts when columns are larger than 100", async function(assert) {
    assert.expect(1);
    let columns = [100, 10];
    let content = generateContent(10);
    let errorFn = Ember.onerror;
    try {
      Ember.onerror = () => { assert.ok(true); };
      this.setProperties({height, width, itemHeight, itemWidth, content, columns});
      await render(template);
    } finally {
      Ember.onerror = errorFn;
    }
  });

  test("Asserts when columns do not equal 100", async function(assert) {
    assert.expect(1);
    let columns = [10, 10];
    let content = generateContent(10);
    let errorFn = Ember.onerror;
    try {
      Ember.onerror = () => { assert.ok(true); };
      this.setProperties({height, width, itemHeight, itemWidth, content, columns});
      await render(template);
    } finally {
      Ember.onerror = errorFn;
    }
  });
});
