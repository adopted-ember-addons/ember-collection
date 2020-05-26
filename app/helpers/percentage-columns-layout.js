import { helper } from '@ember/component/helper';
import PercentageColumns from 'ember-collection/layouts/percentage-columns';

export default helper(function (params) {
  return new PercentageColumns(params[0], params[1], params[2]);
});
