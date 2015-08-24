import hbs from 'htmlbars-inline-precompile';

export default hbs`<div style={{size-to-style width height}}>{{#ember-collection
    items=content
    cell-layout=(fixed-grid-layout itemWidth itemHeight)
    estimated-width=width
    estimated-height=height
    scroll-left=offsetX
    scroll-top=offsetY
    class="ember-collection"
    as |item| ~}}
  <div class="list-item">{{item.name}}</div>
{{~/ember-collection~}}</div>`;
