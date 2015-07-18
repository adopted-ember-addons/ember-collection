/*global Bin*/
export default class Grid
{
  constructor(cellWidth, cellHeight) {
    this.length = 0;
    this.bin = new Bin.FixedGrid(this, cellWidth, cellHeight);
  }

  contentWidth(width /*,height*/) {
    return width;
  }

  contentHeight(width /*,height*/) {
    return this.bin.height(width);
  }

  indexAt(offsetX, offsetY, width /*,height*/) {
    return this.bin.visibleStartingIndex(offsetY, width);
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
