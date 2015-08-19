import Ember from 'ember';
var compile = Ember.Handlebars.compile;

function generateContent(n) {
  var content = Ember.A();
  for (var i = 0; i < n; i++) {
    content.push({name: "Item " + (i+1)});
  }
  return content;
}

function findContainer(context) {
  return context.$('.ember-collection div:first');
}

function findItems(context) {
  return context.$('.ember-collection div:first > div');
}

function findVisibleItems(context) {
  return context.$('.ember-collection div:first > div:visible');
}

function extractPositionFromTransform(string) {
  var matched, x, y, position;

  matched = string.match(/translate(?:3d)?\((-?\d+)px,\s*(-?\d+)px/);

  x = parseInt(matched[1], 10);
  y = parseInt(matched[2], 10);

  position = {
    x: x,
    y: y
  };

  return position;
}

function extractNumberFromPosition(string) {
  var number = string.replace(/px/g,'');
  return parseInt(number, 10);
}

function extractPosition(element) {
  var style, position, i;

  style = element.style;

  position = {x: 0, y:0};
  if (style.top) {
    position.x += extractNumberFromPosition(style.top);
    position.y += extractNumberFromPosition(style.left);
  }
  for (i in Array.apply(null, style)) {
    var transformProp = style[i];
    if (/transform/.test(transformProp)) {
      var transPosition = extractPositionFromTransform(style[transformProp]);
      position.x += transPosition.x;
      position.y += transPosition.y;
      break;
    }
  }
  return position;
}

function sortItemsByPosition(view) {
  var items = findItems(view);
  return sortElementsByPosition(items);
}

function sortElementsByPosition (elements) {
  return elements.sort(function(a, b){
    var aPosition, bPosition;

    aPosition = extractPosition(a);
    bPosition = extractPosition(b);

    if (bPosition.y === aPosition.y){
      return (aPosition.x - bPosition.x);
    } else {
      return (aPosition.y - bPosition.y);
    }
  });
}

function sortByPosition (a, b) {
  var aPosition, bPosition;

  aPosition = a;
  bPosition = b;

  if (bPosition.y === aPosition.y){
    return (aPosition.x - bPosition.x);
  } else {
    return (aPosition.y - bPosition.y);
  }
}

function itemPositions(view) {
  return Ember.A(findItems(view).toArray()).map(function(e) {
    return extractPosition(e);
  }).sort(sortByPosition);
}

export {
  itemPositions,
  generateContent,
  extractPosition,
  compile,
  findContainer,
  findItems,
  findVisibleItems,
  sortItemsByPosition };
