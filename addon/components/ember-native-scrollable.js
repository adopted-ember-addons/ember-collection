import Ember from 'ember';

export default Ember.Component.extend({
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
    this.applyStyle();
    this.applyContentSize();
    this.syncScrollFromAttr();
    this.startScrollCheck();
  },
  didUpdate() {
    this.applyContentSize();
  },
  willDestroyElement() {
    this.cancelScrollCheck();
    this.contentElement = undefined;
  },
  applyStyle() {
    // TODO this should be auto when not usign overflowScrolling
    this.element.style.overflow = 'scroll';
    this.element.style.webkitOverflowScrolling = 'touch';

    // hack to force render buffer so outside doesn't repaint on scroll
    this.element.style.webkitTransform = 'translate3d(0px, 0px, 0px) scale(1)';
    this.element.style.mozTransform = 'translate3d(0px, 0px, 0px) scale(1)';
    this.element.style.msTransform = 'translate3d(0px, 0px, 0px) scale(1)';
    this.element.style.oTransform = 'translate3d(0px, 0px, 0px) scale(1)';
    this.element.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';

    this.element.style.position = 'absolute';
    this.element.style.left = 0;
    this.element.style.top = 0;
    this.element.style.bottom = 0;
    this.element.style.right = 0;
    this.element.style.boxSizing = 'border-box';
  },
  applyContentSize() {
    this.contentElement.style.position = 'relative';
    this.contentElement.style.width = this._contentSize.width + 'px';
    this.contentElement.style.height = this._contentSize.height + 'px';
  },
  syncScrollFromAttr() {
    if (this._scrollTop > 0) {
      this.element.scrollTop = this._scrollTop;
    }
    if (this._scrollLeft > 0) {
      this.element.scrollLeft = this._scrollLeft;
    }
  },
  startScrollCheck() {
    const component = this;
    function step() {
      component.scrollCheck();
      nextStep();
    }
    function nextStep() {
      component._animationFrame = requestAnimationFrame(step);
    }
    nextStep();
  },
  cancelScrollCheck() {
    if (this._animationFrame) {
      cancelAnimationFrame(this._animationFrame);
      this._animationFrame = undefined;
    }
  },
  scrollCheck() {
    let element = this.element;
    let scrollLeft = element.scrollLeft;
    let scrollTop = element.scrollTop;
    let scrollChanged = false;
    if (scrollLeft !== this._scrollLeft || scrollTop !== this._scrollTop) {
      scrollChanged = true;
      this._scrollLeft = scrollLeft;
      this._scrollTop = scrollTop;
    }

    let clientWidth = element.clientWidth;
    let clientHeight = element.clientHeight;
    let clientSizeChanged = false;
    if (clientWidth !== this._clientWidth || clientHeight !== this._clientHeight) {
      clientSizeChanged = true;
      console.debug('clientSizeChanged', clientWidth, clientHeight);
      this._clientWidth = clientWidth;
      this._clientHeight = clientHeight;
    }

    if (scrollChanged || clientSizeChanged) {
      Ember.run(() => {
        if (scrollChanged) {
          this.sendScrollChange(scrollLeft, scrollTop);
        }
        if (clientSizeChanged) {
          this.sendClientSizeChange(clientWidth, clientHeight);
        }
      });
    }
  },
  sendScrollChange(scrollLeft, scrollTop) {
    this.sendAction('scrollChange', { scrollLeft, scrollTop });
  },
  sendClientSizeChange(width, height) {
    this.sendAction('clientSizeChange', { width, height });
  }
});
