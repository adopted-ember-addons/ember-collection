import hbs from 'htmlbars-inline-precompile';

export default hbs`<div style={{size-to-style width height}}>{{#ember-collection
    items=content
    cell-layout=(fixed-grid-layout itemWidth itemHeight)
    estimated-width=width
    estimated-height=height
    scroll-left=offsetX
    scroll-top=offsetY
    buffer=buffer
    class="ember-collection"
    as |item index| ~}}
  <div class="list-item">{{index}}:</div>
{{~/ember-collection~}}</div>`;
