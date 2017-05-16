import { A } from '@ember/array';
import { get } from '@ember/object';
import Ember from 'ember';
var compile = Ember.Handlebars.compile;

function generateContent(n) {
  var content = [];
  for (var i = 0; i < n; i++) {
    content.push({name: "Item " + (i+1)});
  }
  return content;
}

function findScrollable(context) {
  return context.$('.ember-collection > div:first'); // scrollable's element
}

function findContainer(context) {
  return context.$('.ember-collection > div:first > div:first'); // scrollable's content element
}

function findItems(context) {
  return context.$('.ember-collection > div:first > div:first > div');  // scrollable's content's children (cells)
}

function findVisibleItems(context) {
  return context.$('.ember-collection > div:first > div:first > div:visible');
}

function extractPosition(element) {
    let parentRect = element.parentElement.getBoundingClientRect();
    let elementRect = element.getBoundingClientRect();
    return {
        left: elementRect.left - parentRect.left,
        top: elementRect.top - parentRect.top,
        width: elementRect.width,
        height: elementRect.height
    };
}

function sortItemsByPosition(view, visibleOnly) {
  var find = visibleOnly ? findVisibleItems : findItems;
  var items = find(view);
  return sortElementsByPosition(items);
}

function sortElementsByPosition (elements) {
  return elements.sort(function(a, b){
    return sortByPosition(extractPosition(a), extractPosition(b));
  });
}

function sortByPosition(a, b) {
  if (b.top === a.top){
    return (a.left - b.left);
  }
  return (a.top - b.top);
}

function itemPositions(view) {
  return A(findItems(view).toArray()).map(function(e) {
    return extractPosition(e);
  }).sort(sortByPosition);
}

function checkContent(view, assert, expectedFirstItem, expectedCount) {
  var elements = sortItemsByPosition(view, true);
  var content = view.get('content') || [];
  assert.ok(
    expectedFirstItem + expectedCount <= get(content, 'length'),
    'No more items than are in content are rendered.');
  var buffer = view.get('buffer') === undefined ? 5 : view.get('buffer');

  // TODO: we are recapitulating calculations done by fixed grid, as
  // we don't have access to the layout. This will not work with
  // mixed grid layout.
  //
  // In the future, if a listener for actual first item and count are
  // included in interface, we can limit ourselves to just recomputing
  // the number that should be in the buffer.

  var width = view.get('width') | 0;
  var itemWidth = view.get('itemWidth') || 1;
  var istart = Math.max(expectedFirstItem - buffer, 0);
  // TODO: padding is one extra row -- how to calculate with mixed grid
  var padding = Math.floor(width / itemWidth);
  // include buffer before
  var scount = expectedCount + Math.min(expectedFirstItem, buffer);
  // include padding (in case of non-integral scroll)
  var numItems = get(content, 'length');
  var pcount = scount + Math.min(Math.max(numItems - istart - scount, 0), padding);
  // include buffer after
  var count = pcount + Math.min(Math.max(numItems - istart - pcount, 0), buffer);
  assert.equal(
    elements.length, count, "Rendered expected number of elements.");
  for (let i = 0; i < count; i++) {
    let elt = elements[i];
    let item = content.objectAt(i + istart);
    assert.equal(
      elt.textContent.trim(), item.name,
      'Item ' + (i + 1) + ' rendered');
  }
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


export {
  itemPositions,
  generateContent,
  extractPosition,
  compile,
  findContainer,
  findScrollable,
  findItems,
  findVisibleItems,
  checkContent,
  sortItemsByPosition,
  scrollbarSize };
