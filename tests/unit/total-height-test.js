import Ember from 'ember';
import {moduleForComponent} from 'ember-qunit';
import {skip} from 'qunit';
import {generateContent} from '../helpers/helpers';
// import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-list', 'totalHeight', {integration: true});

skip("single column", function(assert){
  var height = 500, rowHeight = 50;

  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(20)
    });
  });

  assert.equal(view.get('totalHeight'), 1000);
});

skip("even", function(assert){
  var height = 500, rowHeight = 50, width = 100, elementWidth = 50;

  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(20),
      width: width,
      elementWidth: elementWidth
    });
  });

  assert.equal(view.get('totalHeight'), 500);
});

skip("odd", function(assert){
  var height = 500, rowHeight = 50, width = 100, elementWidth = 50;

  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(21),
      width: width,
      elementWidth: elementWidth
    });
  });

  assert.equal(view.get('totalHeight'), 550);
});

skip("with bottomPadding", function(assert){
  var height = 500, rowHeight = 50, width = 100, elementWidth = 50;

  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(20),
      width: width,
      elementWidth: elementWidth,
      bottomPadding: 25
    });
  });

  assert.equal(view.get('totalHeight'), 525);
});
