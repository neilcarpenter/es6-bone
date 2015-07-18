(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

window.__NAMESPACE__ = new _App2['default']();
window.__NAMESPACE__.init();

},{"./App":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utilsAnalytics = require('./utils/Analytics');

var _utilsAnalytics2 = _interopRequireDefault(_utilsAnalytics);

var _utilsAuthManager = require('./utils/AuthManager');

var _utilsAuthManager2 = _interopRequireDefault(_utilsAuthManager);

var _utilsShare = require('./utils/Share');

var _utilsShare2 = _interopRequireDefault(_utilsShare);

var _utilsFacebook = require('./utils/Facebook');

var _utilsFacebook2 = _interopRequireDefault(_utilsFacebook);

var _utilsGooglePlus = require('./utils/GooglePlus');

var _utilsGooglePlus2 = _interopRequireDefault(_utilsGooglePlus);

var _dataTemplates = require('./data/Templates');

var _dataTemplates2 = _interopRequireDefault(_dataTemplates);

var _dataLocale = require('./data/Locale');

var _dataLocale2 = _interopRequireDefault(_dataLocale);

var _routerRouter = require('./router/Router');

var _routerRouter2 = _interopRequireDefault(_routerRouter);

var _routerNav = require('./router/Nav');

var _routerNav2 = _interopRequireDefault(_routerNav);

var _AppData = require('./AppData');

var _AppData2 = _interopRequireDefault(_AppData);

var _AppView = require('./AppView');

var _AppView2 = _interopRequireDefault(_AppView);

var _utilsMediaQueries = require('./utils/MediaQueries');

var _utilsMediaQueries2 = _interopRequireDefault(_utilsMediaQueries);

var App = (function () {
    _createClass(App, null, [{
        key: '_toClean',
        value: ['depedencyDfds', 'setFlags', 'objectComplete', 'init', 'initObjects', 'initObject', 'initSDKs', 'initApp', 'go', 'cleanup'],
        enumerable: true
    }]);

    function App() {
        _classCallCheck(this, App);

        this.BASE_PATH = window.config.hostname;
        this.localeCode = window.config.localeCode;
        this.depedencyDfds = [];
    }

    _createClass(App, [{
        key: 'setFlags',
        value: function setFlags() {
            var ua = window.navigator.userAgent.toLowerCase();

            _utilsMediaQueries2['default'].setup();

            this.IS_ANDROID = ua.indexOf('android') > -1;
            this.IS_FIREFOX = ua.indexOf('firefox') > -1;
            this.IS_CHROME_IOS = ua.match('crios') ? true : false; // http://stackoverflow.com/a/13808053
        }
    }, {
        key: 'depedencyLoaded',
        value: function depedencyLoaded(dfd) {
            dfd.resolve();
        }
    }, {
        key: 'init',
        value: function init() {
            this.initObjects();
        }
    }, {
        key: 'initObjects',
        value: function initObjects() {
            this.initObject('templates', _dataTemplates2['default'], '/data/templates.xml');
            this.initObject('locale', _dataLocale2['default'], '/data/locales/strings.json');
            this.initObject('analytics', _utilsAnalytics2['default'], '/data/tracking.json');
            this.initObject('appData', _AppData2['default']);

            $.when.apply($, this.depedencyDfds).done(this.initApp.bind(this));
        }
    }, {
        key: 'initObject',
        value: function initObject(classProp, ClassRef) {
            var remoteDep = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

            var dfd = $.Deferred();
            this.depedencyDfds.push(dfd);

            this[classProp] = new ClassRef(remoteDep, this.depedencyLoaded.bind(this, dfd));
        }
    }, {
        key: 'initSDKs',
        value: function initSDKs() {
            _utilsFacebook2['default'].load();
            _utilsGooglePlus2['default'].load();
        }
    }, {
        key: 'initApp',
        value: function initApp() {
            this.setFlags();

            this.appView = new _AppView2['default']();
            this.router = new _routerRouter2['default']();
            this.nav = new _routerNav2['default']();
            this.auth = new _utilsAuthManager2['default']();
            this.share = new _utilsShare2['default']();

            this.go();

            this.initSDKs();
        }
    }, {
        key: 'go',
        value: function go() {
            // After everything is loaded, kicks off website
            this.appView.render();

            // remove redundant initialisation methods / properties
            this.cleanup();
        }
    }, {
        key: 'cleanup',
        value: function cleanup() {
            var _this = this;

            App._toClean.forEach(function (item) {
                _this[item] = null;
                delete _this[item];
            });
        }
    }]);

    return App;
})();

exports['default'] = App;
module.exports = exports['default'];

},{"./AppData":3,"./AppView":4,"./data/Locale":8,"./data/Templates":9,"./router/Nav":13,"./router/Router":14,"./utils/Analytics":15,"./utils/AuthManager":16,"./utils/Facebook":17,"./utils/GooglePlus":18,"./utils/MediaQueries":19,"./utils/Share":21}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _dataAbstractData = require('./data/AbstractData');

var _dataAbstractData2 = _interopRequireDefault(_dataAbstractData);

var _utilsRequester = require('./utils/Requester');

var _utilsRequester2 = _interopRequireDefault(_utilsRequester);

var _dataAPI = require('./data/API');

var _dataAPI2 = _interopRequireDefault(_dataAPI);

var AppData = (function (_AbstractData) {
    _inherits(AppData, _AbstractData);

    function AppData(remoteDep, callback) {
        if (remoteDep === undefined) remoteDep = null;

        _classCallCheck(this, AppData);

        _get(Object.getPrototypeOf(AppData.prototype), 'constructor', this).call(this);

        this.callback = null;
        /*
         add all data classes here
         */

        this.callback = callback;

        this.getStartData();
    }

    _createClass(AppData, [{
        key: 'getStartData',

        // get app bootstrap data - embed in HTML or API endpoint
        value: function getStartData() {
            var _this = this;

            if (_dataAPI2['default'].get('start')) {

                var r = _utilsRequester2['default'].request({
                    url: _dataAPI2['default'].get('start'),
                    type: 'GET'
                });

                r.done(this.onStartDataReceived.bind(this));
                r.fail(function () {

                    // console.error "error loading api start data"

                    /*
                    this is only temporary, while there is no bootstrap data here, normally would handle error / fail
                    */
                    if (_this.callback && typeof _this.callback === 'function') {
                        _this.callback();
                    }
                });
            } else {

                if (this.callback && typeof this.callback === 'function') {
                    this.callback();
                }
            }
        }
    }, {
        key: 'onStartDataReceived',
        value: function onStartDataReceived(data) {

            /*
             bootstrap data received, app ready to go
             */

            if (this.callback && typeof this.callback === 'function') {
                this.callback();
            }
        }
    }]);

    return AppData;
})(_dataAbstractData2['default']);

exports['default'] = AppData;
module.exports = exports['default'];

},{"./data/API":6,"./data/AbstractData":7,"./utils/Requester":20}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _viewAbstractView = require('./view/AbstractView');

var _viewAbstractView2 = _interopRequireDefault(_viewAbstractView);

var _viewBasePreloader = require('./view/base/Preloader');

var _viewBasePreloader2 = _interopRequireDefault(_viewBasePreloader);

var _viewBaseHeader = require('./view/base/Header');

var _viewBaseHeader2 = _interopRequireDefault(_viewBaseHeader);

var _viewBaseWrapper = require('./view/base/Wrapper');

var _viewBaseWrapper2 = _interopRequireDefault(_viewBaseWrapper);

var _viewBaseFooter = require('./view/base/Footer');

var _viewBaseFooter2 = _interopRequireDefault(_viewBaseFooter);

var _viewModals_ModalManager = require('./view/modals/_ModalManager');

var _viewModals_ModalManager2 = _interopRequireDefault(_viewModals_ModalManager);

var _utilsMediaQueries = require('./utils/MediaQueries');

var _utilsMediaQueries2 = _interopRequireDefault(_utilsMediaQueries);

var AppView = _viewAbstractView2['default'].extend({

    template: 'main',

    $window: null,
    $body: null,

    wrapper: null,
    footer: null,

    dims: {
        w: null,
        h: null,
        o: null,
        c: null
    },

    events: {
        'click a': 'linkManager'
    },

    EVENT_UPDATE_DIMENSIONS: 'EVENT_UPDATE_DIMENSIONS',

    MOBILE_WIDTH: 700,
    MOBILE: 'mobile',
    NON_MOBILE: 'non_mobile',

    constructor: function constructor() {

        AppView.__super__.constructor.apply(this);

        this.$window = $(window);
        this.$body = $('body').eq(0);
    },

    disableTouch: function disableTouch() {

        this.$window.on('touchmove', this.onTouchMove.bind(this));
    },

    enableTouch: function enableTouch() {

        this.$window.off('touchmove', this.onTouchMove.bind(this));
    },

    onTouchMove: function onTouchMove(e) {

        e.preventDefault();
    },

    render: function render() {

        this.bindEvents();

        this.preloader = new _viewBasePreloader2['default']();
        this.modalManager = new _viewModals_ModalManager2['default']();

        this.header = new _viewBaseHeader2['default']();
        this.wrapper = new _viewBaseWrapper2['default']();
        this.footer = new _viewBaseFooter2['default']();

        this.addChild(this.header).addChild(this.wrapper).addChild(this.footer);

        this.onAllRendered();
    },

    bindEvents: function bindEvents() {

        this.onResize();

        this.onResize = _.debounce(this.onResize.bind(this), 300);
        this.$window.on('resize orientationchange', this.onResize.bind(this));
    },

    onAllRendered: function onAllRendered() {

        console.log('onAllRendered : =>');

        this.$body.prepend(this.$el);

        this.begin();
    },

    begin: function begin() {

        this.trigger('start');

        this.__NAMESPACE__().router.start();

        this.preloader.hide();
        this.updateMediaQueriesLog();
    },

    onResize: function onResize() {

        this.getDims();
        this.updateMediaQueriesLog();
    },

    updateMediaQueriesLog: function updateMediaQueriesLog() {

        if (this.header) {
            this.header.$el.find('.breakpoint').html('<div class=\'l\'>CURRENT BREAKPOINT:</div><div class=\'b\'>' + _utilsMediaQueries2['default'].getBreakpoint() + '</div>');
        }
    },

    getDims: function getDims() {

        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        this.dims = {
            w: w,
            h: h,
            o: h > w ? 'portrait' : 'landscape',
            c: w <= this.MOBILE_WIDTH ? this.MOBILE : this.NON_MOBILE
        };

        this.trigger(this.EVENT_UPDATE_DIMENSIONS, this.dims);
    },

    linkManager: function linkManager(e) {

        var href = $(e.currentTarget).attr('href');

        if (!href) {
            return false;
        }

        this.navigateToUrl(href, e);
    },

    navigateToUrl: function navigateToUrl(href) {
        var e = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        var route = href.match(this.__NAMESPACE__().BASE_PATH) ? href.split(this.__NAMESPACE__().BASE_PATH)[1] : href;
        var section = route.indexOf('/') === 0 ? route.split('/')[1] : route;

        if (this.__NAMESPACE__().nav.getSection(section)) {
            e.preventDefault();
            this.__NAMESPACE__().router.navigateTo(route);
        } else {
            this.handleExternalLink(href);
        }
    },

    handleExternalLink: function handleExternalLink(data) {}

});

exports['default'] = AppView;
module.exports = exports['default'];

/*
 bind tracking events if necessary
 */

},{"./utils/MediaQueries":19,"./view/AbstractView":22,"./view/base/Footer":24,"./view/base/Header":25,"./view/base/Preloader":26,"./view/base/Wrapper":27,"./view/modals/_ModalManager":32}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _modelsCoreTemplateModel = require('../../models/core/TemplateModel');

var _modelsCoreTemplateModel2 = _interopRequireDefault(_modelsCoreTemplateModel);

var TemplatesCollection = (function (_Backbone$Collection) {
	_inherits(TemplatesCollection, _Backbone$Collection);

	function TemplatesCollection() {
		_classCallCheck(this, TemplatesCollection);

		_get(Object.getPrototypeOf(TemplatesCollection.prototype), 'constructor', this).apply(this, arguments);

		this.model = _modelsCoreTemplateModel2['default'];
	}

	return TemplatesCollection;
})(Backbone.Collection);

exports['default'] = TemplatesCollection;
module.exports = exports['default'];

},{"../../models/core/TemplateModel":12}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _modelsCoreAPIRouteModel = require('../models/core/APIRouteModel');

var _modelsCoreAPIRouteModel2 = _interopRequireDefault(_modelsCoreAPIRouteModel);

var API = (function () {
	function API() {
		_classCallCheck(this, API);
	}

	_createClass(API, null, [{
		key: 'model',
		value: new _modelsCoreAPIRouteModel2['default'](),
		enumerable: true
	}, {
		key: 'getConstants',
		value: function value() {

			// add more if we wanna use in API strings
			var constants = {
				BASE_PATH: API.__NAMESPACE__().BASE_PATH
			};

			return constants;
		},
		enumerable: true
	}, {
		key: 'get',
		value: function value(name, vars) {

			var allVars = $.extend(true, vars, API.getConstants());
			return API.supplantString(API.model.get(name), allVars);
		},
		enumerable: true
	}, {
		key: 'supplantString',
		value: function value(str, vals) {

			return str.replace(/{{ ([^{}]*) }}/g, function (a, b) {
				var r = vals[b] || typeof vals[b] === 'number' ? vals[b].toString() : '';
				if (typeof r === 'string' || typeof r === 'number') {
					return r;
				} else {
					return a;
				}
			});
		},
		enumerable: true
	}, {
		key: '__NAMESPACE__',
		value: function value() {

			return window.__NAMESPACE__;
		},
		enumerable: true
	}]);

	return API;
})();

window.API = API;

exports['default'] = API;
module.exports = exports['default'];

},{"../models/core/APIRouteModel":10}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AbstractData = (function () {
	function AbstractData() {
		_classCallCheck(this, AbstractData);

		_.extend(this, Backbone.Events);
	}

	_createClass(AbstractData, [{
		key: "__NAMESPACE__",
		value: function __NAMESPACE__() {

			return window.__NAMESPACE__;
		}
	}]);

	return AbstractData;
})();

exports["default"] = AbstractData;
module.exports = exports["default"];

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _modelsCoreLocalesModel = require('../models/core/LocalesModel');

var _modelsCoreLocalesModel2 = _interopRequireDefault(_modelsCoreLocalesModel);

var _dataAPI = require('../data/API');

var _dataAPI2 = _interopRequireDefault(_dataAPI);

/*
    Locale Loader

    Fires back an event when complete

*/

var Locale = (function () {
    function Locale(data, cb) {
        _classCallCheck(this, Locale);

        this.lang = null;
        this.data = null;
        this.callback = null;
        this.backup = null;
        this['default'] = 'en-gb';

        // start Locale Loader, define locale based on browser language

        this.callback = cb;
        this.backup = data;

        this.lang = this.getLang();

        if (_dataAPI2['default'].get('locale', { code: this.lang })) {

            $.ajax({
                url: _dataAPI2['default'].get('locale', { code: this.lang }),
                type: 'GET',
                success: this.onSuccess.bind(this),
                error: this.loadBackup.bind(this)
            });
        } else {

            this.loadBackup();
        }
    }

    _createClass(Locale, [{
        key: 'getLang',
        value: function getLang() {

            var lang = undefined;

            if (window.location.search && window.location.search.match('lang=')) {

                lang = window.location.search.split('lang=')[1].split('&')[0];
            } else if (window.config.localeCode) {

                lang = window.config.localeCode;
            } else {

                lang = this['default'];
            }

            return lang;
        }
    }, {
        key: 'onSuccess',
        value: function onSuccess(event) {

            // Fires back an event once it's complete

            var d = null;

            if (event.responseText) {
                d = JSON.parse(event.responseText);
            } else {
                d = event;
            }

            this.data = new _modelsCoreLocalesModel2['default'](d);
            this.callback();
        }
    }, {
        key: 'loadBackup',
        value: function loadBackup() {

            // When API not available, tries to load the static .txt locale

            $.ajax({
                url: this.backup,
                dataType: 'json',
                complete: this.onSuccess.bind(this),
                error: function error() {
                    console.log('error on loading backup');
                }
            });
        }
    }, {
        key: 'get',
        value: function get(id) {

            // get String from locale
            // + id : string id of the Localised String

            return this.data.getString(id);
        }
    }, {
        key: 'getLocaleImage',
        value: function getLocaleImage(url) {

            return window.config.CDN + '/images/locale/' + window.config.localeCode + '/' + url;
        }
    }]);

    return Locale;
})();

exports['default'] = Locale;
module.exports = exports['default'];

},{"../data/API":6,"../models/core/LocalesModel":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _modelsCoreTemplateModel = require('../models/core/TemplateModel');

var _modelsCoreTemplateModel2 = _interopRequireDefault(_modelsCoreTemplateModel);

var _collectionsCoreTemplatesCollection = require('../collections/core/TemplatesCollection');

var _collectionsCoreTemplatesCollection2 = _interopRequireDefault(_collectionsCoreTemplatesCollection);

var Templates = (function () {
    function Templates(templates, callback) {
        _classCallCheck(this, Templates);

        this.templates = null;
        this.cb = null;

        console.log(templates, callback);

        this.cb = callback;

        $.ajax({
            url: templates,
            success: this.parseXML.bind(this)
        });
    }

    _createClass(Templates, [{
        key: 'parseXML',
        value: function parseXML(data) {

            var temp = [];

            $(data).find('template').each(function (key, value) {
                var $value = $(value);
                temp.push(new _modelsCoreTemplateModel2['default']({
                    id: $value.attr('id').toString(),
                    text: $.trim($value.text())
                }));
            });

            this.templates = new _collectionsCoreTemplatesCollection2['default'](temp);

            this.cb();
        }
    }, {
        key: 'get',
        value: function get(id) {

            var t = this.templates.where({ id: id });
            t = t[0].get('text');

            return $.trim(t);
        }
    }]);

    return Templates;
})();

exports['default'] = Templates;
module.exports = exports['default'];

},{"../collections/core/TemplatesCollection":5,"../models/core/TemplateModel":12}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var modelDefaults = {

    start: "", // Eg: "{{ BASE_PATH }}/api/start"

    locale: "", // Eg: "{{ BASE_PATH }}/api/l10n/{{ code }}"

    user: {
        login: "{{ BASE_PATH }}/api/user/login",
        register: "{{ BASE_PATH }}/api/user/register",
        password: "{{ BASE_PATH }}/api/user/password",
        update: "{{ BASE_PATH }}/api/user/update",
        logout: "{{ BASE_PATH }}/api/user/logout",
        remove: "{{ BASE_PATH }}/api/user/remove"
    }
};

var APIRouteModel = (function (_Backbone$DeepModel) {
    _inherits(APIRouteModel, _Backbone$DeepModel);

    function APIRouteModel() {
        _classCallCheck(this, APIRouteModel);

        _get(Object.getPrototypeOf(APIRouteModel.prototype), "constructor", this).call(this, modelDefaults);
    }

    return APIRouteModel;
})(Backbone.DeepModel);

exports["default"] = APIRouteModel;
module.exports = exports["default"];

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var LocalesModel = (function (_Backbone$Model) {
    _inherits(LocalesModel, _Backbone$Model);

    function LocalesModel() {
        _classCallCheck(this, LocalesModel);

        _get(Object.getPrototypeOf(LocalesModel.prototype), 'constructor', this).apply(this, arguments);

        this.defaults = {
            code: null,
            language: null,
            strings: null
        };
    }

    _createClass(LocalesModel, [{
        key: 'get_language',
        value: function get_language() {

            return this.get('language');
        }
    }, {
        key: 'getString',
        value: function getString(id) {

            var strings = this.get('strings');
            var value = null;

            for (var key in strings) {
                for (var key2 in strings[key]['strings']) {
                    if (key2 === id) {
                        value = strings[key]['strings'][key2];
                    }
                }
            }

            if (value) {
                return value;
            } else {
                console.warn('Locales -> not found string: ' + id);
            }
        }
    }]);

    return LocalesModel;
})(Backbone.Model);

exports['default'] = LocalesModel;
module.exports = exports['default'];

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var TemplateModel = (function (_Backbone$Model) {
	_inherits(TemplateModel, _Backbone$Model);

	function TemplateModel() {
		_classCallCheck(this, TemplateModel);

		_get(Object.getPrototypeOf(TemplateModel.prototype), "constructor", this).apply(this, arguments);

		this.defaults = {
			id: "",
			text: ""
		};
	}

	return TemplateModel;
})(Backbone.Model);

exports["default"] = TemplateModel;
module.exports = exports["default"];

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _viewAbstractView = require('../view/AbstractView');

var _viewAbstractView2 = _interopRequireDefault(_viewAbstractView);

var _Router = require('./Router');

var _Router2 = _interopRequireDefault(_Router);

var staticProps = {
    EVENT_CHANGE_VIEW: 'EVENT_CHANGE_VIEW',
    EVENT_CHANGE_SUB_VIEW: 'EVENT_CHANGE_SUB_VIEW'
};

var Nav = _viewAbstractView2['default'].extend({

    sections: {
        HOME: '',
        EXAMPLE: 'example'
    },

    current: { area: null, sub: null },
    previous: { area: null, sub: null },

    constructor: function constructor() {

        Nav.__super__.constructor.apply(this);

        this.__NAMESPACE__().router.on(_Router2['default'].EVENT_HASH_CHANGED, this.changeView.bind(this));
    },

    getSection: function getSection(section) {

        if (section === '') {
            return true;
        }

        var sectionUri = false;

        for (var key in this.sections) {
            var uri = this.sections[key];
            if (uri === section) {
                sectionUri = key;
            }
        }

        return sectionUri;
    },

    changeView: function changeView(area, sub, params) {

        console.log('area', area);
        console.log('sub', sub);
        console.log('params', params);

        this.previous = this.current;
        this.current = { area: area, sub: sub };

        if (this.previous.area && this.previous.area === this.current.area) {
            this.trigger(Nav.EVENT_CHANGE_SUB_VIEW, this.current);
        } else {
            this.trigger(Nav.EVENT_CHANGE_VIEW, this.previous, this.current);
        }

        if (this.__NAMESPACE__().appView.modalManager.isOpen()) {
            this.__NAMESPACE__().appView.modalManager.hideOpenModal();
        }

        this.setPageTitle(area, sub);
    },

    setPageTitle: function setPageTitle(area, sub) {

        var title = 'PAGE TITLE HERE - LOCALISE BASED ON URL';

        if (window.document.title !== title) {
            window.document.title = title;
        }
    }

}, staticProps);

exports['default'] = Nav;
module.exports = exports['default'];

},{"../view/AbstractView":22,"./Router":14}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var staticProps = {
    EVENT_HASH_CHANGED: 'EVENT_HASH_CHANGED'
};

var Router = Backbone.Router.extend({

    FIRST_ROUTE: true,

    routes: {
        '(/)(:area)(/:sub)(/)': 'hashChanged',
        '*actions': 'navigateTo'
    },

    area: null,
    sub: null,
    params: null,

    start: function start() {

        Backbone.history.start({
            pushState: true,
            root: '/'
        });
    },

    hashChanged: function hashChanged() {
        var area = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
        var sub = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        console.log('>> EVENT_HASH_CHANGED @area = ' + this.area + ', @sub = ' + this.sub + ' <<');

        this.area = area;
        this.sub = sub;

        if (this.FIRST_ROUTE) {
            this.FIRST_ROUTE = false;
        }

        if (!this.area) {
            this.area = this.__NAMESPACE__().nav.sections.HOME;
        }

        this.trigger(Router.EVENT_HASH_CHANGED, this.area, this.sub, this.params);
    },

    navigateTo: function navigateTo(where, trigger, replace, params) {
        if (where === undefined) where = '';
        if (trigger === undefined) trigger = true;
        if (replace === undefined) replace = false;

        this.params = params;

        if (where.charAt(0) !== '/') {
            where = '/' + where;
        }

        if (where.charAt(where.length - 1) !== '/') {
            where = where + '/';
        }

        if (!trigger) {
            this.trigger(Router.EVENT_HASH_CHANGED, where, null, this.params);
            return;
        }

        this.navigate(where, { trigger: true, replace: replace });
    },

    __NAMESPACE__: function __NAMESPACE__() {

        return window.__NAMESPACE__;
    }

}, staticProps);

exports['default'] = Router;
module.exports = exports['default'];

},{}],15:[function(require,module,exports){
/*
 Analytics wrapper
*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Analytics = (function () {
    function Analytics(tags, callback) {
        _classCallCheck(this, Analytics);

        this.tags = null;
        this.started = false;
        this.attempts = 0;
        this.allowedAttempts = 5;

        this.callback = callback;

        $.getJSON(tags, this.onTagsReceived.bind(this));
    }

    _createClass(Analytics, [{
        key: 'onTagsReceived',
        value: function onTagsReceived(data) {

            this.tags = data;
            this.started = true;
            this.callback();
        }
    }, {
        key: 'track',

        // param string id of the tracking tag to be pushed on Analytics
        value: function track(param) {
            var _this = this;

            if (!this.started) {
                return;
            }

            if (param) {

                var v = this.tags[param];

                if (v) {
                    (function () {

                        var args = ['send', 'event'];
                        v.forEach(function (arg) {
                            args.push(arg);
                        });

                        // loading GA after main app JS, so external script may not be here yet
                        if (window.ga) {
                            ga.apply(null, args);
                        } else if (_this.attempts >= _this.allowedAttempts) {
                            _this.started = false;
                        } else {
                            setTimeout(function () {
                                _this.track(param);
                                _this.attempts++;
                            }, 2000);
                        }
                    })();
                }
            }
        }
    }]);

    return Analytics;
})();

exports['default'] = Analytics;
module.exports = exports['default'];

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _dataAbstractData = require('../data/AbstractData');

var _dataAbstractData2 = _interopRequireDefault(_dataAbstractData);

var _utilsFacebook = require('../utils/Facebook');

var _utilsFacebook2 = _interopRequireDefault(_utilsFacebook);

var _utilsGooglePlus = require('../utils/GooglePlus');

var _utilsGooglePlus2 = _interopRequireDefault(_utilsGooglePlus);

var AuthManager = (function (_AbstractData) {
	_inherits(AuthManager, _AbstractData);

	function AuthManager() {
		_classCallCheck(this, AuthManager);

		_get(Object.getPrototypeOf(AuthManager.prototype), 'constructor', this).call(this);

		this.userData = null;
		this.process = false;
		this.processTimer = null;
		this.processWait = 5000;
	}

	_createClass(AuthManager, [{
		key: 'login',
		value: function login(service) {
			var _this = this;

			var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

			// console.log("++++ PROCESS ", this.process);

			if (this.process) {
				return;
			}

			this.showLoader();
			this.process = true;

			var $dataDfd = $.Deferred();

			switch (service) {
				case 'google':
					_utilsGooglePlus2['default'].login($dataDfd);
					break;
				case 'facebook':
					_utilsFacebook2['default'].login($dataDfd);
					break;
			}

			$dataDfd.done(function (res) {
				_this.authSuccess.call(_this, service, res);
			});
			$dataDfd.fail(function (res) {
				_this.authFail.call(_this, service, res);
			});
			$dataDfd.always(function () {
				_this.authCallback.call(_this, cb);
			});

			/*
   Unfortunately no callback is fired if user manually closes G+ login modal,
   so this is to allow them to close window and then subsequently try to log in again...
   */
			this.processTimer = setTimeout(this.authCallback, this.processWait);

			return $dataDfd;
		}
	}, {
		key: 'authSuccess',
		value: function authSuccess(service, data) {}
	}, {
		key: 'authFail',
		value: function authFail(service, data) {}
	}, {
		key: 'authCallback',
		value: function authCallback() {
			var cb = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

			if (!this.process) {
				return;
			}

			clearTimeout(this.processTimer);

			this.hideLoader();
			this.process = false;

			if (cb && typeof cb === 'function') {
				cb();
			}
		}
	}, {
		key: 'showLoader',

		// show / hide some UI indicator that we are waiting for social network to respond
		value: function showLoader() {}
	}, {
		key: 'hideLoader',
		value: function hideLoader() {}
	}]);

	return AuthManager;
})(_dataAbstractData2['default']);

exports['default'] = AuthManager;
module.exports = exports['default'];

// this.process true during login process

// console.log "login callback for #{service}, data => ", data

// console.log "login fail for #{service} => ", data

// console.log "showLoader"

// console.log "hideLoader"

},{"../data/AbstractData":7,"../utils/Facebook":17,"../utils/GooglePlus":18}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _dataAbstractData = require('../data/AbstractData');

var _dataAbstractData2 = _interopRequireDefault(_dataAbstractData);

/*

Facebook SDK wrapper - load asynchronously, some helper methods

*/

var Facebook = (function (_AbstractData) {
	_inherits(Facebook, _AbstractData);

	function Facebook() {
		_classCallCheck(this, Facebook);

		_get(Object.getPrototypeOf(Facebook.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Facebook, null, [{
		key: 'load',
		value: function load() {

			$script(Facebook.url, Facebook.init);
		}
	}, {
		key: 'init',
		value: function init() {

			Facebook.loaded = true;

			FB.init({
				appId: window.config.fb_app_id,
				status: false,
				xfbml: false
			});
		}
	}, {
		key: 'login',
		value: function login($dataDfd) {

			Facebook.$dataDfd = $dataDfd;

			if (!Facebook.loaded) {
				return Facebook.$dataDfd.reject('SDK not loaded');
			}

			FB.login(function (res) {

				if (res['status'] === 'connected') {
					Facebook.getUserData(res['authResponse']['accessToken']);
				} else {
					Facebook.$dataDfd.reject('no way jose');
				}
			}, { scope: Facebook.permissions });
		}
	}, {
		key: 'getUserData',
		value: function getUserData(token) {

			var userData = {};
			userData.access_token = token;

			var $meDfd = $.Deferred();
			var $picDfd = $.Deferred();

			FB.api('/me', function (res) {

				userData.full_name = res.name;
				userData.social_id = res.id;
				userData.email = res.email || false;
				$meDfd.resolve();
			});

			FB.api('/me/picture', { 'width': '200' }, function (res) {

				userData.profile_pic = res.data.url;
				$picDfd.resolve();
			});

			$.when($meDfd, $picDfd).done(function () {

				Facebook.$dataDfd.resolve(userData);
			});
		}
	}, {
		key: 'share',
		value: function share(opts, cb) {

			FB.ui({
				method: opts.method || 'feed',
				name: opts.name || '',
				link: opts.link || '',
				picture: opts.picture || '',
				caption: opts.caption || '',
				description: opts.description || ''
			}, function (response) {
				if (cb && typeof cb === 'function') {
					cb(response);
				}
			});
		}
	}, {
		key: 'url',
		value: '//connect.facebook.net/en_US/all.js',
		enumerable: true
	}, {
		key: 'permissions',
		value: 'email',
		enumerable: true
	}, {
		key: '$dataDfd',
		value: null,
		enumerable: true
	}, {
		key: 'loaded',
		value: false,
		enumerable: true
	}]);

	return Facebook;
})(_dataAbstractData2['default']);

exports['default'] = Facebook;
module.exports = exports['default'];

},{"../data/AbstractData":7}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _dataAbstractData = require('../data/AbstractData');

var _dataAbstractData2 = _interopRequireDefault(_dataAbstractData);

/*

Google+ SDK wrapper - load asynchronously, some helper methods

*/

var GooglePlus = (function (_AbstractData) {
	_inherits(GooglePlus, _AbstractData);

	function GooglePlus() {
		_classCallCheck(this, GooglePlus);

		_get(Object.getPrototypeOf(GooglePlus.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(GooglePlus, null, [{
		key: 'load',
		value: function load() {

			$script(GooglePlus.url, GooglePlus.init);
		}
	}, {
		key: 'init',
		value: function init() {

			GooglePlus.loaded = true;

			GooglePlus.params['clientid'] = window.config.gp_app_id;
			GooglePlus.params['callback'] = GooglePlus.loginCallback.bind(this);
		}
	}, {
		key: 'login',
		value: function login($dataDfd) {

			GooglePlus.$dataDfd = $dataDfd;

			if (GooglePlus.loaded) {
				gapi.auth.signIn(GooglePlus.params);
			} else {
				GooglePlus.$dataDfd.reject('SDK not loaded');
			}
		}
	}, {
		key: 'loginCallback',
		value: function loginCallback(res) {

			if (res['status']['signed_in']) {
				GooglePlus.getUserData(res['access_token']);
			} else if (res['error']['access_denied']) {
				GooglePlus.$dataDfd.reject('no way jose');
			}
		}
	}, {
		key: 'getUserData',
		value: function getUserData(token) {

			gapi.client.load('plus', 'v1', function () {

				request = gapi.client.plus.people.get({ 'userId': 'me' });
				request.execute(function (res) {

					var userData = {
						access_token: token,
						full_name: res.displayName,
						social_id: res.id,
						email: res.emails[0] ? res.emails[0].value : false,
						profile_pic: res.image.url
					};

					GooglePlus.$dataDfd.resolve(userData);
				});
			});
		}
	}, {
		key: 'url',
		value: 'https://apis.google.com/js/client:plusone.js',
		enumerable: true
	}, {
		key: 'params',
		value: {
			'clientid': null,
			'callback': null,
			'scope': 'https://www.googleapis.com/auth/userinfo.email',
			'cookiepolicy': 'none'
		},
		enumerable: true
	}, {
		key: '$dataDfd',
		value: null,
		enumerable: true
	}, {
		key: 'loaded',
		value: false,
		enumerable: true
	}]);

	return GooglePlus;
})(_dataAbstractData2['default']);

exports['default'] = GooglePlus;
module.exports = exports['default'];

},{"../data/AbstractData":7}],19:[function(require,module,exports){
/*   ---------------------
 *   Media Queries Manager 
 *   ---------------------
 *   
 *   @author  : Fábio Azevedo <fabio.azevedo@unit9.com> UNIT9
 *   @date    : September 14
 *   @updated : July 2015 (port to es6)
 *   
 *   Instructions are in /project/sass/utils/_responsive.scss.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaQueries = (function () {
    function MediaQueries() {
        _classCallCheck(this, MediaQueries);
    }

    _createClass(MediaQueries, null, [{
        key: "setup",
        value: function setup() {

            MediaQueries.JS_EL = document.createElement("div");
            MediaQueries.JS_EL.className = MediaQueries.EL_CLASSNAME;
            document.body.appendChild(MediaQueries.JS_EL);

            MediaQueries.SMALL_BREAKPOINT = { name: "Small", breakpoints: [MediaQueries.SMALL] };
            MediaQueries.MEDIUM_BREAKPOINT = { name: "Medium", breakpoints: [MediaQueries.MEDIUM] };
            MediaQueries.LARGE_BREAKPOINT = { name: "Large", breakpoints: [MediaQueries.IPAD, MediaQueries.LARGE, MediaQueries.EXTRA_LARGE] };

            MediaQueries.BREAKPOINTS = [MediaQueries.SMALL_BREAKPOINT, MediaQueries.MEDIUM_BREAKPOINT, MediaQueries.LARGE_BREAKPOINT];
        }
    }, {
        key: "getDeviceState",
        value: function getDeviceState() {

            var re = /(\'|\")/;

            var value = window.getComputedStyle(MediaQueries.JS_EL).getPropertyValue("content");
            if (re.test(value.charAt(0)) && re.test(value.charAt(value.length - 1))) {
                value = value.substr(1, value.length - 2);
            }

            return value;
        }
    }, {
        key: "getBreakpoint",
        value: function getBreakpoint() {

            var state = MediaQueries.getDeviceState();
            var breakpoint = "";

            MediaQueries.BREAKPOINTS.forEach(function (point, i) {
                if (MediaQueries.BREAKPOINTS[i].breakpoints.indexOf(state) > -1) {
                    breakpoint = point.name;
                }
            });

            return breakpoint;
        }
    }, {
        key: "isBreakpoint",
        value: function isBreakpoint(breakpoint) {

            var breakpointMatch = false;

            breakpoint.breakpoints.forEach(function (point) {
                if (point == MediaQueries.getDeviceState()) breakpointMatch = true;
            });

            return breakpointMatch;
        }
    }, {
        key: "SMALL",

        // Breakpoints
        value: "small",
        enumerable: true
    }, {
        key: "IPAD",
        value: "ipad",
        enumerable: true
    }, {
        key: "MEDIUM",
        value: "medium",
        enumerable: true
    }, {
        key: "LARGE",
        value: "large",
        enumerable: true
    }, {
        key: "EXTRA_LARGE",
        value: "extra-large",
        enumerable: true
    }, {
        key: "JS_EL",
        value: null,
        enumerable: true
    }, {
        key: "EL_CLASSNAME",
        value: "js-mediaqueries",
        enumerable: true
    }]);

    return MediaQueries;
})();

exports["default"] = MediaQueries;

window.MediaQueries = MediaQueries;
module.exports = exports["default"];

},{}],20:[function(require,module,exports){
/*
Requester
- Wrapper for `$.ajax` calls
*/

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Requester = (function () {
    function Requester() {
        _classCallCheck(this, Requester);
    }

    _createClass(Requester, null, [{
        key: "request",
        value: function request(data) {
            /*
            `data = {`<br>
            `  url         : String`<br>
            `  type        : "POST/GET/PUT"`<br>
            `  data        : Object`<br>
            `  dataType    : jQuery dataType`<br>
            `  contentType : String`<br>
            `}`
            */

            var r = $.ajax({
                url: data.url,
                type: data.type ? data.type : "POST",
                data: data.data ? data.data : null,
                dataType: data.dataType ? data.dataType : "json",
                contentType: data.contentType ? data.contentType : "application/x-www-form-urlencoded; charset=UTF-8",
                processData: data.processData !== null && data.processData !== undefined ? data.processData : true

            });

            r.done(data.done);
            r.fail(data.fail);

            return r;
        }
    }, {
        key: "addImage",
        value: function addImage(data, done, fail) {
            /*
            ** Usage: <br>
            `data = canvass.toDataURL("image/jpeg").slice("data:image/jpeg;base64,".length)`<br>
            `Requester.addImage data, "zoetrope", @done, @fail`
            */

            Requester.request({
                url: "/api/images/",
                type: "POST",
                data: { image_base64: encodeURI(data) },
                done: done,
                fail: fail
            });
        }
    }, {
        key: "deleteImage",
        value: function deleteImage(id, done, fail) {

            Requester.request({
                url: "/api/images/" + id,
                type: "DELETE",
                done: done,
                fail: fail
            });
        }
    }, {
        key: "requests",
        value: [],
        enumerable: true
    }]);

    return Requester;
})();

exports["default"] = Requester;
module.exports = exports["default"];

},{}],21:[function(require,module,exports){
/*
Sharing class for non-SDK loaded social networks.
If SDK is loaded, and provides share methods, then use that class instead, eg. `Facebook.share` instead of `Share.facebook`
*/
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Share = (function () {
    function Share() {
        _classCallCheck(this, Share);

        this.url = null;

        this.url = this.__NAMESPACE__().BASE_PATH;
    }

    _createClass(Share, [{
        key: 'openWin',
        value: function openWin(url, w, h) {

            var left = screen.availWidth - w >> 1;
            var top = screen.availHeight - h >> 1;

            window.open(url, '', 'top=' + top + ',left=' + left + ',width=' + w + ',height=' + h + ',location=no,menubar=no');
        }
    }, {
        key: 'plus',
        value: function plus() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

            url = encodeURIComponent(url || this.url);

            this.openWin('https://plus.google.com/share?url=' + url, 650, 385);
        }
    }, {
        key: 'pinterest',
        value: function pinterest() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var media = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
            var descr = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

            url = encodeURIComponent(url || this.url);
            media = encodeURIComponent(media);
            descr = encodeURIComponent(descr);

            this.openWin('http://www.pinterest.com/pin/create/button/?url=' + url + '&media=' + media + '&description=' + descr, 735, 310);
        }
    }, {
        key: 'tumblr',
        value: function tumblr() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var media = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
            var descr = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

            url = encodeURIComponent(url || this.url);
            media = encodeURIComponent(media);
            descr = encodeURIComponent(descr);

            this.openWin('http://www.tumblr.com/share/photo?source=' + media + '&caption=' + descr + '&click_thru=' + url, 450, 430);
        }
    }, {
        key: 'facebook',
        value: function facebook() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var copy = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            url = encodeURIComponent(url || this.url);
            var decsr = encodeURIComponent(copy);

            this.openWin('http://www.facebook.com/share.php?u=' + url + '&t=' + decsr, 600, 300);
        }
    }, {
        key: 'twitter',
        value: function twitter() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var copy = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

            url = encodeURIComponent(url || this.url);
            if (copy === '') {
                copy = this.__NAMESPACE__().locale.get('seo_twitter_card_description');
            }
            var descr = encodeURIComponent(copy);

            this.openWin('http://twitter.com/intent/tweet/?text=' + descr + '&url=' + url, 600, 300);
        }
    }, {
        key: 'renren',
        value: function renren() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

            url = encodeURIComponent(url || this.url);

            this.openWin('http://share.renren.com/share/buttonshare.do?link=' + url, 600, 300);
        }
    }, {
        key: 'weibo',
        value: function weibo() {
            var url = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

            url = encodeURIComponent(url || this.url);

            this.openWin('http://service.weibo.com/share/share.php?url=' + url + '&language=zh_cn', 600, 300);
        }
    }, {
        key: '__NAMESPACE__',
        value: function __NAMESPACE__() {

            return window.__NAMESPACE__;
        }
    }]);

    return Share;
})();

exports['default'] = Share;
module.exports = exports['default'];

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var AbstractView = Backbone.View.extend({

	el: null,
	id: null,
	children: null,
	template: null,
	templateVars: null,

	initialize: function initialize() {

		this.children = [];

		if (this.template) {
			var tmpHTML = _.template(this.__NAMESPACE__().templates.get(this.template));

			this.setElement(tmpHTML(this.templateVars));
		}

		if (this.id) {
			this.$el.attr("id", this.id);
		}

		if (this.className) {
			this.$el.addClass(this.className);
		}

		this.init();

		this.paused = false;
	},

	init: function init() {},

	update: function update() {},

	render: function render() {},

	addChild: function addChild(child) {
		var prepend = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

		if (child.el) {
			this.children.push(child);
		}

		var target = this.addToSelector ? this.$el.find(this.addToSelector).eq(0) : this.$el;
		var c = child.el ? child.$el : child;

		if (!prepend) {
			target.append(c);
		} else {
			target.prepend(c);
		}

		return this;
	},

	replace: function replace(dom, child) {

		if (child.el) {
			this.children.push(child);
		}

		var c = child.el ? child.$el : child;

		this.$el.children(dom).replaceWith(c);
	},

	remove: function remove(child) {

		if (!child) {
			return;
		}

		var c = child.el ? child.$el : $(child);
		if (c && child.dispose) {
			child.dispose();
		}

		if (c && this.children.indexOf(child) != -1) {
			this.children.splice(this.children.indexOf(child), 1);
		}

		c.remove();
	},

	onResize: function onResize(event) {

		this.children.forEach(function (child) {
			if (child.onResize) {
				child.onResize();
			}
		});
	},

	mouseEnabled: function mouseEnabled(enabled) {

		this.$el.css({
			"pointer-events": enabled ? "auto" : "none"
		});
	},

	CSSTranslate: function CSSTranslate(x, y, value, scale) {
		if (value === undefined) value = "%";

		var str = undefined;

		if (Modernizr.csstransforms3d) {
			str = "translate3d(" + (x + value) + ", " + (y + value) + ", 0)";
		} else {
			str = "translate(" + (x + value) + ", " + (y + value) + ")";
		}

		if (scale) {
			str = str + " scale(" + scale + ")";
		}

		return str;
	},

	unMuteAll: function unMuteAll() {

		this.children.forEach(function (child) {

			if (child.unMute) {
				child.unMute();
			}

			if (child.children.length) {
				child.unMuteAll();
			}
		});
	},

	muteAll: function muteAll() {

		this.children.forEach(function (child) {

			if (child.mute) {
				child.mute();
			}

			if (child.children.length) {
				child.muteAll();
			}
		});
	},

	removeAllChildren: function removeAllChildren() {
		var _this = this;

		this.children.forEach(function (child) {
			_this.remove(child);
		});
	},

	triggerChildren: function triggerChildren(msg, children) {
		var _this2 = this;

		children = children || this.children;

		children.forEach(function (child, i) {

			child.trigger(msg);

			if (child.children.length) {
				_this2.triggerChildren(msg, child.children);
			}
		});
	},

	callChildren: function callChildren(method, params, children) {
		var _this3 = this;

		children = children || this.children;

		children.forEach(function (child, i) {

			if (child[method]) {
				child[method](params);
			}

			if (child.children.length) {
				_this3.callChildren(method, params, child.children);
			}
		});
	},

	callChildrenAndSelf: function callChildrenAndSelf(method, params, children) {

		children = children || this.children;

		if (this[method]) {
			this[method](params);
		}

		this.callChildren(method, params, children);
	},

	supplantString: function supplantString(str, vals) {

		return str.replace(/{{ ([^{}]*) }}/g, function (a, b) {
			var r = vals[b];
			if (typeof r === "string" || typeof r === "number") {
				return r;
			} else {
				return a;
			}
		});
	},

	dispose: function dispose() {},

	__NAMESPACE__: function __NAMESPACE__() {

		return window.__NAMESPACE__;
	}

});

exports["default"] = AbstractView;
module.exports = exports["default"];

/*
override on per view basis - unbind event handlers etc
*/

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AbstractView = require('./AbstractView');

var _AbstractView2 = _interopRequireDefault(_AbstractView);

var AbstractViewPage = _AbstractView2['default'].extend({

	_shown: false,
	_listening: false,

	show: function show(cb) {

		if (this._shown) {
			return;
		}
		this._shown = true;

		/*
  CHANGE HERE - 'page' views are always in DOM - to save having to re-initialise gmap events (PITA). No longer require :dispose method
  */
		this.__NAMESPACE__().appView.wrapper.addChild(this);
		this.callChildrenAndSelf('setListeners', 'on');

		// replace with some proper transition if we can
		this.$el.css({ 'visibility': 'visible' });

		if (cb && typeof cb === 'function') {
			cb();
		}
	},

	hide: function hide(cb) {

		if (!this._shown) {
			return;
		}
		this._shown = false;

		/*
  CHANGE HERE - 'page' views are always in DOM - to save having to re-initialise gmap events (PITA). No longer require :dispose method
  */
		this.__NAMESPACE__().appView.wrapper.remove(this);

		// this.callChildrenAndSelf 'setListeners', 'off'

		// replace with some proper transition if we can
		this.$el.css({ 'visibility': 'hidden' });

		if (cb && typeof cb === 'function') {
			cb();
		}
	},

	dispose: function dispose() {

		this.callChildrenAndSelf('setListeners', 'off');
	},

	setListeners: function setListeners(setting) {

		if (setting === this._listening) {
			return;
		}

		this._listening = setting;
	}

});

exports['default'] = AbstractViewPage;
module.exports = exports['default'];

},{"./AbstractView":22}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AbstractView = require('../AbstractView');

var _AbstractView2 = _interopRequireDefault(_AbstractView);

var Footer = _AbstractView2['default'].extend({

	template: 'site-footer',

	constructor: function constructor() {

		this.templateVars = {
			desc: this.__NAMESPACE__().locale.get('footer_desc')
		};

		Footer.__super__.constructor.apply(this);
	}

});

exports['default'] = Footer;
module.exports = exports['default'];

},{"../AbstractView":22}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AbstractView = require('../AbstractView');

var _AbstractView2 = _interopRequireDefault(_AbstractView);

var Header = _AbstractView2['default'].extend({

	template: 'site-header',

	constructor: function constructor() {

		this.templateVars = {
			desc: this.__NAMESPACE__().locale.get('header_desc'),
			home: {
				label: 'Go to homepage',
				url: this.__NAMESPACE__().BASE_PATH + '/' + this.__NAMESPACE__().nav.sections.HOME
			},
			example: {
				label: 'Go to example page',
				url: this.__NAMESPACE__().BASE_PATH + '/' + this.__NAMESPACE__().nav.sections.EXAMPLE
			}
		};

		Header.__super__.constructor.apply(this);
	}

});

exports['default'] = Header;
module.exports = exports['default'];

},{"../AbstractView":22}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AbstractView = require('../AbstractView');

var _AbstractView2 = _interopRequireDefault(_AbstractView);

var Preloader = _AbstractView2['default'].extend({

	cb: null,

	TRANSITION_TIME: 0.5,

	constructor: function constructor() {

		Preloader.__super__.constructor.apply(this);

		this.setElement($('#preloader'));
	},

	init: function init() {},

	show: function show(cb) {

		this.cb = cb;

		this.$el.css({ 'display': 'block' });
	},

	onShowComplete: function onShowComplete() {

		if (this.cb && typeof this.cb === 'function') {
			this.cb();
		}
	},

	hide: function hide(cb) {

		this.cb = cb;

		this.onHideComplete();
	},

	onHideComplete: function onHideComplete() {

		this.$el.css({ 'display': 'none' });

		if (this.cb && typeof this.cb === 'function') {
			this.cb();
		}
	}

});

exports['default'] = Preloader;
module.exports = exports['default'];

},{"../AbstractView":22}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AbstractView = require('../AbstractView');

var _AbstractView2 = _interopRequireDefault(_AbstractView);

var _homeHomeView = require('../home/HomeView');

var _homeHomeView2 = _interopRequireDefault(_homeHomeView);

var _examplePageExamplePageView = require('../examplePage/ExamplePageView');

var _examplePageExamplePageView2 = _interopRequireDefault(_examplePageExamplePageView);

var _routerNav = require('../../router/Nav');

var _routerNav2 = _interopRequireDefault(_routerNav);

var Wrapper = _AbstractView2['default'].extend({

	VIEW_TYPE_PAGE: 'page',
	VIEW_TYPE_MODAL: 'modal',

	template: 'wrapper',

	views: null,
	previousView: null,
	currentView: null,
	backgroundView: null,

	constructor: function constructor() {

		this.views = {
			home: {
				classRef: _homeHomeView2['default'],
				route: this.__NAMESPACE__().nav.sections.HOME,
				view: null,
				type: this.VIEW_TYPE_PAGE
			},
			example: {
				classRef: _examplePageExamplePageView2['default'],
				route: this.__NAMESPACE__().nav.sections.EXAMPLE,
				view: null,
				type: this.VIEW_TYPE_PAGE
			}
		};

		this.createClasses();

		Wrapper.__super__.constructor.apply(this);

		// decide if you want to add all core DOM up front, or add only when required, see comments in AbstractViewPage.coffee
		// @addClasses()
	},

	createClasses: function createClasses() {

		for (var key in this.views) {

			this.views[key].view = new this.views[key].classRef();
		}
	},

	addClasses: function addClasses() {

		for (var key in this.views) {

			if (this.views[key].type === this.VIEW_TYPE_PAGE) {
				this.addChild(this.views[key].view);
			}
		}
	},

	getViewByRoute: function getViewByRoute(route) {

		var view = false;

		for (var key in this.views) {

			if (this.views[key].route === route) {
				view = this.views[key];
			}
		}

		return view;
	},

	init: function init() {

		this.__NAMESPACE__().appView.on('start', this.start.bind(this));
	},

	start: function start() {

		this.__NAMESPACE__().appView.off('start', this.start.bind(this));

		this.bindEvents();
	},

	bindEvents: function bindEvents() {

		this.__NAMESPACE__().nav.on(_routerNav2['default'].EVENT_CHANGE_VIEW, this.changeView.bind(this));
		this.__NAMESPACE__().nav.on(_routerNav2['default'].EVENT_CHANGE_SUB_VIEW, this.changeSubView.bind(this));
	},

	/*
 	THIS IS A MESS, SORT IT (neil)
 	*/
	changeView: function changeView(previous, current) {

		console.log('changeView: function(previous, current) {', previous, current);

		this.previousView = this.getViewByRoute(previous.area);
		this.currentView = this.getViewByRoute(current.area);

		console.log('this.previousView', this.previousView);
		console.log('this.currentView', this.currentView);

		if (!this.previousView) {

			if (this.currentView.type === this.VIEW_TYPE_PAGE) {
				this.transitionViews(false, this.currentView.view);
			} else if (this.currentView.type === this.VIEW_TYPE_MODAL) {
				this.backgroundView = this.views.home;
				this.transitionViews(false, this.currentView.view, true);
			}
		} else {

			if (this.currentView.type === this.VIEW_TYPE_PAGE && this.previousView.type === this.VIEW_TYPE_PAGE) {
				this.transitionViews(this.previousView.view, this.currentView.view);
			} else if (this.currentView.type === this.VIEW_TYPE_MODAL && this.previousView.type === this.VIEW_TYPE_PAGE) {
				this.backgroundView = this.previousView;
				this.transitionViews(false, this.currentView.view, true);
			} else if (this.currentView.type === this.VIEW_TYPE_PAGE && this.previousView.type === this.VIEW_TYPE_MODAL) {
				this.backgroundView = this.backgroundView || this.views.home;
				if (this.backgroundView !== this.currentView) {
					this.transitionViews(this.previousView.view, this.currentView.view, false, true);
				} else if (this.backgroundView === this.currentView) {
					this.transitionViews(this.previousView.view, false);
				}
			} else if (this.currentView.type === this.VIEW_TYPE_MODAL && this.previousView.type === this.VIEW_TYPE_MODAL) {
				this.backgroundView = this.backgroundView || this.views.home;
				this.transitionViews(this.previousView.view, this.currentView.view, true);
			}
		}
	},

	changeSubView: function changeSubView(current) {

		this.currentView.view.trigger(_routerNav2['default'].EVENT_CHANGE_SUB_VIEW, current.sub);
	},

	transitionViews: function transitionViews(from, to) {
		var toModal = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
		var fromModal = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

		console.log('transitionViews: function(from, to, toModal=false, fromModal=false) {', from, to);

		if (from === to) {
			return;
		}

		if (toModal && this.backgroundView.view) {
			this.backgroundView.view.show();
		}

		if (fromModal && this.backgroundView.view) {
			this.backgroundView.view.hide();
		}

		if (from && to) {
			from.hide(to.show.bind(to));
		} else if (from) {
			from.hide();
		} else if (to) {
			to.show();
		}
	}

});

exports['default'] = Wrapper;
module.exports = exports['default'];

},{"../../router/Nav":13,"../AbstractView":22,"../examplePage/ExamplePageView":28,"../home/HomeView":29}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AbstractViewPage = require('../AbstractViewPage');

var _AbstractViewPage2 = _interopRequireDefault(_AbstractViewPage);

var ExamplePageView = _AbstractViewPage2['default'].extend({

	template: 'page-example',

	constructor: function constructor() {

		this.templateVars = {
			desc: this.__NAMESPACE__().locale.get('example_desc')
		};

		/*
  	instantiate classes here
  	this.exampleClass = new ExampleClass();
  	*/

		ExamplePageView.__super__.constructor.apply(this);

		/*
  	add classes to app structure here
  	this
  	.addChild(this.exampleClass);
  	*/
	}

});

exports['default'] = ExamplePageView;
module.exports = exports['default'];

},{"../AbstractViewPage":23}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AbstractViewPage = require('../AbstractViewPage');

var _AbstractViewPage2 = _interopRequireDefault(_AbstractViewPage);

var HomeView = _AbstractViewPage2['default'].extend({

	template: 'page-home',

	constructor: function constructor() {

		this.templateVars = {
			desc: this.__NAMESPACE__().locale.get('home_desc')
		};

		/*
  	instantiate classes here
  	this.exampleClass = new ExampleClass();
  	*/

		HomeView.__super__.constructor.apply(this);

		/*
  	add classes to app structure here
  	this
  	.addChild(this.exampleClass);
  	*/
	}

});

exports['default'] = HomeView;
module.exports = exports['default'];

},{"../AbstractViewPage":23}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AbstractView = require('../AbstractView');

var _AbstractView2 = _interopRequireDefault(_AbstractView);

var AbstractModal = _AbstractView2['default'].extend({

	$window: null,

	// override in individual classes
	name: null,
	template: null,

	constructor: function constructor() {

		this.$window = $(window);

		AbstractModal.__super__.constructor.apply(this);

		this.__NAMESPACE__().appView.addChild(this);
		this.setListeners('on');
		this.animateIn();
	},

	hide: function hide() {
		var _this = this;

		this.animateOut(function () {
			_this.__NAMESPACE__().appView.remove(_this);
		});
	},

	dispose: function dispose() {

		this.setListeners('off');
		this.__NAMESPACE__().appView.modalManager.modals[this.name].view = null;
	},

	setListeners: function setListeners(setting) {

		this.$window[setting]('keyup', this.onKeyUp.bind(this));
		this.$('[data-close]')[setting]('click', this.closeClick.bind(this));
	},

	onKeyUp: function onKeyUp(e) {

		if (e.keyCode === 27) this.hide();
	},

	animateIn: function animateIn() {

		TweenLite.to(this.$el, 0.3, { 'visibility': 'visible', 'opacity': 1, ease: Quad.easeOut });
		TweenLite.to(this.$el.find('.inner'), 0.3, { delay: 0.15, 'transform': 'scale(1)', 'visibility': 'visible', 'opacity': 1, ease: Back.easeOut });
	},

	animateOut: function animateOut(callback) {

		TweenLite.to(this.$el, 0.3, { delay: 0.15, 'opacity': 0, ease: Quad.easeOut, onComplete: callback });
		TweenLite.to(this.$el.find('.inner'), 0.3, { 'transform': 'scale(0.8)', 'opacity': 0, ease: Back.easeIn });
	},

	closeClick: function closeClick(e) {

		e.preventDefault();

		this.hide();
	}

});

exports['default'] = AbstractModal;
module.exports = exports['default'];

},{"../AbstractView":22}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AbstractModal = require('./AbstractModal');

var _AbstractModal2 = _interopRequireDefault(_AbstractModal);

var OrientationModal = _AbstractModal2['default'].extend({

	name: 'orientationModal',
	template: 'orientation-modal',

	cb: null,

	constructor: function constructor(cb) {

		this.cb = cb;

		this.templateVars = { name: this.name };

		OrientationModal.__super__.constructor.apply(this);
	},

	init: function init() {},

	hide: function hide() {
		var _this = this;

		var stillLandscape = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

		this.animateOut(function () {
			_this.__NAMESPACE__().appView.remove(_this);
			if (!stillLandscape && cb && typeof cb === 'function') {
				cb();
			}
		});
	},

	setListeners: function setListeners(setting) {

		OrientationModal.__super__.setListeners.apply(this, [setting]);

		this.__NAMESPACE__().appView[setting]('updateDims', this.onUpdateDims.bind(this));
		this.$el[setting]('touchend click', this.hide.bind(this));
	},

	onUpdateDims: function onUpdateDims(dims) {

		if (dims.o === 'portrait') {
			this.hide(false);
		}
	}

});

exports['default'] = OrientationModal;
module.exports = exports['default'];

},{"./AbstractModal":30}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AbstractView = require('../AbstractView');

var _AbstractView2 = _interopRequireDefault(_AbstractView);

var _OrientationModal = require('./OrientationModal');

var _OrientationModal2 = _interopRequireDefault(_OrientationModal);

var ModalManager = _AbstractView2['default'].extend({

	// when new modal classes are created, add here, with reference to class name
	modals: {
		orientationModal: { classRef: _OrientationModal2['default'], view: null }
	},

	constructor: function constructor() {

		ModalManager.__super__.constructor.apply(this);
	},

	init: function init() {},

	isOpen: function isOpen() {

		var modalIsOpen = false;

		for (var key in this.modals) {

			if (this.modals[key].view) {
				modalIsOpen = true;
			}
		}

		return modalIsOpen;
	},

	hideOpenModal: function hideOpenModal() {

		var openModal = null;

		for (var key in this.modals) {

			if (this.modals[key].view) {
				openModal = this.modals[key].view;
			}
		}

		if (openModal) {
			openModal.hide();
		}
	},

	showModal: function showModal(name) {
		var cb = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

		if (this.modals[name].view) {
			return;
		}

		this.modals[name].view = new this.modals[name].classRef(cb);
	}

});

exports['default'] = ModalManager;
module.exports = exports['default'];

},{"../AbstractView":22,"./OrientationModal":31}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvU291cmNlLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL0FwcC5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy9BcHBEYXRhLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL0FwcFZpZXcuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvY29sbGVjdGlvbnMvY29yZS9UZW1wbGF0ZXNDb2xsZWN0aW9uLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL2RhdGEvQVBJLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL2RhdGEvQWJzdHJhY3REYXRhLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL2RhdGEvTG9jYWxlLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL2RhdGEvVGVtcGxhdGVzLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL21vZGVscy9jb3JlL0FQSVJvdXRlTW9kZWwuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvbW9kZWxzL2NvcmUvTG9jYWxlc01vZGVsLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL21vZGVscy9jb3JlL1RlbXBsYXRlTW9kZWwuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvcm91dGVyL05hdi5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy9yb3V0ZXIvUm91dGVyLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3V0aWxzL0FuYWx5dGljcy5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy91dGlscy9BdXRoTWFuYWdlci5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy91dGlscy9GYWNlYm9vay5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy91dGlscy9Hb29nbGVQbHVzLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3V0aWxzL01lZGlhUXVlcmllcy5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy91dGlscy9SZXF1ZXN0ZXIuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvdXRpbHMvU2hhcmUuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvdmlldy9BYnN0cmFjdFZpZXcuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvdmlldy9BYnN0cmFjdFZpZXdQYWdlLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3ZpZXcvYmFzZS9Gb290ZXIuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvdmlldy9iYXNlL0hlYWRlci5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy92aWV3L2Jhc2UvUHJlbG9hZGVyLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3ZpZXcvYmFzZS9XcmFwcGVyLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3ZpZXcvZXhhbXBsZVBhZ2UvRXhhbXBsZVBhZ2VWaWV3LmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3ZpZXcvaG9tZS9Ib21lVmlldy5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy92aWV3L21vZGFscy9BYnN0cmFjdE1vZGFsLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3ZpZXcvbW9kYWxzL09yaWVudGF0aW9uTW9kYWwuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvdmlldy9tb2RhbHMvX01vZGFsTWFuYWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7bUJDQWdCLE9BQU87Ozs7QUFFdkIsTUFBTSxDQUFDLGFBQWEsR0FBRyxzQkFBUyxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs4QkNITixtQkFBbUI7Ozs7Z0NBQ2pCLHFCQUFxQjs7OzswQkFDM0IsZUFBZTs7Ozs2QkFDWixrQkFBa0I7Ozs7K0JBQ2hCLG9CQUFvQjs7Ozs2QkFDckIsa0JBQWtCOzs7OzBCQUNyQixlQUFlOzs7OzRCQUNmLGlCQUFpQjs7Ozt5QkFDcEIsY0FBYzs7Ozt1QkFDVixXQUFXOzs7O3VCQUNYLFdBQVc7Ozs7aUNBQ04sc0JBQXNCOzs7O0lBRXpDLEdBQUc7aUJBQUgsR0FBRzs7ZUFFYSxDQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDOzs7O0FBTWxJLGFBUlQsR0FBRyxHQVFTOzhCQVJaLEdBQUc7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QyxDQUFDLElBQUksRUFBRTtBQUMxQixlQUFXLEdBQUcsSUFBSSxDQUFDO0lBQ25CO0dBRUQ7O0FBRUQsU0FBTyxXQUFXLENBQUM7RUFFbkI7O0FBRUQsY0FBYSxFQUFFLHlCQUFXOztBQUV6QixNQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7O0FBRXJCLE9BQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTs7QUFFNUIsT0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRTtBQUMxQixhQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDbEM7R0FFRDs7QUFFRCxNQUFJLFNBQVMsRUFBRTtBQUNkLFlBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztHQUNqQjtFQUVEOztBQUVELFVBQVMsRUFBRSxtQkFBUyxJQUFJLEVBQVc7TUFBVCxFQUFFLHlEQUFDLElBQUk7O0FBRWhDLE1BQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUU7QUFDM0IsVUFBTztHQUNQOztBQUVELE1BQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7RUFFNUQ7O0NBRUQsQ0FBQyxDQUFDOztxQkFFWSxZQUFZIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xuXG53aW5kb3cuX19OQU1FU1BBQ0VfXyA9IG5ldyBBcHAoKTtcbndpbmRvdy5fX05BTUVTUEFDRV9fLmluaXQoKTtcbiIsImltcG9ydCBBbmFseXRpY3MgZnJvbSAnLi91dGlscy9BbmFseXRpY3MnO1xuaW1wb3J0IEF1dGhNYW5hZ2VyIGZyb20gJy4vdXRpbHMvQXV0aE1hbmFnZXInO1xuaW1wb3J0IFNoYXJlIGZyb20gJy4vdXRpbHMvU2hhcmUnO1xuaW1wb3J0IEZhY2Vib29rIGZyb20gJy4vdXRpbHMvRmFjZWJvb2snO1xuaW1wb3J0IEdvb2dsZVBsdXMgZnJvbSAnLi91dGlscy9Hb29nbGVQbHVzJztcbmltcG9ydCBUZW1wbGF0ZXMgZnJvbSAnLi9kYXRhL1RlbXBsYXRlcyc7XG5pbXBvcnQgTG9jYWxlIGZyb20gJy4vZGF0YS9Mb2NhbGUnO1xuaW1wb3J0IFJvdXRlciBmcm9tICcuL3JvdXRlci9Sb3V0ZXInO1xuaW1wb3J0IE5hdiBmcm9tICcuL3JvdXRlci9OYXYnO1xuaW1wb3J0IEFwcERhdGEgZnJvbSAnLi9BcHBEYXRhJztcbmltcG9ydCBBcHBWaWV3IGZyb20gJy4vQXBwVmlldyc7XG5pbXBvcnQgTWVkaWFRdWVyaWVzIGZyb20gJy4vdXRpbHMvTWVkaWFRdWVyaWVzJztcblxuY2xhc3MgQXBwIHtcblxuICAgIHN0YXRpYyBfdG9DbGVhbiA9IFsnZGVwZWRlbmN5RGZkcycsICdzZXRGbGFncycsICdvYmplY3RDb21wbGV0ZScsICdpbml0JywgJ2luaXRPYmplY3RzJywgJ2luaXRPYmplY3QnLCdpbml0U0RLcycsICdpbml0QXBwJywgJ2dvJywgJ2NsZWFudXAnXTtcblxuICAgIEJBU0VfUEFUSCAgICAgPSB3aW5kb3cuY29uZmlnLmhvc3RuYW1lO1xuICAgIGxvY2FsZUNvZGUgICAgPSB3aW5kb3cuY29uZmlnLmxvY2FsZUNvZGU7XG4gICAgZGVwZWRlbmN5RGZkcyA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgc2V0RmxhZ3MoKSB7XG4gICAgICAgIGNvbnN0IHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBNZWRpYVF1ZXJpZXMuc2V0dXAoKTtcblxuICAgICAgICB0aGlzLklTX0FORFJPSUQgICAgPSB1YS5pbmRleE9mKCdhbmRyb2lkJykgPiAtMTtcbiAgICAgICAgdGhpcy5JU19GSVJFRk9YICAgID0gdWEuaW5kZXhPZignZmlyZWZveCcpID4gLTE7XG4gICAgICAgIHRoaXMuSVNfQ0hST01FX0lPUyA9IHVhLm1hdGNoKCdjcmlvcycpID8gdHJ1ZSA6IGZhbHNlOyAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMzgwODA1M1xuICAgIH1cblxuICAgIGRlcGVkZW5jeUxvYWRlZChkZmQpIHtcbiAgICAgICAgZGZkLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmluaXRPYmplY3RzKCk7XG4gICAgfVxuXG4gICAgaW5pdE9iamVjdHMoKSB7XG4gICAgICAgIHRoaXMuaW5pdE9iamVjdCgndGVtcGxhdGVzJywgVGVtcGxhdGVzLCBcIi9kYXRhL3RlbXBsYXRlcy54bWxcIik7XG4gICAgICAgIHRoaXMuaW5pdE9iamVjdCgnbG9jYWxlJywgTG9jYWxlLCBcIi9kYXRhL2xvY2FsZXMvc3RyaW5ncy5qc29uXCIpO1xuICAgICAgICB0aGlzLmluaXRPYmplY3QoJ2FuYWx5dGljcycsIEFuYWx5dGljcywgXCIvZGF0YS90cmFja2luZy5qc29uXCIpO1xuICAgICAgICB0aGlzLmluaXRPYmplY3QoJ2FwcERhdGEnLCBBcHBEYXRhKTtcblxuICAgICAgICAkLndoZW4uYXBwbHkoJCwgdGhpcy5kZXBlZGVuY3lEZmRzKS5kb25lKHRoaXMuaW5pdEFwcC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBpbml0T2JqZWN0KGNsYXNzUHJvcCwgQ2xhc3NSZWYsIHJlbW90ZURlcD1udWxsKSB7XG4gICAgICAgIGNvbnN0IGRmZCA9ICQuRGVmZXJyZWQoKTtcbiAgICAgICAgdGhpcy5kZXBlZGVuY3lEZmRzLnB1c2goZGZkKTtcblxuICAgICAgICB0aGlzW2NsYXNzUHJvcF0gPSBuZXcgQ2xhc3NSZWYocmVtb3RlRGVwLCB0aGlzLmRlcGVkZW5jeUxvYWRlZC5iaW5kKHRoaXMsIGRmZCkpO1xuICAgIH1cblxuICAgIGluaXRTREtzKCkge1xuICAgICAgICBGYWNlYm9vay5sb2FkKCk7XG4gICAgICAgIEdvb2dsZVBsdXMubG9hZCgpO1xuICAgIH1cblxuICAgIGluaXRBcHAoKSB7XG4gICAgICAgIHRoaXMuc2V0RmxhZ3MoKTtcblxuICAgICAgICB0aGlzLmFwcFZpZXcgPSBuZXcgQXBwVmlldygpO1xuICAgICAgICB0aGlzLnJvdXRlciAgPSBuZXcgUm91dGVyKCk7XG4gICAgICAgIHRoaXMubmF2ICAgICA9IG5ldyBOYXYoKTtcbiAgICAgICAgdGhpcy5hdXRoICAgID0gbmV3IEF1dGhNYW5hZ2VyKCk7XG4gICAgICAgIHRoaXMuc2hhcmUgICA9IG5ldyBTaGFyZSgpO1xuXG4gICAgICAgIHRoaXMuZ28oKTtcblxuICAgICAgICB0aGlzLmluaXRTREtzKCk7XG4gICAgfVxuXG4gICAgZ28oKSB7XG4gICAgICAgIC8vIEFmdGVyIGV2ZXJ5dGhpbmcgaXMgbG9hZGVkLCBraWNrcyBvZmYgd2Vic2l0ZVxuICAgICAgICB0aGlzLmFwcFZpZXcucmVuZGVyKCk7XG5cbiAgICAgICAgLy8gcmVtb3ZlIHJlZHVuZGFudCBpbml0aWFsaXNhdGlvbiBtZXRob2RzIC8gcHJvcGVydGllc1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICB9XG5cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICBBcHAuX3RvQ2xlYW4uZm9yRWFjaCggKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXNbaXRlbV0gPSBudWxsO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXNbaXRlbV07XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iLCJpbXBvcnQgQWJzdHJhY3REYXRhIGZyb20gJy4vZGF0YS9BYnN0cmFjdERhdGEnO1xuaW1wb3J0IFJlcXVlc3RlciBmcm9tICcuL3V0aWxzL1JlcXVlc3Rlcic7XG5pbXBvcnQgQVBJIGZyb20gJy4vZGF0YS9BUEknO1xuXG5jbGFzcyBBcHBEYXRhIGV4dGVuZHMgQWJzdHJhY3REYXRhIHtcblxuICAgIGNhbGxiYWNrID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHJlbW90ZURlcD1udWxsLCBjYWxsYmFjaykge1xuXG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLypcblxuICAgICAgICBhZGQgYWxsIGRhdGEgY2xhc3NlcyBoZXJlXG5cbiAgICAgICAgKi9cblxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICAgICAgdGhpcy5nZXRTdGFydERhdGEoKTtcblxuICAgIH1cblxuICAgIC8vIGdldCBhcHAgYm9vdHN0cmFwIGRhdGEgLSBlbWJlZCBpbiBIVE1MIG9yIEFQSSBlbmRwb2ludFxuICAgIGdldFN0YXJ0RGF0YSgpIHtcblxuICAgICAgICBpZiAoQVBJLmdldCgnc3RhcnQnKSkge1xuXG4gICAgICAgICAgICBjb25zdCByID0gUmVxdWVzdGVyLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgIHVybCAgOiBBUEkuZ2V0KCdzdGFydCcpLFxuICAgICAgICAgICAgICAgIHR5cGUgOiAnR0VUJ1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHIuZG9uZSh0aGlzLm9uU3RhcnREYXRhUmVjZWl2ZWQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICByLmZhaWwoICgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IgXCJlcnJvciBsb2FkaW5nIGFwaSBzdGFydCBkYXRhXCJcblxuICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgdGhpcyBpcyBvbmx5IHRlbXBvcmFyeSwgd2hpbGUgdGhlcmUgaXMgbm8gYm9vdHN0cmFwIGRhdGEgaGVyZSwgbm9ybWFsbHkgd291bGQgaGFuZGxlIGVycm9yIC8gZmFpbFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2sgJiYgdHlwZW9mKHRoaXMuY2FsbGJhY2spID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrICYmIHR5cGVvZih0aGlzLmNhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBvblN0YXJ0RGF0YVJlY2VpdmVkKGRhdGEpIHtcblxuICAgICAgICAvKlxuXG4gICAgICAgIGJvb3RzdHJhcCBkYXRhIHJlY2VpdmVkLCBhcHAgcmVhZHkgdG8gZ29cblxuICAgICAgICAqL1xuXG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrICYmIHR5cGVvZih0aGlzLmNhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwRGF0YTtcbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi92aWV3L0Fic3RyYWN0Vmlldyc7XG5pbXBvcnQgUHJlbG9hZGVyIGZyb20gJy4vdmlldy9iYXNlL1ByZWxvYWRlcic7XG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vdmlldy9iYXNlL0hlYWRlcic7XG5pbXBvcnQgV3JhcHBlciBmcm9tICcuL3ZpZXcvYmFzZS9XcmFwcGVyJztcbmltcG9ydCBGb290ZXIgZnJvbSAnLi92aWV3L2Jhc2UvRm9vdGVyJztcbmltcG9ydCBNb2RhbE1hbmFnZXIgZnJvbSAnLi92aWV3L21vZGFscy9fTW9kYWxNYW5hZ2VyJztcbmltcG9ydCBNZWRpYVF1ZXJpZXMgZnJvbSAnLi91dGlscy9NZWRpYVF1ZXJpZXMnO1xuXG5jb25zdCBBcHBWaWV3ID0gQWJzdHJhY3RWaWV3LmV4dGVuZCh7XG5cbiAgICB0ZW1wbGF0ZSA6ICdtYWluJyxcblxuICAgICR3aW5kb3cgIDogbnVsbCxcbiAgICAkYm9keSAgICA6IG51bGwsXG5cbiAgICB3cmFwcGVyICA6IG51bGwsXG4gICAgZm9vdGVyICAgOiBudWxsLFxuXG4gICAgZGltcyA6IHtcbiAgICAgICAgdyA6IG51bGwsXG4gICAgICAgIGggOiBudWxsLFxuICAgICAgICBvIDogbnVsbCxcbiAgICAgICAgYyA6IG51bGxcbiAgICB9LFxuXG4gICAgZXZlbnRzIDoge1xuICAgICAgICAnY2xpY2sgYScgOiAnbGlua01hbmFnZXInXG4gICAgfSxcblxuICAgIEVWRU5UX1VQREFURV9ESU1FTlNJT05TIDogJ0VWRU5UX1VQREFURV9ESU1FTlNJT05TJyxcblxuICAgIE1PQklMRV9XSURUSCA6IDcwMCxcbiAgICBNT0JJTEUgICAgICAgOiAnbW9iaWxlJyxcbiAgICBOT05fTU9CSUxFICAgOiAnbm9uX21vYmlsZScsXG5cbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgQXBwVmlldy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyk7XG5cbiAgICAgICAgdGhpcy4kd2luZG93ID0gJCh3aW5kb3cpO1xuICAgICAgICB0aGlzLiRib2R5ICAgPSAkKCdib2R5JykuZXEoMCk7XG5cbiAgICB9LFxuXG4gICAgZGlzYWJsZVRvdWNoOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLiR3aW5kb3cub24oJ3RvdWNobW92ZScsIHRoaXMub25Ub3VjaE1vdmUuYmluZCh0aGlzKSk7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBlbmFibGVUb3VjaDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy4kd2luZG93Lm9mZigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIG9uVG91Y2hNb3ZlOiBmdW5jdGlvbiggZSApIHtcblxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgICAgIHRoaXMucHJlbG9hZGVyICAgID0gbmV3IFByZWxvYWRlcigpO1xuICAgICAgICB0aGlzLm1vZGFsTWFuYWdlciA9IG5ldyBNb2RhbE1hbmFnZXIoKTtcblxuICAgICAgICB0aGlzLmhlYWRlciAgPSBuZXcgSGVhZGVyKCk7XG4gICAgICAgIHRoaXMud3JhcHBlciA9IG5ldyBXcmFwcGVyKCk7XG4gICAgICAgIHRoaXMuZm9vdGVyICA9IG5ldyBGb290ZXIoKTtcblxuICAgICAgICB0aGlzXG4gICAgICAgICAgICAuYWRkQ2hpbGQodGhpcy5oZWFkZXIpXG4gICAgICAgICAgICAuYWRkQ2hpbGQodGhpcy53cmFwcGVyKVxuICAgICAgICAgICAgLmFkZENoaWxkKHRoaXMuZm9vdGVyKTtcblxuICAgICAgICB0aGlzLm9uQWxsUmVuZGVyZWQoKTtcblxuICAgIH0sXG5cbiAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLm9uUmVzaXplKCk7XG5cbiAgICAgICAgdGhpcy5vblJlc2l6ZSA9IF8uZGVib3VuY2UodGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpLCAzMDApO1xuICAgICAgICB0aGlzLiR3aW5kb3cub24oJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMub25SZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICB9LFxuXG4gICAgb25BbGxSZW5kZXJlZDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJvbkFsbFJlbmRlcmVkIDogPT5cIik7XG5cbiAgICAgICAgdGhpcy4kYm9keS5wcmVwZW5kKHRoaXMuJGVsKTtcblxuICAgICAgICB0aGlzLmJlZ2luKCk7XG4gICAgfSxcblxuICAgIGJlZ2luOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLnRyaWdnZXIoJ3N0YXJ0Jyk7XG5cbiAgICAgICAgdGhpcy5fX05BTUVTUEFDRV9fKCkucm91dGVyLnN0YXJ0KCk7XG5cbiAgICAgICAgdGhpcy5wcmVsb2FkZXIuaGlkZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1lZGlhUXVlcmllc0xvZygpO1xuXG4gICAgfSxcblxuICAgIG9uUmVzaXplOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLmdldERpbXMoKTtcbiAgICAgICAgdGhpcy51cGRhdGVNZWRpYVF1ZXJpZXNMb2coKTtcblxuICAgIH0sXG5cbiAgICB1cGRhdGVNZWRpYVF1ZXJpZXNMb2c6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGlmICh0aGlzLmhlYWRlcikge1xuICAgICAgICAgICAgdGhpcy5oZWFkZXIuJGVsXG4gICAgICAgICAgICAgICAgLmZpbmQoXCIuYnJlYWtwb2ludFwiKVxuICAgICAgICAgICAgICAgICAgICAuaHRtbChgPGRpdiBjbGFzcz0nbCc+Q1VSUkVOVCBCUkVBS1BPSU5UOjwvZGl2PjxkaXYgY2xhc3M9J2InPiR7TWVkaWFRdWVyaWVzLmdldEJyZWFrcG9pbnQoKX08L2Rpdj5gKTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGdldERpbXM6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnN0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgaCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgIHRoaXMuZGltcyA9IHtcbiAgICAgICAgICAgIHcgOiB3LFxuICAgICAgICAgICAgaCA6IGgsXG4gICAgICAgICAgICBvIDogaCA+IHcgPyAncG9ydHJhaXQnIDogJ2xhbmRzY2FwZScsXG4gICAgICAgICAgICBjIDogdyA8PSB0aGlzLk1PQklMRV9XSURUSCA/IHRoaXMuTU9CSUxFIDogdGhpcy5OT05fTU9CSUxFXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKHRoaXMuRVZFTlRfVVBEQVRFX0RJTUVOU0lPTlMsIHRoaXMuZGltcyk7XG5cbiAgICB9LFxuXG4gICAgbGlua01hbmFnZXI6IGZ1bmN0aW9uKGUpIHtcblxuICAgICAgICBjb25zdCBocmVmID0gJChlLmN1cnJlbnRUYXJnZXQpLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICBpZiAoIWhyZWYpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmF2aWdhdGVUb1VybChocmVmLCBlKTtcblxuICAgIH0sXG5cbiAgICBuYXZpZ2F0ZVRvVXJsOiBmdW5jdGlvbiggaHJlZiwgZSA9IG51bGwgKSB7XG5cbiAgICAgICAgY29uc3Qgcm91dGUgICA9IGhyZWYubWF0Y2godGhpcy5fX05BTUVTUEFDRV9fKCkuQkFTRV9QQVRIKSA/IGhyZWYuc3BsaXQodGhpcy5fX05BTUVTUEFDRV9fKCkuQkFTRV9QQVRIKVsxXSA6IGhyZWY7XG4gICAgICAgIGNvbnN0IHNlY3Rpb24gPSByb3V0ZS5pbmRleE9mKCcvJykgPT09IDAgPyByb3V0ZS5zcGxpdCgnLycpWzFdIDogcm91dGU7XG5cbiAgICAgICAgaWYgKHRoaXMuX19OQU1FU1BBQ0VfXygpLm5hdi5nZXRTZWN0aW9uKHNlY3Rpb24pKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLl9fTkFNRVNQQUNFX18oKS5yb3V0ZXIubmF2aWdhdGVUbyhyb3V0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUV4dGVybmFsTGluayhocmVmKTtcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIGhhbmRsZUV4dGVybmFsTGluazogZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgIC8qXG5cbiAgICAgICAgYmluZCB0cmFja2luZyBldmVudHMgaWYgbmVjZXNzYXJ5XG5cbiAgICAgICAgKi9cblxuICAgIH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEFwcFZpZXc7XG4iLCJpbXBvcnQgVGVtcGxhdGVNb2RlbCBmcm9tICcuLi8uLi9tb2RlbHMvY29yZS9UZW1wbGF0ZU1vZGVsJztcblxuY2xhc3MgVGVtcGxhdGVzQ29sbGVjdGlvbiBleHRlbmRzIEJhY2tib25lLkNvbGxlY3Rpb24ge1xuXG5cdG1vZGVsID0gVGVtcGxhdGVNb2RlbFxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlc0NvbGxlY3Rpb247XG4iLCJpbXBvcnQgQVBJUm91dGVNb2RlbCBmcm9tICcuLi9tb2RlbHMvY29yZS9BUElSb3V0ZU1vZGVsJztcblxuY2xhc3MgQVBJIHtcblxuXHRzdGF0aWMgbW9kZWwgPSBuZXcgQVBJUm91dGVNb2RlbCgpO1xuXG5cdHN0YXRpYyBnZXRDb25zdGFudHMgPSAoKSA9PiB7XG5cblx0XHQvLyBhZGQgbW9yZSBpZiB3ZSB3YW5uYSB1c2UgaW4gQVBJIHN0cmluZ3Ncblx0XHRjb25zdCBjb25zdGFudHMgPSB7XG5cdFx0XHRCQVNFX1BBVEggOiBBUEkuX19OQU1FU1BBQ0VfXygpLkJBU0VfUEFUSFxuXHRcdH1cblxuXHRcdHJldHVybiBjb25zdGFudHM7XG5cblx0fVxuXG5cdHN0YXRpYyBnZXQgPSAobmFtZSwgdmFycykgPT4ge1xuXG5cdFx0Y29uc3QgYWxsVmFycyA9ICQuZXh0ZW5kKHRydWUsIHZhcnMsIEFQSS5nZXRDb25zdGFudHMoKSk7XG5cdFx0cmV0dXJuIEFQSS5zdXBwbGFudFN0cmluZyhBUEkubW9kZWwuZ2V0KG5hbWUpLCBhbGxWYXJzKTtcblxuXHR9XG5cblx0c3RhdGljIHN1cHBsYW50U3RyaW5nID0gKHN0ciwgdmFscykgPT4ge1xuXG5cdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC97eyAoW157fV0qKSB9fS9nLCAoYSwgYikgPT4ge1xuXHRcdFx0Y29uc3QgciA9IHZhbHNbYl0gfHwgdHlwZW9mIHZhbHNbYl0gPT09ICdudW1iZXInID8gdmFsc1tiXS50b1N0cmluZygpIDogJyc7XG5cdFx0XHRpZiAodHlwZW9mIHIgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHIgPT09IFwibnVtYmVyXCIpIHtcblx0XHRcdFx0cmV0dXJuIHI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG5cblx0c3RhdGljIF9fTkFNRVNQQUNFX18gID0gKCkgPT4ge1xuXG5cdFx0cmV0dXJuIHdpbmRvdy5fX05BTUVTUEFDRV9fO1xuXG5cdH1cblxufVxuXG53aW5kb3cuQVBJID0gQVBJO1xuXG5leHBvcnQgZGVmYXVsdCBBUEk7XG4iLCJjbGFzcyBBYnN0cmFjdERhdGEge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0Xy5leHRlbmQodGhpcywgQmFja2JvbmUuRXZlbnRzKTtcblxuXHR9XG5cblx0X19OQU1FU1BBQ0VfXygpIHtcblxuXHRcdHJldHVybiB3aW5kb3cuX19OQU1FU1BBQ0VfXztcblxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWJzdHJhY3REYXRhOyIsImltcG9ydCBMb2NhbGVzTW9kZWwgZnJvbSAnLi4vbW9kZWxzL2NvcmUvTG9jYWxlc01vZGVsJztcbmltcG9ydCBBUEkgZnJvbSAnLi4vZGF0YS9BUEknO1xuXG4vKlxuICAgIExvY2FsZSBMb2FkZXJcblxuICAgIEZpcmVzIGJhY2sgYW4gZXZlbnQgd2hlbiBjb21wbGV0ZVxuXG4qL1xuY2xhc3MgTG9jYWxlIHtcblxuICAgIGxhbmcgICAgID0gbnVsbDtcbiAgICBkYXRhICAgICA9IG51bGw7XG4gICAgY2FsbGJhY2sgPSBudWxsO1xuICAgIGJhY2t1cCAgID0gbnVsbDtcbiAgICBkZWZhdWx0ICA9ICdlbi1nYic7XG5cbiAgICBjb25zdHJ1Y3RvcihkYXRhLCBjYikge1xuXG4gICAgICAgIC8vIHN0YXJ0IExvY2FsZSBMb2FkZXIsIGRlZmluZSBsb2NhbGUgYmFzZWQgb24gYnJvd3NlciBsYW5ndWFnZVxuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYjtcbiAgICAgICAgdGhpcy5iYWNrdXAgPSBkYXRhO1xuXG4gICAgICAgIHRoaXMubGFuZyA9IHRoaXMuZ2V0TGFuZygpO1xuXG4gICAgICAgIGlmIChBUEkuZ2V0KCdsb2NhbGUnLCB7IGNvZGUgOiB0aGlzLmxhbmcgfSkpIHtcblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmwgICAgIDogQVBJLmdldCggJ2xvY2FsZScsIHsgY29kZSA6IHRoaXMubGFuZyB9ICksXG4gICAgICAgICAgICAgICAgdHlwZSAgICA6ICdHRVQnLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3MgOiB0aGlzLm9uU3VjY2Vzcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIGVycm9yICAgOiB0aGlzLmxvYWRCYWNrdXAuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHRoaXMubG9hZEJhY2t1cCgpO1xuXG4gICAgICAgIH1cblxuICAgIH1cbiAgICAgICAgICAgIFxuICAgIGdldExhbmcoKSB7XG5cbiAgICAgICAgbGV0IGxhbmc7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggJiYgd2luZG93LmxvY2F0aW9uLnNlYXJjaC5tYXRjaCgnbGFuZz0nKSkge1xuXG4gICAgICAgICAgICBsYW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zcGxpdCgnbGFuZz0nKVsxXS5zcGxpdCgnJicpWzBdO1xuXG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LmNvbmZpZy5sb2NhbGVDb2RlKSB7XG5cbiAgICAgICAgICAgIGxhbmcgPSB3aW5kb3cuY29uZmlnLmxvY2FsZUNvZGU7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgbGFuZyA9IHRoaXMuZGVmYXVsdDtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxhbmc7XG5cbiAgICB9XG5cbiAgICBvblN1Y2Nlc3MoZXZlbnQpIHtcblxuICAgICAgICAvLyBGaXJlcyBiYWNrIGFuIGV2ZW50IG9uY2UgaXQncyBjb21wbGV0ZVxuXG4gICAgICAgIGxldCBkID0gbnVsbDtcblxuICAgICAgICBpZiAoZXZlbnQucmVzcG9uc2VUZXh0KSB7XG4gICAgICAgICAgICBkID0gSlNPTi5wYXJzZShldmVudC5yZXNwb25zZVRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZCA9IGV2ZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IExvY2FsZXNNb2RlbChkKTtcbiAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuXG4gICAgfVxuXG4gICAgbG9hZEJhY2t1cCgpIHtcblxuICAgICAgICAvLyBXaGVuIEFQSSBub3QgYXZhaWxhYmxlLCB0cmllcyB0byBsb2FkIHRoZSBzdGF0aWMgLnR4dCBsb2NhbGUgXG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybCAgICAgIDogdGhpcy5iYWNrdXAsXG4gICAgICAgICAgICBkYXRhVHlwZSA6ICdqc29uJyxcbiAgICAgICAgICAgIGNvbXBsZXRlIDogdGhpcy5vblN1Y2Nlc3MuYmluZCh0aGlzKSxcbiAgICAgICAgICAgIGVycm9yICAgIDogKCkgPT4geyBjb25zb2xlLmxvZygnZXJyb3Igb24gbG9hZGluZyBiYWNrdXAnKSB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgZ2V0KGlkKSB7XG5cbiAgICAgICAgLy8gZ2V0IFN0cmluZyBmcm9tIGxvY2FsZVxuICAgICAgICAvLyArIGlkIDogc3RyaW5nIGlkIG9mIHRoZSBMb2NhbGlzZWQgU3RyaW5nXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5nZXRTdHJpbmcoaWQpO1xuXG4gICAgfVxuXG4gICAgZ2V0TG9jYWxlSW1hZ2UodXJsKSB7XG5cbiAgICAgICAgcmV0dXJuICh3aW5kb3cuY29uZmlnLkNETiArIFwiL2ltYWdlcy9sb2NhbGUvXCIgKyB3aW5kb3cuY29uZmlnLmxvY2FsZUNvZGUgKyBcIi9cIiArIHVybCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9jYWxlO1xuIiwiaW1wb3J0IFRlbXBsYXRlTW9kZWwgZnJvbSAnLi4vbW9kZWxzL2NvcmUvVGVtcGxhdGVNb2RlbCc7XG5pbXBvcnQgVGVtcGxhdGVzQ29sbGVjdGlvbiBmcm9tICcuLi9jb2xsZWN0aW9ucy9jb3JlL1RlbXBsYXRlc0NvbGxlY3Rpb24nO1xuXG5jbGFzcyBUZW1wbGF0ZXMge1xuXG4gICAgdGVtcGxhdGVzID0gbnVsbDtcbiAgICBjYiAgICAgICAgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IodGVtcGxhdGVzLCBjYWxsYmFjaykge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRlbXBsYXRlcywgY2FsbGJhY2spO1xuXG4gICAgICAgIHRoaXMuY2IgPSBjYWxsYmFjaztcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsICAgICA6IHRlbXBsYXRlcyxcbiAgICAgICAgICAgIHN1Y2Nlc3MgOiB0aGlzLnBhcnNlWE1MLmJpbmQodGhpcylcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBwYXJzZVhNTChkYXRhKSB7XG5cbiAgICAgICAgY29uc3QgdGVtcCA9IFtdO1xuXG4gICAgICAgICQoZGF0YSkuZmluZCgndGVtcGxhdGUnKS5lYWNoKChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkdmFsdWUgPSAkKHZhbHVlKTtcbiAgICAgICAgICAgIHRlbXAucHVzaChcbiAgICAgICAgICAgICAgICBuZXcgVGVtcGxhdGVNb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGlkICAgOiAkdmFsdWUuYXR0cignaWQnKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0IDogJC50cmltKCR2YWx1ZS50ZXh0KCkpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGVtcGxhdGVzID0gbmV3IFRlbXBsYXRlc0NvbGxlY3Rpb24odGVtcCk7XG5cbiAgICAgICAgdGhpcy5jYigpO1xuXG4gICAgfVxuXG4gICAgZ2V0KGlkKSB7XG5cbiAgICAgICAgbGV0IHQgPSB0aGlzLnRlbXBsYXRlcy53aGVyZSh7aWQgOiBpZH0pO1xuICAgICAgICB0ICAgICA9IHRbMF0uZ2V0KCd0ZXh0Jyk7XG5cbiAgICAgICAgcmV0dXJuICQudHJpbSh0KTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUZW1wbGF0ZXM7XG4iLCJjb25zdCBtb2RlbERlZmF1bHRzID0ge1xuXG4gICAgc3RhcnQgICAgICAgICA6IFwiXCIsIC8vIEVnOiBcInt7IEJBU0VfUEFUSCB9fS9hcGkvc3RhcnRcIlxuXG4gICAgbG9jYWxlICAgICAgICA6IFwiXCIsIC8vIEVnOiBcInt7IEJBU0VfUEFUSCB9fS9hcGkvbDEwbi97eyBjb2RlIH19XCJcblxuICAgIHVzZXIgICAgICAgICAgOiB7XG4gICAgICAgIGxvZ2luICAgICAgOiBcInt7IEJBU0VfUEFUSCB9fS9hcGkvdXNlci9sb2dpblwiLFxuICAgICAgICByZWdpc3RlciAgIDogXCJ7eyBCQVNFX1BBVEggfX0vYXBpL3VzZXIvcmVnaXN0ZXJcIixcbiAgICAgICAgcGFzc3dvcmQgICA6IFwie3sgQkFTRV9QQVRIIH19L2FwaS91c2VyL3Bhc3N3b3JkXCIsXG4gICAgICAgIHVwZGF0ZSAgICAgOiBcInt7IEJBU0VfUEFUSCB9fS9hcGkvdXNlci91cGRhdGVcIixcbiAgICAgICAgbG9nb3V0ICAgICA6IFwie3sgQkFTRV9QQVRIIH19L2FwaS91c2VyL2xvZ291dFwiLFxuICAgICAgICByZW1vdmUgICAgIDogXCJ7eyBCQVNFX1BBVEggfX0vYXBpL3VzZXIvcmVtb3ZlXCJcbiAgICB9XG59O1xuXG5jbGFzcyBBUElSb3V0ZU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuRGVlcE1vZGVsIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcihtb2RlbERlZmF1bHRzKTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQVBJUm91dGVNb2RlbDtcbiIsImNsYXNzIExvY2FsZXNNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsIHtcblxuICAgIGRlZmF1bHRzID0ge1xuICAgICAgICBjb2RlICAgICA6IG51bGwsXG4gICAgICAgIGxhbmd1YWdlIDogbnVsbCxcbiAgICAgICAgc3RyaW5ncyAgOiBudWxsXG4gICAgfTtcbiAgICAgICAgICAgIFxuICAgIGdldF9sYW5ndWFnZSgpIHtcblxuICAgICAgICByZXR1cm4gdGhpcy5nZXQoJ2xhbmd1YWdlJyk7XG5cbiAgICB9XG5cbiAgICBnZXRTdHJpbmcoaWQpIHtcblxuICAgICAgICBjb25zdCBzdHJpbmdzID0gdGhpcy5nZXQoJ3N0cmluZ3MnKTtcbiAgICAgICAgbGV0IHZhbHVlICAgICA9IG51bGw7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHN0cmluZ3MpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGtleTIgaW4gc3RyaW5nc1trZXldWydzdHJpbmdzJ10pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5MiA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBzdHJpbmdzW2tleV1bJ3N0cmluZ3MnXVtrZXkyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgTG9jYWxlcyAtPiBub3QgZm91bmQgc3RyaW5nOiAke2lkfWApO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9jYWxlc01vZGVsO1xuIiwiY2xhc3MgVGVtcGxhdGVNb2RlbCBleHRlbmRzIEJhY2tib25lLk1vZGVsIHtcblxuXHRkZWZhdWx0cyA9IHtcblx0XHRpZCAgIDogXCJcIixcblx0XHR0ZXh0IDogXCJcIlxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVtcGxhdGVNb2RlbDtcbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi4vdmlldy9BYnN0cmFjdFZpZXcnO1xuaW1wb3J0IFJvdXRlciBmcm9tICcuL1JvdXRlcic7XG5cbmNvbnN0IHN0YXRpY1Byb3BzID0ge1xuICAgIEVWRU5UX0NIQU5HRV9WSUVXICAgICA6ICdFVkVOVF9DSEFOR0VfVklFVycsXG4gICAgRVZFTlRfQ0hBTkdFX1NVQl9WSUVXIDogJ0VWRU5UX0NIQU5HRV9TVUJfVklFVydcbn07XG5cbmNvbnN0IE5hdiA9IEFic3RyYWN0Vmlldy5leHRlbmQoe1xuXG4gICAgc2VjdGlvbnMgOiB7XG4gICAgICAgIEhPTUUgICAgOiAnJyxcbiAgICAgICAgRVhBTVBMRSA6ICdleGFtcGxlJ1xuICAgIH0sXG5cbiAgICBjdXJyZW50ICA6IHsgYXJlYSA6IG51bGwsIHN1YiA6IG51bGwgfSxcbiAgICBwcmV2aW91cyA6IHsgYXJlYSA6IG51bGwsIHN1YiA6IG51bGwgfSxcblxuICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBOYXYuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX19OQU1FU1BBQ0VfXygpLnJvdXRlci5vbihSb3V0ZXIuRVZFTlRfSEFTSF9DSEFOR0VELCB0aGlzLmNoYW5nZVZpZXcuYmluZCh0aGlzKSk7XG5cbiAgICB9LFxuXG4gICAgZ2V0U2VjdGlvbjogZnVuY3Rpb24oc2VjdGlvbikge1xuXG4gICAgICAgIGlmIChzZWN0aW9uID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2VjdGlvblVyaSA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLnNlY3Rpb25zKSB7XG4gICAgICAgICAgICBsZXQgdXJpID0gdGhpcy5zZWN0aW9uc1trZXldO1xuICAgICAgICAgICAgaWYgKHVyaSA9PT0gc2VjdGlvbikge1xuICAgICAgICAgICAgICAgIHNlY3Rpb25VcmkgPSBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VjdGlvblVyaTtcblxuICAgIH0sXG5cbiAgICBjaGFuZ2VWaWV3OiBmdW5jdGlvbihhcmVhLCBzdWIsIHBhcmFtcykge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXJlYVwiLGFyZWEpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInN1YlwiLHN1Yik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicGFyYW1zXCIscGFyYW1zKTtcblxuICAgICAgICB0aGlzLnByZXZpb3VzID0gdGhpcy5jdXJyZW50O1xuICAgICAgICB0aGlzLmN1cnJlbnQgID0geyBhcmVhIDogYXJlYSwgc3ViIDogc3ViIH07XG5cbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXMuYXJlYSAmJiB0aGlzLnByZXZpb3VzLmFyZWEgPT09IHRoaXMuY3VycmVudC5hcmVhKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoTmF2LkVWRU5UX0NIQU5HRV9TVUJfVklFVywgdGhpcy5jdXJyZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcihOYXYuRVZFTlRfQ0hBTkdFX1ZJRVcsIHRoaXMucHJldmlvdXMsIHRoaXMuY3VycmVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fX05BTUVTUEFDRV9fKCkuYXBwVmlldy5tb2RhbE1hbmFnZXIuaXNPcGVuKCkpIHtcbiAgICAgICAgICAgIHRoaXMuX19OQU1FU1BBQ0VfXygpLmFwcFZpZXcubW9kYWxNYW5hZ2VyLmhpZGVPcGVuTW9kYWwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0UGFnZVRpdGxlKGFyZWEsIHN1Yik7XG5cbiAgICB9LFxuXG4gICAgc2V0UGFnZVRpdGxlKGFyZWEsIHN1Yikge1xuXG4gICAgICAgIGNvbnN0IHRpdGxlID0gXCJQQUdFIFRJVExFIEhFUkUgLSBMT0NBTElTRSBCQVNFRCBPTiBVUkxcIjtcblxuICAgICAgICBpZiAod2luZG93LmRvY3VtZW50LnRpdGxlICE9PSB0aXRsZSkge1xuICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LnRpdGxlID0gdGl0bGU7XG4gICAgICAgIH1cblxuICAgIH1cblxufSwgc3RhdGljUHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBOYXY7XG4iLCJjb25zdCBzdGF0aWNQcm9wcyA9IHtcbiAgICBFVkVOVF9IQVNIX0NIQU5HRUQ6ICdFVkVOVF9IQVNIX0NIQU5HRUQnXG59XG5cbmNvbnN0IFJvdXRlciA9IEJhY2tib25lLlJvdXRlci5leHRlbmQoe1xuXG4gICAgRklSU1RfUk9VVEU6IHRydWUsXG5cbiAgICByb3V0ZXMgOiB7XG4gICAgICAgICcoLykoOmFyZWEpKC86c3ViKSgvKScgOiAnaGFzaENoYW5nZWQnLFxuICAgICAgICAnKmFjdGlvbnMnICAgICAgICAgICAgIDogJ25hdmlnYXRlVG8nXG4gICAgfSxcblxuICAgIGFyZWEgICA6IG51bGwsXG4gICAgc3ViICAgIDogbnVsbCxcbiAgICBwYXJhbXMgOiBudWxsLFxuXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIEJhY2tib25lLmhpc3Rvcnkuc3RhcnQoe1xuICAgICAgICAgICAgcHVzaFN0YXRlIDogdHJ1ZSxcbiAgICAgICAgICAgIHJvb3QgICAgICA6ICcvJ1xuICAgICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBoYXNoQ2hhbmdlZDogZnVuY3Rpb24oYXJlYT1udWxsLCBzdWI9bnVsbCkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKGA+PiBFVkVOVF9IQVNIX0NIQU5HRUQgQGFyZWEgPSAke3RoaXMuYXJlYX0sIEBzdWIgPSAke3RoaXMuc3VifSA8PGApO1xuXG4gICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XG4gICAgICAgIHRoaXMuc3ViICA9IHN1YjtcblxuICAgICAgICBpZiAodGhpcy5GSVJTVF9ST1VURSkge1xuICAgICAgICAgICAgdGhpcy5GSVJTVF9ST1VURSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmFyZWEpIHtcbiAgICAgICAgICAgIHRoaXMuYXJlYSA9IHRoaXMuX19OQU1FU1BBQ0VfXygpLm5hdi5zZWN0aW9ucy5IT01FO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKFJvdXRlci5FVkVOVF9IQVNIX0NIQU5HRUQsIHRoaXMuYXJlYSwgdGhpcy5zdWIsIHRoaXMucGFyYW1zKTtcblxuICAgIH0sXG5cbiAgICBuYXZpZ2F0ZVRvOiBmdW5jdGlvbih3aGVyZT0nJywgdHJpZ2dlcj10cnVlLCByZXBsYWNlPWZhbHNlLCBwYXJhbXMpIHtcblxuICAgICAgICB0aGlzLnBhcmFtcyA9IHBhcmFtcztcblxuICAgICAgICBpZiAod2hlcmUuY2hhckF0KDApICE9PSBcIi9cIikge1xuICAgICAgICAgICAgd2hlcmUgPSBgLyR7d2hlcmV9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3aGVyZS5jaGFyQXQoIHdoZXJlLmxlbmd0aC0xICkgIT09IFwiL1wiKSB7XG4gICAgICAgICAgICB3aGVyZSA9IGAke3doZXJlfS9gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0cmlnZ2VyKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoUm91dGVyLkVWRU5UX0hBU0hfQ0hBTkdFRCwgd2hlcmUsIG51bGwsIHRoaXMucGFyYW1zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubmF2aWdhdGUod2hlcmUsIHsgdHJpZ2dlcjogdHJ1ZSwgcmVwbGFjZTogcmVwbGFjZSB9KTtcblxuICAgIH0sXG5cbiAgICBfX05BTUVTUEFDRV9fOiBmdW5jdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gd2luZG93Ll9fTkFNRVNQQUNFX187XG5cbiAgICB9XG5cbn0sIHN0YXRpY1Byb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgUm91dGVyO1xuIiwiLypcbiBBbmFseXRpY3Mgd3JhcHBlclxuKi9cbmNsYXNzIEFuYWx5dGljcyB7XG5cbiAgICB0YWdzICAgID0gbnVsbDtcbiAgICBzdGFydGVkID0gZmFsc2U7XG5cbiAgICBhdHRlbXB0cyAgICAgICAgPSAwO1xuICAgIGFsbG93ZWRBdHRlbXB0cyA9IDU7XG5cbiAgICBjb25zdHJ1Y3Rvcih0YWdzLCBjYWxsYmFjaykge1xuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgICAgICAkLmdldEpTT04odGFncywgdGhpcy5vblRhZ3NSZWNlaXZlZC5iaW5kKHRoaXMpKTtcblxuICAgIH1cblxuICAgIG9uVGFnc1JlY2VpdmVkKGRhdGEpIHtcblxuICAgICAgICB0aGlzLnRhZ3MgICAgPSBkYXRhO1xuICAgICAgICB0aGlzLnN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG5cbiAgICB9XG5cbiAgICAvLyBwYXJhbSBzdHJpbmcgaWQgb2YgdGhlIHRyYWNraW5nIHRhZyB0byBiZSBwdXNoZWQgb24gQW5hbHl0aWNzIFxuICAgIHRyYWNrKHBhcmFtKSB7XG5cbiAgICAgICAgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJhbSkge1xuXG4gICAgICAgICAgICBjb25zdCB2ID0gdGhpcy50YWdzW3BhcmFtXTtcblxuICAgICAgICAgICAgaWYgKHYpIHtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbJ3NlbmQnLCAnZXZlbnQnXTtcbiAgICAgICAgICAgICAgICB2LmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goYXJnKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vIGxvYWRpbmcgR0EgYWZ0ZXIgbWFpbiBhcHAgSlMsIHNvIGV4dGVybmFsIHNjcmlwdCBtYXkgbm90IGJlIGhlcmUgeWV0XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5nYSkge1xuICAgICAgICAgICAgICAgICAgICBnYS5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuYXR0ZW1wdHMgPj0gdGhpcy5hbGxvd2VkQXR0ZW1wdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFjayhwYXJhbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmF0dGVtcHRzKys7XG4gICAgICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQW5hbHl0aWNzO1xuIiwiaW1wb3J0IEFic3RyYWN0RGF0YSBmcm9tICcuLi9kYXRhL0Fic3RyYWN0RGF0YSc7XG5pbXBvcnQgRmFjZWJvb2sgZnJvbSAnLi4vdXRpbHMvRmFjZWJvb2snO1xuaW1wb3J0IEdvb2dsZVBsdXMgZnJvbSAnLi4vdXRpbHMvR29vZ2xlUGx1cyc7XG5cbmNsYXNzIEF1dGhNYW5hZ2VyIGV4dGVuZHMgQWJzdHJhY3REYXRhIHtcblxuXHR1c2VyRGF0YSAgPSBudWxsO1xuXG5cdC8vIHRoaXMucHJvY2VzcyB0cnVlIGR1cmluZyBsb2dpbiBwcm9jZXNzXG5cdHByb2Nlc3MgICAgICA9IGZhbHNlO1xuXHRwcm9jZXNzVGltZXIgPSBudWxsO1xuXHRwcm9jZXNzV2FpdCAgPSA1MDAwO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0c3VwZXIoKTtcblxuXHR9XG5cblx0bG9naW4oc2VydmljZSwgY2I9bnVsbCkge1xuXG5cdFx0Ly8gY29uc29sZS5sb2coXCIrKysrIFBST0NFU1MgXCIsIHRoaXMucHJvY2Vzcyk7XG5cblx0XHRpZiAodGhpcy5wcm9jZXNzKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5zaG93TG9hZGVyKCk7XG5cdFx0dGhpcy5wcm9jZXNzID0gdHJ1ZTtcblxuXHRcdGNvbnN0ICRkYXRhRGZkID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0c3dpdGNoIChzZXJ2aWNlKSB7XG5cdFx0XHRjYXNlIFwiZ29vZ2xlXCI6XG5cdFx0XHRcdEdvb2dsZVBsdXMubG9naW4oJGRhdGFEZmQpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgXCJmYWNlYm9va1wiOlxuXHRcdFx0XHRGYWNlYm9vay5sb2dpbigkZGF0YURmZCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdCRkYXRhRGZkLmRvbmUoIChyZXMpID0+IHsgdGhpcy5hdXRoU3VjY2Vzcy5jYWxsKHRoaXMsIHNlcnZpY2UsIHJlcyk7IH0pO1xuXHRcdCRkYXRhRGZkLmZhaWwoIChyZXMpID0+IHsgdGhpcy5hdXRoRmFpbC5jYWxsKHRoaXMsIHNlcnZpY2UsIHJlcyk7IH0pO1xuXHRcdCRkYXRhRGZkLmFsd2F5cyggKCkgPT4geyB0aGlzLmF1dGhDYWxsYmFjay5jYWxsKHRoaXMsIGNiKTsgfSk7XG5cblx0XHQvKlxuXHRcdFVuZm9ydHVuYXRlbHkgbm8gY2FsbGJhY2sgaXMgZmlyZWQgaWYgdXNlciBtYW51YWxseSBjbG9zZXMgRysgbG9naW4gbW9kYWwsXG5cdFx0c28gdGhpcyBpcyB0byBhbGxvdyB0aGVtIHRvIGNsb3NlIHdpbmRvdyBhbmQgdGhlbiBzdWJzZXF1ZW50bHkgdHJ5IHRvIGxvZyBpbiBhZ2Fpbi4uLlxuXHRcdCovXG5cdFx0dGhpcy5wcm9jZXNzVGltZXIgPSBzZXRUaW1lb3V0KHRoaXMuYXV0aENhbGxiYWNrLCB0aGlzLnByb2Nlc3NXYWl0KTtcblxuXHRcdHJldHVybiAkZGF0YURmZDtcblxuXHR9XG5cblx0YXV0aFN1Y2Nlc3Moc2VydmljZSwgZGF0YSkge1xuXG5cdFx0Ly8gY29uc29sZS5sb2cgXCJsb2dpbiBjYWxsYmFjayBmb3IgI3tzZXJ2aWNlfSwgZGF0YSA9PiBcIiwgZGF0YVxuXG5cdH1cblxuXHRhdXRoRmFpbChzZXJ2aWNlLCBkYXRhKSB7XG5cblx0XHQvLyBjb25zb2xlLmxvZyBcImxvZ2luIGZhaWwgZm9yICN7c2VydmljZX0gPT4gXCIsIGRhdGFcblxuXHR9XG5cblx0YXV0aENhbGxiYWNrKGNiPW51bGwpIHtcblxuXHRcdGlmICghdGhpcy5wcm9jZXNzKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMucHJvY2Vzc1RpbWVyKTtcblxuXHRcdHRoaXMuaGlkZUxvYWRlcigpO1xuXHRcdHRoaXMucHJvY2VzcyA9IGZhbHNlO1xuXG5cdFx0aWYgKGNiICYmIHR5cGVvZihjYikgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNiKCk7XG5cdFx0fVxuXG5cdH1cblxuXHQvLyBzaG93IC8gaGlkZSBzb21lIFVJIGluZGljYXRvciB0aGF0IHdlIGFyZSB3YWl0aW5nIGZvciBzb2NpYWwgbmV0d29yayB0byByZXNwb25kXG5cdHNob3dMb2FkZXIoKSB7XG5cblx0XHQvLyBjb25zb2xlLmxvZyBcInNob3dMb2FkZXJcIlxuXG5cdH1cblxuXHRoaWRlTG9hZGVyKCkge1xuXG5cdFx0Ly8gY29uc29sZS5sb2cgXCJoaWRlTG9hZGVyXCJcblxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXV0aE1hbmFnZXI7XG4iLCJpbXBvcnQgQWJzdHJhY3REYXRhIGZyb20gJy4uL2RhdGEvQWJzdHJhY3REYXRhJztcblxuLypcblxuRmFjZWJvb2sgU0RLIHdyYXBwZXIgLSBsb2FkIGFzeW5jaHJvbm91c2x5LCBzb21lIGhlbHBlciBtZXRob2RzXG5cbiovXG5jbGFzcyBGYWNlYm9vayBleHRlbmRzIEFic3RyYWN0RGF0YSB7XG5cblx0c3RhdGljIHVybCA9ICcvL2Nvbm5lY3QuZmFjZWJvb2submV0L2VuX1VTL2FsbC5qcyc7XG5cblx0c3RhdGljIHBlcm1pc3Npb25zID0gJ2VtYWlsJztcblxuXHRzdGF0aWMgJGRhdGFEZmQgICAgPSBudWxsO1xuXHRzdGF0aWMgbG9hZGVkICAgICAgPSBmYWxzZTtcblxuXHRzdGF0aWMgbG9hZCgpIHtcblxuXHRcdCRzY3JpcHQoRmFjZWJvb2sudXJsLCBGYWNlYm9vay5pbml0KTtcblxuXHR9XG5cblx0c3RhdGljIGluaXQoKSB7XG5cblx0XHRGYWNlYm9vay5sb2FkZWQgPSB0cnVlO1xuXG5cdFx0RkIuaW5pdCh7XG5cdFx0XHRhcHBJZCAgOiB3aW5kb3cuY29uZmlnLmZiX2FwcF9pZCxcblx0XHRcdHN0YXR1cyA6IGZhbHNlLFxuXHRcdFx0eGZibWwgIDogZmFsc2Vcblx0XHR9KTtcblxuXHR9XG5cblx0c3RhdGljIGxvZ2luKCRkYXRhRGZkKSB7XG5cblx0XHRGYWNlYm9vay4kZGF0YURmZCA9ICRkYXRhRGZkO1xuXG5cdFx0aWYgKCFGYWNlYm9vay5sb2FkZWQpIHtcblx0XHRcdHJldHVybiBGYWNlYm9vay4kZGF0YURmZC5yZWplY3QoJ1NESyBub3QgbG9hZGVkJyk7XG5cdFx0fVxuXG5cdFx0RkIubG9naW4oIChyZXMpID0+IHtcblxuXHRcdFx0aWYgKHJlc1snc3RhdHVzJ10gPT09ICdjb25uZWN0ZWQnKSB7XG5cdFx0XHRcdEZhY2Vib29rLmdldFVzZXJEYXRhKHJlc1snYXV0aFJlc3BvbnNlJ11bJ2FjY2Vzc1Rva2VuJ10pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0RmFjZWJvb2suJGRhdGFEZmQucmVqZWN0KCdubyB3YXkgam9zZScpO1xuXHRcdFx0fVxuXG5cdFx0fSwgeyBzY29wZTogRmFjZWJvb2sucGVybWlzc2lvbnMgfSk7XG5cblx0fVxuXG5cdHN0YXRpYyBnZXRVc2VyRGF0YSh0b2tlbikge1xuXG5cdFx0Y29uc3QgdXNlckRhdGEgPSB7fTtcblx0XHR1c2VyRGF0YS5hY2Nlc3NfdG9rZW4gPSB0b2tlbjtcblxuXHRcdGNvbnN0ICRtZURmZCAgID0gJC5EZWZlcnJlZCgpO1xuXHRcdGNvbnN0ICRwaWNEZmQgID0gJC5EZWZlcnJlZCgpO1xuXG5cdFx0RkIuYXBpKCcvbWUnLCAocmVzKSA9PiB7XG5cblx0XHRcdHVzZXJEYXRhLmZ1bGxfbmFtZSA9IHJlcy5uYW1lO1xuXHRcdFx0dXNlckRhdGEuc29jaWFsX2lkID0gcmVzLmlkO1xuXHRcdFx0dXNlckRhdGEuZW1haWwgICAgID0gcmVzLmVtYWlsIHx8IGZhbHNlO1xuXHRcdFx0JG1lRGZkLnJlc29sdmUoKTtcblxuXHRcdH0pO1xuXG5cdFx0RkIuYXBpKCcvbWUvcGljdHVyZScsIHsgJ3dpZHRoJzogJzIwMCcgfSwgKHJlcykgPT4ge1xuXG5cdFx0XHR1c2VyRGF0YS5wcm9maWxlX3BpYyA9IHJlcy5kYXRhLnVybDtcblx0XHRcdCRwaWNEZmQucmVzb2x2ZSgpO1xuXG5cdFx0fSk7XG5cblx0XHQkLndoZW4oJG1lRGZkLCAkcGljRGZkKS5kb25lKCAoKSA9PiB7XG5cblx0XHRcdEZhY2Vib29rLiRkYXRhRGZkLnJlc29sdmUodXNlckRhdGEpO1xuXG5cdFx0fSk7XG5cblx0fVxuXG5cdHN0YXRpYyBzaGFyZShvcHRzLCBjYikge1xuXG5cdFx0RkIudWkoe1xuXHRcdFx0bWV0aG9kICAgICAgOiBvcHRzLm1ldGhvZCB8fCAnZmVlZCcsXG5cdFx0XHRuYW1lICAgICAgICA6IG9wdHMubmFtZSB8fCAnJyxcblx0XHRcdGxpbmsgICAgICAgIDogb3B0cy5saW5rIHx8ICcnLFxuXHRcdFx0cGljdHVyZSAgICAgOiBvcHRzLnBpY3R1cmUgfHwgJycsXG5cdFx0XHRjYXB0aW9uICAgICA6IG9wdHMuY2FwdGlvbiB8fCAnJyxcblx0XHRcdGRlc2NyaXB0aW9uIDogb3B0cy5kZXNjcmlwdGlvbiB8fCAnJ1xuXHRcdH0sIChyZXNwb25zZSkgPT4ge1xuXHRcdFx0aWYgKGNiICYmIHR5cGVvZihjYikgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Y2IocmVzcG9uc2UpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBGYWNlYm9vaztcbiIsImltcG9ydCBBYnN0cmFjdERhdGEgZnJvbSAnLi4vZGF0YS9BYnN0cmFjdERhdGEnO1xuXG4vKlxuXG5Hb29nbGUrIFNESyB3cmFwcGVyIC0gbG9hZCBhc3luY2hyb25vdXNseSwgc29tZSBoZWxwZXIgbWV0aG9kc1xuXG4qL1xuY2xhc3MgR29vZ2xlUGx1cyBleHRlbmRzIEFic3RyYWN0RGF0YSB7XG5cblx0c3RhdGljIHVybCA9ICdodHRwczovL2FwaXMuZ29vZ2xlLmNvbS9qcy9jbGllbnQ6cGx1c29uZS5qcyc7XG5cblx0c3RhdGljIHBhcmFtcyA9IHtcblx0XHQnY2xpZW50aWQnICAgICA6IG51bGwsXG5cdFx0J2NhbGxiYWNrJyAgICAgOiBudWxsLFxuXHRcdCdzY29wZScgICAgICAgIDogJ2h0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL2F1dGgvdXNlcmluZm8uZW1haWwnLFxuXHRcdCdjb29raWVwb2xpY3knIDogJ25vbmUnXG5cdH07XG5cblx0c3RhdGljICRkYXRhRGZkID0gbnVsbDtcblx0c3RhdGljIGxvYWRlZCAgID0gZmFsc2U7XG5cblx0c3RhdGljIGxvYWQoKSB7XG5cblx0XHQkc2NyaXB0KEdvb2dsZVBsdXMudXJsLCBHb29nbGVQbHVzLmluaXQpO1xuXG5cdH1cblxuXHRzdGF0aWMgaW5pdCgpIHtcblxuXHRcdEdvb2dsZVBsdXMubG9hZGVkID0gdHJ1ZTtcblxuXHRcdEdvb2dsZVBsdXMucGFyYW1zWydjbGllbnRpZCddID0gd2luZG93LmNvbmZpZy5ncF9hcHBfaWQ7XG5cdFx0R29vZ2xlUGx1cy5wYXJhbXNbJ2NhbGxiYWNrJ10gPSBHb29nbGVQbHVzLmxvZ2luQ2FsbGJhY2suYmluZCh0aGlzKTtcblxuXHR9XG5cblx0c3RhdGljIGxvZ2luKCRkYXRhRGZkKSB7XG5cblx0XHRHb29nbGVQbHVzLiRkYXRhRGZkID0gJGRhdGFEZmQ7XG5cblx0XHRpZiAoR29vZ2xlUGx1cy5sb2FkZWQpIHtcblx0XHRcdGdhcGkuYXV0aC5zaWduSW4oR29vZ2xlUGx1cy5wYXJhbXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRHb29nbGVQbHVzLiRkYXRhRGZkLnJlamVjdCgnU0RLIG5vdCBsb2FkZWQnKTtcblx0XHR9XG5cblx0fVxuXG5cdHN0YXRpYyBsb2dpbkNhbGxiYWNrKHJlcykge1xuXG5cdFx0aWYgKHJlc1snc3RhdHVzJ11bJ3NpZ25lZF9pbiddKSB7XG5cdFx0XHRHb29nbGVQbHVzLmdldFVzZXJEYXRhKHJlc1snYWNjZXNzX3Rva2VuJ10pO1xuXHRcdH0gZWxzZSBpZiAocmVzWydlcnJvciddWydhY2Nlc3NfZGVuaWVkJ10pIHtcblx0XHRcdEdvb2dsZVBsdXMuJGRhdGFEZmQucmVqZWN0KCdubyB3YXkgam9zZScpO1xuXHRcdH1cblxuXHR9XG5cblx0c3RhdGljIGdldFVzZXJEYXRhKHRva2VuKSB7XG5cblx0XHRnYXBpLmNsaWVudC5sb2FkKCdwbHVzJywndjEnLCAoKSA9PiB7XG5cblx0XHRcdHJlcXVlc3QgPSBnYXBpLmNsaWVudC5wbHVzLnBlb3BsZS5nZXQoeyAndXNlcklkJzogJ21lJyB9KTtcblx0XHRcdHJlcXVlc3QuZXhlY3V0ZSggKHJlcykgPT4ge1xuXG5cdFx0XHRcdGNvbnN0IHVzZXJEYXRhID0ge1xuXHRcdFx0XHRcdGFjY2Vzc190b2tlbiA6IHRva2VuLFxuXHRcdFx0XHRcdGZ1bGxfbmFtZSAgICA6IHJlcy5kaXNwbGF5TmFtZSxcblx0XHRcdFx0XHRzb2NpYWxfaWQgICAgOiByZXMuaWQsXG5cdFx0XHRcdFx0ZW1haWwgICAgICAgIDogcmVzLmVtYWlsc1swXSA/IHJlcy5lbWFpbHNbMF0udmFsdWUgOiBmYWxzZSxcblx0XHRcdFx0XHRwcm9maWxlX3BpYyAgOiByZXMuaW1hZ2UudXJsXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0R29vZ2xlUGx1cy4kZGF0YURmZC5yZXNvbHZlKHVzZXJEYXRhKTtcblxuXHRcdFx0fSk7XG5cblx0XHR9KTtcblxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgR29vZ2xlUGx1cztcbiIsIi8qICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgIE1lZGlhIFF1ZXJpZXMgTWFuYWdlciBcbiAqICAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiAgIFxuICogICBAYXV0aG9yICA6IEbDoWJpbyBBemV2ZWRvIDxmYWJpby5hemV2ZWRvQHVuaXQ5LmNvbT4gVU5JVDlcbiAqICAgQGRhdGUgICAgOiBTZXB0ZW1iZXIgMTRcbiAqICAgQHVwZGF0ZWQgOiBKdWx5IDIwMTUgKHBvcnQgdG8gZXM2KVxuICogICBcbiAqICAgSW5zdHJ1Y3Rpb25zIGFyZSBpbiAvcHJvamVjdC9zYXNzL3V0aWxzL19yZXNwb25zaXZlLnNjc3MuXG4gKi9cblxuY2xhc3MgTWVkaWFRdWVyaWVzIHtcblxuICAgIC8vIEJyZWFrcG9pbnRzXG4gICAgc3RhdGljIFNNQUxMICAgICAgID0gXCJzbWFsbFwiO1xuICAgIHN0YXRpYyBJUEFEICAgICAgICA9IFwiaXBhZFwiO1xuICAgIHN0YXRpYyBNRURJVU0gICAgICA9IFwibWVkaXVtXCI7XG4gICAgc3RhdGljIExBUkdFICAgICAgID0gXCJsYXJnZVwiO1xuICAgIHN0YXRpYyBFWFRSQV9MQVJHRSA9IFwiZXh0cmEtbGFyZ2VcIjtcblxuICAgIHN0YXRpYyBKU19FTCAgICAgICAgPSBudWxsO1xuICAgIHN0YXRpYyBFTF9DTEFTU05BTUUgPSAnanMtbWVkaWFxdWVyaWVzJztcblxuICAgIHN0YXRpYyBzZXR1cCgpIHtcblxuICAgICAgICBNZWRpYVF1ZXJpZXMuSlNfRUwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgTWVkaWFRdWVyaWVzLkpTX0VMLmNsYXNzTmFtZSA9IE1lZGlhUXVlcmllcy5FTF9DTEFTU05BTUU7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoTWVkaWFRdWVyaWVzLkpTX0VMKTtcblxuICAgICAgICBNZWRpYVF1ZXJpZXMuU01BTExfQlJFQUtQT0lOVCAgPSB7IG5hbWU6IFwiU21hbGxcIiwgYnJlYWtwb2ludHM6IFsgTWVkaWFRdWVyaWVzLlNNQUxMIF0gfTtcbiAgICAgICAgTWVkaWFRdWVyaWVzLk1FRElVTV9CUkVBS1BPSU5UID0geyBuYW1lOiBcIk1lZGl1bVwiLCBicmVha3BvaW50czogWyBNZWRpYVF1ZXJpZXMuTUVESVVNIF0gfTtcbiAgICAgICAgTWVkaWFRdWVyaWVzLkxBUkdFX0JSRUFLUE9JTlQgID0geyBuYW1lOiBcIkxhcmdlXCIsIGJyZWFrcG9pbnRzOiBbIE1lZGlhUXVlcmllcy5JUEFELCBNZWRpYVF1ZXJpZXMuTEFSR0UsIE1lZGlhUXVlcmllcy5FWFRSQV9MQVJHRSBdIH07XG5cbiAgICAgICAgTWVkaWFRdWVyaWVzLkJSRUFLUE9JTlRTID0gW1xuICAgICAgICAgICAgTWVkaWFRdWVyaWVzLlNNQUxMX0JSRUFLUE9JTlQsXG4gICAgICAgICAgICBNZWRpYVF1ZXJpZXMuTUVESVVNX0JSRUFLUE9JTlQsXG4gICAgICAgICAgICBNZWRpYVF1ZXJpZXMuTEFSR0VfQlJFQUtQT0lOVFxuICAgICAgICBdO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGdldERldmljZVN0YXRlKCkge1xuXG4gICAgICAgIGNvbnN0IHJlID0gLyhcXCd8XFxcIikvO1xuXG4gICAgICAgIGxldCB2YWx1ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKE1lZGlhUXVlcmllcy5KU19FTCkuZ2V0UHJvcGVydHlWYWx1ZShcImNvbnRlbnRcIik7XG4gICAgICAgIGlmIChyZS50ZXN0KHZhbHVlLmNoYXJBdCgwKSkgJiYgcmUudGVzdCh2YWx1ZS5jaGFyQXQodmFsdWUubGVuZ3RoLTEpKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5zdWJzdHIoMSwgdmFsdWUubGVuZ3RoLTIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlXG5cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0QnJlYWtwb2ludCgpIHtcblxuICAgICAgICBjb25zdCBzdGF0ZSAgICA9IE1lZGlhUXVlcmllcy5nZXREZXZpY2VTdGF0ZSgpO1xuICAgICAgICBsZXQgYnJlYWtwb2ludCA9IFwiXCI7XG5cbiAgICAgICAgTWVkaWFRdWVyaWVzLkJSRUFLUE9JTlRTLmZvckVhY2goIChwb2ludCwgaSkgPT4ge1xuICAgICAgICAgICAgaWYgKE1lZGlhUXVlcmllcy5CUkVBS1BPSU5UU1tpXS5icmVha3BvaW50cy5pbmRleE9mKHN0YXRlKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludCA9IHBvaW50Lm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBicmVha3BvaW50O1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGlzQnJlYWtwb2ludChicmVha3BvaW50KSB7XG5cbiAgICAgICAgbGV0IGJyZWFrcG9pbnRNYXRjaCA9IGZhbHNlO1xuXG4gICAgICAgIGJyZWFrcG9pbnQuYnJlYWtwb2ludHMuZm9yRWFjaCggKHBvaW50KSA9PiB7XG4gICAgICAgICAgICBpZiAocG9pbnQgPT0gTWVkaWFRdWVyaWVzLmdldERldmljZVN0YXRlKCkpXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludE1hdGNoID0gdHJ1ZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJyZWFrcG9pbnRNYXRjaDtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBNZWRpYVF1ZXJpZXM7XG5cbndpbmRvdy5NZWRpYVF1ZXJpZXMgPSBNZWRpYVF1ZXJpZXM7XG4iLCIvKlxuUmVxdWVzdGVyXG4tIFdyYXBwZXIgZm9yIGAkLmFqYXhgIGNhbGxzXG4qL1xuXG5jbGFzcyBSZXF1ZXN0ZXIge1xuXG4gICAgc3RhdGljIHJlcXVlc3RzID0gW107XG5cbiAgICBzdGF0aWMgcmVxdWVzdCggZGF0YSApIHtcbiAgICAgICAgLypcbiAgICAgICAgYGRhdGEgPSB7YDxicj5cbiAgICAgICAgYCAgdXJsICAgICAgICAgOiBTdHJpbmdgPGJyPlxuICAgICAgICBgICB0eXBlICAgICAgICA6IFwiUE9TVC9HRVQvUFVUXCJgPGJyPlxuICAgICAgICBgICBkYXRhICAgICAgICA6IE9iamVjdGA8YnI+XG4gICAgICAgIGAgIGRhdGFUeXBlICAgIDogalF1ZXJ5IGRhdGFUeXBlYDxicj5cbiAgICAgICAgYCAgY29udGVudFR5cGUgOiBTdHJpbmdgPGJyPlxuICAgICAgICBgfWBcbiAgICAgICAgKi9cblxuICAgICAgICBjb25zdCByID0gJC5hamF4KHtcbiAgICAgICAgICAgIHVybCAgICAgICAgIDogZGF0YS51cmwsXG4gICAgICAgICAgICB0eXBlICAgICAgICA6IGRhdGEudHlwZSA/IGRhdGEudHlwZSA6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YSAgICAgICAgOiBkYXRhLmRhdGEgPyBkYXRhLmRhdGEgOiBudWxsLFxuICAgICAgICAgICAgZGF0YVR5cGUgICAgOiBkYXRhLmRhdGFUeXBlID8gZGF0YS5kYXRhVHlwZSA6IFwianNvblwiLFxuICAgICAgICAgICAgY29udGVudFR5cGUgOiBkYXRhLmNvbnRlbnRUeXBlID8gZGF0YS5jb250ZW50VHlwZSA6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PVVURi04XCIsXG4gICAgICAgICAgICBwcm9jZXNzRGF0YSA6IChkYXRhLnByb2Nlc3NEYXRhICE9PSBudWxsICYmIGRhdGEucHJvY2Vzc0RhdGEgIT09IHVuZGVmaW5lZCkgPyBkYXRhLnByb2Nlc3NEYXRhIDogdHJ1ZVxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHIuZG9uZShkYXRhLmRvbmUpO1xuICAgICAgICByLmZhaWwoZGF0YS5mYWlsKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGFkZEltYWdlKGRhdGEsIGRvbmUsIGZhaWwpIHtcbiAgICAgICAgLypcbiAgICAgICAgKiogVXNhZ2U6IDxicj5cbiAgICAgICAgYGRhdGEgPSBjYW52YXNzLnRvRGF0YVVSTChcImltYWdlL2pwZWdcIikuc2xpY2UoXCJkYXRhOmltYWdlL2pwZWc7YmFzZTY0LFwiLmxlbmd0aClgPGJyPlxuICAgICAgICBgUmVxdWVzdGVyLmFkZEltYWdlIGRhdGEsIFwiem9ldHJvcGVcIiwgQGRvbmUsIEBmYWlsYFxuICAgICAgICAqL1xuXG4gICAgICAgIFJlcXVlc3Rlci5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybCAgICA6ICcvYXBpL2ltYWdlcy8nLFxuICAgICAgICAgICAgdHlwZSAgIDogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YSAgIDogeyBpbWFnZV9iYXNlNjQgOiBlbmNvZGVVUkkoZGF0YSkgfSxcbiAgICAgICAgICAgIGRvbmUgICA6IGRvbmUsXG4gICAgICAgICAgICBmYWlsICAgOiBmYWlsXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGRlbGV0ZUltYWdlKGlkLCBkb25lLCBmYWlsKSB7XG4gICAgICAgIFxuICAgICAgICBSZXF1ZXN0ZXIucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmwgICAgOiAnL2FwaS9pbWFnZXMvJytpZCxcbiAgICAgICAgICAgIHR5cGUgICA6ICdERUxFVEUnLFxuICAgICAgICAgICAgZG9uZSAgIDogZG9uZSxcbiAgICAgICAgICAgIGZhaWwgICA6IGZhaWxcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVxdWVzdGVyO1xuICAgICIsIi8qXG5TaGFyaW5nIGNsYXNzIGZvciBub24tU0RLIGxvYWRlZCBzb2NpYWwgbmV0d29ya3MuXG5JZiBTREsgaXMgbG9hZGVkLCBhbmQgcHJvdmlkZXMgc2hhcmUgbWV0aG9kcywgdGhlbiB1c2UgdGhhdCBjbGFzcyBpbnN0ZWFkLCBlZy4gYEZhY2Vib29rLnNoYXJlYCBpbnN0ZWFkIG9mIGBTaGFyZS5mYWNlYm9va2BcbiovXG5jbGFzcyBTaGFyZSB7XG5cbiAgICB1cmwgPSBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG5cbiAgICAgICAgdGhpcy51cmwgPSB0aGlzLl9fTkFNRVNQQUNFX18oKS5CQVNFX1BBVEg7XG5cbiAgICB9XG5cbiAgICBvcGVuV2luKHVybCwgdywgaCkge1xuXG4gICAgICAgIGNvbnN0IGxlZnQgPSAoIHNjcmVlbi5hdmFpbFdpZHRoICAtIHcgKSA+PiAxO1xuICAgICAgICBjb25zdCB0b3AgID0gKCBzY3JlZW4uYXZhaWxIZWlnaHQgLSBoICkgPj4gMTtcblxuICAgICAgICB3aW5kb3cub3Blbih1cmwsICcnLCAndG9wPScrdG9wKycsbGVmdD0nK2xlZnQrJyx3aWR0aD0nK3crJyxoZWlnaHQ9JytoKycsbG9jYXRpb249bm8sbWVudWJhcj1ubycpO1xuXG4gICAgfVxuXG4gICAgcGx1cyh1cmw9JycpIHtcblxuICAgICAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsIHx8IHRoaXMudXJsKTtcblxuICAgICAgICB0aGlzLm9wZW5XaW4oYGh0dHBzOi8vcGx1cy5nb29nbGUuY29tL3NoYXJlP3VybD0ke3VybH1gLCA2NTAsIDM4NSk7XG5cbiAgICB9XG5cbiAgICBwaW50ZXJlc3QodXJsPScnLCBtZWRpYT0nJywgZGVzY3I9JycpIHtcblxuICAgICAgICB1cmwgICA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwgfHwgdGhpcy51cmwpO1xuICAgICAgICBtZWRpYSA9IGVuY29kZVVSSUNvbXBvbmVudChtZWRpYSk7XG4gICAgICAgIGRlc2NyID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlc2NyKTtcblxuICAgICAgICB0aGlzLm9wZW5XaW4oYGh0dHA6Ly93d3cucGludGVyZXN0LmNvbS9waW4vY3JlYXRlL2J1dHRvbi8/dXJsPSR7dXJsfSZtZWRpYT0ke21lZGlhfSZkZXNjcmlwdGlvbj0ke2Rlc2NyfWAsIDczNSwgMzEwKTtcblxuICAgIH1cblxuICAgIHR1bWJscih1cmw9JycsIG1lZGlhPScnLCBkZXNjcj0nJykge1xuXG4gICAgICAgIHVybCAgID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCB8fCB0aGlzLnVybCk7XG4gICAgICAgIG1lZGlhID0gZW5jb2RlVVJJQ29tcG9uZW50KG1lZGlhKTtcbiAgICAgICAgZGVzY3IgPSBlbmNvZGVVUklDb21wb25lbnQoZGVzY3IpO1xuXG4gICAgICAgIHRoaXMub3BlbldpbihgaHR0cDovL3d3dy50dW1ibHIuY29tL3NoYXJlL3Bob3RvP3NvdXJjZT0ke21lZGlhfSZjYXB0aW9uPSR7ZGVzY3J9JmNsaWNrX3RocnU9JHt1cmx9YCwgNDUwLCA0MzApO1xuXG4gICAgfVxuXG4gICAgZmFjZWJvb2sodXJsPScnLCBjb3B5PScnKSB7XG5cbiAgICAgICAgdXJsICAgICAgICAgPSBlbmNvZGVVUklDb21wb25lbnQodXJsIHx8IHRoaXMudXJsKTtcbiAgICAgICAgY29uc3QgZGVjc3IgPSBlbmNvZGVVUklDb21wb25lbnQoY29weSk7XG5cbiAgICAgICAgdGhpcy5vcGVuV2luKGBodHRwOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZS5waHA/dT0ke3VybH0mdD0ke2RlY3NyfWAsIDYwMCwgMzAwKTtcblxuICAgIH1cblxuICAgIHR3aXR0ZXIodXJsPScnLCBjb3B5PScnKSB7XG5cbiAgICAgICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCB8fCB0aGlzLnVybCk7XG4gICAgICAgIGlmIChjb3B5ID09PSAnJykge1xuICAgICAgICAgICAgY29weSA9IHRoaXMuX19OQU1FU1BBQ0VfXygpLmxvY2FsZS5nZXQoJ3Nlb190d2l0dGVyX2NhcmRfZGVzY3JpcHRpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkZXNjciA9IGVuY29kZVVSSUNvbXBvbmVudChjb3B5KTtcblxuICAgICAgICB0aGlzLm9wZW5XaW4oYGh0dHA6Ly90d2l0dGVyLmNvbS9pbnRlbnQvdHdlZXQvP3RleHQ9JHtkZXNjcn0mdXJsPSR7dXJsfWAsIDYwMCwgMzAwKTtcblxuICAgIH1cblxuICAgIHJlbnJlbih1cmw9JycpIHtcblxuICAgICAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsIHx8IHRoaXMudXJsKTtcblxuICAgICAgICB0aGlzLm9wZW5XaW4oYGh0dHA6Ly9zaGFyZS5yZW5yZW4uY29tL3NoYXJlL2J1dHRvbnNoYXJlLmRvP2xpbms9JHt1cmx9YCwgNjAwLCAzMDApO1xuXG4gICAgfVxuXG4gICAgd2VpYm8odXJsPScnKSB7XG5cbiAgICAgICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCB8fCB0aGlzLnVybCk7XG5cbiAgICAgICAgdGhpcy5vcGVuV2luKGBodHRwOi8vc2VydmljZS53ZWliby5jb20vc2hhcmUvc2hhcmUucGhwP3VybD0ke3VybH0mbGFuZ3VhZ2U9emhfY25gLCA2MDAsIDMwMCk7XG5cbiAgICB9XG5cbiAgICBfX05BTUVTUEFDRV9fKCkge1xuXG4gICAgICAgIHJldHVybiB3aW5kb3cuX19OQU1FU1BBQ0VfXztcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGFyZTtcbiIsImNvbnN0IEFic3RyYWN0VmlldyA9IEJhY2tib25lLlZpZXcuZXh0ZW5kKHtcblxuXHRlbCAgICAgICAgICAgOiBudWxsLFxuXHRpZCAgICAgICAgICAgOiBudWxsLFxuXHRjaGlsZHJlbiAgICAgOiBudWxsLFxuXHR0ZW1wbGF0ZSAgICAgOiBudWxsLFxuXHR0ZW1wbGF0ZVZhcnMgOiBudWxsLFxuXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uKCkge1xuXHRcdFxuXHRcdHRoaXMuY2hpbGRyZW4gPSBbXTtcblxuXHRcdGlmICh0aGlzLnRlbXBsYXRlKSB7XG5cdFx0XHRjb25zdCB0bXBIVE1MID0gXy50ZW1wbGF0ZSh0aGlzLl9fTkFNRVNQQUNFX18oKS50ZW1wbGF0ZXMuZ2V0KHRoaXMudGVtcGxhdGUpKTtcblxuXHRcdFx0dGhpcy5zZXRFbGVtZW50KFxuXHRcdFx0XHR0bXBIVE1MKHRoaXMudGVtcGxhdGVWYXJzKVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5pZCkge1xuXHRcdFx0dGhpcy4kZWwuYXR0cignaWQnLCB0aGlzLmlkKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jbGFzc05hbWUpIHtcblx0XHRcdHRoaXMuJGVsLmFkZENsYXNzKHRoaXMuY2xhc3NOYW1lKTtcblx0XHR9XG5cdFx0XG5cdFx0dGhpcy5pbml0KCk7XG5cblx0XHR0aGlzLnBhdXNlZCA9IGZhbHNlO1xuXG5cdH0sXG5cblx0aW5pdDogZnVuY3Rpb24oKSB7fSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uKCkge30sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHt9LFxuXG5cdGFkZENoaWxkOiBmdW5jdGlvbihjaGlsZCwgcHJlcGVuZCA9IGZhbHNlKSB7XG5cblx0XHRpZiAoY2hpbGQuZWwpIHtcblx0XHRcdHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdGFyZ2V0ID0gdGhpcy5hZGRUb1NlbGVjdG9yID8gdGhpcy4kZWwuZmluZCh0aGlzLmFkZFRvU2VsZWN0b3IpLmVxKDApIDogdGhpcy4kZWw7XG5cdFx0Y29uc3QgYyAgICAgID0gY2hpbGQuZWwgPyBjaGlsZC4kZWwgOiBjaGlsZDtcblxuXHRcdGlmICghcHJlcGVuZCkge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZChjKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LnByZXBlbmQoYyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0cmVwbGFjZTogZnVuY3Rpb24oZG9tLCBjaGlsZCkge1xuXG5cdFx0aWYgKGNoaWxkLmVsKSB7XG5cdFx0XHR0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IGMgPSBjaGlsZC5lbCA/IGNoaWxkLiRlbCA6IGNoaWxkO1xuXG5cdFx0dGhpcy4kZWwuY2hpbGRyZW4oZG9tKS5yZXBsYWNlV2l0aChjKTtcblxuXHR9LFxuXG5cdHJlbW92ZTogZnVuY3Rpb24oY2hpbGQpIHtcblxuXHRcdGlmICghY2hpbGQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0XG5cdFx0Y29uc3QgYyA9IGNoaWxkLmVsID8gY2hpbGQuJGVsIDogJChjaGlsZCk7XG5cdFx0aWYgKGMgJiYgY2hpbGQuZGlzcG9zZSkge1xuXHRcdFx0Y2hpbGQuZGlzcG9zZSgpO1xuXHRcdH1cblxuXHRcdGlmIChjICYmIHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCkgIT0gLTEpIHtcblx0XHRcdHRoaXMuY2hpbGRyZW4uc3BsaWNlKCB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpLCAxICk7XG5cdFx0fVxuXG5cdFx0Yy5yZW1vdmUoKTtcblxuXHR9LFxuXG5cdG9uUmVzaXplOiBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKCAoY2hpbGQpID0+IHtcblx0XHRcdGlmIChjaGlsZC5vblJlc2l6ZSkge1xuXHRcdFx0XHRjaGlsZC5vblJlc2l6ZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0sXG5cblx0bW91c2VFbmFibGVkOiBmdW5jdGlvbiggZW5hYmxlZCApIHtcblxuXHRcdHRoaXMuJGVsLmNzcyh7XG5cdFx0XHRcInBvaW50ZXItZXZlbnRzXCI6IGVuYWJsZWQgPyBcImF1dG9cIiA6IFwibm9uZVwiXG5cdFx0fSk7XG5cblx0fSxcblxuXHRDU1NUcmFuc2xhdGU6IGZ1bmN0aW9uKHgsIHksIHZhbHVlPSclJywgc2NhbGUpIHtcblxuXHRcdGxldCBzdHI7XG5cblx0XHRpZiAoTW9kZXJuaXpyLmNzc3RyYW5zZm9ybXMzZCkge1xuXHRcdFx0c3RyID0gYHRyYW5zbGF0ZTNkKCR7eCt2YWx1ZX0sICR7eSt2YWx1ZX0sIDApYDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c3RyID0gYHRyYW5zbGF0ZSgke3grdmFsdWV9LCAke3krdmFsdWV9KWBcblx0XHR9XG5cblx0XHRpZiAoc2NhbGUpIHtcblx0XHRcdHN0ciA9IGAke3N0cn0gc2NhbGUoJHtzY2FsZX0pYFxuXHRcdH1cblxuXHRcdHJldHVybiBzdHI7XG5cblx0fSxcblxuXHR1bk11dGVBbGw6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKCAoY2hpbGQpID0+IHtcblxuXHRcdFx0aWYgKGNoaWxkLnVuTXV0ZSkge1xuXHRcdFx0XHRjaGlsZC51bk11dGUoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0XHRjaGlsZC51bk11dGVBbGwoKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdH0sXG5cblx0bXV0ZUFsbDogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goIChjaGlsZCkgPT4ge1xuXG5cdFx0XHRpZiAoY2hpbGQubXV0ZSkge1xuXHRcdFx0XHRjaGlsZC5tdXRlKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0Y2hpbGQubXV0ZUFsbCgpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0fSxcblxuXHRyZW1vdmVBbGxDaGlsZHJlbjogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goIChjaGlsZCkgPT4ge1xuXHRcdFx0dGhpcy5yZW1vdmUoY2hpbGQpO1xuXHRcdH0pO1xuXG5cdH0sXG5cblx0dHJpZ2dlckNoaWxkcmVuOiBmdW5jdGlvbihtc2csIGNoaWxkcmVuKSB7XG5cblx0XHRjaGlsZHJlbiA9IGNoaWxkcmVuIHx8IHRoaXMuY2hpbGRyZW47XG5cblx0XHRjaGlsZHJlbi5mb3JFYWNoKCAoY2hpbGQsIGkpID0+IHtcblxuXHRcdFx0Y2hpbGQudHJpZ2dlcihtc2cpO1xuXG5cdFx0XHRpZiAoY2hpbGQuY2hpbGRyZW4ubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMudHJpZ2dlckNoaWxkcmVuKG1zZywgY2hpbGQuY2hpbGRyZW4pO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0fSxcblxuXHRjYWxsQ2hpbGRyZW46IGZ1bmN0aW9uKG1ldGhvZCwgcGFyYW1zLCBjaGlsZHJlbikge1xuXG5cdFx0Y2hpbGRyZW4gPSBjaGlsZHJlbiB8fCB0aGlzLmNoaWxkcmVuO1xuXG5cdFx0Y2hpbGRyZW4uZm9yRWFjaCggKGNoaWxkLCBpKSA9PiB7XG5cblx0XHRcdGlmIChjaGlsZFttZXRob2RdKSB7XG5cdFx0XHRcdGNoaWxkW21ldGhvZF0ocGFyYW1zKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLmNhbGxDaGlsZHJlbihtZXRob2QsIHBhcmFtcywgY2hpbGQuY2hpbGRyZW4pO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0fSxcblxuXHRjYWxsQ2hpbGRyZW5BbmRTZWxmOiBmdW5jdGlvbihtZXRob2QsIHBhcmFtcywgY2hpbGRyZW4pIHtcblxuXHRcdGNoaWxkcmVuID0gY2hpbGRyZW4gfHwgdGhpcy5jaGlsZHJlbjtcblxuXHRcdGlmICh0aGlzW21ldGhvZF0pIHtcblx0XHRcdHRoaXNbbWV0aG9kXShwYXJhbXMpO1xuXHRcdH1cblxuXHRcdHRoaXMuY2FsbENoaWxkcmVuKG1ldGhvZCwgcGFyYW1zLCBjaGlsZHJlbik7XG5cblx0fSxcblxuXHRzdXBwbGFudFN0cmluZzogZnVuY3Rpb24oc3RyLCB2YWxzKSB7XG5cblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL3t7IChbXnt9XSopIH19L2csIChhLCBiKSA9PiB7XG5cdFx0XHRjb25zdCByID0gdmFsc1tiXTtcblx0XHRcdGlmICh0eXBlb2YgciA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgciA9PT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHRyZXR1cm4gcjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0sXG5cblx0ZGlzcG9zZTogZnVuY3Rpb24oKSB7XG5cblx0XHQvKlxuXHRcdG92ZXJyaWRlIG9uIHBlciB2aWV3IGJhc2lzIC0gdW5iaW5kIGV2ZW50IGhhbmRsZXJzIGV0Y1xuXHRcdCovXG5cblx0fSxcblxuXHRfX05BTUVTUEFDRV9fKCkge1xuXG5cdFx0cmV0dXJuIHdpbmRvdy5fX05BTUVTUEFDRV9fO1xuXG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEFic3RyYWN0VmlldztcbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi9BYnN0cmFjdFZpZXcnO1xuXG5jb25zdCBBYnN0cmFjdFZpZXdQYWdlID0gQWJzdHJhY3RWaWV3LmV4dGVuZCh7XG5cblx0X3Nob3duICAgICA6IGZhbHNlLFxuXHRfbGlzdGVuaW5nIDogZmFsc2UsXG5cblx0c2hvdzogZnVuY3Rpb24oY2IpIHtcblxuXHRcdGlmICh0aGlzLl9zaG93bikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLl9zaG93biA9IHRydWU7XG5cblx0XHQvKlxuXHRcdENIQU5HRSBIRVJFIC0gJ3BhZ2UnIHZpZXdzIGFyZSBhbHdheXMgaW4gRE9NIC0gdG8gc2F2ZSBoYXZpbmcgdG8gcmUtaW5pdGlhbGlzZSBnbWFwIGV2ZW50cyAoUElUQSkuIE5vIGxvbmdlciByZXF1aXJlIDpkaXNwb3NlIG1ldGhvZFxuXHRcdCovXG5cdFx0dGhpcy5fX05BTUVTUEFDRV9fKCkuYXBwVmlldy53cmFwcGVyLmFkZENoaWxkKHRoaXMpO1xuXHRcdHRoaXMuY2FsbENoaWxkcmVuQW5kU2VsZignc2V0TGlzdGVuZXJzJywgJ29uJyk7XG5cblx0XHQvLyByZXBsYWNlIHdpdGggc29tZSBwcm9wZXIgdHJhbnNpdGlvbiBpZiB3ZSBjYW5cblx0XHR0aGlzLiRlbC5jc3MoeyAndmlzaWJpbGl0eScgOiAndmlzaWJsZScgfSk7XG5cdFx0XG5cdFx0aWYgKGNiICYmIHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y2IoKTtcblx0XHR9XG5cblx0fSxcblxuXHRoaWRlOiBmdW5jdGlvbihjYikge1xuXG5cdFx0aWYgKCF0aGlzLl9zaG93bikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLl9zaG93biA9IGZhbHNlO1xuXG5cdFx0Lypcblx0XHRDSEFOR0UgSEVSRSAtICdwYWdlJyB2aWV3cyBhcmUgYWx3YXlzIGluIERPTSAtIHRvIHNhdmUgaGF2aW5nIHRvIHJlLWluaXRpYWxpc2UgZ21hcCBldmVudHMgKFBJVEEpLiBObyBsb25nZXIgcmVxdWlyZSA6ZGlzcG9zZSBtZXRob2Rcblx0XHQqL1xuXHRcdHRoaXMuX19OQU1FU1BBQ0VfXygpLmFwcFZpZXcud3JhcHBlci5yZW1vdmUodGhpcyk7XG5cblx0XHQvLyB0aGlzLmNhbGxDaGlsZHJlbkFuZFNlbGYgJ3NldExpc3RlbmVycycsICdvZmYnXG5cblx0XHQvLyByZXBsYWNlIHdpdGggc29tZSBwcm9wZXIgdHJhbnNpdGlvbiBpZiB3ZSBjYW5cblx0XHR0aGlzLiRlbC5jc3MoeyAndmlzaWJpbGl0eScgOiAnaGlkZGVuJyB9KTtcblx0XHRcblx0XHRpZiAoY2IgJiYgdHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjYigpO1xuXHRcdH1cblxuXHR9LFxuXG5cdGRpc3Bvc2U6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy5jYWxsQ2hpbGRyZW5BbmRTZWxmKCdzZXRMaXN0ZW5lcnMnLCAnb2ZmJyk7XG5cblx0fSxcblxuXHRzZXRMaXN0ZW5lcnM6IGZ1bmN0aW9uKHNldHRpbmcpIHtcblxuXHRcdGlmIChzZXR0aW5nID09PSB0aGlzLl9saXN0ZW5pbmcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl9saXN0ZW5pbmcgPSBzZXR0aW5nO1xuXG5cdH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgQWJzdHJhY3RWaWV3UGFnZTtcbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi4vQWJzdHJhY3RWaWV3JztcblxuY29uc3QgRm9vdGVyID0gQWJzdHJhY3RWaWV3LmV4dGVuZCh7XG5cblx0dGVtcGxhdGUgOiAnc2l0ZS1mb290ZXInLFxuXG5cdGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMudGVtcGxhdGVWYXJzID0ge1xuICAgICAgICBcdGRlc2MgOiB0aGlzLl9fTkFNRVNQQUNFX18oKS5sb2NhbGUuZ2V0KFwiZm9vdGVyX2Rlc2NcIilcblx0XHR9O1xuXG4gICAgICAgIEZvb3Rlci5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyk7XG5cblx0fVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgRm9vdGVyO1xuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuLi9BYnN0cmFjdFZpZXcnO1xuXG5jb25zdCBIZWFkZXIgPSBBYnN0cmFjdFZpZXcuZXh0ZW5kKHtcblxuXHR0ZW1wbGF0ZSA6ICdzaXRlLWhlYWRlcicsXG5cdFxuXHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLnRlbXBsYXRlVmFycyA9IHtcblx0XHRcdGRlc2MgICAgOiB0aGlzLl9fTkFNRVNQQUNFX18oKS5sb2NhbGUuZ2V0KFwiaGVhZGVyX2Rlc2NcIiksXG5cdFx0XHRob21lICAgIDoge1xuXHRcdFx0XHRsYWJlbCAgICA6ICdHbyB0byBob21lcGFnZScsXG5cdFx0XHRcdHVybCAgICAgIDogdGhpcy5fX05BTUVTUEFDRV9fKCkuQkFTRV9QQVRIICsgJy8nICsgdGhpcy5fX05BTUVTUEFDRV9fKCkubmF2LnNlY3Rpb25zLkhPTUVcblx0XHRcdH0sXG5cdFx0XHRleGFtcGxlIDoge1xuXHRcdFx0XHRsYWJlbCAgICA6ICdHbyB0byBleGFtcGxlIHBhZ2UnLFxuXHRcdFx0XHR1cmwgICAgICA6IHRoaXMuX19OQU1FU1BBQ0VfXygpLkJBU0VfUEFUSCArICcvJyArIHRoaXMuX19OQU1FU1BBQ0VfXygpLm5hdi5zZWN0aW9ucy5FWEFNUExFXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdEhlYWRlci5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyk7XG5cblx0fVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyO1xuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuLi9BYnN0cmFjdFZpZXcnO1xuXG5jb25zdCBQcmVsb2FkZXIgPSBBYnN0cmFjdFZpZXcuZXh0ZW5kKHtcblxuXHRjYiA6IG51bGwsXG5cdFxuXHRUUkFOU0lUSU9OX1RJTUUgOiAwLjUsXG5cblx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xuXG5cdFx0UHJlbG9hZGVyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzKTtcblxuXHRcdHRoaXMuc2V0RWxlbWVudCgkKCcjcHJlbG9hZGVyJykpO1xuXG5cdH0sXG5cblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cblx0fSxcblxuXHRzaG93OiBmdW5jdGlvbihjYikge1xuXG5cdFx0dGhpcy5jYiA9IGNiO1xuXG5cdFx0dGhpcy4kZWwuY3NzKHsnZGlzcGxheScgOiAnYmxvY2snfSk7XG5cblx0fSxcblxuXHRvblNob3dDb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cblx0XHRpZiAodGhpcy5jYiAmJiB0eXBlb2YodGhpcy5jYikgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRoaXMuY2IoKTtcblx0XHR9XG5cblx0fSxcblxuXHRoaWRlOiBmdW5jdGlvbihjYikge1xuXG5cdFx0dGhpcy5jYiA9IGNiO1xuXG5cdFx0dGhpcy5vbkhpZGVDb21wbGV0ZSgpO1xuXG5cdH0sXG5cblx0b25IaWRlQ29tcGxldGU6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy4kZWwuY3NzKHsnZGlzcGxheScgOiAnbm9uZSd9KTtcblx0XHRcblx0XHRpZiAodGhpcy5jYiAmJiB0eXBlb2YodGhpcy5jYikgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdHRoaXMuY2IoKTtcblx0XHR9XG5cblx0fVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgUHJlbG9hZGVyO1xuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuLi9BYnN0cmFjdFZpZXcnO1xuaW1wb3J0IEhvbWVWaWV3IGZyb20gJy4uL2hvbWUvSG9tZVZpZXcnO1xuaW1wb3J0IEV4YW1wbGVQYWdlVmlldyBmcm9tICcuLi9leGFtcGxlUGFnZS9FeGFtcGxlUGFnZVZpZXcnO1xuaW1wb3J0IE5hdiBmcm9tICcuLi8uLi9yb3V0ZXIvTmF2JztcblxuY29uc3QgV3JhcHBlciA9IEFic3RyYWN0Vmlldy5leHRlbmQoe1xuXG5cdFZJRVdfVFlQRV9QQUdFICA6ICdwYWdlJyxcblx0VklFV19UWVBFX01PREFMIDogJ21vZGFsJyxcblxuXHR0ZW1wbGF0ZSA6ICd3cmFwcGVyJyxcblxuXHR2aWV3cyAgICAgICAgICA6IG51bGwsXG5cdHByZXZpb3VzVmlldyAgIDogbnVsbCxcblx0Y3VycmVudFZpZXcgICAgOiBudWxsLFxuXHRiYWNrZ3JvdW5kVmlldyA6IG51bGwsXG5cblx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy52aWV3cyA9IHtcblx0XHRcdGhvbWUgOiB7XG5cdFx0XHRcdGNsYXNzUmVmIDogSG9tZVZpZXcsXG5cdFx0XHRcdHJvdXRlICAgIDogdGhpcy5fX05BTUVTUEFDRV9fKCkubmF2LnNlY3Rpb25zLkhPTUUsXG5cdFx0XHRcdHZpZXcgICAgIDogbnVsbCxcblx0XHRcdFx0dHlwZSAgICAgOiB0aGlzLlZJRVdfVFlQRV9QQUdFXG5cdFx0XHR9LFxuXHRcdFx0ZXhhbXBsZSA6IHtcblx0XHRcdFx0Y2xhc3NSZWYgOiBFeGFtcGxlUGFnZVZpZXcsXG5cdFx0XHRcdHJvdXRlICAgIDogdGhpcy5fX05BTUVTUEFDRV9fKCkubmF2LnNlY3Rpb25zLkVYQU1QTEUsXG5cdFx0XHRcdHZpZXcgICAgIDogbnVsbCxcblx0XHRcdFx0dHlwZSAgICAgOiB0aGlzLlZJRVdfVFlQRV9QQUdFXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuY3JlYXRlQ2xhc3NlcygpO1xuXG5cdFx0V3JhcHBlci5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyk7XG5cblx0XHQvLyBkZWNpZGUgaWYgeW91IHdhbnQgdG8gYWRkIGFsbCBjb3JlIERPTSB1cCBmcm9udCwgb3IgYWRkIG9ubHkgd2hlbiByZXF1aXJlZCwgc2VlIGNvbW1lbnRzIGluIEFic3RyYWN0Vmlld1BhZ2UuY29mZmVlXG5cdFx0Ly8gQGFkZENsYXNzZXMoKVxuXG5cdH0sXG5cblx0Y3JlYXRlQ2xhc3NlczogZnVuY3Rpb24oKSB7XG5cblx0XHRmb3IgKGxldCBrZXkgaW4gdGhpcy52aWV3cykge1xuXG5cdFx0XHR0aGlzLnZpZXdzW2tleV0udmlldyA9IG5ldyB0aGlzLnZpZXdzW2tleV0uY2xhc3NSZWY7XG5cblx0XHR9XG5cblx0fSxcblxuXHRhZGRDbGFzc2VzOiBmdW5jdGlvbigpIHtcblxuXHRcdGZvciAobGV0IGtleSBpbiB0aGlzLnZpZXdzKSB7XG5cblx0XHRcdGlmICh0aGlzLnZpZXdzW2tleV0udHlwZSA9PT0gdGhpcy5WSUVXX1RZUEVfUEFHRSkge1xuXHRcdFx0XHR0aGlzLmFkZENoaWxkKHRoaXMudmlld3Nba2V5XS52aWV3KTtcblx0XHRcdH1cblxuXHRcdH1cblxuXHR9LFxuXG5cdGdldFZpZXdCeVJvdXRlOiBmdW5jdGlvbihyb3V0ZSkge1xuXG5cdFx0bGV0IHZpZXcgPSBmYWxzZTtcblxuXHRcdGZvciAobGV0IGtleSBpbiB0aGlzLnZpZXdzKSB7XG5cblx0XHRcdGlmICh0aGlzLnZpZXdzW2tleV0ucm91dGUgPT09IHJvdXRlKSB7XG5cdFx0XHRcdHZpZXcgPSB0aGlzLnZpZXdzW2tleV07XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdmlldztcblxuXHR9LFxuXG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy5fX05BTUVTUEFDRV9fKCkuYXBwVmlldy5vbignc3RhcnQnLCB0aGlzLnN0YXJ0LmJpbmQodGhpcykpO1xuXG5cdH0sXG5cblx0c3RhcnQ6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy5fX05BTUVTUEFDRV9fKCkuYXBwVmlldy5vZmYoJ3N0YXJ0JywgdGhpcy5zdGFydC5iaW5kKHRoaXMpKTtcblxuXHRcdHRoaXMuYmluZEV2ZW50cygpO1xuXG5cdH0sXG5cblx0YmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLl9fTkFNRVNQQUNFX18oKS5uYXYub24oTmF2LkVWRU5UX0NIQU5HRV9WSUVXLCB0aGlzLmNoYW5nZVZpZXcuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy5fX05BTUVTUEFDRV9fKCkubmF2Lm9uKE5hdi5FVkVOVF9DSEFOR0VfU1VCX1ZJRVcsIHRoaXMuY2hhbmdlU3ViVmlldy5iaW5kKHRoaXMpKTtcblxuXHR9LFxuXG5cdC8qXG5cblx0VEhJUyBJUyBBIE1FU1MsIFNPUlQgSVQgKG5laWwpXG5cblx0Ki9cblx0Y2hhbmdlVmlldzogZnVuY3Rpb24ocHJldmlvdXMsIGN1cnJlbnQpIHtcblxuXHRcdGNvbnNvbGUubG9nKFwiY2hhbmdlVmlldzogZnVuY3Rpb24ocHJldmlvdXMsIGN1cnJlbnQpIHtcIiwgcHJldmlvdXMsIGN1cnJlbnQpO1xuXG5cdFx0dGhpcy5wcmV2aW91c1ZpZXcgPSB0aGlzLmdldFZpZXdCeVJvdXRlKHByZXZpb3VzLmFyZWEpO1xuXHRcdHRoaXMuY3VycmVudFZpZXcgID0gdGhpcy5nZXRWaWV3QnlSb3V0ZShjdXJyZW50LmFyZWEpO1xuXG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzLnByZXZpb3VzVmlld1wiLCB0aGlzLnByZXZpb3VzVmlldyk7XG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzLmN1cnJlbnRWaWV3XCIsIHRoaXMuY3VycmVudFZpZXcpO1xuXG5cdFx0aWYgKCF0aGlzLnByZXZpb3VzVmlldykge1xuXG5cdFx0XHRpZiAodGhpcy5jdXJyZW50Vmlldy50eXBlID09PSB0aGlzLlZJRVdfVFlQRV9QQUdFKSB7XG5cdFx0XHRcdHRoaXMudHJhbnNpdGlvblZpZXdzKGZhbHNlLCB0aGlzLmN1cnJlbnRWaWV3LnZpZXcpO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmN1cnJlbnRWaWV3LnR5cGUgPT09IHRoaXMuVklFV19UWVBFX01PREFMKSB7XG5cdFx0XHRcdHRoaXMuYmFja2dyb3VuZFZpZXcgPSB0aGlzLnZpZXdzLmhvbWU7XG5cdFx0XHRcdHRoaXMudHJhbnNpdGlvblZpZXdzKGZhbHNlLCB0aGlzLmN1cnJlbnRWaWV3LnZpZXcsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKHRoaXMuY3VycmVudFZpZXcudHlwZSA9PT0gdGhpcy5WSUVXX1RZUEVfUEFHRSAmJiB0aGlzLnByZXZpb3VzVmlldy50eXBlID09PSB0aGlzLlZJRVdfVFlQRV9QQUdFKSB7XG5cdFx0XHRcdHRoaXMudHJhbnNpdGlvblZpZXdzKHRoaXMucHJldmlvdXNWaWV3LnZpZXcsIHRoaXMuY3VycmVudFZpZXcudmlldyk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuY3VycmVudFZpZXcudHlwZSA9PT0gdGhpcy5WSUVXX1RZUEVfTU9EQUwgJiYgdGhpcy5wcmV2aW91c1ZpZXcudHlwZSA9PT0gdGhpcy5WSUVXX1RZUEVfUEFHRSkge1xuXHRcdFx0XHR0aGlzLmJhY2tncm91bmRWaWV3ID0gdGhpcy5wcmV2aW91c1ZpZXc7XG5cdFx0XHRcdHRoaXMudHJhbnNpdGlvblZpZXdzKGZhbHNlLCB0aGlzLmN1cnJlbnRWaWV3LnZpZXcsIHRydWUpO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmN1cnJlbnRWaWV3LnR5cGUgPT09IHRoaXMuVklFV19UWVBFX1BBR0UgJiYgdGhpcy5wcmV2aW91c1ZpZXcudHlwZSA9PT0gdGhpcy5WSUVXX1RZUEVfTU9EQUwpIHtcblx0XHRcdFx0dGhpcy5iYWNrZ3JvdW5kVmlldyA9IHRoaXMuYmFja2dyb3VuZFZpZXcgfHwgdGhpcy52aWV3cy5ob21lO1xuXHRcdFx0XHRpZiAodGhpcy5iYWNrZ3JvdW5kVmlldyAhPT0gdGhpcy5jdXJyZW50Vmlldykge1xuXHRcdFx0XHRcdHRoaXMudHJhbnNpdGlvblZpZXdzKHRoaXMucHJldmlvdXNWaWV3LnZpZXcsIHRoaXMuY3VycmVudFZpZXcudmlldywgZmFsc2UsIHRydWUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHRoaXMuYmFja2dyb3VuZFZpZXcgPT09IHRoaXMuY3VycmVudFZpZXcpIHtcblx0XHRcdFx0XHR0aGlzLnRyYW5zaXRpb25WaWV3cyh0aGlzLnByZXZpb3VzVmlldy52aWV3LCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAodGhpcy5jdXJyZW50Vmlldy50eXBlID09PSB0aGlzLlZJRVdfVFlQRV9NT0RBTCAmJiB0aGlzLnByZXZpb3VzVmlldy50eXBlID09PSB0aGlzLlZJRVdfVFlQRV9NT0RBTCkge1xuXHRcdFx0XHR0aGlzLmJhY2tncm91bmRWaWV3ID0gdGhpcy5iYWNrZ3JvdW5kVmlldyB8fCB0aGlzLnZpZXdzLmhvbWU7XG5cdFx0XHRcdHRoaXMudHJhbnNpdGlvblZpZXdzKHRoaXMucHJldmlvdXNWaWV3LnZpZXcsIHRoaXMuY3VycmVudFZpZXcudmlldywgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fSxcblxuXHRjaGFuZ2VTdWJWaWV3OiBmdW5jdGlvbihjdXJyZW50KSB7XG5cblx0XHR0aGlzLmN1cnJlbnRWaWV3LnZpZXcudHJpZ2dlcihOYXYuRVZFTlRfQ0hBTkdFX1NVQl9WSUVXLCBjdXJyZW50LnN1Yik7XG5cblx0fSxcblxuXHR0cmFuc2l0aW9uVmlld3M6IGZ1bmN0aW9uKGZyb20sIHRvLCB0b01vZGFsPWZhbHNlLCBmcm9tTW9kYWw9ZmFsc2UpIHtcblxuXHRcdGNvbnNvbGUubG9nKFwidHJhbnNpdGlvblZpZXdzOiBmdW5jdGlvbihmcm9tLCB0bywgdG9Nb2RhbD1mYWxzZSwgZnJvbU1vZGFsPWZhbHNlKSB7XCIsIGZyb20sIHRvKTtcblxuXHRcdGlmIChmcm9tID09PSB0bykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0b01vZGFsICYmIHRoaXMuYmFja2dyb3VuZFZpZXcudmlldykge1xuXHRcdFx0dGhpcy5iYWNrZ3JvdW5kVmlldy52aWV3LnNob3coKTtcblx0XHR9XG5cblx0XHRpZiAoZnJvbU1vZGFsICYmIHRoaXMuYmFja2dyb3VuZFZpZXcudmlldykge1xuXHRcdFx0dGhpcy5iYWNrZ3JvdW5kVmlldy52aWV3LmhpZGUoKTtcblx0XHR9XG5cblx0XHRpZiAoZnJvbSAmJiB0bykge1xuXHRcdFx0ZnJvbS5oaWRlKHRvLnNob3cuYmluZCh0bykpO1xuXHRcdH0gZWxzZSBpZiAoZnJvbSkge1xuXHRcdFx0ZnJvbS5oaWRlKCk7XG5cdFx0fSBlbHNlIGlmICh0bykge1xuXHRcdFx0dG8uc2hvdygpO1xuXHRcdH1cblxuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBXcmFwcGVyO1xuIiwiaW1wb3J0IEFic3RyYWN0Vmlld1BhZ2UgZnJvbSAnLi4vQWJzdHJhY3RWaWV3UGFnZSc7XG5cbmNvbnN0IEV4YW1wbGVQYWdlVmlldyA9IEFic3RyYWN0Vmlld1BhZ2UuZXh0ZW5kKHtcblxuXHR0ZW1wbGF0ZSA6ICdwYWdlLWV4YW1wbGUnLFxuXG5cdGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMudGVtcGxhdGVWYXJzID0ge1xuXHRcdFx0ZGVzYyA6IHRoaXMuX19OQU1FU1BBQ0VfXygpLmxvY2FsZS5nZXQoXCJleGFtcGxlX2Rlc2NcIilcblx0XHR9O1xuXG5cdFx0LypcblxuXHRcdGluc3RhbnRpYXRlIGNsYXNzZXMgaGVyZVxuXG5cdFx0dGhpcy5leGFtcGxlQ2xhc3MgPSBuZXcgRXhhbXBsZUNsYXNzKCk7XG5cblx0XHQqL1xuXG5cdFx0RXhhbXBsZVBhZ2VWaWV3Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzKTtcblxuXHRcdC8qXG5cblx0XHRhZGQgY2xhc3NlcyB0byBhcHAgc3RydWN0dXJlIGhlcmVcblxuXHRcdHRoaXNcblx0XHRcdC5hZGRDaGlsZCh0aGlzLmV4YW1wbGVDbGFzcyk7XG5cblx0XHQqL1xuXG5cdH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgRXhhbXBsZVBhZ2VWaWV3O1xuIiwiaW1wb3J0IEFic3RyYWN0Vmlld1BhZ2UgZnJvbSAnLi4vQWJzdHJhY3RWaWV3UGFnZSc7XG5cbmNvbnN0IEhvbWVWaWV3ID0gQWJzdHJhY3RWaWV3UGFnZS5leHRlbmQoe1xuXG5cdHRlbXBsYXRlIDogJ3BhZ2UtaG9tZScsXG5cblx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy50ZW1wbGF0ZVZhcnMgPSB7XG5cdFx0XHRkZXNjIDogdGhpcy5fX05BTUVTUEFDRV9fKCkubG9jYWxlLmdldChcImhvbWVfZGVzY1wiKVxuXHRcdH07XG5cblx0XHQvKlxuXG5cdFx0aW5zdGFudGlhdGUgY2xhc3NlcyBoZXJlXG5cblx0XHR0aGlzLmV4YW1wbGVDbGFzcyA9IG5ldyBFeGFtcGxlQ2xhc3MoKTtcblxuXHRcdCovXG5cblx0XHRIb21lVmlldy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyk7XG5cblx0XHQvKlxuXG5cdFx0YWRkIGNsYXNzZXMgdG8gYXBwIHN0cnVjdHVyZSBoZXJlXG5cblx0XHR0aGlzXG5cdFx0XHQuYWRkQ2hpbGQodGhpcy5leGFtcGxlQ2xhc3MpO1xuXG5cdFx0Ki9cblxuXHR9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEhvbWVWaWV3O1xuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuLi9BYnN0cmFjdFZpZXcnO1xuXG5jb25zdCBBYnN0cmFjdE1vZGFsID0gQWJzdHJhY3RWaWV3LmV4dGVuZCh7XG5cblx0JHdpbmRvdyA6IG51bGwsXG5cblx0Ly8gb3ZlcnJpZGUgaW4gaW5kaXZpZHVhbCBjbGFzc2VzXG5cdG5hbWUgICAgIDogbnVsbCxcblx0dGVtcGxhdGUgOiBudWxsLFxuXG5cdGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMuJHdpbmRvdyA9ICQod2luZG93KTtcblxuXHRcdEFic3RyYWN0TW9kYWwuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMpO1xuXG5cdFx0dGhpcy5fX05BTUVTUEFDRV9fKCkuYXBwVmlldy5hZGRDaGlsZCh0aGlzKTtcblx0XHR0aGlzLnNldExpc3RlbmVycygnb24nKTtcblx0XHR0aGlzLmFuaW1hdGVJbigpO1xuXG5cdH0sXG5cblx0aGlkZTogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLmFuaW1hdGVPdXQoICgpID0+IHtcblx0XHRcdHRoaXMuX19OQU1FU1BBQ0VfXygpLmFwcFZpZXcucmVtb3ZlKHRoaXMpO1xuXHRcdH0pO1xuXG5cdH0sXG5cblx0ZGlzcG9zZTogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLnNldExpc3RlbmVycygnb2ZmJyk7XG5cdFx0dGhpcy5fX05BTUVTUEFDRV9fKCkuYXBwVmlldy5tb2RhbE1hbmFnZXIubW9kYWxzW3RoaXMubmFtZV0udmlldyA9IG51bGw7XG5cblx0fSxcblxuXHRzZXRMaXN0ZW5lcnM6IGZ1bmN0aW9uKHNldHRpbmcpIHtcblxuXHRcdHRoaXMuJHdpbmRvd1tzZXR0aW5nXSgna2V5dXAnLCB0aGlzLm9uS2V5VXAuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy4kKCdbZGF0YS1jbG9zZV0nKVtzZXR0aW5nXSgnY2xpY2snLCB0aGlzLmNsb3NlQ2xpY2suYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHRvbktleVVwOiBmdW5jdGlvbihlKSB7XG5cblx0XHRpZiAoZS5rZXlDb2RlID09PSAyNylcblx0XHRcdHRoaXMuaGlkZSgpO1xuXG5cdH0sXG5cblx0YW5pbWF0ZUluOiBmdW5jdGlvbigpIHtcblxuXHRcdFR3ZWVuTGl0ZS50byh0aGlzLiRlbCwgMC4zLCB7ICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnLCAnb3BhY2l0eSc6IDEsIGVhc2UgOiBRdWFkLmVhc2VPdXQgfSk7XG5cdFx0VHdlZW5MaXRlLnRvKHRoaXMuJGVsLmZpbmQoJy5pbm5lcicpLCAwLjMsIHsgZGVsYXkgOiAwLjE1LCAndHJhbnNmb3JtJzogJ3NjYWxlKDEpJywgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsICdvcGFjaXR5JzogMSwgZWFzZSA6IEJhY2suZWFzZU91dCB9KTtcblxuXHR9LFxuXG5cdGFuaW1hdGVPdXQ6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cblx0XHRUd2VlbkxpdGUudG8odGhpcy4kZWwsIDAuMywgeyBkZWxheSA6IDAuMTUsICdvcGFjaXR5JzogMCwgZWFzZSA6IFF1YWQuZWFzZU91dCwgb25Db21wbGV0ZTogY2FsbGJhY2sgfSk7XG5cdFx0VHdlZW5MaXRlLnRvKHRoaXMuJGVsLmZpbmQoJy5pbm5lcicpLCAwLjMsIHsgJ3RyYW5zZm9ybSc6ICdzY2FsZSgwLjgpJywgJ29wYWNpdHknOiAwLCBlYXNlIDogQmFjay5lYXNlSW4gfSk7XG5cblx0fSxcblxuXHRjbG9zZUNsaWNrOiBmdW5jdGlvbihlKSB7XG5cblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHR0aGlzLmhpZGUoKTtcblxuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdE1vZGFsO1xuIiwiaW1wb3J0IEFic3RyYWN0TW9kYWwgZnJvbSAnLi9BYnN0cmFjdE1vZGFsJztcblxuY29uc3QgT3JpZW50YXRpb25Nb2RhbCA9IEFic3RyYWN0TW9kYWwuZXh0ZW5kKHtcblxuXHRuYW1lICAgICA6ICdvcmllbnRhdGlvbk1vZGFsJyxcblx0dGVtcGxhdGUgOiAnb3JpZW50YXRpb24tbW9kYWwnLFxuXG5cdGNiIDogbnVsbCxcblxuXHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24oY2IpIHtcblxuXHRcdHRoaXMuY2IgPSBjYjtcblxuXHRcdHRoaXMudGVtcGxhdGVWYXJzID0geyBuYW1lOiB0aGlzLm5hbWUgfTtcblxuXHRcdE9yaWVudGF0aW9uTW9kYWwuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMpO1xuXG5cdH0sXG5cblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cblx0fSxcblxuXHRoaWRlOiBmdW5jdGlvbihzdGlsbExhbmRzY2FwZT10cnVlKSB7XG5cblx0XHR0aGlzLmFuaW1hdGVPdXQoICgpID0+IHtcblx0XHRcdHRoaXMuX19OQU1FU1BBQ0VfXygpLmFwcFZpZXcucmVtb3ZlKHRoaXMpO1xuXHRcdFx0aWYgKCFzdGlsbExhbmRzY2FwZSAmJiBjYiAmJiB0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0Y2IoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9LFxuXG5cdHNldExpc3RlbmVyczogZnVuY3Rpb24oc2V0dGluZykge1xuXG5cdFx0T3JpZW50YXRpb25Nb2RhbC5fX3N1cGVyX18uc2V0TGlzdGVuZXJzLmFwcGx5KHRoaXMsIFtzZXR0aW5nXSk7XG5cblx0XHR0aGlzLl9fTkFNRVNQQUNFX18oKS5hcHBWaWV3W3NldHRpbmddKCd1cGRhdGVEaW1zJywgdGhpcy5vblVwZGF0ZURpbXMuYmluZCh0aGlzKSk7XG5cdFx0dGhpcy4kZWxbc2V0dGluZ10oJ3RvdWNoZW5kIGNsaWNrJywgdGhpcy5oaWRlLmJpbmQodGhpcykpO1xuXG5cdH0sXG5cblx0b25VcGRhdGVEaW1zOiBmdW5jdGlvbihkaW1zKSB7XG5cblx0XHRpZiAoZGltcy5vID09PSAncG9ydHJhaXQnKSB7XG5cdFx0XHR0aGlzLmhpZGUoZmFsc2UpO1xuXHRcdH1cblxuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBPcmllbnRhdGlvbk1vZGFsO1xuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuLi9BYnN0cmFjdFZpZXcnO1xuaW1wb3J0IE9yaWVudGF0aW9uTW9kYWwgZnJvbSAnLi9PcmllbnRhdGlvbk1vZGFsJztcblxuY29uc3QgTW9kYWxNYW5hZ2VyID0gQWJzdHJhY3RWaWV3LmV4dGVuZCh7XG5cblx0Ly8gd2hlbiBuZXcgbW9kYWwgY2xhc3NlcyBhcmUgY3JlYXRlZCwgYWRkIGhlcmUsIHdpdGggcmVmZXJlbmNlIHRvIGNsYXNzIG5hbWVcblx0bW9kYWxzOiB7XG5cdFx0b3JpZW50YXRpb25Nb2RhbCA6IHsgY2xhc3NSZWYgOiBPcmllbnRhdGlvbk1vZGFsLCB2aWV3IDogbnVsbCB9XG5cdH0sXG5cblx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xuXG5cdFx0TW9kYWxNYW5hZ2VyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzKTtcblxuXHR9LFxuXG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xuXG5cdH0sXG5cblx0aXNPcGVuOiBmdW5jdGlvbigpIHtcblxuXHRcdGxldCBtb2RhbElzT3BlbiA9IGZhbHNlO1xuXG5cdFx0Zm9yIChsZXQga2V5IGluIHRoaXMubW9kYWxzKSB7XG5cblx0XHRcdGlmICh0aGlzLm1vZGFsc1trZXldLnZpZXcpIHtcblx0XHRcdFx0bW9kYWxJc09wZW4gPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1vZGFsSXNPcGVuO1xuXG5cdH0sXG5cblx0aGlkZU9wZW5Nb2RhbDogZnVuY3Rpb24oKSB7XG5cblx0XHRsZXQgb3Blbk1vZGFsID0gbnVsbDtcblxuXHRcdGZvciAobGV0IGtleSBpbiB0aGlzLm1vZGFscykge1xuXG5cdFx0XHRpZiAodGhpcy5tb2RhbHNba2V5XS52aWV3KSB7XG5cdFx0XHRcdG9wZW5Nb2RhbCA9IHRoaXMubW9kYWxzW2tleV0udmlldztcblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGlmIChvcGVuTW9kYWwpIHtcblx0XHRcdG9wZW5Nb2RhbC5oaWRlKCk7XG5cdFx0fVxuXG5cdH0sXG5cblx0c2hvd01vZGFsOiBmdW5jdGlvbihuYW1lLCBjYj1udWxsKSB7XG5cblx0XHRpZiAodGhpcy5tb2RhbHNbbmFtZV0udmlldykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMubW9kYWxzW25hbWVdLnZpZXcgPSBuZXcgdGhpcy5tb2RhbHNbbmFtZV0uY2xhc3NSZWYoY2IpO1xuXG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IE1vZGFsTWFuYWdlcjtcbiJdfQ==
