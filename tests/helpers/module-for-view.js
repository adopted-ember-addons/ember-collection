import { deprecate } from '@ember/application/deprecations';
import { tryInvoke } from '@ember/utils';
import { run } from '@ember/runloop';
import { merge } from '@ember/polyfills';
import Ember from 'ember';
import TestModule from 'ember-test-helpers/test-module';
import { getResolver } from 'ember-test-helpers/test-resolver';
import { createModule } from 'ember-qunit/qunit-module';

var TestModuleForView = TestModule.extend({
  init: function(viewName, description, callbacks) {
    this.viewName = viewName;
    this._super.call(this, 'component:' + viewName, description, callbacks);
    this.setupSteps.push(this.setupView);
  },
  initNeeds: function() {
    this.needs = [];
    // toplevel refers to class extended from Ember.View
    if (this.subjectName !== 'component:toplevel') {
      this.needs.push(this.subjectName);
    }
    if (this.callbacks.needs) {
      this.needs = this.needs.concat(this.callbacks.needs);
      delete this.callbacks.needs;
    }
  },
  setupView: function() {
    var _this = this;
    var resolver = getResolver();
    var container = this.container;
    var context = this.context;
    var templateName = 'template:' + this.viewName;
    var template = resolver.resolve(templateName);
    if (template) {
      container.register(templateName, template);
      container.injection(this.subjectName, 'template', templateName);
    }
    context.dispatcher = Ember.EventDispatcher.create();
    context.dispatcher.setup({}, '#ember-testing');
    this.callbacks.render = function(options) {
      var containerView = Ember.ContainerView.create(merge({container: container}, options));
      var view = run(function(){
        var subject = context.subject();
        containerView.pushObject(subject);
        containerView.appendTo('#ember-testing');
        return subject;
      });
      _this.teardownSteps.unshift(function() {
        run(function() {
          tryInvoke(containerView, 'destroy');
        });
      });
      return view.$();
    };
    this.callbacks.append = function() {
      deprecate('this.append() is deprecated. Please use this.render() instead.');
      return this.callbacks.render();
    };
    context.$ = function() {
      var $view = this.render();
      var subject = this.subject();
      if (arguments.length){
        return subject.$.apply(subject, arguments);
      } else {
        return $view;
      }
    };
  },
  defaultSubject: function(options, factory) {
    return factory.create(options);
  }
});

export default function moduleForView(name, description, callbacks) {
  createModule(TestModuleForView, name, description, callbacks);
}
