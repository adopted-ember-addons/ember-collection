import { run } from '@ember/runloop';
import { test, moduleForComponent } from 'ember-qunit';
import { generateContent, findContainer } from '../helpers/helpers';
import template from '../templates/fixed-grid';

moduleForComponent('ember-collection', 'totalHeight', {
  integration: true
});

test("single column", function(assert) {
  var width = 50, height = 500, itemHeight = 50, itemWidth = 50;
  var content = generateContent(20);

  run(()=>{
    this.setProperties({ width, height, itemWidth, itemHeight, content });
    this.render(template);
  });

  assert.equal(findContainer(this).height(), 1000);
});

test("even", function(assert) {
  var width = 100, height = 500, itemHeight = 50, itemWidth = 50;
  var content = generateContent(20);

  run(()=>{
    this.setProperties({ width, height, itemWidth, itemHeight, content });
    this.render(template);
  });

  assert.equal(findContainer(this).height(), 500);
});

test("odd", function(assert) {
  var width = 100, height = 500, itemHeight = 50, itemWidth = 50;
  var content = generateContent(21);

  run(()=>{
    this.setProperties({ width, height, itemWidth, itemHeight, content });
    this.render(template);
  });

  assert.equal(findContainer(this).height(), 550);
});
