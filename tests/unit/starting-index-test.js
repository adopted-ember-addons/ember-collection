import Ember from 'ember';
import {moduleForComponent} from 'ember-qunit';
import {skip} from 'qunit';
import {generateContent} from '../helpers/helpers';
// import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ember-list', 'startingIndex', {integration: true});

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

  assert.equal(view._startingIndex(), 0);
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

  assert.equal(view._startingIndex(), 0);
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

  assert.equal(view._startingIndex(), 0);
});


skip("larger list", function(assert){
  var height = 500, rowHeight = 50, width = 100, elementWidth = 50;

  // 2x2 grid
  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(50),
      width: width,
      elementWidth: elementWidth,
      scrollTop: 1000
    });
  });

  assert.equal(view._startingIndex(), 28);
});

skip("larger list", function(assert){
  var height = 200, rowHeight = 100, width = 100;

  var view;
  Ember.run(this, function(){
    view = this.subject({
      height: height,
      rowHeight: rowHeight,
      content: generateContent(40),
      width: width,
      elementWidth: width,
      scrollTop: 100
    });
  });

  assert.equal(view._startingIndex(), 1);
});

