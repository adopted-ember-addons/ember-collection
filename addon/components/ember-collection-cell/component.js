import Ember from 'ember';
import layout from './template';
import CspStyleMixin from 'ember-cli-csp-style/mixins/csp-style';

export default Ember.Component.extend(CspStyleMixin, {
  layout,
  cell: null,
  classNames: ['cell'],
  styleBindings: ['style']
});
