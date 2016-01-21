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
              "line": 14,
              "column": 8
            },
            "end": {
              "line": 14,
              "column": 80
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","link-to",["Home","index"],[],["loc",[null,[14,53],[14,79]]]]
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
              "line": 15,
              "column": 8
            },
            "end": {
              "line": 15,
              "column": 88
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","link-to",["Fixed Grid","simple"],[],["loc",[null,[15,54],[15,87]]]]
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
              "line": 16,
              "column": 8
            },
            "end": {
              "line": 16,
              "column": 86
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          return morphs;
        },
        statements: [
          ["inline","link-to",["Mixed Grid","mixed"],[],["loc",[null,[16,53],[16,85]]]]
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
              "line": 17,
              "column": 8
            },
            "end": {
              "line": 17,
              "column": 110
            }
          },
          "moduleName": "dummy/templates/application.hbs"
        },
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var morphs = new Array(1);
          morphs[0] = dom.createMorphAt(fragment,1,1,contextualElement);
          dom.insertBoundary(fragment, null);
          return morphs;
        },
        statements: [
          ["inline","link-to",["Scroll Position","scroll-position"],[],["loc",[null,[17,63],[17,110]]]]
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
            "line": 26,
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
        var el1 = dom.createElement("nav");
        dom.setAttribute(el1,"class","navbar navbar-inverse navbar-fixed-top");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","navbar-header");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"type","button");
        dom.setAttribute(el4,"class","navbar-toggle collapsed");
        dom.setAttribute(el4,"data-toggle","collapse");
        dom.setAttribute(el4,"data-target","#navbar");
        dom.setAttribute(el4,"aria-expanded","false");
        dom.setAttribute(el4,"aria-controls","navbar");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","sr-only");
        var el6 = dom.createTextNode("Toggle navigation");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"class","navbar-brand");
        dom.setAttribute(el4,"href","#");
        var el5 = dom.createTextNode("Ember Collection");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"id","navbar");
        dom.setAttribute(el3,"class","navbar-collapse collapse");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","nav navbar-nav");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("/.navbar-collapse ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1, 3, 1]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(element0,1,1);
        morphs[1] = dom.createMorphAt(element0,3,3);
        morphs[2] = dom.createMorphAt(element0,5,5);
        morphs[3] = dom.createMorphAt(element0,7,7);
        morphs[4] = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        return morphs;
      },
      statements: [
        ["block","link-to",["index"],["tagName","li","href",false],0,null,["loc",[null,[14,8],[14,92]]]],
        ["block","link-to",["simple"],["tagName","li","href",false],1,null,["loc",[null,[15,8],[15,100]]]],
        ["block","link-to",["mixed"],["tagName","li","href",false],2,null,["loc",[null,[16,8],[16,98]]]],
        ["block","link-to",["scroll-position"],["tagName","li","href",false],3,null,["loc",[null,[17,8],[17,122]]]],
        ["content","outlet",["loc",[null,[24,4],[24,14]]]]
      ],
      locals: [],
      templates: [child0, child1, child2, child3]
    };
  }()));

});
define('dummy/templates/index', ['exports'], function (exports) {

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
            "line": 23,
            "column": 1
          }
        },
        "moduleName": "dummy/templates/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","jumbotron");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        var el3 = dom.createTextNode("Ember Collection Demos");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("These are the demos for the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","https://github.com/emberjs/ember-collection");
        var el4 = dom.createTextNode("ember-collection");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" addon. Their source code is within the the repo's ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","https://github.com/emberjs/ember-collection/tree/master/tests/dummy/app");
        var el4 = dom.createTextNode("tests/dummy application");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(".");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-4");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Fixed Grid Layout");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Use the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("fixed-grid-layout");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" when all items are the same size. The width and height of each item are bound as is the width and height of the container. Ember collection will re-layout items when any of these items change.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-4");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Mixed Grid Layout");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Use the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("mixed-grid-layout");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" when items can be a different size. The collection being itterated over is passed to the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("mixed-grid-layout");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" helper. Each item in the collection must provide a ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("width");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" and ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("height");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" property of the item.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-md-4");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h2");
        var el4 = dom.createTextNode("Scroll Position");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Use the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("scroll-top");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" and ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("scroll-left");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" attributes to programtically scroll to a specific location in the collection. This can also be used to set an initial scroll position.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n ");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1, 5]),0,0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3, 5]),0,0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5, 5]),0,0);
        return morphs;
      },
      statements: [
        ["inline","link-to",["Demo","simple"],["class","btn btn-default"],["loc",[null,[10,11],[10,62]]]],
        ["inline","link-to",["Demo","mixed"],["class","btn btn-default"],["loc",[null,[15,11],[15,61]]]],
        ["inline","link-to",["Demo","scroll-position"],["class","btn btn-default"],["loc",[null,[20,11],[20,71]]]]
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
              "line": 22,
              "column": 2
            },
            "end": {
              "line": 35,
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
          ["content","item.name",["loc",[null,[33,6],[33,19]]]]
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
            "line": 37,
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
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Note: The usage of this component remembers its scroll position. Try it by navigating away from this route and then returning.");
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
        var element9 = dom.childAt(fragment, [20]);
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
        ["attribute","style",["subexpr","concat",["position:relative;width:",["get","containerWidth",["loc",[null,[21,68],[21,82]]]],"px;height:",["get","containerHeight",["loc",[null,[21,96],[21,111]]]],"px;"],[],["loc",[null,[21,31],[21,120]]]]],
        ["block","ember-collection",[],["items",["subexpr","@mut",[["get","model",["loc",[null,[23,12],[23,17]]]]],[],[]],"estimated-height",["subexpr","@mut",[["get","containerHeight",["loc",[null,[24,23],[24,38]]]]],[],[]],"estimated-width",["subexpr","@mut",[["get","containerWidth",["loc",[null,[25,22],[25,36]]]]],[],[]],"buffer",10,"cell-layout",["subexpr","fixed-grid-layout",[["get","itemWidth",["loc",[null,[27,37],[27,46]]]],["get","itemHeight",["loc",[null,[27,47],[27,57]]]]],[],["loc",[null,[27,18],[27,58]]]],"scroll-left",["subexpr","@mut",[["get","scrollLeft",["loc",[null,[28,18],[28,28]]]]],[],[]],"scroll-top",["subexpr","@mut",[["get","scrollTop",["loc",[null,[29,17],[29,26]]]]],[],[]],"scroll-change",["subexpr","action",["scrollChange"],[],["loc",[null,[30,20],[30,43]]]]],0,null,["loc",[null,[22,2],[35,23]]]]
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
