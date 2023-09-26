import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ScrollPositionController extends Controller {
  @tracked itemWidth = 100;
  @tracked itemHeight = 100;
  @tracked containerWidth = 315;
  @tracked containerHeight = 600;
  @tracked scrollLeft = 0;
  @tracked scrollTop = 0;

  @action
  updateContainerWidth(ev) {
    this.containerWidth = parseInt(ev.target.value, 10);
  }

  @action
  updateContainerHeight(ev) {
    this.containerHeight = parseInt(ev.target.value, 10);
  }

  @action
  makeSquare() {
    this.itemWidth = 100;
    this.itemHeight = 100;
  }

  @action
  makeRow() {
    this.itemWidth = 300;
    this.itemHeight = 100;
  }

  @action
  makeLongRect() {
    this.itemWidth = 100;
    this.itemHeight = 50;
  }

  @action
  makeTallRect() {
    this.itemWidth = 50;
    this.itemHeight = 100;
  }

  @action
  scrollChange(scrollLeft, scrollTop){
    this.scrollLeft = scrollLeft;
    this.scrollTop = scrollTop;
  }
}