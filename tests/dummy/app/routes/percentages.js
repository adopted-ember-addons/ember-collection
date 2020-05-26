import Route from '@ember/routing/route';
import makeModel from '../utils/make-model';

export default Route.extend({
  model: makeModel()
});
