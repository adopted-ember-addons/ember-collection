import Ember from 'ember';

export default function identity(item) {
  let key;
  let type = typeof item;

  if (type === 'string' || type === 'number') {
    key = item;
  } else {
    key = Ember.guidFor(item);
  }

  return key;
}
