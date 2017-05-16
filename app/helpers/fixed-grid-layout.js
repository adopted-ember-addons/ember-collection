import { helper } from '@ember/component/helper';
import Grid from 'ember-collection/layouts/grid';

export default helper(function (params) {
  return new Grid(params[0], params[1], params[2]);
});
