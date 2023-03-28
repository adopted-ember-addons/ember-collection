import { hbs } from 'ember-cli-htmlbars';

export default hbs`<div style={{size-to-style this.width this.height}}>{{#ember-collection
    items=this.content
    cell-layout=(fixed-grid-layout this.itemWidth this.itemHeight)
    estimated-width=this.width
    estimated-height=this.height
    scroll-left=this.offsetX
    scroll-top=this.offsetY
    buffer=this.buffer
    class="ember-collection"
    as |item index| ~}}
  <div class="list-item">{{index}}:</div>
{{~/ember-collection~}}</div>`;
