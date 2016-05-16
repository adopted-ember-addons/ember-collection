import Ember from 'ember';
import { MixedGridInterface } from '../interface/grid-interface';

export default Ember.Controller.extend({
  showLayout: false,
  mixedGrid: Ember.computed('model', function() {
    return new MixedGridInterface(this.get('model'));
  }),
  markdown: Ember.computed('mixedGrid._size', 'mixedGrid._contentSize', 'mixedGrid._indexAt', 'mixedGrid._count', function() {
    if(!(this.get('mixedGrid._size') || 0)){ return ''; }
    return '\n' +
      this.get('mixedGrid.markdownContentSize') + '\n' +
      this.get('mixedGrid.markdownIndexAt') + '\n' +
      this.get('mixedGrid.markdownCount');
  }),

  actions: {
    toggleLayout: function() {
      this.toggleProperty('showLayout');
    }
  }
});
