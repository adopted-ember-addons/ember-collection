import { assert } from '@ember/debug';
import ShelfFirst from 'layout-bin-packer/shelf-first';
import { formatPercentageStyle } from '../utils/style-generators';

export default class PercentageColumns
{
  // How this layout works is by creating a fake grid that is 100px wide.
  // Each item's width is set to be the size of the column. The ShelfFirst lays out everything according to this fake grid.
  // When ember-collection asks for the style in formatItemStyle we pull the percent property to use as the width.
  constructor(itemCount, columns, height) {
    let total = columns.reduce(function(a, b) {
        return a+b;
    });
    // Assert that the columns add up to 100. We don't want to enforce that they are EXACTLY 100 in case the user wants to use percentages.
    // for example [33.333, 66.666]
    assert('All columns must total 100 ' + total, total > 99 && total <= 100 );
    let positions = [];
    var ci = 0;
    for (var i = 0; i < itemCount; i++) {
        positions.push({
            width: columns[ci],
            height: height,
            percent: columns[ci]
        });
        
        ci++;
        
        if (ci >= columns.length) {
            ci = 0;
        }
    }
    this.positions = positions;
    this.bin = new ShelfFirst(positions, 100);
  }

  contentSize(clientWidth/*, clientHeight*/) {
    let size = {
      width: clientWidth,
      height: this.bin.height(100)
    };
    return size;
  }

  indexAt(offsetX, offsetY, width, height) {
    return this.bin.visibleStartingIndex(offsetY, 100, height);
  }

  positionAt(index, width, height) {
    return this.bin.position(index, 100, height);
  }

  widthAt(index) {
    return this.bin.widthAtIndex(index);
  }

  heightAt(index) {
    return this.bin.heightAtIndex(index);
  }

  count(offsetX, offsetY, width, height) {
    return this.bin.numberVisibleWithin(offsetY, 100, height, true);
  }
 
  formatItemStyle(itemIndex, clientWidth, clientHeight) {
    let pos = this.positionAt(itemIndex, 100, clientHeight);
    let width = this.positions[itemIndex].percent;
    let height = this.heightAt(itemIndex, 100, clientHeight);
    let x = Math.floor((pos.x / 100) * clientWidth);
    return formatPercentageStyle({x:x, y:pos.y}, width, height);
  }
}
