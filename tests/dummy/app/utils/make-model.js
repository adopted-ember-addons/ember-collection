import images from './images';
import Ember from "ember";

export default function makeModel(count = 1000, imageArrayName = 'images') {
  var imagesArray = images[imageArrayName];
  return function model() {
    var result = Ember.A();
    for (var i = 0; i < count; i++) {
      result.push({
        name: `Item ${i+1}`,
        imageSrc: imagesArray[i%imagesArray.length]
      });
    }
    return result;
  };
}
