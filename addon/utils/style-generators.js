import { translateCSS } from './translate';

export function formatPixelStyle(pos, width, height) {
  let css = 'position:absolute;top:0;left:0;';
  css += translateCSS(pos.x, pos.y);
  css += 'width:' + width + 'px;height:' + height + 'px;';
  return css;
}

export function formatPercentageStyle(pos, width, height) {
  let css = 'position:absolute;top:0;left:0;';
  css += translateCSS(pos.x, pos.y);
  css += 'width:' + width + '%;height:' + height + 'px;';
  return css;
}