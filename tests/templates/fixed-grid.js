import hbs from 'htmlbars-inline-precompile';

export default hbs`{{#ember-collection
    items=content
    cell-layout=(fixed-grid-layout itemWidth itemHeight)
    width=width
    height=height 
    offset-x=offsetX
    offset-y=offsetY
    as |item| ~}}
  <div class="list-item">{{item.name}}</div>
{{~/ember-collection~}}`;
