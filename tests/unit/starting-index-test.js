import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { generateContent } from '../helpers/helpers';
import template from '../templates/fixed-grid';

module('startingIndex', function(hooks) {
  setupRenderingTest(hooks);

  test("base case", async function(assert) {
    var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
    var content = generateContent(5);

    this.setProperties({ width, height, itemWidth, itemHeight, content });
    await render(template);

    assert.equal(this.get('startingIndex', 0));
  });

  test("scroll but within content length", async function(assert) {
    var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
    var content = generateContent(5);
    var offsetY = 100;

    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    await render(template);

    assert.equal(this.get('startingIndex', 0));
  });

  test("scroll but beyond content length", async function(assert) {
    var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
    var content = generateContent(20);
    var offsetY = 100;

    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    await render(template);

    assert.equal(this.get('startingIndex', 0));
  });

  test("larger list", async function(assert) {
    var width = 100, height = 500, itemWidth = 50, itemHeight = 50;
    var content = generateContent(50);
    var offsetY = 100;

    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    await render(template);

    assert.equal(this.get('startingIndex', 28));
  });

  test("larger list (2)", async function(assert) {
    var width = 100, height = 200, itemWidth = 50, itemHeight = 100;
    var content = generateContent(50);
    var offsetY = 100;

    this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY });
    await render(template);

    assert.equal(this.get('startingIndex', 1));
  });
});
