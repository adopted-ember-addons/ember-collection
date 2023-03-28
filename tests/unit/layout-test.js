import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { generateContent } from '../helpers/helpers';

var nItems = 5;
var itemWidth = 100;
var itemHeight = 40;
var width = 500;
var height = 400;
var columns = [25, 50, 15, 10];

module('Basic layout tests', function(hooks) {
  setupRenderingTest(hooks);

  test("ember-collection calls formatItemStyle", async function(assert) {
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

    var template = hbs`
      <div style={{size-to-style this.width this.height}}>
        {{#ember-collection
            items=this.content
            cell-layout=this.fakeLayout
            estimated-width=this.width
            estimated-height=this.height
            scroll-left=this.offsetX
            scroll-top=this.offsetY
            buffer=this.buffer
            class="ember-collection"
            as |item| ~}}
          <div class="list-item">{{item.name}}</div>
        {{~/ember-collection~}}
      </div>`;

    this.setProperties({height, width, itemHeight, itemWidth, content, columns, fakeLayout});
    await render(template);

    assert.equal(callCount, nItems, 'formatItemStyle is called for each rendered item');
  });
});
