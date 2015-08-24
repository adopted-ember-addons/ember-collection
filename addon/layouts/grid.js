/*global Bin*/
export default class Grid
{
  constructor(cellWidth, cellHeight) {
    this.length = 0;
    this.bin = new Bin.FixedGrid(this, cellWidth, cellHeight);
  }

  contentSize(clientSize) {
    return {
      width: clientSize.width,
      height: this.bin.height(clientSize.width)
    };
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

  maxScroll(width, height) {
    return this.bin.maxContentOffset(width, height);
  }
}
