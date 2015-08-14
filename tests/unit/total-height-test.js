import Ember from 'ember';
import {test, moduleForComponent} from 'ember-qunit';
import {skip} from 'qunit';
import {
  generateContent, sortElementsByPosition, defaultTemplate
  } from '../helpers/helpers';
var template = defaultTemplate;

moduleForComponent('ember-list', 'totalHeight', {integration: true});

test("single column", function(assert){
  var width = 50, height = 500, itemHeight = 50, itemWidth = 50;
  var content = generateContent(20);

  Ember.run(()=>{
    this.render(template);
    this.setProperties({width, height, itemWidth, itemHeight, content});
  });
  assert.equal(this.$('.ember-list-container').height(), 1000);
});

test("even", function(assert){
  var width = 100, height = 500, itemHeight = 50, itemWidth = 50;
  var content = generateContent(20);

  Ember.run(()=>{
    this.render(template);
    this.setProperties({width, height, itemWidth, itemHeight, content});
  });
  assert.equal(this.$('.ember-list-container').height(), 500);
});

test("odd", function(assert){
  var width = 100, height = 500, itemHeight = 50, itemWidth = 50;
  var content = generateContent(21);
  Ember.run(()=>{
    this.render(template);
    this.setProperties({width, height, itemWidth, itemHeight, content});
  });

  assert.equal(this.$('.ember-list-container').height(), 550);
});
