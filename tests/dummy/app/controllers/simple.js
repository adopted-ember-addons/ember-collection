import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export default class SimpleController extends Controller {
  @tracked itemWidth = 100;
  @tracked itemHeight = 100;
  @tracked containerWidth = 315;
  @tracked containerHeight = 600;

  @action
  updateContainerWidth(ev) {
    this.containerWidth = parseInt(ev.target.value, 10);
  }
  
  @action
  updateContainerHeight(ev) {
    this.containerHeight = parseInt(ev.target.value, 10);
  }

  @action
  shuffle() {
      this.model = shuffle(this.get('model').slice(0));
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
}