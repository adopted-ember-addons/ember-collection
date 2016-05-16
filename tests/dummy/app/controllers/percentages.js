import Ember from 'ember';
import { PercentageColumnsInterface } from '../interface/grid-interface';

export default Ember.Controller.extend({
  columns: Ember.computed(function() {
    return [20, 60, 20];
  }),
  showLayout: false,
  percentageGrid: Ember.computed('model.length', 'columns', function() {
    return new PercentageColumnsInterface(this.get('model.length'), this.get('columns'), 50);
  }),

  code: Ember.computed('percentageGrid._size', 'percentageGrid._contentSize', 'percentageGrid._indexAt', 'percentageGrid._count', function() {
    if(!(this.get('percentageGrid._size') || 0)){ return ''; }
    return '\n' +
      this.get('percentageGrid.markdownContentSize') + '\n' +
      this.get('percentageGrid.markdownIndexAt') + '\n' +
      this.get('percentageGrid.markdownCount');
  }),
  actions: {
    changeColumn: function(col) {
      switch (col) {
        case 1:
          this.set('columns', [25, 50, 25]);
          break;
        case 2:
          this.set('columns', [20, 20, 40, 20]);
          break;
        case 3:
          this.set('columns', [33.33, 33.33, 33.33]);
          break;
        case 4:
          this.set('columns', [50, 50]);
          break;
        case 5:
          this.set('columns', [100]);
          break;
        default:
          this.set('columns', [50, 50]);
          break;
        }
    },
    toggleLayout: function() {
      this.toggleProperty('showLayout');
    }
  }
});
