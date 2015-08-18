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

  indexAt(offsetX, offsetY, width, height) {
    return this.bin.visibleStartingIndex(offsetY, width, height);
  }

  positionAt(index, width /*,height*/) {
    return this.bin.position(index, width);
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
