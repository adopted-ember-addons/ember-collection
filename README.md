# Ember Collection

[![Build Status](https://travis-ci.org/emberjs/ember-collection.svg?branch=master)](https://travis-ci.org/emberjs/ember-collection)

[![Ember Observer Score](http://emberobserver.com/badges/ember-collection.svg)](http://emberobserver.com/addons/ember-collection)

An efficient incremental rendering component with support for custom layouts and large lists.

### Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
1. [Layouts](#layouts)
1. [Build it](#build-it)
1. [How it works](#how-it-works)
1. [Run unit tests](#running-unit-tests)

## Installation
  
  * `ember install ember-collection`

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

### Required parameters

You must specify `cell-layout` parameter so that *EmberCollection* can layout out your items. The provided layouts are described in the [Layouts](#layouts) section.

### Estimating width/height

You can pass `estimated-width` and `estimated-height` to the collection, for situations where the collection cannot infer its height from its parent (e.g., when there's no DOM in FastBoot).

Once the collection has been rendered, `estimated-width` and `estimated-height` have no effect.


### Actions

#### scroll-change

If you do not provide a `scroll-change` action name or closure action, scrolling will work normally.

If you *do* specify `scroll-change`, ember-collection assumes that you want to handle the scroll-change action in a true data down, actions up manner. For this reason, ember-collection will not set `scroll-left` and `scroll-top` itself, but rather rely on you to update those properties based on action handling as you see fit.
You can also specify a `scroll-index` if this is specified, then the corresponding item will be scrolled into view.

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

## Layouts

### Fixed Grid Layout

The `fixed-grid-layout` will arrange the items in a grid to to fill the content area. The arguments for the layout are:

| Argument     | Description                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| `itemWidth`  | The width of each item                                                                                           |
| `itemHeight` | The height of each item                                                                                          |
| `itemCount`  | The number of items passed to the collection. This is usually the number of items in the model (`model.length`). |

```hbs
{{#ember-collection items=model cell-layout=(fixed-grid-layout itemWidth itemHeight itemCount)
    scroll-left=scrollLeft scroll-top=scrollTop scroll-change=(action "scrollChange")
    as |item index| }}
  <div class="list-item">{{item.name}}</div>
{{/ember-collection}}
```

### Mixed Grid Layout

The `mixed-grid-layout` is used when each item has a known `width` and `height` and will arrange the items in rows from left to right fitting as many items in each row as possible. The arguments for the layout are:

| Argument    | Description                 |
| ----------- | --------------------------- |
| `itemSizes` | A collection of objects having `width` and `height` properties. Used to lookup with size of the corresponding index in the collection.  |

For example if you want the first element in `items` to have a size of `20x50` then the first element in `itemSizes` must be `{width: 20, height: 50}`. If the items have `width` and `height` properties you can use pass collection to `items` and `itemSizes`. 

```hbs
{{#ember-collection items=model cell-layout=(mixed-grid-layout itemSizes)
    scroll-left=scrollLeft scroll-top=scrollTop scroll-change=(action "scrollChange")
    as |item index| }}
  <div class="list-item">{{item.name}}</div>
{{/ember-collection}}
```

### Percentage Columns Layout

The `percentage-columns-layout` allows items to be laid out in a fixed number of columns sized using percentage widths with a fixed height in pixels. The arguments for the layout are:

| Argument     | Description                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------- |
| `itemCount`      | The number of items passed to the collection. This is usually the number of items in the model (`model.length`).       |
| `columns`    | An array of numbers not totaling more than 100. e.g. `[33.333, 66.666]`, `[25, 50, 10, 15]`                    |
| `itemHeight` | The height in pixels of each item.                                                                             |

```hbs
{{#ember-collection items=model cell-layout=(percentage-columns-layout itemCount columns itemHeight)
    scroll-left=scrollLeft scroll-top=scrollTop scroll-change=(action "scrollChange")
    as |item index| }}
  <div class="list-item">{{item.name}}</div>
{{/ember-collection}}
```

### Creating your own layout

If none of the built in layouts included with *EmberCollection* fit your needs you can create your own. A layout is simply an object returned from a helper that conforms to the following interface.

```js
import Ember from 'ember'

export default Ember.Helper.helper(function(params, hash) {
   return {
    /**
     * Return an object that describes the size of the content area
     */
    contentSize(clientWidth, clientHeight) {
        return { width, height };
    }
    
    /**
     * Return the index of the first item shown.
     */
    indexAt(offsetX, offsetY, clientWidth, clientHeight) {
        return Number;
    }
    
    /**
     *  Return the number of items to display
     */
    count(offsetX, offsetY, width, height) {
        return Number;
    }
    
    /**
     * Returns the position of the item
     */
    positionAt(itemIndex, clientWidth, clientHeight) {
        return {x, y};
    }

    /**
     * Returns the width of the item
     */
    widthAt(itemIndex, clientWidth, clientHeight) {
        return Number;
    }

    /**
     * Returns the height of the item
     */
    heightAt(itemIndex, clientWidth, clientHeight) {
        return Number;
    }

    /**
     * Return the css that should be used to set the size and position of the item.
     */
    formatItemStyle(itemIndex, clientWidth, clientHeight) {
        return String;
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

*EmberCollection* will create enough rows to fill the visible area. It reacts to scroll events and reuses/repositions the rows as scrolled.

## Running unit tests

```sh
npm install
npm test
```

## Thanks

A lot of the work was sponsored by [Yapp Labs](https://www.yapp.us/), and some work was sponsored by [Tightrope Media Systems](http://trms.com).
