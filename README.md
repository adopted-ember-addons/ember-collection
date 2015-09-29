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

First, let's create a template:
```handlebars
{{#ember-collection
  items=model
  height=500
  width=800
  cell-layout=(fixed-grid-layout 800 50) as |item index|
}}
  {{name}}
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

## Subclassing
**TODO** - Example of extending the component and providing a new `layout`.

### Controlling the grid

**TODO** - Talk about how the `width`, `height` and `cell-layout` properties will change the layout.

### Required parameters

You must specify the `height`, `width` and `cell-layout` parameters because *EmberCollection* will try to fill visible area with items.

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
