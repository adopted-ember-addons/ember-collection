/*global Bin*/
export default class Grid
{
  constructor(cellWidth, cellHeight) {
    this.length = 0;
    this.bin = new Bin.FixedGrid(this, cellWidth, cellHeight);
  }

  contentWidth(width) {
    return width;
  }

  contentHeight(width) {
    // width sic! the content height depends on visible width and
    // number of items.
    return this.bin.height(width);
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
