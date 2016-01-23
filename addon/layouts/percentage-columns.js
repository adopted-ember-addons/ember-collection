import ShelfFirst from 'layout-bin-packer/shelf-first';
import {formatPercentageStyle} from '../utils/style-generators';
import Ember from 'ember';

export default class MixedGrid
{
  // How this layout works is by creating a fake grid that is as wide as the number of columns.
  // Each item's width is set to be 1px. The ShelfFirst lays out everything according to this fake grid.
  // When ember-collection asks for the style in formatItemStyle we pull the percent property to use as the width
  constructor(content, columns, height) {
    let total = columns.reduce(function(a, b) {
        return a+b;
    });
    Ember.assert('All columns must total less than 100 ' + total, total <= 100);
    let positions = [];
    var ci = 0;
    for (var i = 0; i < content.length; i++) {
        positions.push({
            width: 1,
            height: height,
            percent: columns[ci]
        });
        
        ci++;
        
        if (ci >= columns.length) {
            ci = 0;
        }
    }
    this.positions = positions;
    this.bin = new ShelfFirst(positions, columns.length);
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
