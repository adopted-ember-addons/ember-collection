import $ from 'jquery';
import { run } from '@ember/runloop';
import { test, moduleForComponent } from 'ember-qunit';
import {
  generateContent,
  sortItemsByPosition
} from '../helpers/helpers';
import template from '../templates/fixed-grid';

moduleForComponent('ember-collection', 'display in fixed grid', {
  integration: true
});

test('display 5 in 6', function(assert) {
  var width = 150, height = 500, itemWidth = 50, itemHeight = 50;
  var offsetY = 100;
  var content = generateContent(5);

  run(() => {
    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    this.render(template);
  });
  var positionSorted = sortItemsByPosition(this);

  assert.equal(
    $(positionSorted[0]).text().trim(),
    "Item 1", "The first item has not been hidden"
  );
});
