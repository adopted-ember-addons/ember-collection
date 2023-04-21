import { hbs } from 'ember-cli-htmlbars';

export default hbs`<div style={{size-to-style this.width this.height}}>{{#ember-collection
    items=this.content
    cell-layout=(percentage-columns-layout this.content.length this.columns this.itemHeight)
    estimated-width=this.width
    estimated-height=this.height
    scroll-left=this.offsetX
    scroll-top=this.offsetY
    buffer=this.buffer
    class="ember-collection"
    as |item| ~}}
  <div class="list-item">{{item.name}}</div>
{{~/ember-collection~}}</div>`;
