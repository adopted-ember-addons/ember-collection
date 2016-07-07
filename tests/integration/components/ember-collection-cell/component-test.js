import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-collection-cell', 'Integration | Component | ember collection cell', {
  integration: true
});

test('it renders with style', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ember-collection-cell}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ember-collection-cell style="width:150px;"}}
      template block text
    {{/ember-collection-cell}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
  assert.equal(this.$('.cell').css("width").trim(), '150px');
});
