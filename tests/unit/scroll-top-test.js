import $ from 'jquery';
import { run } from '@ember/runloop';
import RSVP from 'rsvp';
import { test, moduleForComponent } from 'ember-qunit';
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
    var div = $(
      '<div class="antiscroll-inner" style="width:50px;height:50px;overflow-y:scroll;' +
      'position:absolute;top:-200px;left:-200px;"><div style="height:100px;width:100%"/>' +
      '</div>'
    );

    $('body').append(div);
    var w1 = $(div)[0].offsetWidth;
    var w2 = $('div', div)[0].offsetWidth;
    $(div).remove();

    size = w1 - w2;
  }
  
  return size;
}

var content = generateContent(5);

moduleForComponent('ember-collection', 'scrollTop', {
  integration: true
});

test("base case", function(assert) {
  var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
  var offsetY = 0;

  run(() => {
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    this.render(template);
  });

  assert.equal(findScrollable(this).prop('scrollTop'), 0);

  var positionSorted = sortItemsByPosition(this);

  assert.equal(
    $(positionSorted[0]).text().trim(),
    "Item 1", "The first item has not been hidden");

  run(() => {
    this.set('width', 150);
  });

  assert.equal(findScrollable(this).prop('scrollTop'), 0);
  checkContent(this, assert, 0, 5);
});

test("scroll but within content length", function(assert){
  var width = 100+scrollbarSize(), height = 100, itemWidth = 50, itemHeight = 50;
  var offsetY = 100;

  run(() => {
    this.setProperties({
      width, height, itemWidth, itemHeight, content, offsetY });
    this.render(template);
  });
  return new RSVP.Promise(function (resolve) {
    raf(() => {
      run(resolve);
    });
  }).then(() => {
    assert.equal(
      findScrollable(this).prop('scrollTop'), 50, 'Scrolled one row.');

    run(()=>{
      this.set('width', 150+scrollbarSize());
    });

  }).then(() => {
    return new RSVP.Promise(function (resolve) {
      raf(() => {
        run(resolve);
      });
    });
  }).then(() => {
    assert.equal(
      findScrollable(this).prop('scrollTop'), 0, 'No scroll with wider list.');

    var positionSorted = sortItemsByPosition(this);

    assert.equal(
      $(positionSorted[0]).text().trim(),
      "Item 1", "The first item is not visible but in buffer.");
    checkContent(this, assert, 0, 5);
  });

});

test("scroll within content length, beyond buffer", function(assert){
  var width = 100+scrollbarSize(), height = 100, itemWidth = 50, itemHeight = 50;
  var offsetY = 0;

  run(() => {
    this.setProperties({
      width, height, itemWidth, itemHeight, offsetY,
      buffer: 0,
      content: generateContent(10) });
    this.render(template);
  });

  let positionSorted = sortItemsByPosition(this);
  assert.equal(
    $(positionSorted[0]).text().trim(),
    "Item 1", "The first cell should be the first item.");

  findScrollable(this).prop('scrollTop', 150);
  return new RSVP.Promise(function (resolve) {
    raf(() => {
      run(resolve);
    });
  }).then(() => {

    assert.equal(
      findScrollable(this).prop('scrollTop'), 150, 'scrolled to item 7');

    let positionSorted = sortItemsByPosition(this, true);

    assert.equal(
      $(positionSorted[0]).text().trim(),
      "Item 7", "The items before what is on screen is not visible.");

    run(()=>{
      this.set('width', 200+scrollbarSize());
    });
    return new RSVP.Promise(function (resolve) {
      raf(() => {
        run(resolve);
      });
    });
  }).then(() => {
    assert.equal(
      findScrollable(this).prop('scrollTop'), 50, 'Scrolled down one row.');
    let positionSorted = sortItemsByPosition(this, true);
    assert.equal(
      $(positionSorted[0]).text().trim(),
      "Item 5", "The fifth item is first rendered.");
    checkContent(this, assert, 4, 5);
  });
});

test("scroll but beyond content length", function(assert) {
  var width = 100+scrollbarSize(), height = 500, itemWidth = 50, itemHeight = 50;
  var offsetY = 1000;

  run(() => {
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    this.render(template);
  });

  assert.equal(findScrollable(this).prop('scrollTop'), 0);

  run(() => {
    this.set('width', 150+scrollbarSize());
  });

  assert.equal(findScrollable(this).prop('scrollTop'), 0);
  checkContent(this, assert, 0, 5);
});
