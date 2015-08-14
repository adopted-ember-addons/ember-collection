import Ember from 'ember';
import {test, moduleForComponent} from 'ember-qunit';
import {skip} from 'qunit';
import {generateContent, sortElementsByPosition} from '../helpers/helpers';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-list', 'scrollTop', {integration: true});

skip("base case", function(assert){
  var height = 500, rowHeight = 50, width = 100, elementWidth = 50;

  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(5),
      width: width,
      elementWidth: elementWidth,
      scrollTop: 0
    });
  });

  assert.equal(view.get('scrollTop'), 0);

  Ember.run(function(){
    view.set('width', 150);
  });

  assert.equal(view.get('scrollTop'), 0);
});

skip("scroll but within content length", function(assert){
  var height = 500, rowHeight = 50, width = 100, elementWidth = 50;

  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(5),
      width: width,
      elementWidth: elementWidth,
      scrollTop: 100
    });
  });

  assert.equal(view.get('scrollTop'), 100);

  Ember.run(function(){
    view.set('width', 150);
  });

  assert.equal(view.get('scrollTop'), 0);
});

skip("scroll but beyond content length", function(assert){
  var height = 500, rowHeight = 50, width = 100, elementWidth = 50;

  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(5),
      width: width,
      elementWidth: elementWidth,
      scrollTop: 1000
    });
  });

  assert.equal(view.get('scrollTop'), 1000);

  Ember.run(function(){
    view.set('width', 150);
  });

  assert.equal(view.get('scrollTop'), 0);
});
