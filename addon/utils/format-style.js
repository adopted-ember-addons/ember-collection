import Ember from 'ember';
import { translateCSS } from './translate';

const {htmlSafe} = Ember.String;

export default function formatStyle(pos, width, height) {
  let css = 'position:absolute;top:0;left:0;';
  css += translateCSS(pos.x, pos.y);
  css += 'width:' + width + 'px;height:' + height + 'px;';
  
  return htmlSafe(css);
}
