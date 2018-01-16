import { helper } from '@ember/component/helper';
import MixedGrid from 'ember-collection/layouts/mixed-grid';

export default helper(function (params, hash) {
  return new MixedGrid(params[0]);
});
