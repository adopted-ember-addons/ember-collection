"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('dummy/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'dummy/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('dummy/components/ember-collection', ['exports', 'ember-collection/components/ember-collection'], function (exports, ember_collection) {

	'use strict';



	exports['default'] = ember_collection['default'];

});
define('dummy/components/ember-native-scrollable', ['exports', 'ember-collection/components/ember-native-scrollable'], function (exports, ember_native_scrollable) {

	'use strict';



	exports['default'] = ember_native_scrollable['default'];

});
define('dummy/controllers/mixed', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller.extend({});

});
define('dummy/controllers/scroll-position', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    itemWidth: 100,
    itemHeight: 100,
    containerWidth: 315,
    containerHeight: 600,
    scrollLeft: 0,
    scrollTop: 0,

    actions: {
      updateContainerWidth: function updateContainerWidth(value) {
        this.set('containerWidth', parseInt(value, 10));
      },

      updateContainerHeight: function updateContainerHeight(value) {
        this.set('containerHeight', parseInt(value, 10));
      },

      makeSquare: function makeSquare() {
        this.setProperties({
          itemWidth: 100,
          itemHeight: 100
        });
      },

      makeRow: function makeRow() {
        this.setProperties({
          itemWidth: 300,
          itemHeight: 100
        });
      },

      makeLongRect: function makeLongRect() {
        this.setProperties({
          itemWidth: 100,
          itemHeight: 50
        });
      },

      makeTallRect: function makeTallRect() {
        this.setProperties({
          itemWidth: 50,
          itemHeight: 100
        });
      },

      scrollChange: function scrollChange(scrollLeft, scrollTop) {
        this.setProperties({
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        });
      }
    }
  });

});
define('dummy/controllers/simple', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  function _shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  exports['default'] = Ember['default'].Controller.extend({
    itemWidth: 100,
    itemHeight: 100,
    containerWidth: 315,
    containerHeight: 600,

    actions: {
      updateContainerWidth: function updateContainerWidth(value) {
        this.set('containerWidth', parseInt(value, 10));
      },

      updateContainerHeight: function updateContainerHeight(value) {
        this.set('containerHeight', parseInt(value, 10));
      },

      shuffle: function shuffle() {
        this.set('model', _shuffle(this.get('model').slice(0)));
      },

      makeSquare: function makeSquare() {
        this.setProperties({
          itemWidth: 100,
          itemHeight: 100
        });
      },

      makeRow: function makeRow() {
        this.setProperties({
          itemWidth: 300,
          itemHeight: 100
        });
      },

      makeLongRect: function makeLongRect() {
        this.setProperties({
          itemWidth: 100,
          itemHeight: 50
        });
      },

      makeTallRect: function makeTallRect() {
        this.setProperties({
          itemWidth: 50,
          itemHeight: 100
        });
      }
    }
  });

});
define('dummy/helpers/fixed-grid-layout', ['exports', 'ember', 'ember-collection/layouts/grid'], function (exports, Ember, Grid) {

  'use strict';

  exports['default'] = Ember['default'].Helper.helper(function (params, hash) {
    return new Grid['default'](params[0], params[1]);
  });

});
define('dummy/helpers/mixed-grid-layout', ['exports', 'ember', 'ember-collection/layouts/mixed-grid'], function (exports, Ember, MixedGrid) {

  'use strict';

  exports['default'] = Ember['default'].Helper.helper(function (params, hash) {
    return new MixedGrid['default'](params[0]);
  });

});
define('dummy/helpers/size-to-style', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports['default'] = Ember['default'].Helper.helper(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var width = _ref2[0];
    var height = _ref2[1];

    return Ember['default'].String.htmlSafe('position: relative; width: ' + width + 'px; height: ' + height + 'px;');
  });

});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('simple');
    this.route('scroll-position');
    this.route('mixed');
    this.route('mobile');
    this.route('mobile-large-images');
    this.route('mobile-small-images');
    this.route('multi-height');
    this.route('multi-height-multi-view');
  });

  exports['default'] = Router;

});
define('dummy/routes/mixed', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  function getRandomInt() {
    return Math.floor(Math.random() * 251 + 75);
  }
  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      var items = [];
      for (var i = 0; i < 1000; i++) {
        var width = getRandomInt();
        var height = getRandomInt();
        items.push({
          name: 'Item ' + (i + 1) + '(' + width + 'x' + height + ')',
          width: width,
          height: height
        });
      }

      return items;
    }
  });

});
define('dummy/routes/mobile-large-images', ['exports', 'ember', 'dummy/utils/make-model'], function (exports, Ember, makeModel) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: makeModel['default']()
  });

});
define('dummy/routes/mobile-small-images', ['exports', 'ember', 'dummy/utils/make-model'], function (exports, Ember, makeModel) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: makeModel['default'](1000, 'smallImages')
  });

});
define('dummy/routes/mobile', ['exports', 'ember', 'dummy/utils/make-model'], function (exports, Ember, makeModel) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: makeModel['default']()
  });

});
define('dummy/routes/multi-height-multi-view', ['exports', 'ember', 'dummy/utils/fixtures'], function (exports, Ember, fixtures) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return fixtures.types;
    }
  });

});
define('dummy/routes/multi-height-virtual', ['exports', 'ember', 'dummy/utils/fixtures'], function (exports, Ember, fixtures) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return fixtures.types;
    }
  });

});
define('dummy/routes/multi-height', ['exports', 'ember', 'dummy/utils/fixtures'], function (exports, Ember, fixtures) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return fixtures.types;
    }
  });

});
define('dummy/routes/pull-to-refresh', ['exports', 'ember', 'dummy/utils/make-model'], function (exports, Ember, makeModel) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: makeModel['default']()
  });

});
define('dummy/routes/scroll-position', ['exports', 'ember', 'dummy/utils/make-model'], function (exports, Ember, makeModel) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: makeModel['default']()
  });

});
define('dummy/routes/simple', ['exports', 'ember', 'dummy/utils/make-model'], function (exports, Ember, makeModel) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: makeModel['default']()
  });

});
define('dummy/routes/virtual-strange-ratios', ['exports', 'ember', 'dummy/utils/make-model'], function (exports, Ember, makeModel) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: makeModel['default'](15, 'strangeRatios')
  });

});
define('dummy/routes/virtual', ['exports', 'ember', 'dummy/utils/make-model'], function (exports, Ember, makeModel) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: makeModel['default']()
  });

});
define('dummy/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 3,
              "column": 8
            },
            "end": {
              "line": 3,
              "column": 33
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Index");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child1 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 4,
              "column": 8
            },
            "end": {
              "line": 4,
              "column": 35
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Simple");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child2 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 5,
              "column": 8
            },
            "end": {
              "line": 5,
              "column": 33
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Mixed");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    var child3 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 6,
              "column": 8
            },
            "end": {
              "line": 6,
              "column": 53
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Scroll Position");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() { return []; },
        statements: [

        ],
        locals: [],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1,"id","title");
        var el2 = dom.createTextNode("Ember Collection Demos");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]),0,0);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]),0,0);
        morphs[4] = dom.createMorphAt(fragment,4,4,contextualElement);
        return morphs;
      },
      statements: [
        ["block","link-to",["index"],[],0,null,["loc",[null,[3,8],[3,45]]]],
        ["block","link-to",["simple"],[],1,null,["loc",[null,[4,8],[4,47]]]],
        ["block","link-to",["mixed"],[],2,null,["loc",[null,[5,8],[5,45]]]],
        ["block","link-to",["scroll-position"],[],3,null,["loc",[null,[6,8],[6,65]]]],
        ["content","outlet",["loc",[null,[15,0],[15,10]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  }()));

});
define('dummy/templates/cat', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/cat.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("Meow says ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" expected: cat === ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createMorphAt(element0,1,1);
        morphs[2] = dom.createMorphAt(element0,3,3);
        morphs[3] = dom.createMorphAt(element0,5,5);
        return morphs;
      },
      statements: [
        ["attribute","class",["concat",["row ",["get","type",["loc",[null,[1,18],[1,22]]]]]]],
        ["content","name",["loc",[null,[1,36],[1,44]]]],
        ["content","type",["loc",[null,[1,63],[1,71]]]],
        ["content","id",["loc",[null,[1,72],[1,78]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/dog', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/dog.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Woof says ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" expected: dog === ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
        morphs[2] = dom.createMorphAt(fragment,5,5,contextualElement);
        return morphs;
      },
      statements: [
        ["content","name",["loc",[null,[1,10],[1,18]]]],
        ["content","type",["loc",[null,[1,37],[1,45]]]],
        ["content","id",["loc",[null,[1,46],[1,52]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/mixed', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 2
            },
            "end": {
              "line": 6,
              "column": 2
            }
          },
          "moduleName": "dummy/templates/mixed.hbs"
        },
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","list-item");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["content","item.name",["loc",[null,[4,6],[4,19]]]]
        ],
        locals: ["item","index"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/mixed.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","mixed");
        dom.setAttribute(el1,"style","position:relative;height:500px");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]),1,1);
        return morphs;
      },
      statements: [
        ["block","ember-collection",[],["items",["subexpr","@mut",[["get","model",["loc",[null,[2,28],[2,33]]]]],[],[]],"estimated-height",800,"estimated-width",500,"buffer",10,"cell-layout",["subexpr","mixed-grid-layout",[["get","model",["loc",[null,[2,116],[2,121]]]]],[],["loc",[null,[2,97],[2,122]]]]],0,null,["loc",[null,[2,2],[6,23]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/templates/mobile-large-images', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/mobile-large-images.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Mobile Large Images");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nTODO\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/mobile-non-recycling', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/mobile-non-recycling.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Mobile Non Recycling");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nTODO\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/mobile-small-images', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 16,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/mobile-small-images.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Mobile Small Images");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nTODO\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/mobile', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 10,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/mobile.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Mobile List");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nTODO\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/multi-height-multi-view', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/multi-height-multi-view.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Multi Height - Multi View");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nTODO\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/multi-height-virtual', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/multi-height-virtual.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Multi Height Virtual");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nTODO\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/multi-height', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/multi-height.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Multi Height");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nTODO\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/other', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/other.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createTextNode("Potato says ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" expected: other === ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" ");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
        morphs[1] = dom.createMorphAt(fragment,3,3,contextualElement);
        morphs[2] = dom.createMorphAt(fragment,5,5,contextualElement);
        return morphs;
      },
      statements: [
        ["content","name",["loc",[null,[1,12],[1,20]]]],
        ["content","type",["loc",[null,[1,41],[1,49]]]],
        ["content","id",["loc",[null,[1,50],[1,56]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/pull-to-refresh', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 13,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/pull-to-refresh.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Pull to refresh");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\nTODO\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes() { return []; },
      statements: [

      ],
      locals: [],
      templates: []
    };
  }()));

});
define('dummy/templates/scroll-position', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 21,
              "column": 2
            },
            "end": {
              "line": 34,
              "column": 2
            }
          },
          "moduleName": "dummy/templates/scroll-position.hbs"
        },
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","list-item");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["content","item.name",["loc",[null,[32,6],[32,19]]]]
        ],
        locals: ["item","index"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 36,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/scroll-position.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Scroll Position");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Square");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Row");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Long Rectangle");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Tall Rectable");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Container Width: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("input");
        dom.setAttribute(el2,"type","range");
        dom.setAttribute(el2,"min","200");
        dom.setAttribute(el2,"max","1000");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  Container Height: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("input");
        dom.setAttribute(el2,"type","range");
        dom.setAttribute(el2,"min","200");
        dom.setAttribute(el2,"max","1000");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\nItem Height: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nItem Width: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\nScroll Left: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nScroll Top: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","simple-list");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(fragment, [4]);
        var element2 = dom.childAt(fragment, [6]);
        var element3 = dom.childAt(fragment, [8]);
        var element4 = dom.childAt(fragment, [10]);
        var element5 = dom.childAt(element4, [1]);
        var element6 = dom.childAt(element4, [5]);
        var element7 = dom.childAt(fragment, [12]);
        var element8 = dom.childAt(fragment, [14]);
        var element9 = dom.childAt(fragment, [18]);
        var morphs = new Array(16);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createElementMorph(element3);
        morphs[4] = dom.createAttrMorph(element5, 'value');
        morphs[5] = dom.createAttrMorph(element5, 'oninput');
        morphs[6] = dom.createMorphAt(element4,3,3);
        morphs[7] = dom.createAttrMorph(element6, 'value');
        morphs[8] = dom.createAttrMorph(element6, 'oninput');
        morphs[9] = dom.createMorphAt(element4,7,7);
        morphs[10] = dom.createMorphAt(element7,1,1);
        morphs[11] = dom.createMorphAt(element7,3,3);
        morphs[12] = dom.createMorphAt(element8,1,1);
        morphs[13] = dom.createMorphAt(element8,3,3);
        morphs[14] = dom.createUnsafeAttrMorph(element9, 'style');
        morphs[15] = dom.createMorphAt(element9,1,1);
        return morphs;
      },
      statements: [
        ["element","action",["makeSquare"],[],["loc",[null,[2,8],[2,31]]]],
        ["element","action",["makeRow"],[],["loc",[null,[3,8],[3,28]]]],
        ["element","action",["makeLongRect"],[],["loc",[null,[4,8],[4,33]]]],
        ["element","action",["makeTallRect"],[],["loc",[null,[5,8],[5,33]]]],
        ["attribute","value",["get","containerWidth",["loc",[null,[7,64],[7,78]]]]],
        ["attribute","oninput",["subexpr","action",["updateContainerWidth"],["value","target.value"],["loc",[null,[7,89],[7,143]]]]],
        ["content","containerWidth",["loc",[null,[7,145],[7,163]]]],
        ["attribute","value",["get","containerHeight",["loc",[null,[8,65],[8,80]]]]],
        ["attribute","oninput",["subexpr","action",["updateContainerHeight"],["value","target.value"],["loc",[null,[8,91],[8,146]]]]],
        ["content","containerHeight",["loc",[null,[8,148],[8,167]]]],
        ["content","itemHeight",["loc",[null,[11,13],[11,27]]]],
        ["content","itemWidth",["loc",[null,[12,12],[12,25]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","scrollLeft",["loc",[null,[15,27],[15,37]]]]],[],[]]],["loc",[null,[15,13],[15,39]]]],
        ["inline","input",[],["value",["subexpr","@mut",[["get","scrollTop",["loc",[null,[16,26],[16,35]]]]],[],[]]],["loc",[null,[16,12],[16,37]]]],
        ["attribute","style",["subexpr","concat",["position:relative;width:",["get","containerWidth",["loc",[null,[20,68],[20,82]]]],"px;height:",["get","containerHeight",["loc",[null,[20,96],[20,111]]]],"px;"],[],["loc",[null,[20,31],[20,120]]]]],
        ["block","ember-collection",[],["items",["subexpr","@mut",[["get","model",["loc",[null,[22,12],[22,17]]]]],[],[]],"estimated-height",["subexpr","@mut",[["get","containerHeight",["loc",[null,[23,23],[23,38]]]]],[],[]],"estimated-width",["subexpr","@mut",[["get","containerWidth",["loc",[null,[24,22],[24,36]]]]],[],[]],"buffer",10,"cell-layout",["subexpr","fixed-grid-layout",[["get","itemWidth",["loc",[null,[26,37],[26,46]]]],["get","itemHeight",["loc",[null,[26,47],[26,57]]]]],[],["loc",[null,[26,18],[26,58]]]],"scroll-left",["subexpr","@mut",[["get","scrollLeft",["loc",[null,[27,18],[27,28]]]]],[],[]],"scroll-top",["subexpr","@mut",[["get","scrollTop",["loc",[null,[28,17],[28,26]]]]],[],[]],"scroll-change",["subexpr","action",["scrollChange"],[],["loc",[null,[29,20],[29,43]]]]],0,null,["loc",[null,[21,2],[34,23]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/templates/simple', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        meta: {
          "revision": "Ember@1.13.10",
          "loc": {
            "source": null,
            "start": {
              "line": 18,
              "column": 2
            },
            "end": {
              "line": 22,
              "column": 2
            }
          },
          "moduleName": "dummy/templates/simple.hbs"
        },
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.setAttribute(el1,"class","list-item");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(dom.childAt(fragment, [1]),1,1);
          return morphs;
        },
        statements: [
          ["content","item.name",["loc",[null,[20,6],[20,19]]]]
        ],
        locals: ["item","index"],
        templates: []
      };
    }());
    return {
      meta: {
        "revision": "Ember@1.13.10",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 24,
            "column": 0
          }
        },
        "moduleName": "dummy/templates/simple.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Simple");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Square");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Row");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Long Rectangle");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Tall Rectable");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Shuffle");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  Container Width: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("input");
        dom.setAttribute(el2,"type","range");
        dom.setAttribute(el2,"min","200");
        dom.setAttribute(el2,"max","1000");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  Container Height: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("input");
        dom.setAttribute(el2,"type","range");
        dom.setAttribute(el2,"min","200");
        dom.setAttribute(el2,"max","1000");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\nItem Height: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\nItem Width: ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","simple-list");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var element1 = dom.childAt(fragment, [4]);
        var element2 = dom.childAt(fragment, [6]);
        var element3 = dom.childAt(fragment, [8]);
        var element4 = dom.childAt(fragment, [10]);
        var element5 = dom.childAt(fragment, [12]);
        var element6 = dom.childAt(element5, [1]);
        var element7 = dom.childAt(element5, [5]);
        var element8 = dom.childAt(fragment, [14]);
        var element9 = dom.childAt(fragment, [18]);
        var morphs = new Array(15);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createElementMorph(element2);
        morphs[3] = dom.createElementMorph(element3);
        morphs[4] = dom.createElementMorph(element4);
        morphs[5] = dom.createAttrMorph(element6, 'value');
        morphs[6] = dom.createAttrMorph(element6, 'oninput');
        morphs[7] = dom.createMorphAt(element5,3,3);
        morphs[8] = dom.createAttrMorph(element7, 'value');
        morphs[9] = dom.createAttrMorph(element7, 'oninput');
        morphs[10] = dom.createMorphAt(element5,7,7);
        morphs[11] = dom.createMorphAt(element8,1,1);
        morphs[12] = dom.createMorphAt(element8,3,3);
        morphs[13] = dom.createUnsafeAttrMorph(element9, 'style');
        morphs[14] = dom.createMorphAt(element9,1,1);
        return morphs;
      },
      statements: [
        ["element","action",["makeSquare"],[],["loc",[null,[2,8],[2,31]]]],
        ["element","action",["makeRow"],[],["loc",[null,[3,8],[3,28]]]],
        ["element","action",["makeLongRect"],[],["loc",[null,[4,8],[4,33]]]],
        ["element","action",["makeTallRect"],[],["loc",[null,[5,8],[5,33]]]],
        ["element","action",["shuffle"],[],["loc",[null,[6,8],[6,28]]]],
        ["attribute","value",["get","containerWidth",["loc",[null,[8,64],[8,78]]]]],
        ["attribute","oninput",["subexpr","action",["updateContainerWidth"],["value","target.value"],["loc",[null,[8,89],[8,143]]]]],
        ["content","containerWidth",["loc",[null,[8,145],[8,163]]]],
        ["attribute","value",["get","containerHeight",["loc",[null,[9,65],[9,80]]]]],
        ["attribute","oninput",["subexpr","action",["updateContainerHeight"],["value","target.value"],["loc",[null,[9,91],[9,146]]]]],
        ["content","containerHeight",["loc",[null,[9,148],[9,167]]]],
        ["content","itemHeight",["loc",[null,[12,13],[12,27]]]],
        ["content","itemWidth",["loc",[null,[13,12],[13,25]]]],
        ["attribute","style",["subexpr","concat",["position:relative;width:",["get","containerWidth",["loc",[null,[17,68],[17,82]]]],"px;height:",["get","containerHeight",["loc",[null,[17,96],[17,111]]]],"px;"],[],["loc",[null,[17,31],[17,120]]]]],
        ["block","ember-collection",[],["items",["subexpr","@mut",[["get","model",["loc",[null,[18,28],[18,33]]]]],[],[]],"estimated-height",["subexpr","@mut",[["get","containerHeight",["loc",[null,[18,51],[18,66]]]]],[],[]],"estimated-width",["subexpr","@mut",[["get","containerWidth",["loc",[null,[18,83],[18,97]]]]],[],[]],"buffer",10,"cell-layout",["subexpr","fixed-grid-layout",[["get","itemWidth",["loc",[null,[18,139],[18,148]]]],["get","itemHeight",["loc",[null,[18,149],[18,159]]]]],[],["loc",[null,[18,120],[18,160]]]]],0,null,["loc",[null,[18,2],[22,23]]]]
      ],
      locals: [],
      templates: [child0]
    };
  }()));

});
define('dummy/utils/fixtures', ['exports'], function (exports) {

	'use strict';

	var types = [{ id: 1, type: "cat", name: "Andrew" }, { id: 2, type: "cat", name: "Andrew" }, { id: 3, type: "cat", name: "Bruce" }, { id: 4, type: "other", name: "Xbar" }, { id: 5, type: "dog", name: "Caroline" }, { id: 6, type: "cat", name: "David" }, { id: 7, type: "other", name: "Xbar" }, { id: 8, type: "other", name: "Xbar" }, { id: 9, type: "dog", name: "Edward" }, { id: 10, type: "dog", name: "Francis" }, { id: 11, type: "dog", name: "George" }, { id: 12, type: "other", name: "Xbar" }, { id: 13, type: "dog", name: "Harry" }, { id: 14, type: "cat", name: "Ingrid" }, { id: 15, type: "other", name: "Xbar" }, { id: 16, type: "cat", name: "Jenn" }, { id: 17, type: "cat", name: "Kelly" }, { id: 18, type: "other", name: "Xbar" }, { id: 19, type: "other", name: "Xbar" }, { id: 20, type: "cat", name: "Larry" }, { id: 21, type: "other", name: "Xbar" }, { id: 22, type: "cat", name: "Manny" }, { id: 23, type: "dog", name: "Nathan" }, { id: 24, type: "cat", name: "Ophelia" }, { id: 25, type: "dog", name: "Patrick" }, { id: 26, type: "other", name: "Xbar" }, { id: 27, type: "other", name: "Xbar" }, { id: 28, type: "other", name: "Xbar" }, { id: 29, type: "other", name: "Xbar" }, { id: 30, type: "other", name: "Xbar" }, { id: 31, type: "cat", name: "Quincy" }, { id: 32, type: "dog", name: "Roger" }];

	exports.types = types;

});
define('dummy/utils/images', ['exports'], function (exports) {

	'use strict';

	var images = ['images/ebryn.jpg', 'images/iterzic.jpg', 'images/kselden.jpg', 'images/machty.jpg', 'images/rwjblue.jpg', 'images/stefanpenner.jpg', 'images/tomdale.jpg', 'images/trek.jpg', 'images/wagenet.jpg', 'images/wycats.jpg'];

	var smallImages = ['images/small/Ba_Gua_Feng-Shui-Mirror.gif', 'images/small/Bonsai.gif', 'images/small/Chouchin_Reinensai_Lantern.gif', 'images/small/Chouchin_Kuroshiro_Lantern_.gif', 'images/small/Chouchin_Shinku_Lantern.gif', 'images/small/Fuurin_Glass_Wind_Chime.gif', 'images/small/Geta_Wooden_Sandal_.gif', 'images/small/Gunsen_Fan_.gif', 'images/small/iChing_Kouka_Heads-Coin.gif', 'images/small/iChing_Kouka_Tails_Coin.gif', 'images/small/Ishidourou_Snow_Lantern.gif', 'images/small/Kakejiku_Hanging_Scroll.gif', 'images/small/Katana_and_Sheath.gif', 'images/small/Kimono_Buru_Blue.gif', 'images/small/Kimono_Chairo_Tan.gif', 'images/small/Koi.gif', 'images/small/Shamisen.gif', 'images/small/Shodou_Calligraphy.gif', 'images/small/Torii.gif', 'images/small/Tsukubai_Water_Basin.gif'];

	var strangeRatios = ['images/strange-ratios/horizontal-rectangle.jpg', 'images/strange-ratios/square.jpg', 'images/strange-ratios/vertical-rectangle.jpg'];

	exports['default'] = { images: images, smallImages: smallImages, strangeRatios: strangeRatios };

});
define('dummy/utils/make-model', ['exports', 'dummy/utils/images'], function (exports, images) {

  'use strict';



  exports['default'] = makeModel;
  function makeModel() {
    var count = arguments.length <= 0 || arguments[0] === undefined ? 1000 : arguments[0];
    var imageArrayName = arguments.length <= 1 || arguments[1] === undefined ? 'images' : arguments[1];

    var imagesArray = images['default'][imageArrayName];
    return function model() {
      var result = [];
      for (var i = 0; i < count; i++) {
        result.push({
          name: 'Item ' + (i + 1),
          imageSrc: imagesArray[i % imagesArray.length]
        });
      }
      return result;
    };
  }

});
define('dummy/views/multi-height-list', ['exports', 'ember-list-view', 'ember-list-view/list-item-view'], function (exports, ListView, ListItemView) {

  'use strict';

  exports['default'] = ListView['default'].extend({
    height: 300,
    width: 500,
    rowHeight: 100,
    itemViews: {
      "cat": ListItemView['default'].extend({
        rowHeight: 100,
        templateName: 'cat'
      }),
      "dog": {
        rowHeight: 50
      },
      "other": {
        rowHeight: 150
      }
    },
    heightForIndex: function heightForIndex(idx) {
      // TODO: cleanup
      var entry = this.get('content').objectAt(idx);
      var type = this.itemViews[entry.type];

      return type.rowHeight ? type.rowHeight : type.proto().rowHeight;
    },
    itemViewForIndex: function itemViewForIndex() {
      return this.itemViews[this.get('content').objectAt(0).type];
    }
  });

});
define('dummy/views/multi-height-multi-list', ['exports', 'ember-list-view', 'ember-list-view/list-item-view'], function (exports, ListView, ListItemView) {

  'use strict';

  exports['default'] = ListView['default'].extend({
    height: 300,
    width: 500,
    rowHeight: 100,
    itemViews: {
      "cat": ListItemView['default'].extend({
        classNames: ['cat'],
        rowHeight: 100,
        templateName: 'cat'
      }),
      "dog": ListItemView['default'].extend({
        classNames: ['dog'],
        rowHeight: 50,
        templateName: 'dog'
      }),
      "other": ListItemView['default'].extend({
        classNames: ['other'],
        rowHeight: 150,
        templateName: 'other'
      })
    },
    heightForIndex: function heightForIndex(idx) {
      return this.itemViewForIndex(idx).proto().rowHeight;
    },
    itemViewForIndex: function itemViewForIndex(idx) {
      return this.itemViews[this.get('content').objectAt(idx).type];
    }
  });

});
define('dummy/views/multi-height-virtual-list', ['exports', 'ember-list-view/virtual-list-view', 'ember-list-view/list-item-view'], function (exports, VirtualListView, ListItemView) {

  'use strict';

  exports['default'] = VirtualListView['default'].extend({
    height: 300,
    width: 500,
    rowHeight: 100,
    itemViews: {
      "cat": ListItemView['default'].extend({
        rowHeight: 100,
        templateName: 'cat'
      }),
      "dog": {
        rowHeight: 50
      },
      "other": {
        rowHeight: 150
      }
    },
    heightForIndex: function heightForIndex(idx) {
      // TODO: cleanup
      var entry = this.get('content').objectAt(idx);
      var type = this.itemViews[entry.type];

      return type.rowHeight ? type.rowHeight : type.proto().rowHeight;
    },
    itemViewForIndex: function itemViewForIndex() {
      return this.itemViews[this.get('content').objectAt(0).type];
    }
  });

});
define('dummy/views/picture', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].View.extend({
    tagName: 'a',
    didInsertElement: function didInsertElement() {
      this.$().on('dragstart', 'img', function (e) {
        e.preventDefault();
      });
    },

    willDestroyElement: function willDestroyElement() {
      this.$().off('dragstart', 'img');
    }
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("dummy/tests/test-helper");
} else {
  require("dummy/app")["default"].create({});
}

/* jshint ignore:end */
