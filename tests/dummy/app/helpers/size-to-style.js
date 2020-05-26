import { htmlSafe } from '@ember/string';
import { helper } from '@ember/component/helper';
export default helper(function ([width, height]) {
  return htmlSafe(`position: relative; width: ${width}px; height: ${height}px;`);
});
