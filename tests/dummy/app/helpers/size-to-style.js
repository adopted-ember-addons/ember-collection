import Ember from 'ember';
export default Ember.Helper.helper(function ([width, height]) {
  return Ember.String.htmlSafe(`position: relative; width: ${width}px; height: ${height}px;`);
});
