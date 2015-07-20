/*global Bin*/
export default class MixedGrid
{
  constructor(content, width) {
    this.content = content;
    this.bin = new Bin.ShelfFirst(content, width);
  }

  contentWidth(width /*,height*/) {
    return width;
  }

  contentHeight() {
    return this.bin.height();
  }

  indexAt(offsetX, offsetY, width /*,height*/) {
    console.log('Index At: ', offsetY, width);
    return this.bin.visibleStartingIndex(offsetY, width);
  }

  positionAt(index, width /*,height*/) {
    var position = this.bin.position(index, width);
    console.log('Position At: ', index, width, ' => ', position);
    return position;
  }

  widthAt(index) {
    return this.bin.widthAtIndex(index);
  }

  heightAt(index) {
    return this.bin.heightAtIndex(index);
  }

  count(offsetX, offsetY, width, height) {
    return this.bin.numberVisibleWithin(offsetY, width, height, true);
  }
}
