import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import {
  generateContent,
  sortItemsByPosition
} from '../helpers/helpers';
import template from '../templates/fixed-grid';

module('display in fixed grid', function(hooks) {
  setupRenderingTest(hooks);

  test('display 5 in 6', async function(assert) {
    var width = 150, height = 500, itemWidth = 50, itemHeight = 50;
    var offsetY = 100;
    var content = generateContent(5);

    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    await render(template);
    var positionSorted = sortItemsByPosition(this.element);

    assert.dom(positionSorted[0])
      .hasTextContaining("Item 1", "The first item has not been hidden");
  });
});
