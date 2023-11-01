import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PercentagesController extends Controller {
  @tracked columns = [20, 60, 20];

  @action
  changeColumn(col) {
    switch (col) {
      case 1:
        this.columns = [25, 50, 25];
        break;
      case 2:
        this.columns = [20, 20, 40, 20];
        break;
      case 3:
        this.columns = [33.33, 33.33, 33.33];
        break;
      case 4:
        this.columns = [50, 50];
        break;
      case 5:
        this.columns = [100];
        break;
      default:
        this.columns = [50, 50];
        break;
      }
  }
}
