import { join } from '@ember/runloop';
import Component from '@ember/component';
import { translate } from 'ember-collection/utils/translate';
import { styleProperty } from 'ember-collection/utils/style-properties';

const overflowScrollingProp = styleProperty('overflowScrolling');

export default Component.extend({
  init() {
    this._clientWidth = 0;
    this._clientHeight = 0;
    this._scrollLeft = 0;
    this._scrollTop = 0;
    this._animationFrame = undefined;
    this._super();
  },
  didReceiveAttrs() {
    this._contentSize = this.getAttr('content-size');
    this._scrollLeft = this.getAttr('scroll-left');
    this._scrollTop = this.getAttr('scroll-top');
  },
  didInsertElement() {
    this.contentElement = this.element.firstElementChild;
    if (this._contentSize.width === 0 && this._contentSize.height === 0) {
      let info = this.contentSizeUnknown(this.element.clientWidth, this.element.clientHeight);
      this._contentSize = info.contentSize;
      this._scrollLeft = info.scrollLeft;
      this._scrollTop = info.scrollTop;
    }
    this.applyStyle();
    this.applyContentSize();
    this.syncScrollFromAttr();
    this.startScrollCheck();
  },
  didUpdate() {
    this.applyContentSize();
    this.syncScrollFromAttr();
  },
  willDestroyElement() {
    this.cancelScrollCheck();
    this.contentElement = undefined;
  },
  applyStyle() {
    if (overflowScrollingProp) {
      this.element.style.overflow = 'scroll';
      this.element.style[overflowScrollingProp] = 'touch';
    } else {
      this.element.style.overflow = 'auto';
    }

    // hack to force render buffer so outside doesn't repaint on scroll
    translate(this.element, 0, 0);

    this.element.style.position = 'absolute';
    this.element.style.left = 0;
    this.element.style.top = 0;
    this.element.style.bottom = 0;
    this.element.style.right = 0;
  },
  applyContentSize() {
    this.contentElement.style.position = 'relative';
    this.contentElement.style.width = this._contentSize.width + 'px';
    this.contentElement.style.height = this._contentSize.height + 'px';
  },
  syncScrollFromAttr() {
    if (this._appliedScrollTop !== this._scrollTop) {
      this._appliedScrollTop = this._scrollTop;
      if (this._scrollTop >= 0) {
        this.element.scrollTop = this._scrollTop;
      }
    }
    if (this._appliedScrollLeft !== this._scrollLeft) {
      this._appliedScrollLeft = this._scrollLeft;
      if (this._scrollLeft >= 0) {
        this.element.scrollLeft = this._scrollLeft;
      }
    }
  },
  startScrollCheck() {
    const component = this;
    function step() {
      component.scrollCheck();
      nextStep();
    }
    function nextStep() {
      if (window.requestAnimationFrame) {
        component._animationFrame = requestAnimationFrame(step);
      } else {
        component._animationFrame = setTimeout(step, 16);
      }
    }
    nextStep();
  },
  cancelScrollCheck() {
    if (this._animationFrame) {
      if (window.requestAnimationFrame) {
        cancelAnimationFrame(this._animationFrame);
      } else {
        clearTimeout(this._animationFrame);
      }
      this._animationFrame = undefined;
    }
  },
  scrollCheck() {
    let element = this.element;
    let scrollLeft = element.scrollLeft;
    let scrollTop = element.scrollTop;
    let scrollChanged = false;
    if (scrollLeft !== this._appliedScrollLeft || scrollTop !== this._appliedScrollTop) {
      scrollChanged = true;
      this._appliedScrollLeft = scrollLeft;
      this._appliedScrollTop = scrollTop;
    }

    let clientWidth = element.clientWidth;
    let clientHeight = element.clientHeight;
    let clientSizeChanged = false;
    if (clientWidth !== this._clientWidth || clientHeight !== this._clientHeight) {
      clientSizeChanged = true;
      this._clientWidth = clientWidth;
      this._clientHeight = clientHeight;
    }

    if (scrollChanged || clientSizeChanged) {
      join(this, function sendActionsFromScrollCheck(){
        if (scrollChanged) {
          // TODO: Migrate to closure actions...
          // eslint-disable-next-line
          this.sendAction('scrollChange', scrollLeft, scrollTop);
        }
        if (clientSizeChanged) {
          // TODO: Migrate to closure actions...
          // eslint-disable-next-line
          this.sendAction('clientSizeChange', clientWidth, clientHeight);
        }
      });
    }
  }
});
