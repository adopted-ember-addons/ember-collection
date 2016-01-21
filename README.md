# Ember Collection

[![Circle CI](https://circleci.com/gh/emberjs/ember-collection.svg?style=shield)](https://circleci.com/gh/emberjs/ember-collection)

An efficient incremental rendering component with support for custom layouts and large lists.

### Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
1. [Subclassing](#subclassing)
1. [Build it](#build-it)
1. [How it works](#how-it-works)
1. [Run unit tests](#running-unit-tests)
1. [Caveats](#caveats)

## Installation
  **TODO** - Need to publish addon.
  * `ember install ember-collection`
## Demo
**TODO** - Create twiddles with examples. Needs the addon to be published first?

## Submitting bugs

**TODO** - Create a base ember twiddle with *EmberCollection* setup.

It would help us greatly to help you and to improve ember collection.

## Usage

The height of the collection is inferred from its nearest relative parent.
This is so you can just use CSS to style the container.

So, first make sure the collection has a parent with `position: relative`, and
then render a template:

```handlebars
{{#ember-collection
  items=model
  cell-layout=(fixed-grid-layout 800 50) as |item index|
}}
  {{item.name}}
{{/ember-collection}}
```

Next, let's feed our template with some data:

``` javascript
// define index route and return some data from model
export default Ember.Route.extend({
  model: function() {
    var items = [];
    for (var i = 0; i < 10000; i++) {
      items.push({name: "Item " + i});
    }
    return items;
  }
});
```

Shazam! You should be able to see a scrollable area with 10,000 items in it.

## Estimating width/height

You can pass `estimated-width` and `estimated-height` to the collection, for situations where the collection cannot infer its height from its parent (e.g., when there's no DOM in FastBoot).

Once the collection has been rendered, `estimated-width` and `estimated-height` have no effect.

## Subclassing
**TODO** - Example of extending the component and providing a new `layout`.

### Controlling the grid

**TODO** - Talk about how the `width`, `height` and `cell-layout` properties will change the layout.

### Required parameters

You must specify the `height`, `width` and `cell-layout` parameters because *EmberCollection* will try to fill visible area with items.

### Actions

#### scroll-change

If you do not provide a `scroll-change` action name or closure action, scrolling will work normally.

If you *do* specify `scroll-change`, ember-collection assumes that you want to handle the scroll-change action in a true data down, actions up manner. For this reason, ember-collection will not set `scroll-left` and `scroll-right` itself, but rather rely on you to update those properties based on action handling as you see fit.

An example of specifying an action and keeping scrolling working normally looks like this:

```hbs
{{#ember-collection items=model cell-layout=(fixed-grid-layout itemWidth itemHeight)
    scroll-left=scrollLeft scroll-top=scrollTop scroll-change=(action "scrollChange")
    as |item index| }}
  <div class="list-item">{{item.name}}</div>
{{/ember-collection}}
```

```js
export default Ember.Controller.extend({
  scrollLeft: 0,
  scrollTop: 0,
  actions: {
    scrollChange(scrollLeft, scrollTop) {
      this.set('scrollLeft', scrollLeft);
      this.set('scrollTop', scrollTop);
    }
  }
});
```

## Build It

1. `git clone https://github.com/emberjs/ember-collection.git`
2. `cd ember-collection`
3. `npm install` (implicitly runs `bower install` as a postinstall)
5. `ember build`

## How it works

*EmberCollection* will create enough rows to fill the visible area (as defined by the `height` property). It reacts to scroll events and reuses/repositions the rows as scrolled.

Please look at the [unit tests](https://github.com/emberjs/ember-collection/blob/master/tests/unit/content-test.js) for more information.

## Running unit tests

```sh
npm install
npm test
```

## Thanks

A lot of the work was sponsored by [Yapp Labs](https://www.yapp.us/), and some work was sponsored by [Tightrope Media Systems](http://trms.com).
