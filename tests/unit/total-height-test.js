import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { generateContent, findContainer } from '../helpers/helpers';
import template from '../templates/fixed-grid';

module('totalHeight', function(hooks) {
  setupRenderingTest(hooks);

  test("single column", function(assert) {
    var width = 50, height = 500, itemHeight = 50, itemWidth = 50;
    var content = generateContent(20);

    run(async () => {
      this.setProperties({ width, height, itemWidth, itemHeight, content });
      await render(template);
    });

    assert.equal(findContainer(this).height(), 1000);
  });

  test("even", function(assert) {
    var width = 100, height = 500, itemHeight = 50, itemWidth = 50;
    var content = generateContent(20);

    run(async () => {
      this.setProperties({ width, height, itemWidth, itemHeight, content });
      await render(template);
    });

    assert.equal(findContainer(this).height(), 500);
  });

  test("odd", function(assert) {
    var width = 100, height = 500, itemHeight = 50, itemWidth = 50;
    var content = generateContent(21);

    run(async () => {
      this.setProperties({ width, height, itemWidth, itemHeight, content });
      await render(template);
    });

    assert.equal(findContainer(this).height(), 550);
  });
});
