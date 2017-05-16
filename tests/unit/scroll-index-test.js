import Ember from "ember";
import {moduleForComponent, test} from "ember-qunit";
import {checkContent, findScrollable, generateContent, scrollbarSize, sortItemsByPosition} from "../helpers/helpers";
import hbs from "htmlbars-inline-precompile";

let template = hbs`<div style={{size-to-style width height}}>{{#ember-collection
    items=content
    cell-layout=(fixed-grid-layout itemWidth itemHeight content.length)
    estimated-width=width
    estimated-height=height
    scroll-index=scrollIndex
    scroll-left=offsetX
    scroll-top=offsetY
    scroll-change=(action scrollChangeAction)
    buffer=buffer
    class="ember-collection"
    as |item| ~}}
  <div class="list-item">{{item.name}}</div>
{{~/ember-collection~}}</div>`;

function scrollChangeAction(scrollLeft, scrollTop) {
  this.setProperties({
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  });
}

let raf = window.requestAnimationFrame;
if (raf === undefined) {
  raf = function (callback) {
    setTimeout(callback, 16);
  };
}

const RSVP = Ember.RSVP;

const content = generateContent(12);

moduleForComponent('ember-collection', 'scrollIndex', {
  integration: true
});

test("base case", function (assert) {
  let width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  let scrollIndex = 0;

  Ember.run(() => {
    this.setProperties({width, height, itemWidth, itemHeight, content, scrollIndex, scrollChangeAction});
    this.render(template);
  });

  assert.equal(findScrollable(this).prop('scrollTop'), 0);

  let positionSorted = sortItemsByPosition(this);

  assert.equal(Ember.$(positionSorted[0]).text().trim(), "Item 1", "The first item has not been hidden");

  Ember.run(() => {
    this.set('width', 150);
  });

  assert.equal(findScrollable(this).prop('scrollTop'), 0);
  checkContent(this, assert, 0, 5);
});

test("scroll but within content length", function (assert) {
  let width = 100 + scrollbarSize(), height = 100 + scrollbarSize(), itemWidth = 50, itemHeight = 50;
  let scrollIndex = 8;

  Ember.run(() => {
    this.setProperties({width, height, itemWidth, itemHeight, content, scrollIndex, scrollChangeAction});
    this.render(template);
  });

  assert.equal(findScrollable(this).prop('scrollTop'), 135, 'Scrolled one row.');

  Ember.run(() => {
    this.set('width', 300 + scrollbarSize());
  });

  return new RSVP.Promise(function (resolve) {
    raf(() => {
      Ember.run(resolve);
    });
  }).then(() => {
    assert.equal(findScrollable(this).prop('scrollTop'), 0, 'No scroll with wider list.');

    let positionSorted = sortItemsByPosition(this);

    assert.equal(Ember.$(positionSorted[0]).text().trim(), "Item 1", "The first item is not visible but in buffer.");
    checkContent(this, assert, 0, 5);
  });
});
