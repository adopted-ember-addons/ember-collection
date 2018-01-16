import { computed } from '@ember/object';
import Controller from '@ember/controller';

export default Controller.extend({
  columns: computed(function() {
    return [20, 60, 20];
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
    }
  }
});
