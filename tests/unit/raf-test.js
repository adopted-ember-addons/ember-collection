import $ from 'jquery';
import { test, moduleForComponent } from 'ember-qunit';
import {
  generateContent,
  sortItemsByPosition
} from '../helpers/helpers';
import hbs from 'htmlbars-inline-precompile';

let originalRaf = window.requestAnimationFrame;

let template = hbs`{{#if showComponent}}
<div style={{size-to-style width height}}>
{{#ember-collection
    items=content
    cell-layout=(fixed-grid-layout itemWidth itemHeight)
    estimated-width=width
    estimated-height=height
    scroll-left=offsetX
    scroll-top=offsetY
    buffer=buffer
    class="ember-collection"
    as |item| ~}}
  <div class="list-item">{{item.name}}</div>
{{~/ember-collection~}}
</div>
{{/if}}`;

moduleForComponent('ember-collection', 'raf', {
  integration: true,
  setup: function() {
    window.requestAnimationFrame = undefined;
  },
  teardown: function() {
    window.requestAnimationFrame = originalRaf;
  }
});

test('works without requestAnimationFrame', function(assert) {
    
  var width = 150, height = 500, itemWidth = 50, itemHeight = 50;
  var offsetY = 100;
  var content = generateContent(5);

  this.setProperties({ width, height, itemWidth, itemHeight, content, offsetY, showComponent: true });
  this.render(template);
  var positionSorted = sortItemsByPosition(this);

  assert.equal(
    $(positionSorted[0]).text().trim(),
    "Item 1", "We rendered without requestAnimationFrame"
  );
  
  // Force the component to be torn down.
  this.setProperties({showComponent: false});
});