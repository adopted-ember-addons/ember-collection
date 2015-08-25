import { styleProperty, cssProperty } from './style-properties';

const transformCSSProp   = cssProperty('transform');
const transformStyleProp = styleProperty('transform');
export const supports3D  = !!styleProperty('perspectiveOrigin');
export const supports2D  = !!transformStyleProp;

export function translatePosition(el, x, y) {
  el.style.left = x+'px';
  el.style.top  = y+'px';
}

export function translateTransform2D(el, x, y) {
  el.style[transformStyleProp] = matrix2D(x, y);
}

export function translateTransform3D(el, x, y) {
  el.style[transformStyleProp] = matrix3D(x, y);
}

export function translatePositionCSS(x, y) {
  return `left:${x}px;top:${y}px;`;
}

export function translateTransform2DCSS(x, y) {
  return `${transformCSSProp}:${matrix2D(x, y)};`;
}

export function translateTransform3DCSS(x, y) {
  return `${transformCSSProp}:${matrix3D(x, y)};`;
}

function matrix2D(x, y) {
  return `matrix(1, 0, 0, 1, ${x}, ${y})`;
}

function matrix3D(x, y) {
  return `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${x}, ${y}, 0, 1)`;
}

export const translate = (
  supports3D ? translateTransform3D : (
    supports2D ? translateTransform2D : translatePosition
  )
);

export const translateCSS = (
  supports3D ? translateTransform3DCSS : (
    supports2D ? translateTransform2DCSS : translatePositionCSS
  )
);
