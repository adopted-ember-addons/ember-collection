import formatStyle from '../../../utils/format-style';
import { module, test } from 'qunit';

module('Unit | Utility | format style');

test('given pos, width and height', function(assert) {
  var pos = { x: 100, y:100};
  var width = 1000;
  var height = 30;
  var result = formatStyle(pos, width, height);
  var expectedResult = "position:absolute;top:0;left:0;transform:matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 100, 100, 0, 1);width:1000px;height:30px;";
  
  assert.equal(result, expectedResult, "expect to return a propert css expression");
  //only way to determine if it is a safe string?
  assert.equal(result.toHTML(), expectedResult, "expect to have toHTML function");
});
