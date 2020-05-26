import { capitalize, camelize } from '@ember/string';
const stylePrefixes  = ['webkit', 'Webkit',  'ms',  'Moz',  'O'];
const cssPrefixes    = ['-webkit-','-ms-','-moz-','-o-'];

const style = typeof document !== 'undefined' && document.documentElement && document.documentElement.style;

function findProperty(property, css) {
  let prop = css ? camelize(property) : property;
  if (prop in style) {
    return property;
  }
  let capitalized = capitalize(prop);
  for (let i=0; i<stylePrefixes.length; i++) {
    let prefixed = stylePrefixes[i] + capitalized;
    if (prefixed in style) {
      return css ? cssPrefixes[i] + property : prefixed;
    }
  }
}

export function styleProperty(prop) {
  return findProperty(prop, false);
}

export function cssProperty(cssProp) {
  return findProperty(cssProp, true);
}
