import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';
import { test, moduleForComponent } from 'ember-qunit';
import { generateContent } from '../helpers/helpers';

var nItems = 5;
var itemWidth = 100;
var itemHeight = 40;
var width = 500;
var height = 400;
var columns = [25, 50, 15, 10];

moduleForComponent('ember-collection', 'Basic layout tests', {
  integration: true
});

test("ember-collection calls formatItemStyle", function(assert) {
  var content = generateContent(nItems);
  var callCount = 0;
  var fakeLayout = {
      indexAt: function() { return 0; },
      count: function() { return nItems; },
      contentSize: function() {
          return {width, height};
      },
      formatItemStyle: function() {
          callCount++;
      }
  };
  
  var template = hbs`<div style={{size-to-style width height}}>{{#ember-collection
    items=content
    cell-layout=fakeLayout
    estimated-width=width
    estimated-height=height
    scroll-left=offsetX
    scroll-top=offsetY
    buffer=buffer
    class="ember-collection"
    as |item| ~}}
  <div class="list-item">{{item.name}}</div>
{{~/ember-collection~}}</div>`;
  
  run(()=>{
    this.setProperties({height, width, itemHeight, itemWidth, content, columns, fakeLayout});
    this.render(template);
  });

  run(()=>{
    assert.equal(callCount, nItems, 'formatItemStyle is called for each rendered item');
  });
});