import FixedGrid from 'layout-bin-packer/fixed-grid';
import { formatPixelStyle } from '../utils/style-generators';

export default class Grid
{
  constructor(cellWidth, cellHeight, length) {
    this.length = length || 0;
    this.bin = new FixedGrid(this, cellWidth, cellHeight);
  }

  contentSize(clientWidth/*, clientHeight*/) {
    return {
      width: clientWidth,
      height: this.bin.height(clientWidth)
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

  formatItemStyle(itemIndex, clientWidth, clientHeight) {
    let pos = this.positionAt(itemIndex, clientWidth, clientHeight);
    let width = this.widthAt(itemIndex, clientWidth, clientHeight);
    let height = this.heightAt(itemIndex, clientWidth, clientHeight);
    return formatPixelStyle(pos, width, height);
  }
}
