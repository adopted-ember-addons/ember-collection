import Ember from 'ember';
import {moduleForComponent} from 'ember-qunit';
import {skip} from 'qunit';
// import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-list', 'numOfChildViewsForViewport', {integration: true});

skip("computing the number of child views to create with scrollTop zero", function(assert) {
  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: 500,
      rowHeight: 50,
      content: Ember.A()
    });
  });

  assert.equal(view._numChildViewsForViewport(), 11);
});

skip("computing the number of child views to create after when scroll down a bit", function(assert) {
  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: 500,
      rowHeight: 50,
      scrollTop: 51,
      content: Ember.A()
    });
  });

  assert.equal(view._numChildViewsForViewport(), 11);
});

