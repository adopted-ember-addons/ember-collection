import { helper } from '@ember/component/helper';
import MixedGrid from 'ember-collection/layouts/mixed-grid';

export default helper(function (params) {
  return new MixedGrid(params[0]);
});
