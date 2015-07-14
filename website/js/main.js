(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

// PRODUCTION ENVIRONMENT - may want to use server-set variables here
// IS_LIVE = do -> return if window.location.host.indexOf('localhost') > -1 or window.location.search is '?d' then false else true

/*

WIP - this will ideally change to old format (above) when can figure it out

*/

var IS_LIVE = false;

// ONLY EXPOSE APP GLOBALLY IF LOCAL OR DEV'ING
var view = IS_LIVE ? {} : window || document;

// DECLARE MAIN APPLICATION
view.__NAMESPACE__ = new _App2['default'](IS_LIVE);
view.__NAMESPACE__.init();

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
    function App(LIVE) {
        _classCallCheck(this, App);

        this.LIVE = null;
        this.BASE_PATH = window.config.hostname;
        this.localeCode = window.config.localeCode;
        this.objReady = 0;

        this.LIVE = LIVE;
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
        key: 'objectComplete',
        value: function objectComplete() {
            this.objReady++;

            if (this.objReady >= 4) {
                this.initApp();
            }
        }
    }, {
        key: 'init',
        value: function init() {
            this.initObjects();
        }
    }, {
        key: 'initObjects',
        value: function initObjects() {
            this.templates = new _dataTemplates2['default']('/data/templates.xml', this.objectComplete.bind(this));
            this.locale = new _dataLocale2['default']('/data/locales/strings.json', this.objectComplete.bind(this));
            this.analytics = new _utilsAnalytics2['default']('/data/tracking.json', this.objectComplete.bind(this));
            this.appData = new _AppData2['default'](this.objectComplete.bind(this));

            // if new objects are added don't forget to change the `this.objectComplete` function
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

            /* Starts application */
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
            /* After everything is loaded, kicks off website */
            this.appView.render();

            /* remove redundant initialisation methods / properties */
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
    }], [{
        key: '_toClean',
        value: ['objReady', 'setFlags', 'objectComplete', 'init', 'initObjects', 'initSDKs', 'initApp', 'go', 'cleanup'],
        enumerable: true
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
    function AppData(callback) {
        _classCallCheck(this, AppData);

        _get(Object.getPrototypeOf(AppData.prototype), 'constructor', this).call(this);

        this.callback = null;
        /*
         add all data classes here
         */

        this.callback = callback;

        this.getStartData();
    }

    _inherits(AppData, _AbstractData);

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
        var e = arguments[1] === undefined ? null : arguments[1];

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
	function TemplatesCollection() {
		_classCallCheck(this, TemplatesCollection);

		_get(Object.getPrototypeOf(TemplatesCollection.prototype), 'constructor', this).apply(this, arguments);

		this.model = _modelsCoreTemplateModel2['default'];
	}

	_inherits(TemplatesCollection, _Backbone$Collection);

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
    function APIRouteModel() {
        _classCallCheck(this, APIRouteModel);

        _get(Object.getPrototypeOf(APIRouteModel.prototype), "constructor", this).call(this, modelDefaults);
    }

    _inherits(APIRouteModel, _Backbone$DeepModel);

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
    function LocalesModel() {
        _classCallCheck(this, LocalesModel);

        _get(Object.getPrototypeOf(LocalesModel.prototype), 'constructor', this).apply(this, arguments);

        this.defaults = {
            code: null,
            language: null,
            strings: null
        };
    }

    _inherits(LocalesModel, _Backbone$Model);

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
	function TemplateModel() {
		_classCallCheck(this, TemplateModel);

		_get(Object.getPrototypeOf(TemplateModel.prototype), "constructor", this).apply(this, arguments);

		this.defaults = {
			id: "",
			text: ""
		};
	}

	_inherits(TemplateModel, _Backbone$Model);

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
        var area = arguments[0] === undefined ? null : arguments[0];
        var sub = arguments[1] === undefined ? null : arguments[1];

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
	function AuthManager() {
		_classCallCheck(this, AuthManager);

		_get(Object.getPrototypeOf(AuthManager.prototype), 'constructor', this).call(this);

		this.userData = null;
		this.process = false;
		this.processTimer = null;
		this.processWait = 5000;
	}

	_inherits(AuthManager, _AbstractData);

	_createClass(AuthManager, [{
		key: 'login',
		value: function login(service) {
			var _this = this;

			var cb = arguments[1] === undefined ? null : arguments[1];

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
			var cb = arguments[0] === undefined ? null : arguments[0];

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
	function Facebook() {
		_classCallCheck(this, Facebook);

		_get(Object.getPrototypeOf(Facebook.prototype), 'constructor', this).apply(this, arguments);
	}

	_inherits(Facebook, _AbstractData);

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
	function GooglePlus() {
		_classCallCheck(this, GooglePlus);

		_get(Object.getPrototypeOf(GooglePlus.prototype), 'constructor', this).apply(this, arguments);
	}

	_inherits(GooglePlus, _AbstractData);

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
            var url = arguments[0] === undefined ? '' : arguments[0];

            url = encodeURIComponent(url || this.url);

            this.openWin('https://plus.google.com/share?url=' + url, 650, 385);
        }
    }, {
        key: 'pinterest',
        value: function pinterest() {
            var url = arguments[0] === undefined ? '' : arguments[0];
            var media = arguments[1] === undefined ? '' : arguments[1];
            var descr = arguments[2] === undefined ? '' : arguments[2];

            url = encodeURIComponent(url || this.url);
            media = encodeURIComponent(media);
            descr = encodeURIComponent(descr);

            this.openWin('http://www.pinterest.com/pin/create/button/?url=' + url + '&media=' + media + '&description=' + descr, 735, 310);
        }
    }, {
        key: 'tumblr',
        value: function tumblr() {
            var url = arguments[0] === undefined ? '' : arguments[0];
            var media = arguments[1] === undefined ? '' : arguments[1];
            var descr = arguments[2] === undefined ? '' : arguments[2];

            url = encodeURIComponent(url || this.url);
            media = encodeURIComponent(media);
            descr = encodeURIComponent(descr);

            this.openWin('http://www.tumblr.com/share/photo?source=' + media + '&caption=' + descr + '&click_thru=' + url, 450, 430);
        }
    }, {
        key: 'facebook',
        value: function facebook() {
            var url = arguments[0] === undefined ? '' : arguments[0];
            var copy = arguments[1] === undefined ? '' : arguments[1];

            url = encodeURIComponent(url || this.url);
            var decsr = encodeURIComponent(copy);

            this.openWin('http://www.facebook.com/share.php?u=' + url + '&t=' + decsr, 600, 300);
        }
    }, {
        key: 'twitter',
        value: function twitter() {
            var url = arguments[0] === undefined ? '' : arguments[0];
            var copy = arguments[1] === undefined ? '' : arguments[1];

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
            var url = arguments[0] === undefined ? '' : arguments[0];

            url = encodeURIComponent(url || this.url);

            this.openWin('http://share.renren.com/share/buttonshare.do?link=' + url, 600, 300);
        }
    }, {
        key: 'weibo',
        value: function weibo() {
            var url = arguments[0] === undefined ? '' : arguments[0];

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
		var prepend = arguments[1] === undefined ? false : arguments[1];

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
		var toModal = arguments[2] === undefined ? false : arguments[2];
		var fromModal = arguments[3] === undefined ? false : arguments[3];

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

		var stillLandscape = arguments[0] === undefined ? true : arguments[0];

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
		var cb = arguments[1] === undefined ? null : arguments[1];

		if (this.modals[name].view) {
			return;
		}

		this.modals[name].view = new this.modals[name].classRef(cb);
	}

});

exports['default'] = ModalManager;
module.exports = exports['default'];

},{"../AbstractView":22,"./OrientationModal":31}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL1NvdXJjZS5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3Byb2plY3QvanMvQXBwLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy9BcHBEYXRhLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy9BcHBWaWV3LmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy9jb2xsZWN0aW9ucy9jb3JlL1RlbXBsYXRlc0NvbGxlY3Rpb24uanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL2RhdGEvQVBJLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy9kYXRhL0Fic3RyYWN0RGF0YS5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3Byb2plY3QvanMvZGF0YS9Mb2NhbGUuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL2RhdGEvVGVtcGxhdGVzLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy9tb2RlbHMvY29yZS9BUElSb3V0ZU1vZGVsLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy9tb2RlbHMvY29yZS9Mb2NhbGVzTW9kZWwuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL21vZGVscy9jb3JlL1RlbXBsYXRlTW9kZWwuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL3JvdXRlci9OYXYuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL3JvdXRlci9Sb3V0ZXIuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL3V0aWxzL0FuYWx5dGljcy5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3Byb2plY3QvanMvdXRpbHMvQXV0aE1hbmFnZXIuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL3V0aWxzL0ZhY2Vib29rLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy91dGlscy9Hb29nbGVQbHVzLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy91dGlscy9NZWRpYVF1ZXJpZXMuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL3V0aWxzL1JlcXVlc3Rlci5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3Byb2plY3QvanMvdXRpbHMvU2hhcmUuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL3ZpZXcvQWJzdHJhY3RWaWV3LmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy92aWV3L0Fic3RyYWN0Vmlld1BhZ2UuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL3ZpZXcvYmFzZS9Gb290ZXIuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL3ZpZXcvYmFzZS9IZWFkZXIuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL3ZpZXcvYmFzZS9QcmVsb2FkZXIuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9wcm9qZWN0L2pzL3ZpZXcvYmFzZS9XcmFwcGVyLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy92aWV3L2V4YW1wbGVQYWdlL0V4YW1wbGVQYWdlVmlldy5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3Byb2plY3QvanMvdmlldy9ob21lL0hvbWVWaWV3LmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy92aWV3L21vZGFscy9BYnN0cmFjdE1vZGFsLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy92aWV3L21vZGFscy9PcmllbnRhdGlvbk1vZGFsLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvcHJvamVjdC9qcy92aWV3L21vZGFscy9fTW9kYWxNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OzttQkNBZ0IsT0FBTzs7Ozs7Ozs7Ozs7OztBQVd2QixJQUFNLE9BQU8sR0FBRyxLQUFLLENBQUM7OztBQUd0QixJQUFNLElBQUksR0FBRyxPQUFPLEdBQUcsRUFBRSxHQUFJLE1BQU0sSUFBSSxRQUFRLENBQUU7OztBQUdqRCxJQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFRLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs4QkNsQkosbUJBQW1COzs7O2dDQUNqQixxQkFBcUI7Ozs7MEJBQzNCLGVBQWU7Ozs7NkJBQ1osa0JBQWtCOzs7OytCQUNoQixvQkFBb0I7Ozs7NkJBQ3JCLGtCQUFrQjs7OzswQkFDckIsZUFBZTs7Ozs0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SUFDbkI7R0FFRDs7QUFFRCxTQUFPLFdBQVcsQ0FBQztFQUVuQjs7QUFFRCxjQUFhLEVBQUUseUJBQVc7O0FBRXpCLE1BQUksU0FBUyxHQUFHLElBQUksQ0FBQzs7QUFFckIsT0FBSyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztBQUU1QixPQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQzFCLGFBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNsQztHQUVEOztBQUVELE1BQUksU0FBUyxFQUFFO0FBQ2QsWUFBUyxDQUFDLElBQUksRUFBRSxDQUFDO0dBQ2pCO0VBRUQ7O0FBRUQsVUFBUyxFQUFFLG1CQUFTLElBQUksRUFBVztNQUFULEVBQUUsZ0NBQUMsSUFBSTs7QUFFaEMsTUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtBQUMzQixVQUFPO0dBQ1A7O0FBRUQsTUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUU1RDs7Q0FFRCxDQUFDLENBQUM7O3FCQUVZLFlBQVkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XG5cbi8vIFBST0RVQ1RJT04gRU5WSVJPTk1FTlQgLSBtYXkgd2FudCB0byB1c2Ugc2VydmVyLXNldCB2YXJpYWJsZXMgaGVyZVxuLy8gSVNfTElWRSA9IGRvIC0+IHJldHVybiBpZiB3aW5kb3cubG9jYXRpb24uaG9zdC5pbmRleE9mKCdsb2NhbGhvc3QnKSA+IC0xIG9yIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggaXMgJz9kJyB0aGVuIGZhbHNlIGVsc2UgdHJ1ZVxuXG4vKlxuXG5XSVAgLSB0aGlzIHdpbGwgaWRlYWxseSBjaGFuZ2UgdG8gb2xkIGZvcm1hdCAoYWJvdmUpIHdoZW4gY2FuIGZpZ3VyZSBpdCBvdXRcblxuKi9cblxuY29uc3QgSVNfTElWRSA9IGZhbHNlO1xuXG4vLyBPTkxZIEVYUE9TRSBBUFAgR0xPQkFMTFkgSUYgTE9DQUwgT1IgREVWJ0lOR1xuY29uc3QgdmlldyA9IElTX0xJVkUgPyB7fSA6ICh3aW5kb3cgfHwgZG9jdW1lbnQpO1xuXG4vLyBERUNMQVJFIE1BSU4gQVBQTElDQVRJT05cbnZpZXcuX19OQU1FU1BBQ0VfXyA9IG5ldyBBcHAoSVNfTElWRSk7XG52aWV3Ll9fTkFNRVNQQUNFX18uaW5pdCgpO1xuIiwiaW1wb3J0IEFuYWx5dGljcyBmcm9tICcuL3V0aWxzL0FuYWx5dGljcyc7XG5pbXBvcnQgQXV0aE1hbmFnZXIgZnJvbSAnLi91dGlscy9BdXRoTWFuYWdlcic7XG5pbXBvcnQgU2hhcmUgZnJvbSAnLi91dGlscy9TaGFyZSc7XG5pbXBvcnQgRmFjZWJvb2sgZnJvbSAnLi91dGlscy9GYWNlYm9vayc7XG5pbXBvcnQgR29vZ2xlUGx1cyBmcm9tICcuL3V0aWxzL0dvb2dsZVBsdXMnO1xuaW1wb3J0IFRlbXBsYXRlcyBmcm9tICcuL2RhdGEvVGVtcGxhdGVzJztcbmltcG9ydCBMb2NhbGUgZnJvbSAnLi9kYXRhL0xvY2FsZSc7XG5pbXBvcnQgUm91dGVyIGZyb20gJy4vcm91dGVyL1JvdXRlcic7XG5pbXBvcnQgTmF2IGZyb20gJy4vcm91dGVyL05hdic7XG5pbXBvcnQgQXBwRGF0YSBmcm9tICcuL0FwcERhdGEnO1xuaW1wb3J0IEFwcFZpZXcgZnJvbSAnLi9BcHBWaWV3JztcbmltcG9ydCBNZWRpYVF1ZXJpZXMgZnJvbSAnLi91dGlscy9NZWRpYVF1ZXJpZXMnO1xuXG5jbGFzcyBBcHAge1xuXG4gICAgc3RhdGljIF90b0NsZWFuID0gWydvYmpSZWFkeScsICdzZXRGbGFncycsICdvYmplY3RDb21wbGV0ZScsICdpbml0JywgJ2luaXRPYmplY3RzJywgJ2luaXRTREtzJywgJ2luaXRBcHAnLCAnZ28nLCAnY2xlYW51cCddO1xuXG4gICAgTElWRSAgICAgICA9IG51bGw7XG4gICAgQkFTRV9QQVRIICA9IHdpbmRvdy5jb25maWcuaG9zdG5hbWU7XG4gICAgbG9jYWxlQ29kZSA9IHdpbmRvdy5jb25maWcubG9jYWxlQ29kZTtcbiAgICBvYmpSZWFkeSAgID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKExJVkUpIHtcbiAgICAgICAgdGhpcy5MSVZFID0gTElWRTtcbiAgICB9XG5cbiAgICBzZXRGbGFncygpIHtcbiAgICAgICAgY29uc3QgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIE1lZGlhUXVlcmllcy5zZXR1cCgpO1xuXG4gICAgICAgIHRoaXMuSVNfQU5EUk9JRCAgICA9IHVhLmluZGV4T2YoJ2FuZHJvaWQnKSA+IC0xO1xuICAgICAgICB0aGlzLklTX0ZJUkVGT1ggICAgPSB1YS5pbmRleE9mKCdmaXJlZm94JykgPiAtMTtcbiAgICAgICAgdGhpcy5JU19DSFJPTUVfSU9TID0gdWEubWF0Y2goJ2NyaW9zJykgPyB0cnVlIDogZmFsc2U7IC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEzODA4MDUzXG4gICAgfVxuXG4gICAgb2JqZWN0Q29tcGxldGUoKSB7XG4gICAgICAgIHRoaXMub2JqUmVhZHkrKztcblxuICAgICAgICBpZiAodGhpcy5vYmpSZWFkeSA+PSA0KSB7XG4gICAgICAgICAgICB0aGlzLmluaXRBcHAoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdE9iamVjdHMoKTtcbiAgICB9XG5cbiAgICBpbml0T2JqZWN0cygpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMgPSBuZXcgVGVtcGxhdGVzKFwiL2RhdGEvdGVtcGxhdGVzLnhtbFwiLCB0aGlzLm9iamVjdENvbXBsZXRlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmxvY2FsZSAgICA9IG5ldyBMb2NhbGUoXCIvZGF0YS9sb2NhbGVzL3N0cmluZ3MuanNvblwiLCB0aGlzLm9iamVjdENvbXBsZXRlLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmFuYWx5dGljcyA9IG5ldyBBbmFseXRpY3MoXCIvZGF0YS90cmFja2luZy5qc29uXCIsIHRoaXMub2JqZWN0Q29tcGxldGUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuYXBwRGF0YSAgID0gbmV3IEFwcERhdGEodGhpcy5vYmplY3RDb21wbGV0ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBpZiBuZXcgb2JqZWN0cyBhcmUgYWRkZWQgZG9uJ3QgZm9yZ2V0IHRvIGNoYW5nZSB0aGUgYHRoaXMub2JqZWN0Q29tcGxldGVgIGZ1bmN0aW9uXG4gICAgfVxuXG4gICAgaW5pdFNES3MoKSB7XG5cbiAgICAgICAgRmFjZWJvb2subG9hZCgpO1xuICAgICAgICBHb29nbGVQbHVzLmxvYWQoKTtcblxuICAgIH1cblxuICAgIGluaXRBcHAoKSB7XG4gICAgICAgIHRoaXMuc2V0RmxhZ3MoKTtcblxuICAgICAgICAvKiBTdGFydHMgYXBwbGljYXRpb24gKi9cbiAgICAgICAgdGhpcy5hcHBWaWV3ID0gbmV3IEFwcFZpZXcoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIgID0gbmV3IFJvdXRlcigpO1xuICAgICAgICB0aGlzLm5hdiAgICAgPSBuZXcgTmF2KCk7XG4gICAgICAgIHRoaXMuYXV0aCAgICA9IG5ldyBBdXRoTWFuYWdlcigpO1xuICAgICAgICB0aGlzLnNoYXJlICAgPSBuZXcgU2hhcmUoKTtcblxuICAgICAgICB0aGlzLmdvKCk7XG5cbiAgICAgICAgdGhpcy5pbml0U0RLcygpO1xuICAgIH1cblxuICAgIGdvKCkge1xuICAgICAgICAvKiBBZnRlciBldmVyeXRoaW5nIGlzIGxvYWRlZCwga2lja3Mgb2ZmIHdlYnNpdGUgKi9cbiAgICAgICAgdGhpcy5hcHBWaWV3LnJlbmRlcigpO1xuXG4gICAgICAgIC8qIHJlbW92ZSByZWR1bmRhbnQgaW5pdGlhbGlzYXRpb24gbWV0aG9kcyAvIHByb3BlcnRpZXMgKi9cbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgfVxuXG4gICAgY2xlYW51cCgpIHtcbiAgICAgICAgQXBwLl90b0NsZWFuLmZvckVhY2goIChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzW2l0ZW1dID0gbnVsbDtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzW2l0ZW1dO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXBwO1xuIiwiaW1wb3J0IEFic3RyYWN0RGF0YSBmcm9tICcuL2RhdGEvQWJzdHJhY3REYXRhJztcbmltcG9ydCBSZXF1ZXN0ZXIgZnJvbSAnLi91dGlscy9SZXF1ZXN0ZXInO1xuaW1wb3J0IEFQSSBmcm9tICcuL2RhdGEvQVBJJztcblxuY2xhc3MgQXBwRGF0YSBleHRlbmRzIEFic3RyYWN0RGF0YSB7XG5cbiAgICBjYWxsYmFjayA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcihjYWxsYmFjaykge1xuXG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLypcblxuICAgICAgICBhZGQgYWxsIGRhdGEgY2xhc3NlcyBoZXJlXG5cbiAgICAgICAgKi9cblxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICAgICAgdGhpcy5nZXRTdGFydERhdGEoKTtcblxuICAgIH1cblxuICAgIC8vIGdldCBhcHAgYm9vdHN0cmFwIGRhdGEgLSBlbWJlZCBpbiBIVE1MIG9yIEFQSSBlbmRwb2ludFxuICAgIGdldFN0YXJ0RGF0YSgpIHtcbiAgICAgICAgXG4gICAgICAgIGlmIChBUEkuZ2V0KCdzdGFydCcpKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHIgPSBSZXF1ZXN0ZXIucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgdXJsICA6IEFQSS5nZXQoJ3N0YXJ0JyksXG4gICAgICAgICAgICAgICAgdHlwZSA6ICdHRVQnXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgci5kb25lKHRoaXMub25TdGFydERhdGFSZWNlaXZlZC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHIuZmFpbCggKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvciBcImVycm9yIGxvYWRpbmcgYXBpIHN0YXJ0IGRhdGFcIlxuXG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICB0aGlzIGlzIG9ubHkgdGVtcG9yYXJ5LCB3aGlsZSB0aGVyZSBpcyBubyBib290c3RyYXAgZGF0YSBoZXJlLCBub3JtYWxseSB3b3VsZCBoYW5kbGUgZXJyb3IgLyBmYWlsXG4gICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWxsYmFjayAmJiB0eXBlb2YodGhpcy5jYWxsYmFjaykgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2sgJiYgdHlwZW9mKHRoaXMuY2FsbGJhY2spID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG9uU3RhcnREYXRhUmVjZWl2ZWQoZGF0YSkge1xuXG4gICAgICAgIC8qXG5cbiAgICAgICAgYm9vdHN0cmFwIGRhdGEgcmVjZWl2ZWQsIGFwcCByZWFkeSB0byBnb1xuXG4gICAgICAgICovXG5cbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2sgJiYgdHlwZW9mKHRoaXMuY2FsbGJhY2spID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHBEYXRhO1xuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuL3ZpZXcvQWJzdHJhY3RWaWV3JztcbmltcG9ydCBQcmVsb2FkZXIgZnJvbSAnLi92aWV3L2Jhc2UvUHJlbG9hZGVyJztcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi92aWV3L2Jhc2UvSGVhZGVyJztcbmltcG9ydCBXcmFwcGVyIGZyb20gJy4vdmlldy9iYXNlL1dyYXBwZXInO1xuaW1wb3J0IEZvb3RlciBmcm9tICcuL3ZpZXcvYmFzZS9Gb290ZXInO1xuaW1wb3J0IE1vZGFsTWFuYWdlciBmcm9tICcuL3ZpZXcvbW9kYWxzL19Nb2RhbE1hbmFnZXInO1xuaW1wb3J0IE1lZGlhUXVlcmllcyBmcm9tICcuL3V0aWxzL01lZGlhUXVlcmllcyc7XG5cbmNvbnN0IEFwcFZpZXcgPSBBYnN0cmFjdFZpZXcuZXh0ZW5kKHtcblxuICAgIHRlbXBsYXRlIDogJ21haW4nLFxuXG4gICAgJHdpbmRvdyAgOiBudWxsLFxuICAgICRib2R5ICAgIDogbnVsbCxcblxuICAgIHdyYXBwZXIgIDogbnVsbCxcbiAgICBmb290ZXIgICA6IG51bGwsXG5cbiAgICBkaW1zIDoge1xuICAgICAgICB3IDogbnVsbCxcbiAgICAgICAgaCA6IG51bGwsXG4gICAgICAgIG8gOiBudWxsLFxuICAgICAgICBjIDogbnVsbFxuICAgIH0sXG5cbiAgICBldmVudHMgOiB7XG4gICAgICAgICdjbGljayBhJyA6ICdsaW5rTWFuYWdlcidcbiAgICB9LFxuXG4gICAgRVZFTlRfVVBEQVRFX0RJTUVOU0lPTlMgOiAnRVZFTlRfVVBEQVRFX0RJTUVOU0lPTlMnLFxuXG4gICAgTU9CSUxFX1dJRFRIIDogNzAwLFxuICAgIE1PQklMRSAgICAgICA6ICdtb2JpbGUnLFxuICAgIE5PTl9NT0JJTEUgICA6ICdub25fbW9iaWxlJyxcblxuICAgIGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBBcHBWaWV3Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzKTtcblxuICAgICAgICB0aGlzLiR3aW5kb3cgPSAkKHdpbmRvdyk7XG4gICAgICAgIHRoaXMuJGJvZHkgICA9ICQoJ2JvZHknKS5lcSgwKTtcblxuICAgIH0sXG5cbiAgICBkaXNhYmxlVG91Y2g6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuJHdpbmRvdy5vbigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIGVuYWJsZVRvdWNoOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLiR3aW5kb3cub2ZmKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLmJpbmQodGhpcykpO1xuICAgICAgICBcbiAgICB9LFxuXG4gICAgb25Ub3VjaE1vdmU6IGZ1bmN0aW9uKCBlICkge1xuXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgXG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5wcmVsb2FkZXIgICAgPSBuZXcgUHJlbG9hZGVyKCk7XG4gICAgICAgIHRoaXMubW9kYWxNYW5hZ2VyID0gbmV3IE1vZGFsTWFuYWdlcigpO1xuXG4gICAgICAgIHRoaXMuaGVhZGVyICA9IG5ldyBIZWFkZXIoKTtcbiAgICAgICAgdGhpcy53cmFwcGVyID0gbmV3IFdyYXBwZXIoKTtcbiAgICAgICAgdGhpcy5mb290ZXIgID0gbmV3IEZvb3RlcigpO1xuXG4gICAgICAgIHRoaXNcbiAgICAgICAgICAgIC5hZGRDaGlsZCh0aGlzLmhlYWRlcilcbiAgICAgICAgICAgIC5hZGRDaGlsZCh0aGlzLndyYXBwZXIpXG4gICAgICAgICAgICAuYWRkQ2hpbGQodGhpcy5mb290ZXIpO1xuXG4gICAgICAgIHRoaXMub25BbGxSZW5kZXJlZCgpO1xuXG4gICAgfSxcblxuICAgIGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMub25SZXNpemUoKTtcblxuICAgICAgICB0aGlzLm9uUmVzaXplID0gXy5kZWJvdW5jZSh0aGlzLm9uUmVzaXplLmJpbmQodGhpcyksIDMwMCk7XG4gICAgICAgIHRoaXMuJHdpbmRvdy5vbigncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlJywgdGhpcy5vblJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgIH0sXG5cbiAgICBvbkFsbFJlbmRlcmVkOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIm9uQWxsUmVuZGVyZWQgOiA9PlwiKTtcblxuICAgICAgICB0aGlzLiRib2R5LnByZXBlbmQodGhpcy4kZWwpO1xuXG4gICAgICAgIHRoaXMuYmVnaW4oKTtcbiAgICB9LFxuXG4gICAgYmVnaW46IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcignc3RhcnQnKTtcblxuICAgICAgICB0aGlzLl9fTkFNRVNQQUNFX18oKS5yb3V0ZXIuc3RhcnQoKTtcblxuICAgICAgICB0aGlzLnByZWxvYWRlci5oaWRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWVkaWFRdWVyaWVzTG9nKCk7XG5cbiAgICB9LFxuXG4gICAgb25SZXNpemU6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuZ2V0RGltcygpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1lZGlhUXVlcmllc0xvZygpO1xuXG4gICAgfSxcblxuICAgIHVwZGF0ZU1lZGlhUXVlcmllc0xvZzogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaGVhZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWRlci4kZWxcbiAgICAgICAgICAgICAgICAuZmluZChcIi5icmVha3BvaW50XCIpXG4gICAgICAgICAgICAgICAgICAgIC5odG1sKGA8ZGl2IGNsYXNzPSdsJz5DVVJSRU5UIEJSRUFLUE9JTlQ6PC9kaXY+PGRpdiBjbGFzcz0nYic+JHtNZWRpYVF1ZXJpZXMuZ2V0QnJlYWtwb2ludCgpfTwvZGl2PmApO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgZ2V0RGltczogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgY29uc3QgdyA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBoID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5kaW1zID0ge1xuICAgICAgICAgICAgdyA6IHcsXG4gICAgICAgICAgICBoIDogaCxcbiAgICAgICAgICAgIG8gOiBoID4gdyA/ICdwb3J0cmFpdCcgOiAnbGFuZHNjYXBlJyxcbiAgICAgICAgICAgIGMgOiB3IDw9IHRoaXMuTU9CSUxFX1dJRFRIID8gdGhpcy5NT0JJTEUgOiB0aGlzLk5PTl9NT0JJTEVcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnRyaWdnZXIodGhpcy5FVkVOVF9VUERBVEVfRElNRU5TSU9OUywgdGhpcy5kaW1zKTtcblxuICAgIH0sXG5cbiAgICBsaW5rTWFuYWdlcjogZnVuY3Rpb24oZSkge1xuXG4gICAgICAgIGNvbnN0IGhyZWYgPSAkKGUuY3VycmVudFRhcmdldCkuYXR0cignaHJlZicpO1xuXG4gICAgICAgIGlmICghaHJlZikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uYXZpZ2F0ZVRvVXJsKGhyZWYsIGUpO1xuXG4gICAgfSxcblxuICAgIG5hdmlnYXRlVG9Vcmw6IGZ1bmN0aW9uKCBocmVmLCBlID0gbnVsbCApIHtcblxuICAgICAgICBjb25zdCByb3V0ZSAgID0gaHJlZi5tYXRjaCh0aGlzLl9fTkFNRVNQQUNFX18oKS5CQVNFX1BBVEgpID8gaHJlZi5zcGxpdCh0aGlzLl9fTkFNRVNQQUNFX18oKS5CQVNFX1BBVEgpWzFdIDogaHJlZjtcbiAgICAgICAgY29uc3Qgc2VjdGlvbiA9IHJvdXRlLmluZGV4T2YoJy8nKSA9PT0gMCA/IHJvdXRlLnNwbGl0KCcvJylbMV0gOiByb3V0ZTtcblxuICAgICAgICBpZiAodGhpcy5fX05BTUVTUEFDRV9fKCkubmF2LmdldFNlY3Rpb24oc2VjdGlvbikpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuX19OQU1FU1BBQ0VfXygpLnJvdXRlci5uYXZpZ2F0ZVRvKHJvdXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXh0ZXJuYWxMaW5rKGhyZWYpO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgaGFuZGxlRXh0ZXJuYWxMaW5rOiBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgLypcblxuICAgICAgICBiaW5kIHRyYWNraW5nIGV2ZW50cyBpZiBuZWNlc3NhcnlcblxuICAgICAgICAqL1xuXG4gICAgfVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQXBwVmlldztcbiIsImltcG9ydCBUZW1wbGF0ZU1vZGVsIGZyb20gJy4uLy4uL21vZGVscy9jb3JlL1RlbXBsYXRlTW9kZWwnO1xuXG5jbGFzcyBUZW1wbGF0ZXNDb2xsZWN0aW9uIGV4dGVuZHMgQmFja2JvbmUuQ29sbGVjdGlvbiB7XG5cblx0bW9kZWwgPSBUZW1wbGF0ZU1vZGVsXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVtcGxhdGVzQ29sbGVjdGlvbjtcbiIsImltcG9ydCBBUElSb3V0ZU1vZGVsIGZyb20gJy4uL21vZGVscy9jb3JlL0FQSVJvdXRlTW9kZWwnO1xuXG5jbGFzcyBBUEkge1xuXG5cdHN0YXRpYyBtb2RlbCA9IG5ldyBBUElSb3V0ZU1vZGVsKCk7XG5cblx0c3RhdGljIGdldENvbnN0YW50cyA9ICgpID0+IHtcblxuXHRcdC8vIGFkZCBtb3JlIGlmIHdlIHdhbm5hIHVzZSBpbiBBUEkgc3RyaW5nc1xuXHRcdGNvbnN0IGNvbnN0YW50cyA9IHtcblx0XHRcdEJBU0VfUEFUSCA6IEFQSS5fX05BTUVTUEFDRV9fKCkuQkFTRV9QQVRIXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNvbnN0YW50cztcblxuXHR9XG5cblx0c3RhdGljIGdldCA9IChuYW1lLCB2YXJzKSA9PiB7XG5cblx0XHRjb25zdCBhbGxWYXJzID0gJC5leHRlbmQodHJ1ZSwgdmFycywgQVBJLmdldENvbnN0YW50cygpKTtcblx0XHRyZXR1cm4gQVBJLnN1cHBsYW50U3RyaW5nKEFQSS5tb2RlbC5nZXQobmFtZSksIGFsbFZhcnMpO1xuXG5cdH1cblxuXHRzdGF0aWMgc3VwcGxhbnRTdHJpbmcgPSAoc3RyLCB2YWxzKSA9PiB7XG5cblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL3t7IChbXnt9XSopIH19L2csIChhLCBiKSA9PiB7XG5cdFx0XHRjb25zdCByID0gdmFsc1tiXSB8fCB0eXBlb2YgdmFsc1tiXSA9PT0gJ251bWJlcicgPyB2YWxzW2JdLnRvU3RyaW5nKCkgOiAnJztcblx0XHRcdGlmICh0eXBlb2YgciA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgciA9PT0gXCJudW1iZXJcIikge1xuXHRcdFx0XHRyZXR1cm4gcjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBhO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXHRzdGF0aWMgX19OQU1FU1BBQ0VfXyAgPSAoKSA9PiB7XG5cblx0XHRyZXR1cm4gd2luZG93Ll9fTkFNRVNQQUNFX187XG5cblx0fVxuXG59XG5cbndpbmRvdy5BUEkgPSBBUEk7XG5cbmV4cG9ydCBkZWZhdWx0IEFQSTtcbiIsImNsYXNzIEFic3RyYWN0RGF0YSB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRfLmV4dGVuZCh0aGlzLCBCYWNrYm9uZS5FdmVudHMpO1xuXG5cdH1cblxuXHRfX05BTUVTUEFDRV9fKCkge1xuXG5cdFx0cmV0dXJuIHdpbmRvdy5fX05BTUVTUEFDRV9fO1xuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdERhdGE7IiwiaW1wb3J0IExvY2FsZXNNb2RlbCBmcm9tICcuLi9tb2RlbHMvY29yZS9Mb2NhbGVzTW9kZWwnO1xuaW1wb3J0IEFQSSBmcm9tICcuLi9kYXRhL0FQSSc7XG5cbi8qXG4gICAgTG9jYWxlIExvYWRlclxuXG4gICAgRmlyZXMgYmFjayBhbiBldmVudCB3aGVuIGNvbXBsZXRlXG5cbiovXG5jbGFzcyBMb2NhbGUge1xuXG4gICAgbGFuZyAgICAgPSBudWxsO1xuICAgIGRhdGEgICAgID0gbnVsbDtcbiAgICBjYWxsYmFjayA9IG51bGw7XG4gICAgYmFja3VwICAgPSBudWxsO1xuICAgIGRlZmF1bHQgID0gJ2VuLWdiJztcblxuICAgIGNvbnN0cnVjdG9yKGRhdGEsIGNiKSB7XG5cbiAgICAgICAgLy8gc3RhcnQgTG9jYWxlIExvYWRlciwgZGVmaW5lIGxvY2FsZSBiYXNlZCBvbiBicm93c2VyIGxhbmd1YWdlXG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNiO1xuICAgICAgICB0aGlzLmJhY2t1cCA9IGRhdGE7XG5cbiAgICAgICAgdGhpcy5sYW5nID0gdGhpcy5nZXRMYW5nKCk7XG5cbiAgICAgICAgaWYgKEFQSS5nZXQoJ2xvY2FsZScsIHsgY29kZSA6IHRoaXMubGFuZyB9KSkge1xuXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybCAgICAgOiBBUEkuZ2V0KCAnbG9jYWxlJywgeyBjb2RlIDogdGhpcy5sYW5nIH0gKSxcbiAgICAgICAgICAgICAgICB0eXBlICAgIDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgc3VjY2VzcyA6IHRoaXMub25TdWNjZXNzLmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgZXJyb3IgICA6IHRoaXMubG9hZEJhY2t1cC5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5sb2FkQmFja3VwKCk7XG5cbiAgICAgICAgfVxuXG4gICAgfVxuICAgICAgICAgICAgXG4gICAgZ2V0TGFuZygpIHtcblxuICAgICAgICBsZXQgbGFuZztcblxuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLnNlYXJjaCAmJiB3aW5kb3cubG9jYXRpb24uc2VhcmNoLm1hdGNoKCdsYW5nPScpKSB7XG5cbiAgICAgICAgICAgIGxhbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnNwbGl0KCdsYW5nPScpWzFdLnNwbGl0KCcmJylbMF07XG5cbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cuY29uZmlnLmxvY2FsZUNvZGUpIHtcblxuICAgICAgICAgICAgbGFuZyA9IHdpbmRvdy5jb25maWcubG9jYWxlQ29kZTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBsYW5nID0gdGhpcy5kZWZhdWx0O1xuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGFuZztcblxuICAgIH1cblxuICAgIG9uU3VjY2VzcyhldmVudCkge1xuXG4gICAgICAgIC8vIEZpcmVzIGJhY2sgYW4gZXZlbnQgb25jZSBpdCdzIGNvbXBsZXRlXG5cbiAgICAgICAgbGV0IGQgPSBudWxsO1xuXG4gICAgICAgIGlmIChldmVudC5yZXNwb25zZVRleHQpIHtcbiAgICAgICAgICAgIGQgPSBKU09OLnBhcnNlKGV2ZW50LnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkID0gZXZlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRhdGEgPSBuZXcgTG9jYWxlc01vZGVsKGQpO1xuICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG5cbiAgICB9XG5cbiAgICBsb2FkQmFja3VwKCkge1xuXG4gICAgICAgIC8vIFdoZW4gQVBJIG5vdCBhdmFpbGFibGUsIHRyaWVzIHRvIGxvYWQgdGhlIHN0YXRpYyAudHh0IGxvY2FsZSBcblxuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsICAgICAgOiB0aGlzLmJhY2t1cCxcbiAgICAgICAgICAgIGRhdGFUeXBlIDogJ2pzb24nLFxuICAgICAgICAgICAgY29tcGxldGUgOiB0aGlzLm9uU3VjY2Vzcy5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgZXJyb3IgICAgOiAoKSA9PiB7IGNvbnNvbGUubG9nKCdlcnJvciBvbiBsb2FkaW5nIGJhY2t1cCcpIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBnZXQoaWQpIHtcblxuICAgICAgICAvLyBnZXQgU3RyaW5nIGZyb20gbG9jYWxlXG4gICAgICAgIC8vICsgaWQgOiBzdHJpbmcgaWQgb2YgdGhlIExvY2FsaXNlZCBTdHJpbmdcblxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmdldFN0cmluZyhpZCk7XG5cbiAgICB9XG5cbiAgICBnZXRMb2NhbGVJbWFnZSh1cmwpIHtcblxuICAgICAgICByZXR1cm4gKHdpbmRvdy5jb25maWcuQ0ROICsgXCIvaW1hZ2VzL2xvY2FsZS9cIiArIHdpbmRvdy5jb25maWcubG9jYWxlQ29kZSArIFwiL1wiICsgdXJsKTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2NhbGU7XG4iLCJpbXBvcnQgVGVtcGxhdGVNb2RlbCBmcm9tICcuLi9tb2RlbHMvY29yZS9UZW1wbGF0ZU1vZGVsJztcbmltcG9ydCBUZW1wbGF0ZXNDb2xsZWN0aW9uIGZyb20gJy4uL2NvbGxlY3Rpb25zL2NvcmUvVGVtcGxhdGVzQ29sbGVjdGlvbic7XG5cbmNsYXNzIFRlbXBsYXRlcyB7XG5cbiAgICB0ZW1wbGF0ZXMgPSBudWxsO1xuICAgIGNiICAgICAgICA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3Rvcih0ZW1wbGF0ZXMsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgdGhpcy5jYiA9IGNhbGxiYWNrO1xuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmwgICAgIDogdGVtcGxhdGVzLFxuICAgICAgICAgICAgc3VjY2VzcyA6IHRoaXMucGFyc2VYTUwuYmluZCh0aGlzKVxuICAgICAgICB9KTtcbiAgICAgICAgICAgXG4gICAgfVxuXG4gICAgcGFyc2VYTUwoZGF0YSkge1xuXG4gICAgICAgIGNvbnN0IHRlbXAgPSBbXTtcblxuICAgICAgICAkKGRhdGEpLmZpbmQoJ3RlbXBsYXRlJykuZWFjaCgoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHZhbHVlID0gJCh2YWx1ZSk7XG4gICAgICAgICAgICB0ZW1wLnB1c2goXG4gICAgICAgICAgICAgICAgbmV3IFRlbXBsYXRlTW9kZWwoe1xuICAgICAgICAgICAgICAgICAgICBpZCAgIDogJHZhbHVlLmF0dHIoJ2lkJykudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA6ICQudHJpbSgkdmFsdWUudGV4dCgpKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRlbXBsYXRlcyA9IG5ldyBUZW1wbGF0ZXNDb2xsZWN0aW9uKHRlbXApO1xuXG4gICAgICAgIHRoaXMuY2IoKTtcbiAgICAgICAgXG4gICAgfVxuXG4gICAgZ2V0KGlkKSB7XG5cbiAgICAgICAgbGV0IHQgPSB0aGlzLnRlbXBsYXRlcy53aGVyZSh7aWQgOiBpZH0pO1xuICAgICAgICB0ICAgICA9IHRbMF0uZ2V0KCd0ZXh0Jyk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gJC50cmltKHQpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlcztcbiIsImNvbnN0IG1vZGVsRGVmYXVsdHMgPSB7XG5cbiAgICBzdGFydCAgICAgICAgIDogXCJcIiwgLy8gRWc6IFwie3sgQkFTRV9QQVRIIH19L2FwaS9zdGFydFwiXG5cbiAgICBsb2NhbGUgICAgICAgIDogXCJcIiwgLy8gRWc6IFwie3sgQkFTRV9QQVRIIH19L2FwaS9sMTBuL3t7IGNvZGUgfX1cIlxuXG4gICAgdXNlciAgICAgICAgICA6IHtcbiAgICAgICAgbG9naW4gICAgICA6IFwie3sgQkFTRV9QQVRIIH19L2FwaS91c2VyL2xvZ2luXCIsXG4gICAgICAgIHJlZ2lzdGVyICAgOiBcInt7IEJBU0VfUEFUSCB9fS9hcGkvdXNlci9yZWdpc3RlclwiLFxuICAgICAgICBwYXNzd29yZCAgIDogXCJ7eyBCQVNFX1BBVEggfX0vYXBpL3VzZXIvcGFzc3dvcmRcIixcbiAgICAgICAgdXBkYXRlICAgICA6IFwie3sgQkFTRV9QQVRIIH19L2FwaS91c2VyL3VwZGF0ZVwiLFxuICAgICAgICBsb2dvdXQgICAgIDogXCJ7eyBCQVNFX1BBVEggfX0vYXBpL3VzZXIvbG9nb3V0XCIsXG4gICAgICAgIHJlbW92ZSAgICAgOiBcInt7IEJBU0VfUEFUSCB9fS9hcGkvdXNlci9yZW1vdmVcIlxuICAgIH1cbn07XG5cbmNsYXNzIEFQSVJvdXRlTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5EZWVwTW9kZWwge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKG1vZGVsRGVmYXVsdHMpO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBUElSb3V0ZU1vZGVsO1xuIiwiY2xhc3MgTG9jYWxlc01vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWwge1xuXG4gICAgZGVmYXVsdHMgPSB7XG4gICAgICAgIGNvZGUgICAgIDogbnVsbCxcbiAgICAgICAgbGFuZ3VhZ2UgOiBudWxsLFxuICAgICAgICBzdHJpbmdzICA6IG51bGxcbiAgICB9O1xuICAgICAgICAgICAgXG4gICAgZ2V0X2xhbmd1YWdlKCkge1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldCgnbGFuZ3VhZ2UnKTtcblxuICAgIH1cblxuICAgIGdldFN0cmluZyhpZCkge1xuXG4gICAgICAgIGNvbnN0IHN0cmluZ3MgPSB0aGlzLmdldCgnc3RyaW5ncycpO1xuICAgICAgICBsZXQgdmFsdWUgICAgID0gbnVsbDtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gc3RyaW5ncykge1xuICAgICAgICAgICAgZm9yIChsZXQga2V5MiBpbiBzdHJpbmdzW2tleV1bJ3N0cmluZ3MnXSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkyID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHN0cmluZ3Nba2V5XVsnc3RyaW5ncyddW2tleTJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBMb2NhbGVzIC0+IG5vdCBmb3VuZCBzdHJpbmc6ICR7aWR9YCk7XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2NhbGVzTW9kZWw7XG4iLCJjbGFzcyBUZW1wbGF0ZU1vZGVsIGV4dGVuZHMgQmFja2JvbmUuTW9kZWwge1xuXG5cdGRlZmF1bHRzID0ge1xuXHRcdGlkICAgOiBcIlwiLFxuXHRcdHRleHQgOiBcIlwiXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUZW1wbGF0ZU1vZGVsO1xuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuLi92aWV3L0Fic3RyYWN0Vmlldyc7XG5pbXBvcnQgUm91dGVyIGZyb20gJy4vUm91dGVyJztcblxuY29uc3Qgc3RhdGljUHJvcHMgPSB7XG4gICAgRVZFTlRfQ0hBTkdFX1ZJRVcgICAgIDogJ0VWRU5UX0NIQU5HRV9WSUVXJyxcbiAgICBFVkVOVF9DSEFOR0VfU1VCX1ZJRVcgOiAnRVZFTlRfQ0hBTkdFX1NVQl9WSUVXJ1xufTtcblxuY29uc3QgTmF2ID0gQWJzdHJhY3RWaWV3LmV4dGVuZCh7XG5cbiAgICBzZWN0aW9ucyA6IHtcbiAgICAgICAgSE9NRSAgICA6ICcnLFxuICAgICAgICBFWEFNUExFIDogJ2V4YW1wbGUnXG4gICAgfSxcblxuICAgIGN1cnJlbnQgIDogeyBhcmVhIDogbnVsbCwgc3ViIDogbnVsbCB9LFxuICAgIHByZXZpb3VzIDogeyBhcmVhIDogbnVsbCwgc3ViIDogbnVsbCB9LFxuXG4gICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIE5hdi5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyk7XG5cbiAgICAgICAgdGhpcy5fX05BTUVTUEFDRV9fKCkucm91dGVyLm9uKFJvdXRlci5FVkVOVF9IQVNIX0NIQU5HRUQsIHRoaXMuY2hhbmdlVmlldy5iaW5kKHRoaXMpKTtcblxuICAgIH0sXG5cbiAgICBnZXRTZWN0aW9uOiBmdW5jdGlvbihzZWN0aW9uKSB7XG5cbiAgICAgICAgaWYgKHNlY3Rpb24gPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzZWN0aW9uVXJpID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuc2VjdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCB1cmkgPSB0aGlzLnNlY3Rpb25zW2tleV07XG4gICAgICAgICAgICBpZiAodXJpID09PSBzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgc2VjdGlvblVyaSA9IGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWN0aW9uVXJpO1xuXG4gICAgfSxcblxuICAgIGNoYW5nZVZpZXc6IGZ1bmN0aW9uKGFyZWEsIHN1YiwgcGFyYW1zKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJhcmVhXCIsYXJlYSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3ViXCIsc3ViKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJwYXJhbXNcIixwYXJhbXMpO1xuXG4gICAgICAgIHRoaXMucHJldmlvdXMgPSB0aGlzLmN1cnJlbnQ7XG4gICAgICAgIHRoaXMuY3VycmVudCAgPSB7IGFyZWEgOiBhcmVhLCBzdWIgOiBzdWIgfTtcblxuICAgICAgICBpZiAodGhpcy5wcmV2aW91cy5hcmVhICYmIHRoaXMucHJldmlvdXMuYXJlYSA9PT0gdGhpcy5jdXJyZW50LmFyZWEpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcihOYXYuRVZFTlRfQ0hBTkdFX1NVQl9WSUVXLCB0aGlzLmN1cnJlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKE5hdi5FVkVOVF9DSEFOR0VfVklFVywgdGhpcy5wcmV2aW91cywgdGhpcy5jdXJyZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9fTkFNRVNQQUNFX18oKS5hcHBWaWV3Lm1vZGFsTWFuYWdlci5pc09wZW4oKSkge1xuICAgICAgICAgICAgdGhpcy5fX05BTUVTUEFDRV9fKCkuYXBwVmlldy5tb2RhbE1hbmFnZXIuaGlkZU9wZW5Nb2RhbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRQYWdlVGl0bGUoYXJlYSwgc3ViKTtcblxuICAgIH0sXG5cbiAgICBzZXRQYWdlVGl0bGUoYXJlYSwgc3ViKSB7XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSBcIlBBR0UgVElUTEUgSEVSRSAtIExPQ0FMSVNFIEJBU0VEIE9OIFVSTFwiO1xuXG4gICAgICAgIGlmICh3aW5kb3cuZG9jdW1lbnQudGl0bGUgIT09IHRpdGxlKSB7XG4gICAgICAgICAgICB3aW5kb3cuZG9jdW1lbnQudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59LCBzdGF0aWNQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IE5hdjtcbiIsImNvbnN0IHN0YXRpY1Byb3BzID0ge1xuICAgIEVWRU5UX0hBU0hfQ0hBTkdFRDogJ0VWRU5UX0hBU0hfQ0hBTkdFRCdcbn1cblxuY29uc3QgUm91dGVyID0gQmFja2JvbmUuUm91dGVyLmV4dGVuZCh7XG5cbiAgICBGSVJTVF9ST1VURTogdHJ1ZSxcblxuICAgIHJvdXRlcyA6IHtcbiAgICAgICAgJygvKSg6YXJlYSkoLzpzdWIpKC8pJyA6ICdoYXNoQ2hhbmdlZCcsXG4gICAgICAgICcqYWN0aW9ucycgICAgICAgICAgICAgOiAnbmF2aWdhdGVUbydcbiAgICB9LFxuXG4gICAgYXJlYSAgIDogbnVsbCxcbiAgICBzdWIgICAgOiBudWxsLFxuICAgIHBhcmFtcyA6IG51bGwsXG5cbiAgICBzdGFydDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgQmFja2JvbmUuaGlzdG9yeS5zdGFydCh7XG4gICAgICAgICAgICBwdXNoU3RhdGUgOiB0cnVlLFxuICAgICAgICAgICAgcm9vdCAgICAgIDogJy8nXG4gICAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIGhhc2hDaGFuZ2VkOiBmdW5jdGlvbihhcmVhPW51bGwsIHN1Yj1udWxsKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coYD4+IEVWRU5UX0hBU0hfQ0hBTkdFRCBAYXJlYSA9ICR7dGhpcy5hcmVhfSwgQHN1YiA9ICR7dGhpcy5zdWJ9IDw8YCk7XG5cbiAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgICAgICAgdGhpcy5zdWIgID0gc3ViO1xuXG4gICAgICAgIGlmICh0aGlzLkZJUlNUX1JPVVRFKSB7XG4gICAgICAgICAgICB0aGlzLkZJUlNUX1JPVVRFID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuYXJlYSkge1xuICAgICAgICAgICAgdGhpcy5hcmVhID0gdGhpcy5fX05BTUVTUEFDRV9fKCkubmF2LnNlY3Rpb25zLkhPTUU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIoUm91dGVyLkVWRU5UX0hBU0hfQ0hBTkdFRCwgdGhpcy5hcmVhLCB0aGlzLnN1YiwgdGhpcy5wYXJhbXMpO1xuXG4gICAgfSxcblxuICAgIG5hdmlnYXRlVG86IGZ1bmN0aW9uKHdoZXJlPScnLCB0cmlnZ2VyPXRydWUsIHJlcGxhY2U9ZmFsc2UsIHBhcmFtcykge1xuXG4gICAgICAgIHRoaXMucGFyYW1zID0gcGFyYW1zO1xuXG4gICAgICAgIGlmICh3aGVyZS5jaGFyQXQoMCkgIT09IFwiL1wiKSB7XG4gICAgICAgICAgICB3aGVyZSA9IGAvJHt3aGVyZX1gO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdoZXJlLmNoYXJBdCggd2hlcmUubGVuZ3RoLTEgKSAhPT0gXCIvXCIpIHtcbiAgICAgICAgICAgIHdoZXJlID0gYCR7d2hlcmV9L2A7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRyaWdnZXIpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcihSb3V0ZXIuRVZFTlRfSEFTSF9DSEFOR0VELCB3aGVyZSwgbnVsbCwgdGhpcy5wYXJhbXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5uYXZpZ2F0ZSh3aGVyZSwgeyB0cmlnZ2VyOiB0cnVlLCByZXBsYWNlOiByZXBsYWNlIH0pO1xuXG4gICAgfSxcblxuICAgIF9fTkFNRVNQQUNFX186IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHJldHVybiB3aW5kb3cuX19OQU1FU1BBQ0VfXztcblxuICAgIH1cblxufSwgc3RhdGljUHJvcHMpO1xuXG5leHBvcnQgZGVmYXVsdCBSb3V0ZXI7XG4iLCIvKlxuIEFuYWx5dGljcyB3cmFwcGVyXG4qL1xuY2xhc3MgQW5hbHl0aWNzIHtcblxuICAgIHRhZ3MgICAgPSBudWxsO1xuICAgIHN0YXJ0ZWQgPSBmYWxzZTtcblxuICAgIGF0dGVtcHRzICAgICAgICA9IDA7XG4gICAgYWxsb3dlZEF0dGVtcHRzID0gNTtcblxuICAgIGNvbnN0cnVjdG9yKHRhZ3MsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgICAgICQuZ2V0SlNPTih0YWdzLCB0aGlzLm9uVGFnc1JlY2VpdmVkLmJpbmQodGhpcykpO1xuXG4gICAgfVxuXG4gICAgb25UYWdzUmVjZWl2ZWQoZGF0YSkge1xuXG4gICAgICAgIHRoaXMudGFncyAgICA9IGRhdGE7XG4gICAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soKTtcblxuICAgIH1cblxuICAgIC8vIHBhcmFtIHN0cmluZyBpZCBvZiB0aGUgdHJhY2tpbmcgdGFnIHRvIGJlIHB1c2hlZCBvbiBBbmFseXRpY3MgXG4gICAgdHJhY2socGFyYW0pIHtcblxuICAgICAgICBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmFtKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHYgPSB0aGlzLnRhZ3NbcGFyYW1dO1xuXG4gICAgICAgICAgICBpZiAodikge1xuXG4gICAgICAgICAgICAgICAgY29uc3QgYXJncyA9IFsnc2VuZCcsICdldmVudCddO1xuICAgICAgICAgICAgICAgIHYuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChhcmcpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gbG9hZGluZyBHQSBhZnRlciBtYWluIGFwcCBKUywgc28gZXh0ZXJuYWwgc2NyaXB0IG1heSBub3QgYmUgaGVyZSB5ZXRcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmdhKSB7XG4gICAgICAgICAgICAgICAgICAgIGdhLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5hdHRlbXB0cyA+PSB0aGlzLmFsbG93ZWRBdHRlbXB0cykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNrKHBhcmFtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXR0ZW1wdHMrKztcbiAgICAgICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBbmFseXRpY3M7XG4iLCJpbXBvcnQgQWJzdHJhY3REYXRhIGZyb20gJy4uL2RhdGEvQWJzdHJhY3REYXRhJztcbmltcG9ydCBGYWNlYm9vayBmcm9tICcuLi91dGlscy9GYWNlYm9vayc7XG5pbXBvcnQgR29vZ2xlUGx1cyBmcm9tICcuLi91dGlscy9Hb29nbGVQbHVzJztcblxuY2xhc3MgQXV0aE1hbmFnZXIgZXh0ZW5kcyBBYnN0cmFjdERhdGEge1xuXG5cdHVzZXJEYXRhICA9IG51bGw7XG5cblx0Ly8gdGhpcy5wcm9jZXNzIHRydWUgZHVyaW5nIGxvZ2luIHByb2Nlc3Ncblx0cHJvY2VzcyAgICAgID0gZmFsc2U7XG5cdHByb2Nlc3NUaW1lciA9IG51bGw7XG5cdHByb2Nlc3NXYWl0ICA9IDUwMDA7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdH1cblxuXHRsb2dpbihzZXJ2aWNlLCBjYj1udWxsKSB7XG5cblx0XHQvLyBjb25zb2xlLmxvZyhcIisrKysgUFJPQ0VTUyBcIiwgdGhpcy5wcm9jZXNzKTtcblxuXHRcdGlmICh0aGlzLnByb2Nlc3MpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLnNob3dMb2FkZXIoKTtcblx0XHR0aGlzLnByb2Nlc3MgPSB0cnVlO1xuXG5cdFx0Y29uc3QgJGRhdGFEZmQgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRzd2l0Y2ggKHNlcnZpY2UpIHtcblx0XHRcdGNhc2UgXCJnb29nbGVcIjpcblx0XHRcdFx0R29vZ2xlUGx1cy5sb2dpbigkZGF0YURmZCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcImZhY2Vib29rXCI6XG5cdFx0XHRcdEZhY2Vib29rLmxvZ2luKCRkYXRhRGZkKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0JGRhdGFEZmQuZG9uZSggKHJlcykgPT4geyB0aGlzLmF1dGhTdWNjZXNzLmNhbGwodGhpcywgc2VydmljZSwgcmVzKTsgfSk7XG5cdFx0JGRhdGFEZmQuZmFpbCggKHJlcykgPT4geyB0aGlzLmF1dGhGYWlsLmNhbGwodGhpcywgc2VydmljZSwgcmVzKTsgfSk7XG5cdFx0JGRhdGFEZmQuYWx3YXlzKCAoKSA9PiB7IHRoaXMuYXV0aENhbGxiYWNrLmNhbGwodGhpcywgY2IpOyB9KTtcblxuXHRcdC8qXG5cdFx0VW5mb3J0dW5hdGVseSBubyBjYWxsYmFjayBpcyBmaXJlZCBpZiB1c2VyIG1hbnVhbGx5IGNsb3NlcyBHKyBsb2dpbiBtb2RhbCxcblx0XHRzbyB0aGlzIGlzIHRvIGFsbG93IHRoZW0gdG8gY2xvc2Ugd2luZG93IGFuZCB0aGVuIHN1YnNlcXVlbnRseSB0cnkgdG8gbG9nIGluIGFnYWluLi4uXG5cdFx0Ki9cblx0XHR0aGlzLnByb2Nlc3NUaW1lciA9IHNldFRpbWVvdXQodGhpcy5hdXRoQ2FsbGJhY2ssIHRoaXMucHJvY2Vzc1dhaXQpO1xuXG5cdFx0cmV0dXJuICRkYXRhRGZkO1xuXG5cdH1cblxuXHRhdXRoU3VjY2VzcyhzZXJ2aWNlLCBkYXRhKSB7XG5cblx0XHQvLyBjb25zb2xlLmxvZyBcImxvZ2luIGNhbGxiYWNrIGZvciAje3NlcnZpY2V9LCBkYXRhID0+IFwiLCBkYXRhXG5cblx0fVxuXG5cdGF1dGhGYWlsKHNlcnZpY2UsIGRhdGEpIHtcblxuXHRcdC8vIGNvbnNvbGUubG9nIFwibG9naW4gZmFpbCBmb3IgI3tzZXJ2aWNlfSA9PiBcIiwgZGF0YVxuXG5cdH1cblxuXHRhdXRoQ2FsbGJhY2soY2I9bnVsbCkge1xuXG5cdFx0aWYgKCF0aGlzLnByb2Nlc3MpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjbGVhclRpbWVvdXQodGhpcy5wcm9jZXNzVGltZXIpO1xuXG5cdFx0dGhpcy5oaWRlTG9hZGVyKCk7XG5cdFx0dGhpcy5wcm9jZXNzID0gZmFsc2U7XG5cblx0XHRpZiAoY2IgJiYgdHlwZW9mKGNiKSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y2IoKTtcblx0XHR9XG5cblx0fVxuXG5cdC8vIHNob3cgLyBoaWRlIHNvbWUgVUkgaW5kaWNhdG9yIHRoYXQgd2UgYXJlIHdhaXRpbmcgZm9yIHNvY2lhbCBuZXR3b3JrIHRvIHJlc3BvbmRcblx0c2hvd0xvYWRlcigpIHtcblxuXHRcdC8vIGNvbnNvbGUubG9nIFwic2hvd0xvYWRlclwiXG5cblx0fVxuXG5cdGhpZGVMb2FkZXIoKSB7XG5cblx0XHQvLyBjb25zb2xlLmxvZyBcImhpZGVMb2FkZXJcIlxuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBdXRoTWFuYWdlcjtcbiIsImltcG9ydCBBYnN0cmFjdERhdGEgZnJvbSAnLi4vZGF0YS9BYnN0cmFjdERhdGEnO1xuXG4vKlxuXG5GYWNlYm9vayBTREsgd3JhcHBlciAtIGxvYWQgYXN5bmNocm9ub3VzbHksIHNvbWUgaGVscGVyIG1ldGhvZHNcblxuKi9cbmNsYXNzIEZhY2Vib29rIGV4dGVuZHMgQWJzdHJhY3REYXRhIHtcblxuXHRzdGF0aWMgdXJsID0gJy8vY29ubmVjdC5mYWNlYm9vay5uZXQvZW5fVVMvYWxsLmpzJztcblxuXHRzdGF0aWMgcGVybWlzc2lvbnMgPSAnZW1haWwnO1xuXG5cdHN0YXRpYyAkZGF0YURmZCAgICA9IG51bGw7XG5cdHN0YXRpYyBsb2FkZWQgICAgICA9IGZhbHNlO1xuXG5cdHN0YXRpYyBsb2FkKCkge1xuXG5cdFx0JHNjcmlwdChGYWNlYm9vay51cmwsIEZhY2Vib29rLmluaXQpO1xuXG5cdH1cblxuXHRzdGF0aWMgaW5pdCgpIHtcblxuXHRcdEZhY2Vib29rLmxvYWRlZCA9IHRydWU7XG5cblx0XHRGQi5pbml0KHtcblx0XHRcdGFwcElkICA6IHdpbmRvdy5jb25maWcuZmJfYXBwX2lkLFxuXHRcdFx0c3RhdHVzIDogZmFsc2UsXG5cdFx0XHR4ZmJtbCAgOiBmYWxzZVxuXHRcdH0pO1xuXG5cdH1cblxuXHRzdGF0aWMgbG9naW4oJGRhdGFEZmQpIHtcblxuXHRcdEZhY2Vib29rLiRkYXRhRGZkID0gJGRhdGFEZmQ7XG5cblx0XHRpZiAoIUZhY2Vib29rLmxvYWRlZCkge1xuXHRcdFx0cmV0dXJuIEZhY2Vib29rLiRkYXRhRGZkLnJlamVjdCgnU0RLIG5vdCBsb2FkZWQnKTtcblx0XHR9XG5cblx0XHRGQi5sb2dpbiggKHJlcykgPT4ge1xuXG5cdFx0XHRpZiAocmVzWydzdGF0dXMnXSA9PT0gJ2Nvbm5lY3RlZCcpIHtcblx0XHRcdFx0RmFjZWJvb2suZ2V0VXNlckRhdGEocmVzWydhdXRoUmVzcG9uc2UnXVsnYWNjZXNzVG9rZW4nXSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRGYWNlYm9vay4kZGF0YURmZC5yZWplY3QoJ25vIHdheSBqb3NlJyk7XG5cdFx0XHR9XG5cblx0XHR9LCB7IHNjb3BlOiBGYWNlYm9vay5wZXJtaXNzaW9ucyB9KTtcblxuXHR9XG5cblx0c3RhdGljIGdldFVzZXJEYXRhKHRva2VuKSB7XG5cblx0XHRjb25zdCB1c2VyRGF0YSA9IHt9O1xuXHRcdHVzZXJEYXRhLmFjY2Vzc190b2tlbiA9IHRva2VuO1xuXG5cdFx0Y29uc3QgJG1lRGZkICAgPSAkLkRlZmVycmVkKCk7XG5cdFx0Y29uc3QgJHBpY0RmZCAgPSAkLkRlZmVycmVkKCk7XG5cblx0XHRGQi5hcGkoJy9tZScsIChyZXMpID0+IHtcblxuXHRcdFx0dXNlckRhdGEuZnVsbF9uYW1lID0gcmVzLm5hbWU7XG5cdFx0XHR1c2VyRGF0YS5zb2NpYWxfaWQgPSByZXMuaWQ7XG5cdFx0XHR1c2VyRGF0YS5lbWFpbCAgICAgPSByZXMuZW1haWwgfHwgZmFsc2U7XG5cdFx0XHQkbWVEZmQucmVzb2x2ZSgpO1xuXG5cdFx0fSk7XG5cblx0XHRGQi5hcGkoJy9tZS9waWN0dXJlJywgeyAnd2lkdGgnOiAnMjAwJyB9LCAocmVzKSA9PiB7XG5cblx0XHRcdHVzZXJEYXRhLnByb2ZpbGVfcGljID0gcmVzLmRhdGEudXJsO1xuXHRcdFx0JHBpY0RmZC5yZXNvbHZlKCk7XG5cblx0XHR9KTtcblxuXHRcdCQud2hlbigkbWVEZmQsICRwaWNEZmQpLmRvbmUoICgpID0+IHtcblxuXHRcdFx0RmFjZWJvb2suJGRhdGFEZmQucmVzb2x2ZSh1c2VyRGF0YSk7XG5cblx0XHR9KTtcblxuXHR9XG5cblx0c3RhdGljIHNoYXJlKG9wdHMsIGNiKSB7XG5cblx0XHRGQi51aSh7XG5cdFx0XHRtZXRob2QgICAgICA6IG9wdHMubWV0aG9kIHx8ICdmZWVkJyxcblx0XHRcdG5hbWUgICAgICAgIDogb3B0cy5uYW1lIHx8ICcnLFxuXHRcdFx0bGluayAgICAgICAgOiBvcHRzLmxpbmsgfHwgJycsXG5cdFx0XHRwaWN0dXJlICAgICA6IG9wdHMucGljdHVyZSB8fCAnJyxcblx0XHRcdGNhcHRpb24gICAgIDogb3B0cy5jYXB0aW9uIHx8ICcnLFxuXHRcdFx0ZGVzY3JpcHRpb24gOiBvcHRzLmRlc2NyaXB0aW9uIHx8ICcnXG5cdFx0fSwgKHJlc3BvbnNlKSA9PiB7XG5cdFx0XHRpZiAoY2IgJiYgdHlwZW9mKGNiKSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRjYihyZXNwb25zZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZhY2Vib29rO1xuIiwiaW1wb3J0IEFic3RyYWN0RGF0YSBmcm9tICcuLi9kYXRhL0Fic3RyYWN0RGF0YSc7XG5cbi8qXG5cbkdvb2dsZSsgU0RLIHdyYXBwZXIgLSBsb2FkIGFzeW5jaHJvbm91c2x5LCBzb21lIGhlbHBlciBtZXRob2RzXG5cbiovXG5jbGFzcyBHb29nbGVQbHVzIGV4dGVuZHMgQWJzdHJhY3REYXRhIHtcblxuXHRzdGF0aWMgdXJsID0gJ2h0dHBzOi8vYXBpcy5nb29nbGUuY29tL2pzL2NsaWVudDpwbHVzb25lLmpzJztcblxuXHRzdGF0aWMgcGFyYW1zID0ge1xuXHRcdCdjbGllbnRpZCcgICAgIDogbnVsbCxcblx0XHQnY2FsbGJhY2snICAgICA6IG51bGwsXG5cdFx0J3Njb3BlJyAgICAgICAgOiAnaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vYXV0aC91c2VyaW5mby5lbWFpbCcsXG5cdFx0J2Nvb2tpZXBvbGljeScgOiAnbm9uZSdcblx0fTtcblxuXHRzdGF0aWMgJGRhdGFEZmQgPSBudWxsO1xuXHRzdGF0aWMgbG9hZGVkICAgPSBmYWxzZTtcblxuXHRzdGF0aWMgbG9hZCgpIHtcblxuXHRcdCRzY3JpcHQoR29vZ2xlUGx1cy51cmwsIEdvb2dsZVBsdXMuaW5pdCk7XG5cblx0fVxuXG5cdHN0YXRpYyBpbml0KCkge1xuXG5cdFx0R29vZ2xlUGx1cy5sb2FkZWQgPSB0cnVlO1xuXG5cdFx0R29vZ2xlUGx1cy5wYXJhbXNbJ2NsaWVudGlkJ10gPSB3aW5kb3cuY29uZmlnLmdwX2FwcF9pZDtcblx0XHRHb29nbGVQbHVzLnBhcmFtc1snY2FsbGJhY2snXSA9IEdvb2dsZVBsdXMubG9naW5DYWxsYmFjay5iaW5kKHRoaXMpO1xuXG5cdH1cblxuXHRzdGF0aWMgbG9naW4oJGRhdGFEZmQpIHtcblxuXHRcdEdvb2dsZVBsdXMuJGRhdGFEZmQgPSAkZGF0YURmZDtcblxuXHRcdGlmIChHb29nbGVQbHVzLmxvYWRlZCkge1xuXHRcdFx0Z2FwaS5hdXRoLnNpZ25JbihHb29nbGVQbHVzLnBhcmFtcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdEdvb2dsZVBsdXMuJGRhdGFEZmQucmVqZWN0KCdTREsgbm90IGxvYWRlZCcpO1xuXHRcdH1cblxuXHR9XG5cblx0c3RhdGljIGxvZ2luQ2FsbGJhY2socmVzKSB7XG5cblx0XHRpZiAocmVzWydzdGF0dXMnXVsnc2lnbmVkX2luJ10pIHtcblx0XHRcdEdvb2dsZVBsdXMuZ2V0VXNlckRhdGEocmVzWydhY2Nlc3NfdG9rZW4nXSk7XG5cdFx0fSBlbHNlIGlmIChyZXNbJ2Vycm9yJ11bJ2FjY2Vzc19kZW5pZWQnXSkge1xuXHRcdFx0R29vZ2xlUGx1cy4kZGF0YURmZC5yZWplY3QoJ25vIHdheSBqb3NlJyk7XG5cdFx0fVxuXG5cdH1cblxuXHRzdGF0aWMgZ2V0VXNlckRhdGEodG9rZW4pIHtcblxuXHRcdGdhcGkuY2xpZW50LmxvYWQoJ3BsdXMnLCd2MScsICgpID0+IHtcblxuXHRcdFx0cmVxdWVzdCA9IGdhcGkuY2xpZW50LnBsdXMucGVvcGxlLmdldCh7ICd1c2VySWQnOiAnbWUnIH0pO1xuXHRcdFx0cmVxdWVzdC5leGVjdXRlKCAocmVzKSA9PiB7XG5cblx0XHRcdFx0Y29uc3QgdXNlckRhdGEgPSB7XG5cdFx0XHRcdFx0YWNjZXNzX3Rva2VuIDogdG9rZW4sXG5cdFx0XHRcdFx0ZnVsbF9uYW1lICAgIDogcmVzLmRpc3BsYXlOYW1lLFxuXHRcdFx0XHRcdHNvY2lhbF9pZCAgICA6IHJlcy5pZCxcblx0XHRcdFx0XHRlbWFpbCAgICAgICAgOiByZXMuZW1haWxzWzBdID8gcmVzLmVtYWlsc1swXS52YWx1ZSA6IGZhbHNlLFxuXHRcdFx0XHRcdHByb2ZpbGVfcGljICA6IHJlcy5pbWFnZS51cmxcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRHb29nbGVQbHVzLiRkYXRhRGZkLnJlc29sdmUodXNlckRhdGEpO1xuXG5cdFx0XHR9KTtcblxuXHRcdH0pO1xuXG5cdH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBHb29nbGVQbHVzO1xuIiwiLyogICAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICAgTWVkaWEgUXVlcmllcyBNYW5hZ2VyIFxuICogICAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqICAgXG4gKiAgIEBhdXRob3IgIDogRsOhYmlvIEF6ZXZlZG8gPGZhYmlvLmF6ZXZlZG9AdW5pdDkuY29tPiBVTklUOVxuICogICBAZGF0ZSAgICA6IFNlcHRlbWJlciAxNFxuICogICBAdXBkYXRlZCA6IEp1bHkgMjAxNSAocG9ydCB0byBlczYpXG4gKiAgIFxuICogICBJbnN0cnVjdGlvbnMgYXJlIGluIC9wcm9qZWN0L3Nhc3MvdXRpbHMvX3Jlc3BvbnNpdmUuc2Nzcy5cbiAqL1xuXG5jbGFzcyBNZWRpYVF1ZXJpZXMge1xuXG4gICAgLy8gQnJlYWtwb2ludHNcbiAgICBzdGF0aWMgU01BTEwgICAgICAgPSBcInNtYWxsXCI7XG4gICAgc3RhdGljIElQQUQgICAgICAgID0gXCJpcGFkXCI7XG4gICAgc3RhdGljIE1FRElVTSAgICAgID0gXCJtZWRpdW1cIjtcbiAgICBzdGF0aWMgTEFSR0UgICAgICAgPSBcImxhcmdlXCI7XG4gICAgc3RhdGljIEVYVFJBX0xBUkdFID0gXCJleHRyYS1sYXJnZVwiO1xuXG4gICAgc3RhdGljIEpTX0VMICAgICAgICA9IG51bGw7XG4gICAgc3RhdGljIEVMX0NMQVNTTkFNRSA9ICdqcy1tZWRpYXF1ZXJpZXMnO1xuXG4gICAgc3RhdGljIHNldHVwKCkge1xuXG4gICAgICAgIE1lZGlhUXVlcmllcy5KU19FTCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBNZWRpYVF1ZXJpZXMuSlNfRUwuY2xhc3NOYW1lID0gTWVkaWFRdWVyaWVzLkVMX0NMQVNTTkFNRTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChNZWRpYVF1ZXJpZXMuSlNfRUwpO1xuXG4gICAgICAgIE1lZGlhUXVlcmllcy5TTUFMTF9CUkVBS1BPSU5UICA9IHsgbmFtZTogXCJTbWFsbFwiLCBicmVha3BvaW50czogWyBNZWRpYVF1ZXJpZXMuU01BTEwgXSB9O1xuICAgICAgICBNZWRpYVF1ZXJpZXMuTUVESVVNX0JSRUFLUE9JTlQgPSB7IG5hbWU6IFwiTWVkaXVtXCIsIGJyZWFrcG9pbnRzOiBbIE1lZGlhUXVlcmllcy5NRURJVU0gXSB9O1xuICAgICAgICBNZWRpYVF1ZXJpZXMuTEFSR0VfQlJFQUtQT0lOVCAgPSB7IG5hbWU6IFwiTGFyZ2VcIiwgYnJlYWtwb2ludHM6IFsgTWVkaWFRdWVyaWVzLklQQUQsIE1lZGlhUXVlcmllcy5MQVJHRSwgTWVkaWFRdWVyaWVzLkVYVFJBX0xBUkdFIF0gfTtcblxuICAgICAgICBNZWRpYVF1ZXJpZXMuQlJFQUtQT0lOVFMgPSBbXG4gICAgICAgICAgICBNZWRpYVF1ZXJpZXMuU01BTExfQlJFQUtQT0lOVCxcbiAgICAgICAgICAgIE1lZGlhUXVlcmllcy5NRURJVU1fQlJFQUtQT0lOVCxcbiAgICAgICAgICAgIE1lZGlhUXVlcmllcy5MQVJHRV9CUkVBS1BPSU5UXG4gICAgICAgIF07XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0RGV2aWNlU3RhdGUoKSB7XG5cbiAgICAgICAgY29uc3QgcmUgPSAvKFxcJ3xcXFwiKS87XG5cbiAgICAgICAgbGV0IHZhbHVlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoTWVkaWFRdWVyaWVzLkpTX0VMKS5nZXRQcm9wZXJ0eVZhbHVlKFwiY29udGVudFwiKTtcbiAgICAgICAgaWYgKHJlLnRlc3QodmFsdWUuY2hhckF0KDApKSAmJiByZS50ZXN0KHZhbHVlLmNoYXJBdCh2YWx1ZS5sZW5ndGgtMSkpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnN1YnN0cigxLCB2YWx1ZS5sZW5ndGgtMik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWVcblxuICAgIH1cblxuICAgIHN0YXRpYyBnZXRCcmVha3BvaW50KCkge1xuXG4gICAgICAgIGNvbnN0IHN0YXRlICAgID0gTWVkaWFRdWVyaWVzLmdldERldmljZVN0YXRlKCk7XG4gICAgICAgIGxldCBicmVha3BvaW50ID0gXCJcIjtcblxuICAgICAgICBNZWRpYVF1ZXJpZXMuQlJFQUtQT0lOVFMuZm9yRWFjaCggKHBvaW50LCBpKSA9PiB7XG4gICAgICAgICAgICBpZiAoTWVkaWFRdWVyaWVzLkJSRUFLUE9JTlRTW2ldLmJyZWFrcG9pbnRzLmluZGV4T2Yoc3RhdGUpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50ID0gcG9pbnQubmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJyZWFrcG9pbnQ7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgaXNCcmVha3BvaW50KGJyZWFrcG9pbnQpIHtcblxuICAgICAgICBsZXQgYnJlYWtwb2ludE1hdGNoID0gZmFsc2U7XG5cbiAgICAgICAgYnJlYWtwb2ludC5icmVha3BvaW50cy5mb3JFYWNoKCAocG9pbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChwb2ludCA9PSBNZWRpYVF1ZXJpZXMuZ2V0RGV2aWNlU3RhdGUoKSlcbiAgICAgICAgICAgICAgICBicmVha3BvaW50TWF0Y2ggPSB0cnVlO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYnJlYWtwb2ludE1hdGNoO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1lZGlhUXVlcmllcztcblxud2luZG93Lk1lZGlhUXVlcmllcyA9IE1lZGlhUXVlcmllcztcbiIsIi8qXG5SZXF1ZXN0ZXJcbi0gV3JhcHBlciBmb3IgYCQuYWpheGAgY2FsbHNcbiovXG5cbmNsYXNzIFJlcXVlc3RlciB7XG5cbiAgICBzdGF0aWMgcmVxdWVzdHMgPSBbXTtcblxuICAgIHN0YXRpYyByZXF1ZXN0KCBkYXRhICkge1xuICAgICAgICAvKlxuICAgICAgICBgZGF0YSA9IHtgPGJyPlxuICAgICAgICBgICB1cmwgICAgICAgICA6IFN0cmluZ2A8YnI+XG4gICAgICAgIGAgIHR5cGUgICAgICAgIDogXCJQT1NUL0dFVC9QVVRcImA8YnI+XG4gICAgICAgIGAgIGRhdGEgICAgICAgIDogT2JqZWN0YDxicj5cbiAgICAgICAgYCAgZGF0YVR5cGUgICAgOiBqUXVlcnkgZGF0YVR5cGVgPGJyPlxuICAgICAgICBgICBjb250ZW50VHlwZSA6IFN0cmluZ2A8YnI+XG4gICAgICAgIGB9YFxuICAgICAgICAqL1xuXG4gICAgICAgIGNvbnN0IHIgPSAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsICAgICAgICAgOiBkYXRhLnVybCxcbiAgICAgICAgICAgIHR5cGUgICAgICAgIDogZGF0YS50eXBlID8gZGF0YS50eXBlIDogXCJQT1NUXCIsXG4gICAgICAgICAgICBkYXRhICAgICAgICA6IGRhdGEuZGF0YSA/IGRhdGEuZGF0YSA6IG51bGwsXG4gICAgICAgICAgICBkYXRhVHlwZSAgICA6IGRhdGEuZGF0YVR5cGUgPyBkYXRhLmRhdGFUeXBlIDogXCJqc29uXCIsXG4gICAgICAgICAgICBjb250ZW50VHlwZSA6IGRhdGEuY29udGVudFR5cGUgPyBkYXRhLmNvbnRlbnRUeXBlIDogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9VVRGLThcIixcbiAgICAgICAgICAgIHByb2Nlc3NEYXRhIDogKGRhdGEucHJvY2Vzc0RhdGEgIT09IG51bGwgJiYgZGF0YS5wcm9jZXNzRGF0YSAhPT0gdW5kZWZpbmVkKSA/IGRhdGEucHJvY2Vzc0RhdGEgOiB0cnVlXG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgci5kb25lKGRhdGEuZG9uZSk7XG4gICAgICAgIHIuZmFpbChkYXRhLmZhaWwpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHI7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkSW1hZ2UoZGF0YSwgZG9uZSwgZmFpbCkge1xuICAgICAgICAvKlxuICAgICAgICAqKiBVc2FnZTogPGJyPlxuICAgICAgICBgZGF0YSA9IGNhbnZhc3MudG9EYXRhVVJMKFwiaW1hZ2UvanBlZ1wiKS5zbGljZShcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIubGVuZ3RoKWA8YnI+XG4gICAgICAgIGBSZXF1ZXN0ZXIuYWRkSW1hZ2UgZGF0YSwgXCJ6b2V0cm9wZVwiLCBAZG9uZSwgQGZhaWxgXG4gICAgICAgICovXG5cbiAgICAgICAgUmVxdWVzdGVyLnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsICAgIDogJy9hcGkvaW1hZ2VzLycsXG4gICAgICAgICAgICB0eXBlICAgOiAnUE9TVCcsXG4gICAgICAgICAgICBkYXRhICAgOiB7IGltYWdlX2Jhc2U2NCA6IGVuY29kZVVSSShkYXRhKSB9LFxuICAgICAgICAgICAgZG9uZSAgIDogZG9uZSxcbiAgICAgICAgICAgIGZhaWwgICA6IGZhaWxcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBzdGF0aWMgZGVsZXRlSW1hZ2UoaWQsIGRvbmUsIGZhaWwpIHtcbiAgICAgICAgXG4gICAgICAgIFJlcXVlc3Rlci5yZXF1ZXN0KHtcbiAgICAgICAgICAgIHVybCAgICA6ICcvYXBpL2ltYWdlcy8nK2lkLFxuICAgICAgICAgICAgdHlwZSAgIDogJ0RFTEVURScsXG4gICAgICAgICAgICBkb25lICAgOiBkb25lLFxuICAgICAgICAgICAgZmFpbCAgIDogZmFpbFxuICAgICAgICB9KTtcblxuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXF1ZXN0ZXI7XG4gICAgIiwiLypcblNoYXJpbmcgY2xhc3MgZm9yIG5vbi1TREsgbG9hZGVkIHNvY2lhbCBuZXR3b3Jrcy5cbklmIFNESyBpcyBsb2FkZWQsIGFuZCBwcm92aWRlcyBzaGFyZSBtZXRob2RzLCB0aGVuIHVzZSB0aGF0IGNsYXNzIGluc3RlYWQsIGVnLiBgRmFjZWJvb2suc2hhcmVgIGluc3RlYWQgb2YgYFNoYXJlLmZhY2Vib29rYFxuKi9cbmNsYXNzIFNoYXJlIHtcblxuICAgIHVybCA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICB0aGlzLnVybCA9IHRoaXMuX19OQU1FU1BBQ0VfXygpLkJBU0VfUEFUSDtcblxuICAgIH1cblxuICAgIG9wZW5XaW4odXJsLCB3LCBoKSB7XG5cbiAgICAgICAgY29uc3QgbGVmdCA9ICggc2NyZWVuLmF2YWlsV2lkdGggIC0gdyApID4+IDE7XG4gICAgICAgIGNvbnN0IHRvcCAgPSAoIHNjcmVlbi5hdmFpbEhlaWdodCAtIGggKSA+PiAxO1xuXG4gICAgICAgIHdpbmRvdy5vcGVuKHVybCwgJycsICd0b3A9Jyt0b3ArJyxsZWZ0PScrbGVmdCsnLHdpZHRoPScrdysnLGhlaWdodD0nK2grJyxsb2NhdGlvbj1ubyxtZW51YmFyPW5vJyk7XG5cbiAgICB9XG5cbiAgICBwbHVzKHVybD0nJykge1xuXG4gICAgICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwgfHwgdGhpcy51cmwpO1xuXG4gICAgICAgIHRoaXMub3BlbldpbihgaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPSR7dXJsfWAsIDY1MCwgMzg1KTtcblxuICAgIH1cblxuICAgIHBpbnRlcmVzdCh1cmw9JycsIG1lZGlhPScnLCBkZXNjcj0nJykge1xuXG4gICAgICAgIHVybCAgID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCB8fCB0aGlzLnVybCk7XG4gICAgICAgIG1lZGlhID0gZW5jb2RlVVJJQ29tcG9uZW50KG1lZGlhKTtcbiAgICAgICAgZGVzY3IgPSBlbmNvZGVVUklDb21wb25lbnQoZGVzY3IpO1xuXG4gICAgICAgIHRoaXMub3BlbldpbihgaHR0cDovL3d3dy5waW50ZXJlc3QuY29tL3Bpbi9jcmVhdGUvYnV0dG9uLz91cmw9JHt1cmx9Jm1lZGlhPSR7bWVkaWF9JmRlc2NyaXB0aW9uPSR7ZGVzY3J9YCwgNzM1LCAzMTApO1xuXG4gICAgfVxuXG4gICAgdHVtYmxyKHVybD0nJywgbWVkaWE9JycsIGRlc2NyPScnKSB7XG5cbiAgICAgICAgdXJsICAgPSBlbmNvZGVVUklDb21wb25lbnQodXJsIHx8IHRoaXMudXJsKTtcbiAgICAgICAgbWVkaWEgPSBlbmNvZGVVUklDb21wb25lbnQobWVkaWEpO1xuICAgICAgICBkZXNjciA9IGVuY29kZVVSSUNvbXBvbmVudChkZXNjcik7XG5cbiAgICAgICAgdGhpcy5vcGVuV2luKGBodHRwOi8vd3d3LnR1bWJsci5jb20vc2hhcmUvcGhvdG8/c291cmNlPSR7bWVkaWF9JmNhcHRpb249JHtkZXNjcn0mY2xpY2tfdGhydT0ke3VybH1gLCA0NTAsIDQzMCk7XG5cbiAgICB9XG5cbiAgICBmYWNlYm9vayh1cmw9JycsIGNvcHk9JycpIHtcblxuICAgICAgICB1cmwgICAgICAgICA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwgfHwgdGhpcy51cmwpO1xuICAgICAgICBjb25zdCBkZWNzciA9IGVuY29kZVVSSUNvbXBvbmVudChjb3B5KTtcblxuICAgICAgICB0aGlzLm9wZW5XaW4oYGh0dHA6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlLnBocD91PSR7dXJsfSZ0PSR7ZGVjc3J9YCwgNjAwLCAzMDApO1xuXG4gICAgfVxuXG4gICAgdHdpdHRlcih1cmw9JycsIGNvcHk9JycpIHtcblxuICAgICAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsIHx8IHRoaXMudXJsKTtcbiAgICAgICAgaWYgKGNvcHkgPT09ICcnKSB7XG4gICAgICAgICAgICBjb3B5ID0gdGhpcy5fX05BTUVTUEFDRV9fKCkubG9jYWxlLmdldCgnc2VvX3R3aXR0ZXJfY2FyZF9kZXNjcmlwdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlc2NyID0gZW5jb2RlVVJJQ29tcG9uZW50KGNvcHkpO1xuXG4gICAgICAgIHRoaXMub3BlbldpbihgaHR0cDovL3R3aXR0ZXIuY29tL2ludGVudC90d2VldC8/dGV4dD0ke2Rlc2NyfSZ1cmw9JHt1cmx9YCwgNjAwLCAzMDApO1xuXG4gICAgfVxuXG4gICAgcmVucmVuKHVybD0nJykge1xuXG4gICAgICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwgfHwgdGhpcy51cmwpO1xuXG4gICAgICAgIHRoaXMub3BlbldpbihgaHR0cDovL3NoYXJlLnJlbnJlbi5jb20vc2hhcmUvYnV0dG9uc2hhcmUuZG8/bGluaz0ke3VybH1gLCA2MDAsIDMwMCk7XG5cbiAgICB9XG5cbiAgICB3ZWlibyh1cmw9JycpIHtcblxuICAgICAgICB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQodXJsIHx8IHRoaXMudXJsKTtcblxuICAgICAgICB0aGlzLm9wZW5XaW4oYGh0dHA6Ly9zZXJ2aWNlLndlaWJvLmNvbS9zaGFyZS9zaGFyZS5waHA/dXJsPSR7dXJsfSZsYW5ndWFnZT16aF9jbmAsIDYwMCwgMzAwKTtcblxuICAgIH1cblxuICAgIF9fTkFNRVNQQUNFX18oKSB7XG5cbiAgICAgICAgcmV0dXJuIHdpbmRvdy5fX05BTUVTUEFDRV9fO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNoYXJlO1xuIiwiY29uc3QgQWJzdHJhY3RWaWV3ID0gQmFja2JvbmUuVmlldy5leHRlbmQoe1xuXG5cdGVsICAgICAgICAgICA6IG51bGwsXG5cdGlkICAgICAgICAgICA6IG51bGwsXG5cdGNoaWxkcmVuICAgICA6IG51bGwsXG5cdHRlbXBsYXRlICAgICA6IG51bGwsXG5cdHRlbXBsYXRlVmFycyA6IG51bGwsXG5cblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG5cdFx0XG5cdFx0dGhpcy5jaGlsZHJlbiA9IFtdO1xuXG5cdFx0aWYgKHRoaXMudGVtcGxhdGUpIHtcblx0XHRcdGNvbnN0IHRtcEhUTUwgPSBfLnRlbXBsYXRlKHRoaXMuX19OQU1FU1BBQ0VfXygpLnRlbXBsYXRlcy5nZXQodGhpcy50ZW1wbGF0ZSkpO1xuXG5cdFx0XHR0aGlzLnNldEVsZW1lbnQoXG5cdFx0XHRcdHRtcEhUTUwodGhpcy50ZW1wbGF0ZVZhcnMpXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmlkKSB7XG5cdFx0XHR0aGlzLiRlbC5hdHRyKCdpZCcsIHRoaXMuaWQpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmNsYXNzTmFtZSkge1xuXHRcdFx0dGhpcy4kZWwuYWRkQ2xhc3ModGhpcy5jbGFzc05hbWUpO1xuXHRcdH1cblx0XHRcblx0XHR0aGlzLmluaXQoKTtcblxuXHRcdHRoaXMucGF1c2VkID0gZmFsc2U7XG5cblx0fSxcblxuXHRpbml0OiBmdW5jdGlvbigpIHt9LFxuXG5cdHVwZGF0ZTogZnVuY3Rpb24oKSB7fSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge30sXG5cblx0YWRkQ2hpbGQ6IGZ1bmN0aW9uKGNoaWxkLCBwcmVwZW5kID0gZmFsc2UpIHtcblxuXHRcdGlmIChjaGlsZC5lbCkge1xuXHRcdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcblx0XHR9XG5cblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLmFkZFRvU2VsZWN0b3IgPyB0aGlzLiRlbC5maW5kKHRoaXMuYWRkVG9TZWxlY3RvcikuZXEoMCkgOiB0aGlzLiRlbDtcblx0XHRjb25zdCBjICAgICAgPSBjaGlsZC5lbCA/IGNoaWxkLiRlbCA6IGNoaWxkO1xuXG5cdFx0aWYgKCFwcmVwZW5kKSB7XG5cdFx0XHR0YXJnZXQuYXBwZW5kKGMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXQucHJlcGVuZChjKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHRyZXBsYWNlOiBmdW5jdGlvbihkb20sIGNoaWxkKSB7XG5cblx0XHRpZiAoY2hpbGQuZWwpIHtcblx0XHRcdHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgYyA9IGNoaWxkLmVsID8gY2hpbGQuJGVsIDogY2hpbGQ7XG5cblx0XHR0aGlzLiRlbC5jaGlsZHJlbihkb20pLnJlcGxhY2VXaXRoKGMpO1xuXG5cdH0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbihjaGlsZCkge1xuXG5cdFx0aWYgKCFjaGlsZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRcblx0XHRjb25zdCBjID0gY2hpbGQuZWwgPyBjaGlsZC4kZWwgOiAkKGNoaWxkKTtcblx0XHRpZiAoYyAmJiBjaGlsZC5kaXNwb3NlKSB7XG5cdFx0XHRjaGlsZC5kaXNwb3NlKCk7XG5cdFx0fVxuXG5cdFx0aWYgKGMgJiYgdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSAhPSAtMSkge1xuXHRcdFx0dGhpcy5jaGlsZHJlbi5zcGxpY2UoIHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZCksIDEgKTtcblx0XHR9XG5cblx0XHRjLnJlbW92ZSgpO1xuXG5cdH0sXG5cblx0b25SZXNpemU6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goIChjaGlsZCkgPT4ge1xuXHRcdFx0aWYgKGNoaWxkLm9uUmVzaXplKSB7XG5cdFx0XHRcdGNoaWxkLm9uUmVzaXplKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSxcblxuXHRtb3VzZUVuYWJsZWQ6IGZ1bmN0aW9uKCBlbmFibGVkICkge1xuXG5cdFx0dGhpcy4kZWwuY3NzKHtcblx0XHRcdFwicG9pbnRlci1ldmVudHNcIjogZW5hYmxlZCA/IFwiYXV0b1wiIDogXCJub25lXCJcblx0XHR9KTtcblxuXHR9LFxuXG5cdENTU1RyYW5zbGF0ZTogZnVuY3Rpb24oeCwgeSwgdmFsdWU9JyUnLCBzY2FsZSkge1xuXG5cdFx0bGV0IHN0cjtcblxuXHRcdGlmIChNb2Rlcm5penIuY3NzdHJhbnNmb3JtczNkKSB7XG5cdFx0XHRzdHIgPSBgdHJhbnNsYXRlM2QoJHt4K3ZhbHVlfSwgJHt5K3ZhbHVlfSwgMClgO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHIgPSBgdHJhbnNsYXRlKCR7eCt2YWx1ZX0sICR7eSt2YWx1ZX0pYFxuXHRcdH1cblxuXHRcdGlmIChzY2FsZSkge1xuXHRcdFx0c3RyID0gYCR7c3RyfSBzY2FsZSgke3NjYWxlfSlgXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHN0cjtcblxuXHR9LFxuXG5cdHVuTXV0ZUFsbDogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLmNoaWxkcmVuLmZvckVhY2goIChjaGlsZCkgPT4ge1xuXG5cdFx0XHRpZiAoY2hpbGQudW5NdXRlKSB7XG5cdFx0XHRcdGNoaWxkLnVuTXV0ZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2hpbGQuY2hpbGRyZW4ubGVuZ3RoKSB7XG5cdFx0XHRcdGNoaWxkLnVuTXV0ZUFsbCgpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0fSxcblxuXHRtdXRlQWxsOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCggKGNoaWxkKSA9PiB7XG5cblx0XHRcdGlmIChjaGlsZC5tdXRlKSB7XG5cdFx0XHRcdGNoaWxkLm11dGUoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGNoaWxkLmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0XHRjaGlsZC5tdXRlQWxsKCk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHR9LFxuXG5cdHJlbW92ZUFsbENoaWxkcmVuOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCggKGNoaWxkKSA9PiB7XG5cdFx0XHR0aGlzLnJlbW92ZShjaGlsZCk7XG5cdFx0fSk7XG5cblx0fSxcblxuXHR0cmlnZ2VyQ2hpbGRyZW46IGZ1bmN0aW9uKG1zZywgY2hpbGRyZW4pIHtcblxuXHRcdGNoaWxkcmVuID0gY2hpbGRyZW4gfHwgdGhpcy5jaGlsZHJlbjtcblxuXHRcdGNoaWxkcmVuLmZvckVhY2goIChjaGlsZCwgaSkgPT4ge1xuXG5cdFx0XHRjaGlsZC50cmlnZ2VyKG1zZyk7XG5cblx0XHRcdGlmIChjaGlsZC5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy50cmlnZ2VyQ2hpbGRyZW4obXNnLCBjaGlsZC5jaGlsZHJlbik7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHR9LFxuXG5cdGNhbGxDaGlsZHJlbjogZnVuY3Rpb24obWV0aG9kLCBwYXJhbXMsIGNoaWxkcmVuKSB7XG5cblx0XHRjaGlsZHJlbiA9IGNoaWxkcmVuIHx8IHRoaXMuY2hpbGRyZW47XG5cblx0XHRjaGlsZHJlbi5mb3JFYWNoKCAoY2hpbGQsIGkpID0+IHtcblxuXHRcdFx0aWYgKGNoaWxkW21ldGhvZF0pIHtcblx0XHRcdFx0Y2hpbGRbbWV0aG9kXShwYXJhbXMpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2hpbGQuY2hpbGRyZW4ubGVuZ3RoKSB7XG5cdFx0XHRcdHRoaXMuY2FsbENoaWxkcmVuKG1ldGhvZCwgcGFyYW1zLCBjaGlsZC5jaGlsZHJlbik7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHR9LFxuXG5cdGNhbGxDaGlsZHJlbkFuZFNlbGY6IGZ1bmN0aW9uKG1ldGhvZCwgcGFyYW1zLCBjaGlsZHJlbikge1xuXG5cdFx0Y2hpbGRyZW4gPSBjaGlsZHJlbiB8fCB0aGlzLmNoaWxkcmVuO1xuXG5cdFx0aWYgKHRoaXNbbWV0aG9kXSkge1xuXHRcdFx0dGhpc1ttZXRob2RdKHBhcmFtcyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jYWxsQ2hpbGRyZW4obWV0aG9kLCBwYXJhbXMsIGNoaWxkcmVuKTtcblxuXHR9LFxuXG5cdHN1cHBsYW50U3RyaW5nOiBmdW5jdGlvbihzdHIsIHZhbHMpIHtcblxuXHRcdHJldHVybiBzdHIucmVwbGFjZSgve3sgKFtee31dKikgfX0vZywgKGEsIGIpID0+IHtcblx0XHRcdGNvbnN0IHIgPSB2YWxzW2JdO1xuXHRcdFx0aWYgKHR5cGVvZiByID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiByID09PSBcIm51bWJlclwiKSB7XG5cdFx0XHRcdHJldHVybiByO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSxcblxuXHRkaXNwb3NlOiBmdW5jdGlvbigpIHtcblxuXHRcdC8qXG5cdFx0b3ZlcnJpZGUgb24gcGVyIHZpZXcgYmFzaXMgLSB1bmJpbmQgZXZlbnQgaGFuZGxlcnMgZXRjXG5cdFx0Ki9cblxuXHR9LFxuXG5cdF9fTkFNRVNQQUNFX18oKSB7XG5cblx0XHRyZXR1cm4gd2luZG93Ll9fTkFNRVNQQUNFX187XG5cblx0fVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQWJzdHJhY3RWaWV3O1xuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuL0Fic3RyYWN0Vmlldyc7XG5cbmNvbnN0IEFic3RyYWN0Vmlld1BhZ2UgPSBBYnN0cmFjdFZpZXcuZXh0ZW5kKHtcblxuXHRfc2hvd24gICAgIDogZmFsc2UsXG5cdF9saXN0ZW5pbmcgOiBmYWxzZSxcblxuXHRzaG93OiBmdW5jdGlvbihjYikge1xuXG5cdFx0aWYgKHRoaXMuX3Nob3duKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX3Nob3duID0gdHJ1ZTtcblxuXHRcdC8qXG5cdFx0Q0hBTkdFIEhFUkUgLSAncGFnZScgdmlld3MgYXJlIGFsd2F5cyBpbiBET00gLSB0byBzYXZlIGhhdmluZyB0byByZS1pbml0aWFsaXNlIGdtYXAgZXZlbnRzIChQSVRBKS4gTm8gbG9uZ2VyIHJlcXVpcmUgOmRpc3Bvc2UgbWV0aG9kXG5cdFx0Ki9cblx0XHR0aGlzLl9fTkFNRVNQQUNFX18oKS5hcHBWaWV3LndyYXBwZXIuYWRkQ2hpbGQodGhpcyk7XG5cdFx0dGhpcy5jYWxsQ2hpbGRyZW5BbmRTZWxmKCdzZXRMaXN0ZW5lcnMnLCAnb24nKTtcblxuXHRcdC8vIHJlcGxhY2Ugd2l0aCBzb21lIHByb3BlciB0cmFuc2l0aW9uIGlmIHdlIGNhblxuXHRcdHRoaXMuJGVsLmNzcyh7ICd2aXNpYmlsaXR5JyA6ICd2aXNpYmxlJyB9KTtcblx0XHRcblx0XHRpZiAoY2IgJiYgdHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjYigpO1xuXHRcdH1cblxuXHR9LFxuXG5cdGhpZGU6IGZ1bmN0aW9uKGNiKSB7XG5cblx0XHRpZiAoIXRoaXMuX3Nob3duKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX3Nob3duID0gZmFsc2U7XG5cblx0XHQvKlxuXHRcdENIQU5HRSBIRVJFIC0gJ3BhZ2UnIHZpZXdzIGFyZSBhbHdheXMgaW4gRE9NIC0gdG8gc2F2ZSBoYXZpbmcgdG8gcmUtaW5pdGlhbGlzZSBnbWFwIGV2ZW50cyAoUElUQSkuIE5vIGxvbmdlciByZXF1aXJlIDpkaXNwb3NlIG1ldGhvZFxuXHRcdCovXG5cdFx0dGhpcy5fX05BTUVTUEFDRV9fKCkuYXBwVmlldy53cmFwcGVyLnJlbW92ZSh0aGlzKTtcblxuXHRcdC8vIHRoaXMuY2FsbENoaWxkcmVuQW5kU2VsZiAnc2V0TGlzdGVuZXJzJywgJ29mZidcblxuXHRcdC8vIHJlcGxhY2Ugd2l0aCBzb21lIHByb3BlciB0cmFuc2l0aW9uIGlmIHdlIGNhblxuXHRcdHRoaXMuJGVsLmNzcyh7ICd2aXNpYmlsaXR5JyA6ICdoaWRkZW4nIH0pO1xuXHRcdFxuXHRcdGlmIChjYiAmJiB0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNiKCk7XG5cdFx0fVxuXG5cdH0sXG5cblx0ZGlzcG9zZTogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLmNhbGxDaGlsZHJlbkFuZFNlbGYoJ3NldExpc3RlbmVycycsICdvZmYnKTtcblxuXHR9LFxuXG5cdHNldExpc3RlbmVyczogZnVuY3Rpb24oc2V0dGluZykge1xuXG5cdFx0aWYgKHNldHRpbmcgPT09IHRoaXMuX2xpc3RlbmluZykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuX2xpc3RlbmluZyA9IHNldHRpbmc7XG5cblx0fVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdFZpZXdQYWdlO1xuIiwiaW1wb3J0IEFic3RyYWN0VmlldyBmcm9tICcuLi9BYnN0cmFjdFZpZXcnO1xuXG5jb25zdCBGb290ZXIgPSBBYnN0cmFjdFZpZXcuZXh0ZW5kKHtcblxuXHR0ZW1wbGF0ZSA6ICdzaXRlLWZvb3RlcicsXG5cblx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy50ZW1wbGF0ZVZhcnMgPSB7XG4gICAgICAgIFx0ZGVzYyA6IHRoaXMuX19OQU1FU1BBQ0VfXygpLmxvY2FsZS5nZXQoXCJmb290ZXJfZGVzY1wiKVxuXHRcdH07XG5cbiAgICAgICAgRm9vdGVyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzKTtcblxuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBGb290ZXI7XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4uL0Fic3RyYWN0Vmlldyc7XG5cbmNvbnN0IEhlYWRlciA9IEFic3RyYWN0Vmlldy5leHRlbmQoe1xuXG5cdHRlbXBsYXRlIDogJ3NpdGUtaGVhZGVyJyxcblx0XG5cdGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMudGVtcGxhdGVWYXJzID0ge1xuXHRcdFx0ZGVzYyAgICA6IHRoaXMuX19OQU1FU1BBQ0VfXygpLmxvY2FsZS5nZXQoXCJoZWFkZXJfZGVzY1wiKSxcblx0XHRcdGhvbWUgICAgOiB7XG5cdFx0XHRcdGxhYmVsICAgIDogJ0dvIHRvIGhvbWVwYWdlJyxcblx0XHRcdFx0dXJsICAgICAgOiB0aGlzLl9fTkFNRVNQQUNFX18oKS5CQVNFX1BBVEggKyAnLycgKyB0aGlzLl9fTkFNRVNQQUNFX18oKS5uYXYuc2VjdGlvbnMuSE9NRVxuXHRcdFx0fSxcblx0XHRcdGV4YW1wbGUgOiB7XG5cdFx0XHRcdGxhYmVsICAgIDogJ0dvIHRvIGV4YW1wbGUgcGFnZScsXG5cdFx0XHRcdHVybCAgICAgIDogdGhpcy5fX05BTUVTUEFDRV9fKCkuQkFTRV9QQVRIICsgJy8nICsgdGhpcy5fX05BTUVTUEFDRV9fKCkubmF2LnNlY3Rpb25zLkVYQU1QTEVcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0SGVhZGVyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzKTtcblxuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4uL0Fic3RyYWN0Vmlldyc7XG5cbmNvbnN0IFByZWxvYWRlciA9IEFic3RyYWN0Vmlldy5leHRlbmQoe1xuXG5cdGNiIDogbnVsbCxcblx0XG5cdFRSQU5TSVRJT05fVElNRSA6IDAuNSxcblxuXHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XG5cblx0XHRQcmVsb2FkZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMpO1xuXG5cdFx0dGhpcy5zZXRFbGVtZW50KCQoJyNwcmVsb2FkZXInKSk7XG5cblx0fSxcblxuXHRpbml0OiBmdW5jdGlvbigpIHtcblxuXHR9LFxuXG5cdHNob3c6IGZ1bmN0aW9uKGNiKSB7XG5cblx0XHR0aGlzLmNiID0gY2I7XG5cblx0XHR0aGlzLiRlbC5jc3MoeydkaXNwbGF5JyA6ICdibG9jayd9KTtcblxuXHR9LFxuXG5cdG9uU2hvd0NvbXBsZXRlOiBmdW5jdGlvbigpIHtcblxuXHRcdGlmICh0aGlzLmNiICYmIHR5cGVvZih0aGlzLmNiKSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhpcy5jYigpO1xuXHRcdH1cblxuXHR9LFxuXG5cdGhpZGU6IGZ1bmN0aW9uKGNiKSB7XG5cblx0XHR0aGlzLmNiID0gY2I7XG5cblx0XHR0aGlzLm9uSGlkZUNvbXBsZXRlKCk7XG5cblx0fSxcblxuXHRvbkhpZGVDb21wbGV0ZTogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLiRlbC5jc3MoeydkaXNwbGF5JyA6ICdub25lJ30pO1xuXHRcdFxuXHRcdGlmICh0aGlzLmNiICYmIHR5cGVvZih0aGlzLmNiKSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0dGhpcy5jYigpO1xuXHRcdH1cblxuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBQcmVsb2FkZXI7XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4uL0Fic3RyYWN0Vmlldyc7XG5pbXBvcnQgSG9tZVZpZXcgZnJvbSAnLi4vaG9tZS9Ib21lVmlldyc7XG5pbXBvcnQgRXhhbXBsZVBhZ2VWaWV3IGZyb20gJy4uL2V4YW1wbGVQYWdlL0V4YW1wbGVQYWdlVmlldyc7XG5pbXBvcnQgTmF2IGZyb20gJy4uLy4uL3JvdXRlci9OYXYnO1xuXG5jb25zdCBXcmFwcGVyID0gQWJzdHJhY3RWaWV3LmV4dGVuZCh7XG5cblx0VklFV19UWVBFX1BBR0UgIDogJ3BhZ2UnLFxuXHRWSUVXX1RZUEVfTU9EQUwgOiAnbW9kYWwnLFxuXG5cdHRlbXBsYXRlIDogJ3dyYXBwZXInLFxuXG5cdHZpZXdzICAgICAgICAgIDogbnVsbCxcblx0cHJldmlvdXNWaWV3ICAgOiBudWxsLFxuXHRjdXJyZW50VmlldyAgICA6IG51bGwsXG5cdGJhY2tncm91bmRWaWV3IDogbnVsbCxcblxuXHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLnZpZXdzID0ge1xuXHRcdFx0aG9tZSA6IHtcblx0XHRcdFx0Y2xhc3NSZWYgOiBIb21lVmlldyxcblx0XHRcdFx0cm91dGUgICAgOiB0aGlzLl9fTkFNRVNQQUNFX18oKS5uYXYuc2VjdGlvbnMuSE9NRSxcblx0XHRcdFx0dmlldyAgICAgOiBudWxsLFxuXHRcdFx0XHR0eXBlICAgICA6IHRoaXMuVklFV19UWVBFX1BBR0Vcblx0XHRcdH0sXG5cdFx0XHRleGFtcGxlIDoge1xuXHRcdFx0XHRjbGFzc1JlZiA6IEV4YW1wbGVQYWdlVmlldyxcblx0XHRcdFx0cm91dGUgICAgOiB0aGlzLl9fTkFNRVNQQUNFX18oKS5uYXYuc2VjdGlvbnMuRVhBTVBMRSxcblx0XHRcdFx0dmlldyAgICAgOiBudWxsLFxuXHRcdFx0XHR0eXBlICAgICA6IHRoaXMuVklFV19UWVBFX1BBR0Vcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy5jcmVhdGVDbGFzc2VzKCk7XG5cblx0XHRXcmFwcGVyLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzKTtcblxuXHRcdC8vIGRlY2lkZSBpZiB5b3Ugd2FudCB0byBhZGQgYWxsIGNvcmUgRE9NIHVwIGZyb250LCBvciBhZGQgb25seSB3aGVuIHJlcXVpcmVkLCBzZWUgY29tbWVudHMgaW4gQWJzdHJhY3RWaWV3UGFnZS5jb2ZmZWVcblx0XHQvLyBAYWRkQ2xhc3NlcygpXG5cblx0fSxcblxuXHRjcmVhdGVDbGFzc2VzOiBmdW5jdGlvbigpIHtcblxuXHRcdGZvciAobGV0IGtleSBpbiB0aGlzLnZpZXdzKSB7XG5cblx0XHRcdHRoaXMudmlld3Nba2V5XS52aWV3ID0gbmV3IHRoaXMudmlld3Nba2V5XS5jbGFzc1JlZjtcblxuXHRcdH1cblxuXHR9LFxuXG5cdGFkZENsYXNzZXM6IGZ1bmN0aW9uKCkge1xuXG5cdFx0Zm9yIChsZXQga2V5IGluIHRoaXMudmlld3MpIHtcblxuXHRcdFx0aWYgKHRoaXMudmlld3Nba2V5XS50eXBlID09PSB0aGlzLlZJRVdfVFlQRV9QQUdFKSB7XG5cdFx0XHRcdHRoaXMuYWRkQ2hpbGQodGhpcy52aWV3c1trZXldLnZpZXcpO1xuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH0sXG5cblx0Z2V0Vmlld0J5Um91dGU6IGZ1bmN0aW9uKHJvdXRlKSB7XG5cblx0XHRsZXQgdmlldyA9IGZhbHNlO1xuXG5cdFx0Zm9yIChsZXQga2V5IGluIHRoaXMudmlld3MpIHtcblxuXHRcdFx0aWYgKHRoaXMudmlld3Nba2V5XS5yb3V0ZSA9PT0gcm91dGUpIHtcblx0XHRcdFx0dmlldyA9IHRoaXMudmlld3Nba2V5XTtcblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiB2aWV3O1xuXG5cdH0sXG5cblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLl9fTkFNRVNQQUNFX18oKS5hcHBWaWV3Lm9uKCdzdGFydCcsIHRoaXMuc3RhcnQuYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHRzdGFydDogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLl9fTkFNRVNQQUNFX18oKS5hcHBWaWV3Lm9mZignc3RhcnQnLCB0aGlzLnN0YXJ0LmJpbmQodGhpcykpO1xuXG5cdFx0dGhpcy5iaW5kRXZlbnRzKCk7XG5cblx0fSxcblxuXHRiaW5kRXZlbnRzOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMuX19OQU1FU1BBQ0VfXygpLm5hdi5vbihOYXYuRVZFTlRfQ0hBTkdFX1ZJRVcsIHRoaXMuY2hhbmdlVmlldy5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLl9fTkFNRVNQQUNFX18oKS5uYXYub24oTmF2LkVWRU5UX0NIQU5HRV9TVUJfVklFVywgdGhpcy5jaGFuZ2VTdWJWaWV3LmJpbmQodGhpcykpO1xuXG5cdH0sXG5cblx0LypcblxuXHRUSElTIElTIEEgTUVTUywgU09SVCBJVCAobmVpbClcblxuXHQqL1xuXHRjaGFuZ2VWaWV3OiBmdW5jdGlvbihwcmV2aW91cywgY3VycmVudCkge1xuXG5cdFx0Y29uc29sZS5sb2coXCJjaGFuZ2VWaWV3OiBmdW5jdGlvbihwcmV2aW91cywgY3VycmVudCkge1wiLCBwcmV2aW91cywgY3VycmVudCk7XG5cblx0XHR0aGlzLnByZXZpb3VzVmlldyA9IHRoaXMuZ2V0Vmlld0J5Um91dGUocHJldmlvdXMuYXJlYSk7XG5cdFx0dGhpcy5jdXJyZW50VmlldyAgPSB0aGlzLmdldFZpZXdCeVJvdXRlKGN1cnJlbnQuYXJlYSk7XG5cblx0XHRjb25zb2xlLmxvZyhcInRoaXMucHJldmlvdXNWaWV3XCIsIHRoaXMucHJldmlvdXNWaWV3KTtcblx0XHRjb25zb2xlLmxvZyhcInRoaXMuY3VycmVudFZpZXdcIiwgdGhpcy5jdXJyZW50Vmlldyk7XG5cblx0XHRpZiAoIXRoaXMucHJldmlvdXNWaWV3KSB7XG5cblx0XHRcdGlmICh0aGlzLmN1cnJlbnRWaWV3LnR5cGUgPT09IHRoaXMuVklFV19UWVBFX1BBR0UpIHtcblx0XHRcdFx0dGhpcy50cmFuc2l0aW9uVmlld3MoZmFsc2UsIHRoaXMuY3VycmVudFZpZXcudmlldyk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuY3VycmVudFZpZXcudHlwZSA9PT0gdGhpcy5WSUVXX1RZUEVfTU9EQUwpIHtcblx0XHRcdFx0dGhpcy5iYWNrZ3JvdW5kVmlldyA9IHRoaXMudmlld3MuaG9tZTtcblx0XHRcdFx0dGhpcy50cmFuc2l0aW9uVmlld3MoZmFsc2UsIHRoaXMuY3VycmVudFZpZXcudmlldywgdHJ1ZSk7XG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAodGhpcy5jdXJyZW50Vmlldy50eXBlID09PSB0aGlzLlZJRVdfVFlQRV9QQUdFICYmIHRoaXMucHJldmlvdXNWaWV3LnR5cGUgPT09IHRoaXMuVklFV19UWVBFX1BBR0UpIHtcblx0XHRcdFx0dGhpcy50cmFuc2l0aW9uVmlld3ModGhpcy5wcmV2aW91c1ZpZXcudmlldywgdGhpcy5jdXJyZW50Vmlldy52aWV3KTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5jdXJyZW50Vmlldy50eXBlID09PSB0aGlzLlZJRVdfVFlQRV9NT0RBTCAmJiB0aGlzLnByZXZpb3VzVmlldy50eXBlID09PSB0aGlzLlZJRVdfVFlQRV9QQUdFKSB7XG5cdFx0XHRcdHRoaXMuYmFja2dyb3VuZFZpZXcgPSB0aGlzLnByZXZpb3VzVmlldztcblx0XHRcdFx0dGhpcy50cmFuc2l0aW9uVmlld3MoZmFsc2UsIHRoaXMuY3VycmVudFZpZXcudmlldywgdHJ1ZSk7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuY3VycmVudFZpZXcudHlwZSA9PT0gdGhpcy5WSUVXX1RZUEVfUEFHRSAmJiB0aGlzLnByZXZpb3VzVmlldy50eXBlID09PSB0aGlzLlZJRVdfVFlQRV9NT0RBTCkge1xuXHRcdFx0XHR0aGlzLmJhY2tncm91bmRWaWV3ID0gdGhpcy5iYWNrZ3JvdW5kVmlldyB8fCB0aGlzLnZpZXdzLmhvbWU7XG5cdFx0XHRcdGlmICh0aGlzLmJhY2tncm91bmRWaWV3ICE9PSB0aGlzLmN1cnJlbnRWaWV3KSB7XG5cdFx0XHRcdFx0dGhpcy50cmFuc2l0aW9uVmlld3ModGhpcy5wcmV2aW91c1ZpZXcudmlldywgdGhpcy5jdXJyZW50Vmlldy52aWV3LCBmYWxzZSwgdHJ1ZSk7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5iYWNrZ3JvdW5kVmlldyA9PT0gdGhpcy5jdXJyZW50Vmlldykge1xuXHRcdFx0XHRcdHRoaXMudHJhbnNpdGlvblZpZXdzKHRoaXMucHJldmlvdXNWaWV3LnZpZXcsIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmN1cnJlbnRWaWV3LnR5cGUgPT09IHRoaXMuVklFV19UWVBFX01PREFMICYmIHRoaXMucHJldmlvdXNWaWV3LnR5cGUgPT09IHRoaXMuVklFV19UWVBFX01PREFMKSB7XG5cdFx0XHRcdHRoaXMuYmFja2dyb3VuZFZpZXcgPSB0aGlzLmJhY2tncm91bmRWaWV3IHx8IHRoaXMudmlld3MuaG9tZTtcblx0XHRcdFx0dGhpcy50cmFuc2l0aW9uVmlld3ModGhpcy5wcmV2aW91c1ZpZXcudmlldywgdGhpcy5jdXJyZW50Vmlldy52aWV3LCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdH1cblxuXHR9LFxuXG5cdGNoYW5nZVN1YlZpZXc6IGZ1bmN0aW9uKGN1cnJlbnQpIHtcblxuXHRcdHRoaXMuY3VycmVudFZpZXcudmlldy50cmlnZ2VyKE5hdi5FVkVOVF9DSEFOR0VfU1VCX1ZJRVcsIGN1cnJlbnQuc3ViKTtcblxuXHR9LFxuXG5cdHRyYW5zaXRpb25WaWV3czogZnVuY3Rpb24oZnJvbSwgdG8sIHRvTW9kYWw9ZmFsc2UsIGZyb21Nb2RhbD1mYWxzZSkge1xuXG5cdFx0Y29uc29sZS5sb2coXCJ0cmFuc2l0aW9uVmlld3M6IGZ1bmN0aW9uKGZyb20sIHRvLCB0b01vZGFsPWZhbHNlLCBmcm9tTW9kYWw9ZmFsc2UpIHtcIiwgZnJvbSwgdG8pO1xuXG5cdFx0aWYgKGZyb20gPT09IHRvKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRvTW9kYWwgJiYgdGhpcy5iYWNrZ3JvdW5kVmlldy52aWV3KSB7XG5cdFx0XHR0aGlzLmJhY2tncm91bmRWaWV3LnZpZXcuc2hvdygpO1xuXHRcdH1cblxuXHRcdGlmIChmcm9tTW9kYWwgJiYgdGhpcy5iYWNrZ3JvdW5kVmlldy52aWV3KSB7XG5cdFx0XHR0aGlzLmJhY2tncm91bmRWaWV3LnZpZXcuaGlkZSgpO1xuXHRcdH1cblxuXHRcdGlmIChmcm9tICYmIHRvKSB7XG5cdFx0XHRmcm9tLmhpZGUodG8uc2hvdy5iaW5kKHRvKSk7XG5cdFx0fSBlbHNlIGlmIChmcm9tKSB7XG5cdFx0XHRmcm9tLmhpZGUoKTtcblx0XHR9IGVsc2UgaWYgKHRvKSB7XG5cdFx0XHR0by5zaG93KCk7XG5cdFx0fVxuXG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFdyYXBwZXI7XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3UGFnZSBmcm9tICcuLi9BYnN0cmFjdFZpZXdQYWdlJztcblxuY29uc3QgRXhhbXBsZVBhZ2VWaWV3ID0gQWJzdHJhY3RWaWV3UGFnZS5leHRlbmQoe1xuXG5cdHRlbXBsYXRlIDogJ3BhZ2UtZXhhbXBsZScsXG5cblx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy50ZW1wbGF0ZVZhcnMgPSB7XG5cdFx0XHRkZXNjIDogdGhpcy5fX05BTUVTUEFDRV9fKCkubG9jYWxlLmdldChcImV4YW1wbGVfZGVzY1wiKVxuXHRcdH07XG5cblx0XHQvKlxuXG5cdFx0aW5zdGFudGlhdGUgY2xhc3NlcyBoZXJlXG5cblx0XHR0aGlzLmV4YW1wbGVDbGFzcyA9IG5ldyBFeGFtcGxlQ2xhc3MoKTtcblxuXHRcdCovXG5cblx0XHRFeGFtcGxlUGFnZVZpZXcuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMpO1xuXG5cdFx0LypcblxuXHRcdGFkZCBjbGFzc2VzIHRvIGFwcCBzdHJ1Y3R1cmUgaGVyZVxuXG5cdFx0dGhpc1xuXHRcdFx0LmFkZENoaWxkKHRoaXMuZXhhbXBsZUNsYXNzKTtcblxuXHRcdCovXG5cblx0fVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBFeGFtcGxlUGFnZVZpZXc7XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3UGFnZSBmcm9tICcuLi9BYnN0cmFjdFZpZXdQYWdlJztcblxuY29uc3QgSG9tZVZpZXcgPSBBYnN0cmFjdFZpZXdQYWdlLmV4dGVuZCh7XG5cblx0dGVtcGxhdGUgOiAncGFnZS1ob21lJyxcblxuXHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLnRlbXBsYXRlVmFycyA9IHtcblx0XHRcdGRlc2MgOiB0aGlzLl9fTkFNRVNQQUNFX18oKS5sb2NhbGUuZ2V0KFwiaG9tZV9kZXNjXCIpXG5cdFx0fTtcblxuXHRcdC8qXG5cblx0XHRpbnN0YW50aWF0ZSBjbGFzc2VzIGhlcmVcblxuXHRcdHRoaXMuZXhhbXBsZUNsYXNzID0gbmV3IEV4YW1wbGVDbGFzcygpO1xuXG5cdFx0Ki9cblxuXHRcdEhvbWVWaWV3Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzKTtcblxuXHRcdC8qXG5cblx0XHRhZGQgY2xhc3NlcyB0byBhcHAgc3RydWN0dXJlIGhlcmVcblxuXHRcdHRoaXNcblx0XHRcdC5hZGRDaGlsZCh0aGlzLmV4YW1wbGVDbGFzcyk7XG5cblx0XHQqL1xuXG5cdH1cblxufSlcblxuZXhwb3J0IGRlZmF1bHQgSG9tZVZpZXc7XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4uL0Fic3RyYWN0Vmlldyc7XG5cbmNvbnN0IEFic3RyYWN0TW9kYWwgPSBBYnN0cmFjdFZpZXcuZXh0ZW5kKHtcblxuXHQkd2luZG93IDogbnVsbCxcblxuXHQvLyBvdmVycmlkZSBpbiBpbmRpdmlkdWFsIGNsYXNzZXNcblx0bmFtZSAgICAgOiBudWxsLFxuXHR0ZW1wbGF0ZSA6IG51bGwsXG5cblx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy4kd2luZG93ID0gJCh3aW5kb3cpO1xuXG5cdFx0QWJzdHJhY3RNb2RhbC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyk7XG5cblx0XHR0aGlzLl9fTkFNRVNQQUNFX18oKS5hcHBWaWV3LmFkZENoaWxkKHRoaXMpO1xuXHRcdHRoaXMuc2V0TGlzdGVuZXJzKCdvbicpO1xuXHRcdHRoaXMuYW5pbWF0ZUluKCk7XG5cblx0fSxcblxuXHRoaWRlOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMuYW5pbWF0ZU91dCggKCkgPT4ge1xuXHRcdFx0dGhpcy5fX05BTUVTUEFDRV9fKCkuYXBwVmlldy5yZW1vdmUodGhpcyk7XG5cdFx0fSk7XG5cblx0fSxcblxuXHRkaXNwb3NlOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMuc2V0TGlzdGVuZXJzKCdvZmYnKTtcblx0XHR0aGlzLl9fTkFNRVNQQUNFX18oKS5hcHBWaWV3Lm1vZGFsTWFuYWdlci5tb2RhbHNbdGhpcy5uYW1lXS52aWV3ID0gbnVsbDtcblxuXHR9LFxuXG5cdHNldExpc3RlbmVyczogZnVuY3Rpb24oc2V0dGluZykge1xuXG5cdFx0dGhpcy4kd2luZG93W3NldHRpbmddKCdrZXl1cCcsIHRoaXMub25LZXlVcC5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLiQoJ1tkYXRhLWNsb3NlXScpW3NldHRpbmddKCdjbGljaycsIHRoaXMuY2xvc2VDbGljay5iaW5kKHRoaXMpKTtcblxuXHR9LFxuXG5cdG9uS2V5VXA6IGZ1bmN0aW9uKGUpIHtcblxuXHRcdGlmIChlLmtleUNvZGUgPT09IDI3KVxuXHRcdFx0dGhpcy5oaWRlKCk7XG5cblx0fSxcblxuXHRhbmltYXRlSW46IGZ1bmN0aW9uKCkge1xuXG5cdFx0VHdlZW5MaXRlLnRvKHRoaXMuJGVsLCAwLjMsIHsgJ3Zpc2liaWxpdHknOiAndmlzaWJsZScsICdvcGFjaXR5JzogMSwgZWFzZSA6IFF1YWQuZWFzZU91dCB9KTtcblx0XHRUd2VlbkxpdGUudG8odGhpcy4kZWwuZmluZCgnLmlubmVyJyksIDAuMywgeyBkZWxheSA6IDAuMTUsICd0cmFuc2Zvcm0nOiAnc2NhbGUoMSknLCAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJywgJ29wYWNpdHknOiAxLCBlYXNlIDogQmFjay5lYXNlT3V0IH0pO1xuXG5cdH0sXG5cblx0YW5pbWF0ZU91dDogZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuXHRcdFR3ZWVuTGl0ZS50byh0aGlzLiRlbCwgMC4zLCB7IGRlbGF5IDogMC4xNSwgJ29wYWNpdHknOiAwLCBlYXNlIDogUXVhZC5lYXNlT3V0LCBvbkNvbXBsZXRlOiBjYWxsYmFjayB9KTtcblx0XHRUd2VlbkxpdGUudG8odGhpcy4kZWwuZmluZCgnLmlubmVyJyksIDAuMywgeyAndHJhbnNmb3JtJzogJ3NjYWxlKDAuOCknLCAnb3BhY2l0eSc6IDAsIGVhc2UgOiBCYWNrLmVhc2VJbiB9KTtcblxuXHR9LFxuXG5cdGNsb3NlQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcblxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblxuXHRcdHRoaXMuaGlkZSgpO1xuXG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEFic3RyYWN0TW9kYWw7XG4iLCJpbXBvcnQgQWJzdHJhY3RNb2RhbCBmcm9tICcuL0Fic3RyYWN0TW9kYWwnO1xuXG5jb25zdCBPcmllbnRhdGlvbk1vZGFsID0gQWJzdHJhY3RNb2RhbC5leHRlbmQoe1xuXG5cdG5hbWUgICAgIDogJ29yaWVudGF0aW9uTW9kYWwnLFxuXHR0ZW1wbGF0ZSA6ICdvcmllbnRhdGlvbi1tb2RhbCcsXG5cblx0Y2IgOiBudWxsLFxuXG5cdGNvbnN0cnVjdG9yOiBmdW5jdGlvbihjYikge1xuXG5cdFx0dGhpcy5jYiA9IGNiO1xuXG5cdFx0dGhpcy50ZW1wbGF0ZVZhcnMgPSB7IG5hbWU6IHRoaXMubmFtZSB9O1xuXG5cdFx0T3JpZW50YXRpb25Nb2RhbC5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyk7XG5cblx0fSxcblxuXHRpbml0OiBmdW5jdGlvbigpIHtcblxuXHR9LFxuXG5cdGhpZGU6IGZ1bmN0aW9uKHN0aWxsTGFuZHNjYXBlPXRydWUpIHtcblxuXHRcdHRoaXMuYW5pbWF0ZU91dCggKCkgPT4ge1xuXHRcdFx0dGhpcy5fX05BTUVTUEFDRV9fKCkuYXBwVmlldy5yZW1vdmUodGhpcyk7XG5cdFx0XHRpZiAoIXN0aWxsTGFuZHNjYXBlICYmIGNiICYmIHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHRjYigpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH0sXG5cblx0c2V0TGlzdGVuZXJzOiBmdW5jdGlvbihzZXR0aW5nKSB7XG5cblx0XHRPcmllbnRhdGlvbk1vZGFsLl9fc3VwZXJfXy5zZXRMaXN0ZW5lcnMuYXBwbHkodGhpcywgW3NldHRpbmddKTtcblxuXHRcdHRoaXMuX19OQU1FU1BBQ0VfXygpLmFwcFZpZXdbc2V0dGluZ10oJ3VwZGF0ZURpbXMnLCB0aGlzLm9uVXBkYXRlRGltcy5iaW5kKHRoaXMpKTtcblx0XHR0aGlzLiRlbFtzZXR0aW5nXSgndG91Y2hlbmQgY2xpY2snLCB0aGlzLmhpZGUuYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHRvblVwZGF0ZURpbXM6IGZ1bmN0aW9uKGRpbXMpIHtcblxuXHRcdGlmIChkaW1zLm8gPT09ICdwb3J0cmFpdCcpIHtcblx0XHRcdHRoaXMuaGlkZShmYWxzZSk7XG5cdFx0fVxuXG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IE9yaWVudGF0aW9uTW9kYWw7XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4uL0Fic3RyYWN0Vmlldyc7XG5pbXBvcnQgT3JpZW50YXRpb25Nb2RhbCBmcm9tICcuL09yaWVudGF0aW9uTW9kYWwnO1xuXG5jb25zdCBNb2RhbE1hbmFnZXIgPSBBYnN0cmFjdFZpZXcuZXh0ZW5kKHtcblxuXHQvLyB3aGVuIG5ldyBtb2RhbCBjbGFzc2VzIGFyZSBjcmVhdGVkLCBhZGQgaGVyZSwgd2l0aCByZWZlcmVuY2UgdG8gY2xhc3MgbmFtZVxuXHRtb2RhbHM6IHtcblx0XHRvcmllbnRhdGlvbk1vZGFsIDogeyBjbGFzc1JlZiA6IE9yaWVudGF0aW9uTW9kYWwsIHZpZXcgOiBudWxsIH1cblx0fSxcblxuXHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XG5cblx0XHRNb2RhbE1hbmFnZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMpO1xuXG5cdH0sXG5cblx0aW5pdDogZnVuY3Rpb24oKSB7XG5cblx0fSxcblxuXHRpc09wZW46IGZ1bmN0aW9uKCkge1xuXG5cdFx0bGV0IG1vZGFsSXNPcGVuID0gZmFsc2U7XG5cblx0XHRmb3IgKGxldCBrZXkgaW4gdGhpcy5tb2RhbHMpIHtcblxuXHRcdFx0aWYgKHRoaXMubW9kYWxzW2tleV0udmlldykge1xuXHRcdFx0XHRtb2RhbElzT3BlbiA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gbW9kYWxJc09wZW47XG5cblx0fSxcblxuXHRoaWRlT3Blbk1vZGFsOiBmdW5jdGlvbigpIHtcblxuXHRcdGxldCBvcGVuTW9kYWwgPSBudWxsO1xuXG5cdFx0Zm9yIChsZXQga2V5IGluIHRoaXMubW9kYWxzKSB7XG5cblx0XHRcdGlmICh0aGlzLm1vZGFsc1trZXldLnZpZXcpIHtcblx0XHRcdFx0b3Blbk1vZGFsID0gdGhpcy5tb2RhbHNba2V5XS52aWV3O1xuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0aWYgKG9wZW5Nb2RhbCkge1xuXHRcdFx0b3Blbk1vZGFsLmhpZGUoKTtcblx0XHR9XG5cblx0fSxcblxuXHRzaG93TW9kYWw6IGZ1bmN0aW9uKG5hbWUsIGNiPW51bGwpIHtcblxuXHRcdGlmICh0aGlzLm1vZGFsc1tuYW1lXS52aWV3KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5tb2RhbHNbbmFtZV0udmlldyA9IG5ldyB0aGlzLm1vZGFsc1tuYW1lXS5jbGFzc1JlZihjYik7XG5cblx0fVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgTW9kYWxNYW5hZ2VyO1xuIl19
