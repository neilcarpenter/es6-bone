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
    _createClass(App, null, [{
        key: '_toClean',
        value: ['objReady', 'setFlags', 'objectComplete', 'init', 'initObjects', 'initSDKs', 'initApp', 'go', 'cleanup'],
        enumerable: true
    }]);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvU291cmNlLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL0FwcC5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy9BcHBEYXRhLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL0FwcFZpZXcuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvY29sbGVjdGlvbnMvY29yZS9UZW1wbGF0ZXNDb2xsZWN0aW9uLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL2RhdGEvQVBJLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL2RhdGEvQWJzdHJhY3REYXRhLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL2RhdGEvTG9jYWxlLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL2RhdGEvVGVtcGxhdGVzLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL21vZGVscy9jb3JlL0FQSVJvdXRlTW9kZWwuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvbW9kZWxzL2NvcmUvTG9jYWxlc01vZGVsLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL21vZGVscy9jb3JlL1RlbXBsYXRlTW9kZWwuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvcm91dGVyL05hdi5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy9yb3V0ZXIvUm91dGVyLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3V0aWxzL0FuYWx5dGljcy5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy91dGlscy9BdXRoTWFuYWdlci5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy91dGlscy9GYWNlYm9vay5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy91dGlscy9Hb29nbGVQbHVzLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3V0aWxzL01lZGlhUXVlcmllcy5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy91dGlscy9SZXF1ZXN0ZXIuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvdXRpbHMvU2hhcmUuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvdmlldy9BYnN0cmFjdFZpZXcuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvdmlldy9BYnN0cmFjdFZpZXdQYWdlLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3ZpZXcvYmFzZS9Gb290ZXIuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvdmlldy9iYXNlL0hlYWRlci5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy92aWV3L2Jhc2UvUHJlbG9hZGVyLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3ZpZXcvYmFzZS9XcmFwcGVyLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3ZpZXcvZXhhbXBsZVBhZ2UvRXhhbXBsZVBhZ2VWaWV3LmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3ZpZXcvaG9tZS9Ib21lVmlldy5qcyIsIi9Vc2Vycy9uZWlsY2FycGVudGVyL1NpdGVzL2VzNi1ib25lL3NyYy9qcy92aWV3L21vZGFscy9BYnN0cmFjdE1vZGFsLmpzIiwiL1VzZXJzL25laWxjYXJwZW50ZXIvU2l0ZXMvZXM2LWJvbmUvc3JjL2pzL3ZpZXcvbW9kYWxzL09yaWVudGF0aW9uTW9kYWwuanMiLCIvVXNlcnMvbmVpbGNhcnBlbnRlci9TaXRlcy9lczYtYm9uZS9zcmMvanMvdmlldy9tb2RhbHMvX01vZGFsTWFuYWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7bUJDQWdCLE9BQU87Ozs7Ozs7Ozs7Ozs7QUFXdkIsSUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDOzs7QUFHdEIsSUFBTSxJQUFJLEdBQUcsT0FBTyxHQUFHLEVBQUUsR0FBSSxNQUFNLElBQUksUUFBUSxBQUFDLENBQUM7OztBQUdqRCxJQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFRLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs4QkNsQkosbUJBQW1COzs7O2dDQUNqQixxQkFBcUI7Ozs7MEJBQzNCLGVBQWU7Ozs7NkJBQ1osa0JBQWtCOzs7OytCQUNoQixvQkFBb0I7Ozs7NkJBQ3JCLGtCQUFrQjs7OzswQkFDckIsZUFBZTs7Ozs0QkFDZixpQkFBaUI7Ozs7eUJBQ3BCLGNBQWM7Ozs7dUJBQ1YsV0FBVzs7Ozt1QkFDWCxXQUFXOzs7O2lDQUNOLHNCQUFzQjs7OztJQUV6QyxHQUFHO2lCQUFILEdBQUc7O2VBRWEsQ0FBQyxVQUFVLEVBQUUsVUFBVSxF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RSx5QkFBVzs7QUFFekIsTUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDOztBQUVyQixPQUFLLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7O0FBRTVCLE9BQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUU7QUFDMUIsYUFBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ2xDO0dBRUQ7O0FBRUQsTUFBSSxTQUFTLEVBQUU7QUFDZCxZQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7R0FDakI7RUFFRDs7QUFFRCxVQUFTLEVBQUUsbUJBQVMsSUFBSSxFQUFXO01BQVQsRUFBRSx5REFBQyxJQUFJOztBQUVoQyxNQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQzNCLFVBQU87R0FDUDs7QUFFRCxNQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBRTVEOztDQUVELENBQUMsQ0FBQzs7cUJBRVksWUFBWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgQXBwIGZyb20gJy4vQXBwJztcblxuLy8gUFJPRFVDVElPTiBFTlZJUk9OTUVOVCAtIG1heSB3YW50IHRvIHVzZSBzZXJ2ZXItc2V0IHZhcmlhYmxlcyBoZXJlXG4vLyBJU19MSVZFID0gZG8gLT4gcmV0dXJuIGlmIHdpbmRvdy5sb2NhdGlvbi5ob3N0LmluZGV4T2YoJ2xvY2FsaG9zdCcpID4gLTEgb3Igd2luZG93LmxvY2F0aW9uLnNlYXJjaCBpcyAnP2QnIHRoZW4gZmFsc2UgZWxzZSB0cnVlXG5cbi8qXG5cbldJUCAtIHRoaXMgd2lsbCBpZGVhbGx5IGNoYW5nZSB0byBvbGQgZm9ybWF0IChhYm92ZSkgd2hlbiBjYW4gZmlndXJlIGl0IG91dFxuXG4qL1xuXG5jb25zdCBJU19MSVZFID0gZmFsc2U7XG5cbi8vIE9OTFkgRVhQT1NFIEFQUCBHTE9CQUxMWSBJRiBMT0NBTCBPUiBERVYnSU5HXG5jb25zdCB2aWV3ID0gSVNfTElWRSA/IHt9IDogKHdpbmRvdyB8fCBkb2N1bWVudCk7XG5cbi8vIERFQ0xBUkUgTUFJTiBBUFBMSUNBVElPTlxudmlldy5fX05BTUVTUEFDRV9fID0gbmV3IEFwcChJU19MSVZFKTtcbnZpZXcuX19OQU1FU1BBQ0VfXy5pbml0KCk7XG4iLCJpbXBvcnQgQW5hbHl0aWNzIGZyb20gJy4vdXRpbHMvQW5hbHl0aWNzJztcbmltcG9ydCBBdXRoTWFuYWdlciBmcm9tICcuL3V0aWxzL0F1dGhNYW5hZ2VyJztcbmltcG9ydCBTaGFyZSBmcm9tICcuL3V0aWxzL1NoYXJlJztcbmltcG9ydCBGYWNlYm9vayBmcm9tICcuL3V0aWxzL0ZhY2Vib29rJztcbmltcG9ydCBHb29nbGVQbHVzIGZyb20gJy4vdXRpbHMvR29vZ2xlUGx1cyc7XG5pbXBvcnQgVGVtcGxhdGVzIGZyb20gJy4vZGF0YS9UZW1wbGF0ZXMnO1xuaW1wb3J0IExvY2FsZSBmcm9tICcuL2RhdGEvTG9jYWxlJztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9yb3V0ZXIvUm91dGVyJztcbmltcG9ydCBOYXYgZnJvbSAnLi9yb3V0ZXIvTmF2JztcbmltcG9ydCBBcHBEYXRhIGZyb20gJy4vQXBwRGF0YSc7XG5pbXBvcnQgQXBwVmlldyBmcm9tICcuL0FwcFZpZXcnO1xuaW1wb3J0IE1lZGlhUXVlcmllcyBmcm9tICcuL3V0aWxzL01lZGlhUXVlcmllcyc7XG5cbmNsYXNzIEFwcCB7XG5cbiAgICBzdGF0aWMgX3RvQ2xlYW4gPSBbJ29ialJlYWR5JywgJ3NldEZsYWdzJywgJ29iamVjdENvbXBsZXRlJywgJ2luaXQnLCAnaW5pdE9iamVjdHMnLCAnaW5pdFNES3MnLCAnaW5pdEFwcCcsICdnbycsICdjbGVhbnVwJ107XG5cbiAgICBMSVZFICAgICAgID0gbnVsbDtcbiAgICBCQVNFX1BBVEggID0gd2luZG93LmNvbmZpZy5ob3N0bmFtZTtcbiAgICBsb2NhbGVDb2RlID0gd2luZG93LmNvbmZpZy5sb2NhbGVDb2RlO1xuICAgIG9ialJlYWR5ICAgPSAwO1xuXG4gICAgY29uc3RydWN0b3IoTElWRSkge1xuICAgICAgICB0aGlzLkxJVkUgPSBMSVZFO1xuICAgIH1cblxuICAgIHNldEZsYWdzKCkge1xuICAgICAgICBjb25zdCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgTWVkaWFRdWVyaWVzLnNldHVwKCk7XG5cbiAgICAgICAgdGhpcy5JU19BTkRST0lEICAgID0gdWEuaW5kZXhPZignYW5kcm9pZCcpID4gLTE7XG4gICAgICAgIHRoaXMuSVNfRklSRUZPWCAgICA9IHVhLmluZGV4T2YoJ2ZpcmVmb3gnKSA+IC0xO1xuICAgICAgICB0aGlzLklTX0NIUk9NRV9JT1MgPSB1YS5tYXRjaCgnY3Jpb3MnKSA/IHRydWUgOiBmYWxzZTsgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTM4MDgwNTNcbiAgICB9XG5cbiAgICBvYmplY3RDb21wbGV0ZSgpIHtcbiAgICAgICAgdGhpcy5vYmpSZWFkeSsrO1xuXG4gICAgICAgIGlmICh0aGlzLm9ialJlYWR5ID49IDQpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEFwcCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0T2JqZWN0cygpO1xuICAgIH1cblxuICAgIGluaXRPYmplY3RzKCkge1xuICAgICAgICB0aGlzLnRlbXBsYXRlcyA9IG5ldyBUZW1wbGF0ZXMoXCIvZGF0YS90ZW1wbGF0ZXMueG1sXCIsIHRoaXMub2JqZWN0Q29tcGxldGUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubG9jYWxlICAgID0gbmV3IExvY2FsZShcIi9kYXRhL2xvY2FsZXMvc3RyaW5ncy5qc29uXCIsIHRoaXMub2JqZWN0Q29tcGxldGUuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuYW5hbHl0aWNzID0gbmV3IEFuYWx5dGljcyhcIi9kYXRhL3RyYWNraW5nLmpzb25cIiwgdGhpcy5vYmplY3RDb21wbGV0ZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5hcHBEYXRhICAgPSBuZXcgQXBwRGF0YSh0aGlzLm9iamVjdENvbXBsZXRlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIGlmIG5ldyBvYmplY3RzIGFyZSBhZGRlZCBkb24ndCBmb3JnZXQgdG8gY2hhbmdlIHRoZSBgdGhpcy5vYmplY3RDb21wbGV0ZWAgZnVuY3Rpb25cbiAgICB9XG5cbiAgICBpbml0U0RLcygpIHtcblxuICAgICAgICBGYWNlYm9vay5sb2FkKCk7XG4gICAgICAgIEdvb2dsZVBsdXMubG9hZCgpO1xuXG4gICAgfVxuXG4gICAgaW5pdEFwcCgpIHtcbiAgICAgICAgdGhpcy5zZXRGbGFncygpO1xuXG4gICAgICAgIC8qIFN0YXJ0cyBhcHBsaWNhdGlvbiAqL1xuICAgICAgICB0aGlzLmFwcFZpZXcgPSBuZXcgQXBwVmlldygpO1xuICAgICAgICB0aGlzLnJvdXRlciAgPSBuZXcgUm91dGVyKCk7XG4gICAgICAgIHRoaXMubmF2ICAgICA9IG5ldyBOYXYoKTtcbiAgICAgICAgdGhpcy5hdXRoICAgID0gbmV3IEF1dGhNYW5hZ2VyKCk7XG4gICAgICAgIHRoaXMuc2hhcmUgICA9IG5ldyBTaGFyZSgpO1xuXG4gICAgICAgIHRoaXMuZ28oKTtcblxuICAgICAgICB0aGlzLmluaXRTREtzKCk7XG4gICAgfVxuXG4gICAgZ28oKSB7XG4gICAgICAgIC8qIEFmdGVyIGV2ZXJ5dGhpbmcgaXMgbG9hZGVkLCBraWNrcyBvZmYgd2Vic2l0ZSAqL1xuICAgICAgICB0aGlzLmFwcFZpZXcucmVuZGVyKCk7XG5cbiAgICAgICAgLyogcmVtb3ZlIHJlZHVuZGFudCBpbml0aWFsaXNhdGlvbiBtZXRob2RzIC8gcHJvcGVydGllcyAqL1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICB9XG5cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICBBcHAuX3RvQ2xlYW4uZm9yRWFjaCggKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXNbaXRlbV0gPSBudWxsO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXNbaXRlbV07XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBBcHA7XG4iLCJpbXBvcnQgQWJzdHJhY3REYXRhIGZyb20gJy4vZGF0YS9BYnN0cmFjdERhdGEnO1xuaW1wb3J0IFJlcXVlc3RlciBmcm9tICcuL3V0aWxzL1JlcXVlc3Rlcic7XG5pbXBvcnQgQVBJIGZyb20gJy4vZGF0YS9BUEknO1xuXG5jbGFzcyBBcHBEYXRhIGV4dGVuZHMgQWJzdHJhY3REYXRhIHtcblxuICAgIGNhbGxiYWNrID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKGNhbGxiYWNrKSB7XG5cbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvKlxuXG4gICAgICAgIGFkZCBhbGwgZGF0YSBjbGFzc2VzIGhlcmVcblxuICAgICAgICAqL1xuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgICAgICB0aGlzLmdldFN0YXJ0RGF0YSgpO1xuXG4gICAgfVxuXG4gICAgLy8gZ2V0IGFwcCBib290c3RyYXAgZGF0YSAtIGVtYmVkIGluIEhUTUwgb3IgQVBJIGVuZHBvaW50XG4gICAgZ2V0U3RhcnREYXRhKCkge1xuICAgICAgICBcbiAgICAgICAgaWYgKEFQSS5nZXQoJ3N0YXJ0JykpIHtcblxuICAgICAgICAgICAgY29uc3QgciA9IFJlcXVlc3Rlci5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmwgIDogQVBJLmdldCgnc3RhcnQnKSxcbiAgICAgICAgICAgICAgICB0eXBlIDogJ0dFVCdcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByLmRvbmUodGhpcy5vblN0YXJ0RGF0YVJlY2VpdmVkLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgci5mYWlsKCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yIFwiZXJyb3IgbG9hZGluZyBhcGkgc3RhcnQgZGF0YVwiXG5cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIHRoaXMgaXMgb25seSB0ZW1wb3JhcnksIHdoaWxlIHRoZXJlIGlzIG5vIGJvb3RzdHJhcCBkYXRhIGhlcmUsIG5vcm1hbGx5IHdvdWxkIGhhbmRsZSBlcnJvciAvIGZhaWxcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhbGxiYWNrICYmIHR5cGVvZih0aGlzLmNhbGxiYWNrKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jYWxsYmFjayAmJiB0eXBlb2YodGhpcy5jYWxsYmFjaykgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgb25TdGFydERhdGFSZWNlaXZlZChkYXRhKSB7XG5cbiAgICAgICAgLypcblxuICAgICAgICBib290c3RyYXAgZGF0YSByZWNlaXZlZCwgYXBwIHJlYWR5IHRvIGdvXG5cbiAgICAgICAgKi9cblxuICAgICAgICBpZiAodGhpcy5jYWxsYmFjayAmJiB0eXBlb2YodGhpcy5jYWxsYmFjaykgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcERhdGE7XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vdmlldy9BYnN0cmFjdFZpZXcnO1xuaW1wb3J0IFByZWxvYWRlciBmcm9tICcuL3ZpZXcvYmFzZS9QcmVsb2FkZXInO1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL3ZpZXcvYmFzZS9IZWFkZXInO1xuaW1wb3J0IFdyYXBwZXIgZnJvbSAnLi92aWV3L2Jhc2UvV3JhcHBlcic7XG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vdmlldy9iYXNlL0Zvb3Rlcic7XG5pbXBvcnQgTW9kYWxNYW5hZ2VyIGZyb20gJy4vdmlldy9tb2RhbHMvX01vZGFsTWFuYWdlcic7XG5pbXBvcnQgTWVkaWFRdWVyaWVzIGZyb20gJy4vdXRpbHMvTWVkaWFRdWVyaWVzJztcblxuY29uc3QgQXBwVmlldyA9IEFic3RyYWN0Vmlldy5leHRlbmQoe1xuXG4gICAgdGVtcGxhdGUgOiAnbWFpbicsXG5cbiAgICAkd2luZG93ICA6IG51bGwsXG4gICAgJGJvZHkgICAgOiBudWxsLFxuXG4gICAgd3JhcHBlciAgOiBudWxsLFxuICAgIGZvb3RlciAgIDogbnVsbCxcblxuICAgIGRpbXMgOiB7XG4gICAgICAgIHcgOiBudWxsLFxuICAgICAgICBoIDogbnVsbCxcbiAgICAgICAgbyA6IG51bGwsXG4gICAgICAgIGMgOiBudWxsXG4gICAgfSxcblxuICAgIGV2ZW50cyA6IHtcbiAgICAgICAgJ2NsaWNrIGEnIDogJ2xpbmtNYW5hZ2VyJ1xuICAgIH0sXG5cbiAgICBFVkVOVF9VUERBVEVfRElNRU5TSU9OUyA6ICdFVkVOVF9VUERBVEVfRElNRU5TSU9OUycsXG5cbiAgICBNT0JJTEVfV0lEVEggOiA3MDAsXG4gICAgTU9CSUxFICAgICAgIDogJ21vYmlsZScsXG4gICAgTk9OX01PQklMRSAgIDogJ25vbl9tb2JpbGUnLFxuXG4gICAgY29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIEFwcFZpZXcuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMpO1xuXG4gICAgICAgIHRoaXMuJHdpbmRvdyA9ICQod2luZG93KTtcbiAgICAgICAgdGhpcy4kYm9keSAgID0gJCgnYm9keScpLmVxKDApO1xuXG4gICAgfSxcblxuICAgIGRpc2FibGVUb3VjaDogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy4kd2luZG93Lm9uKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLmJpbmQodGhpcykpO1xuICAgICAgICBcbiAgICB9LFxuXG4gICAgZW5hYmxlVG91Y2g6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHRoaXMuJHdpbmRvdy5vZmYoJ3RvdWNobW92ZScsIHRoaXMub25Ub3VjaE1vdmUuYmluZCh0aGlzKSk7XG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBvblRvdWNoTW92ZTogZnVuY3Rpb24oIGUgKSB7XG5cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgICAgICB0aGlzLnByZWxvYWRlciAgICA9IG5ldyBQcmVsb2FkZXIoKTtcbiAgICAgICAgdGhpcy5tb2RhbE1hbmFnZXIgPSBuZXcgTW9kYWxNYW5hZ2VyKCk7XG5cbiAgICAgICAgdGhpcy5oZWFkZXIgID0gbmV3IEhlYWRlcigpO1xuICAgICAgICB0aGlzLndyYXBwZXIgPSBuZXcgV3JhcHBlcigpO1xuICAgICAgICB0aGlzLmZvb3RlciAgPSBuZXcgRm9vdGVyKCk7XG5cbiAgICAgICAgdGhpc1xuICAgICAgICAgICAgLmFkZENoaWxkKHRoaXMuaGVhZGVyKVxuICAgICAgICAgICAgLmFkZENoaWxkKHRoaXMud3JhcHBlcilcbiAgICAgICAgICAgIC5hZGRDaGlsZCh0aGlzLmZvb3Rlcik7XG5cbiAgICAgICAgdGhpcy5vbkFsbFJlbmRlcmVkKCk7XG5cbiAgICB9LFxuXG4gICAgYmluZEV2ZW50czogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5vblJlc2l6ZSgpO1xuXG4gICAgICAgIHRoaXMub25SZXNpemUgPSBfLmRlYm91bmNlKHRoaXMub25SZXNpemUuYmluZCh0aGlzKSwgMzAwKTtcbiAgICAgICAgdGhpcy4kd2luZG93Lm9uKCdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLm9uUmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgfSxcblxuICAgIG9uQWxsUmVuZGVyZWQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwib25BbGxSZW5kZXJlZCA6ID0+XCIpO1xuXG4gICAgICAgIHRoaXMuJGJvZHkucHJlcGVuZCh0aGlzLiRlbCk7XG5cbiAgICAgICAgdGhpcy5iZWdpbigpO1xuICAgIH0sXG5cbiAgICBiZWdpbjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyKCdzdGFydCcpO1xuXG4gICAgICAgIHRoaXMuX19OQU1FU1BBQ0VfXygpLnJvdXRlci5zdGFydCgpO1xuXG4gICAgICAgIHRoaXMucHJlbG9hZGVyLmhpZGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVNZWRpYVF1ZXJpZXNMb2coKTtcblxuICAgIH0sXG5cbiAgICBvblJlc2l6ZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy5nZXREaW1zKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWVkaWFRdWVyaWVzTG9nKCk7XG5cbiAgICB9LFxuXG4gICAgdXBkYXRlTWVkaWFRdWVyaWVzTG9nOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBpZiAodGhpcy5oZWFkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhZGVyLiRlbFxuICAgICAgICAgICAgICAgIC5maW5kKFwiLmJyZWFrcG9pbnRcIilcbiAgICAgICAgICAgICAgICAgICAgLmh0bWwoYDxkaXYgY2xhc3M9J2wnPkNVUlJFTlQgQlJFQUtQT0lOVDo8L2Rpdj48ZGl2IGNsYXNzPSdiJz4ke01lZGlhUXVlcmllcy5nZXRCcmVha3BvaW50KCl9PC9kaXY+YCk7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBnZXREaW1zOiBmdW5jdGlvbigpIHtcblxuICAgICAgICBjb25zdCB3ID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodDtcblxuICAgICAgICB0aGlzLmRpbXMgPSB7XG4gICAgICAgICAgICB3IDogdyxcbiAgICAgICAgICAgIGggOiBoLFxuICAgICAgICAgICAgbyA6IGggPiB3ID8gJ3BvcnRyYWl0JyA6ICdsYW5kc2NhcGUnLFxuICAgICAgICAgICAgYyA6IHcgPD0gdGhpcy5NT0JJTEVfV0lEVEggPyB0aGlzLk1PQklMRSA6IHRoaXMuTk9OX01PQklMRVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMudHJpZ2dlcih0aGlzLkVWRU5UX1VQREFURV9ESU1FTlNJT05TLCB0aGlzLmRpbXMpO1xuXG4gICAgfSxcblxuICAgIGxpbmtNYW5hZ2VyOiBmdW5jdGlvbihlKSB7XG5cbiAgICAgICAgY29uc3QgaHJlZiA9ICQoZS5jdXJyZW50VGFyZ2V0KS5hdHRyKCdocmVmJyk7XG5cbiAgICAgICAgaWYgKCFocmVmKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5hdmlnYXRlVG9VcmwoaHJlZiwgZSk7XG5cbiAgICB9LFxuXG4gICAgbmF2aWdhdGVUb1VybDogZnVuY3Rpb24oIGhyZWYsIGUgPSBudWxsICkge1xuXG4gICAgICAgIGNvbnN0IHJvdXRlICAgPSBocmVmLm1hdGNoKHRoaXMuX19OQU1FU1BBQ0VfXygpLkJBU0VfUEFUSCkgPyBocmVmLnNwbGl0KHRoaXMuX19OQU1FU1BBQ0VfXygpLkJBU0VfUEFUSClbMV0gOiBocmVmO1xuICAgICAgICBjb25zdCBzZWN0aW9uID0gcm91dGUuaW5kZXhPZignLycpID09PSAwID8gcm91dGUuc3BsaXQoJy8nKVsxXSA6IHJvdXRlO1xuXG4gICAgICAgIGlmICh0aGlzLl9fTkFNRVNQQUNFX18oKS5uYXYuZ2V0U2VjdGlvbihzZWN0aW9uKSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5fX05BTUVTUEFDRV9fKCkucm91dGVyLm5hdmlnYXRlVG8ocm91dGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFeHRlcm5hbExpbmsoaHJlZik7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBoYW5kbGVFeHRlcm5hbExpbms6IGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAvKlxuXG4gICAgICAgIGJpbmQgdHJhY2tpbmcgZXZlbnRzIGlmIG5lY2Vzc2FyeVxuXG4gICAgICAgICovXG5cbiAgICB9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBBcHBWaWV3O1xuIiwiaW1wb3J0IFRlbXBsYXRlTW9kZWwgZnJvbSAnLi4vLi4vbW9kZWxzL2NvcmUvVGVtcGxhdGVNb2RlbCc7XG5cbmNsYXNzIFRlbXBsYXRlc0NvbGxlY3Rpb24gZXh0ZW5kcyBCYWNrYm9uZS5Db2xsZWN0aW9uIHtcblxuXHRtb2RlbCA9IFRlbXBsYXRlTW9kZWxcblxufVxuXG5leHBvcnQgZGVmYXVsdCBUZW1wbGF0ZXNDb2xsZWN0aW9uO1xuIiwiaW1wb3J0IEFQSVJvdXRlTW9kZWwgZnJvbSAnLi4vbW9kZWxzL2NvcmUvQVBJUm91dGVNb2RlbCc7XG5cbmNsYXNzIEFQSSB7XG5cblx0c3RhdGljIG1vZGVsID0gbmV3IEFQSVJvdXRlTW9kZWwoKTtcblxuXHRzdGF0aWMgZ2V0Q29uc3RhbnRzID0gKCkgPT4ge1xuXG5cdFx0Ly8gYWRkIG1vcmUgaWYgd2Ugd2FubmEgdXNlIGluIEFQSSBzdHJpbmdzXG5cdFx0Y29uc3QgY29uc3RhbnRzID0ge1xuXHRcdFx0QkFTRV9QQVRIIDogQVBJLl9fTkFNRVNQQUNFX18oKS5CQVNFX1BBVEhcblx0XHR9XG5cblx0XHRyZXR1cm4gY29uc3RhbnRzO1xuXG5cdH1cblxuXHRzdGF0aWMgZ2V0ID0gKG5hbWUsIHZhcnMpID0+IHtcblxuXHRcdGNvbnN0IGFsbFZhcnMgPSAkLmV4dGVuZCh0cnVlLCB2YXJzLCBBUEkuZ2V0Q29uc3RhbnRzKCkpO1xuXHRcdHJldHVybiBBUEkuc3VwcGxhbnRTdHJpbmcoQVBJLm1vZGVsLmdldChuYW1lKSwgYWxsVmFycyk7XG5cblx0fVxuXG5cdHN0YXRpYyBzdXBwbGFudFN0cmluZyA9IChzdHIsIHZhbHMpID0+IHtcblxuXHRcdHJldHVybiBzdHIucmVwbGFjZSgve3sgKFtee31dKikgfX0vZywgKGEsIGIpID0+IHtcblx0XHRcdGNvbnN0IHIgPSB2YWxzW2JdIHx8IHR5cGVvZiB2YWxzW2JdID09PSAnbnVtYmVyJyA/IHZhbHNbYl0udG9TdHJpbmcoKSA6ICcnO1xuXHRcdFx0aWYgKHR5cGVvZiByID09PSBcInN0cmluZ1wiIHx8IHR5cGVvZiByID09PSBcIm51bWJlclwiKSB7XG5cdFx0XHRcdHJldHVybiByO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGE7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fVxuXG5cdHN0YXRpYyBfX05BTUVTUEFDRV9fICA9ICgpID0+IHtcblxuXHRcdHJldHVybiB3aW5kb3cuX19OQU1FU1BBQ0VfXztcblxuXHR9XG5cbn1cblxud2luZG93LkFQSSA9IEFQSTtcblxuZXhwb3J0IGRlZmF1bHQgQVBJO1xuIiwiY2xhc3MgQWJzdHJhY3REYXRhIHtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHRcdF8uZXh0ZW5kKHRoaXMsIEJhY2tib25lLkV2ZW50cyk7XG5cblx0fVxuXG5cdF9fTkFNRVNQQUNFX18oKSB7XG5cblx0XHRyZXR1cm4gd2luZG93Ll9fTkFNRVNQQUNFX187XG5cblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFic3RyYWN0RGF0YTsiLCJpbXBvcnQgTG9jYWxlc01vZGVsIGZyb20gJy4uL21vZGVscy9jb3JlL0xvY2FsZXNNb2RlbCc7XG5pbXBvcnQgQVBJIGZyb20gJy4uL2RhdGEvQVBJJztcblxuLypcbiAgICBMb2NhbGUgTG9hZGVyXG5cbiAgICBGaXJlcyBiYWNrIGFuIGV2ZW50IHdoZW4gY29tcGxldGVcblxuKi9cbmNsYXNzIExvY2FsZSB7XG5cbiAgICBsYW5nICAgICA9IG51bGw7XG4gICAgZGF0YSAgICAgPSBudWxsO1xuICAgIGNhbGxiYWNrID0gbnVsbDtcbiAgICBiYWNrdXAgICA9IG51bGw7XG4gICAgZGVmYXVsdCAgPSAnZW4tZ2InO1xuXG4gICAgY29uc3RydWN0b3IoZGF0YSwgY2IpIHtcblxuICAgICAgICAvLyBzdGFydCBMb2NhbGUgTG9hZGVyLCBkZWZpbmUgbG9jYWxlIGJhc2VkIG9uIGJyb3dzZXIgbGFuZ3VhZ2VcblxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2I7XG4gICAgICAgIHRoaXMuYmFja3VwID0gZGF0YTtcblxuICAgICAgICB0aGlzLmxhbmcgPSB0aGlzLmdldExhbmcoKTtcblxuICAgICAgICBpZiAoQVBJLmdldCgnbG9jYWxlJywgeyBjb2RlIDogdGhpcy5sYW5nIH0pKSB7XG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsICAgICA6IEFQSS5nZXQoICdsb2NhbGUnLCB7IGNvZGUgOiB0aGlzLmxhbmcgfSApLFxuICAgICAgICAgICAgICAgIHR5cGUgICAgOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBzdWNjZXNzIDogdGhpcy5vblN1Y2Nlc3MuYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBlcnJvciAgIDogdGhpcy5sb2FkQmFja3VwLmJpbmQodGhpcyksXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLmxvYWRCYWNrdXAoKTtcblxuICAgICAgICB9XG5cbiAgICB9XG4gICAgICAgICAgICBcbiAgICBnZXRMYW5nKCkge1xuXG4gICAgICAgIGxldCBsYW5nO1xuXG4gICAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoICYmIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gubWF0Y2goJ2xhbmc9JykpIHtcblxuICAgICAgICAgICAgbGFuZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3BsaXQoJ2xhbmc9JylbMV0uc3BsaXQoJyYnKVswXTtcblxuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5jb25maWcubG9jYWxlQ29kZSkge1xuXG4gICAgICAgICAgICBsYW5nID0gd2luZG93LmNvbmZpZy5sb2NhbGVDb2RlO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGxhbmcgPSB0aGlzLmRlZmF1bHQ7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsYW5nO1xuXG4gICAgfVxuXG4gICAgb25TdWNjZXNzKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gRmlyZXMgYmFjayBhbiBldmVudCBvbmNlIGl0J3MgY29tcGxldGVcblxuICAgICAgICBsZXQgZCA9IG51bGw7XG5cbiAgICAgICAgaWYgKGV2ZW50LnJlc3BvbnNlVGV4dCkge1xuICAgICAgICAgICAgZCA9IEpTT04ucGFyc2UoZXZlbnQucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGQgPSBldmVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGF0YSA9IG5ldyBMb2NhbGVzTW9kZWwoZCk7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soKTtcblxuICAgIH1cblxuICAgIGxvYWRCYWNrdXAoKSB7XG5cbiAgICAgICAgLy8gV2hlbiBBUEkgbm90IGF2YWlsYWJsZSwgdHJpZXMgdG8gbG9hZCB0aGUgc3RhdGljIC50eHQgbG9jYWxlIFxuXG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmwgICAgICA6IHRoaXMuYmFja3VwLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb21wbGV0ZSA6IHRoaXMub25TdWNjZXNzLmJpbmQodGhpcyksXG4gICAgICAgICAgICBlcnJvciAgICA6ICgpID0+IHsgY29uc29sZS5sb2coJ2Vycm9yIG9uIGxvYWRpbmcgYmFja3VwJykgfVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIGdldChpZCkge1xuXG4gICAgICAgIC8vIGdldCBTdHJpbmcgZnJvbSBsb2NhbGVcbiAgICAgICAgLy8gKyBpZCA6IHN0cmluZyBpZCBvZiB0aGUgTG9jYWxpc2VkIFN0cmluZ1xuXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuZ2V0U3RyaW5nKGlkKTtcblxuICAgIH1cblxuICAgIGdldExvY2FsZUltYWdlKHVybCkge1xuXG4gICAgICAgIHJldHVybiAod2luZG93LmNvbmZpZy5DRE4gKyBcIi9pbWFnZXMvbG9jYWxlL1wiICsgd2luZG93LmNvbmZpZy5sb2NhbGVDb2RlICsgXCIvXCIgKyB1cmwpO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExvY2FsZTtcbiIsImltcG9ydCBUZW1wbGF0ZU1vZGVsIGZyb20gJy4uL21vZGVscy9jb3JlL1RlbXBsYXRlTW9kZWwnO1xuaW1wb3J0IFRlbXBsYXRlc0NvbGxlY3Rpb24gZnJvbSAnLi4vY29sbGVjdGlvbnMvY29yZS9UZW1wbGF0ZXNDb2xsZWN0aW9uJztcblxuY2xhc3MgVGVtcGxhdGVzIHtcblxuICAgIHRlbXBsYXRlcyA9IG51bGw7XG4gICAgY2IgICAgICAgID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKHRlbXBsYXRlcywgY2FsbGJhY2spIHtcblxuICAgICAgICB0aGlzLmNiID0gY2FsbGJhY2s7XG5cbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybCAgICAgOiB0ZW1wbGF0ZXMsXG4gICAgICAgICAgICBzdWNjZXNzIDogdGhpcy5wYXJzZVhNTC5iaW5kKHRoaXMpXG4gICAgICAgIH0pO1xuICAgICAgICAgICBcbiAgICB9XG5cbiAgICBwYXJzZVhNTChkYXRhKSB7XG5cbiAgICAgICAgY29uc3QgdGVtcCA9IFtdO1xuXG4gICAgICAgICQoZGF0YSkuZmluZCgndGVtcGxhdGUnKS5lYWNoKChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkdmFsdWUgPSAkKHZhbHVlKTtcbiAgICAgICAgICAgIHRlbXAucHVzaChcbiAgICAgICAgICAgICAgICBuZXcgVGVtcGxhdGVNb2RlbCh7XG4gICAgICAgICAgICAgICAgICAgIGlkICAgOiAkdmFsdWUuYXR0cignaWQnKS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0IDogJC50cmltKCR2YWx1ZS50ZXh0KCkpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMudGVtcGxhdGVzID0gbmV3IFRlbXBsYXRlc0NvbGxlY3Rpb24odGVtcCk7XG5cbiAgICAgICAgdGhpcy5jYigpO1xuICAgICAgICBcbiAgICB9XG5cbiAgICBnZXQoaWQpIHtcblxuICAgICAgICBsZXQgdCA9IHRoaXMudGVtcGxhdGVzLndoZXJlKHtpZCA6IGlkfSk7XG4gICAgICAgIHQgICAgID0gdFswXS5nZXQoJ3RleHQnKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiAkLnRyaW0odCk7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGVtcGxhdGVzO1xuIiwiY29uc3QgbW9kZWxEZWZhdWx0cyA9IHtcblxuICAgIHN0YXJ0ICAgICAgICAgOiBcIlwiLCAvLyBFZzogXCJ7eyBCQVNFX1BBVEggfX0vYXBpL3N0YXJ0XCJcblxuICAgIGxvY2FsZSAgICAgICAgOiBcIlwiLCAvLyBFZzogXCJ7eyBCQVNFX1BBVEggfX0vYXBpL2wxMG4ve3sgY29kZSB9fVwiXG5cbiAgICB1c2VyICAgICAgICAgIDoge1xuICAgICAgICBsb2dpbiAgICAgIDogXCJ7eyBCQVNFX1BBVEggfX0vYXBpL3VzZXIvbG9naW5cIixcbiAgICAgICAgcmVnaXN0ZXIgICA6IFwie3sgQkFTRV9QQVRIIH19L2FwaS91c2VyL3JlZ2lzdGVyXCIsXG4gICAgICAgIHBhc3N3b3JkICAgOiBcInt7IEJBU0VfUEFUSCB9fS9hcGkvdXNlci9wYXNzd29yZFwiLFxuICAgICAgICB1cGRhdGUgICAgIDogXCJ7eyBCQVNFX1BBVEggfX0vYXBpL3VzZXIvdXBkYXRlXCIsXG4gICAgICAgIGxvZ291dCAgICAgOiBcInt7IEJBU0VfUEFUSCB9fS9hcGkvdXNlci9sb2dvdXRcIixcbiAgICAgICAgcmVtb3ZlICAgICA6IFwie3sgQkFTRV9QQVRIIH19L2FwaS91c2VyL3JlbW92ZVwiXG4gICAgfVxufTtcblxuY2xhc3MgQVBJUm91dGVNb2RlbCBleHRlbmRzIEJhY2tib25lLkRlZXBNb2RlbCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIobW9kZWxEZWZhdWx0cyk7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFQSVJvdXRlTW9kZWw7XG4iLCJjbGFzcyBMb2NhbGVzTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbCB7XG5cbiAgICBkZWZhdWx0cyA9IHtcbiAgICAgICAgY29kZSAgICAgOiBudWxsLFxuICAgICAgICBsYW5ndWFnZSA6IG51bGwsXG4gICAgICAgIHN0cmluZ3MgIDogbnVsbFxuICAgIH07XG4gICAgICAgICAgICBcbiAgICBnZXRfbGFuZ3VhZ2UoKSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCdsYW5ndWFnZScpO1xuXG4gICAgfVxuXG4gICAgZ2V0U3RyaW5nKGlkKSB7XG5cbiAgICAgICAgY29uc3Qgc3RyaW5ncyA9IHRoaXMuZ2V0KCdzdHJpbmdzJyk7XG4gICAgICAgIGxldCB2YWx1ZSAgICAgPSBudWxsO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBzdHJpbmdzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkyIGluIHN0cmluZ3Nba2V5XVsnc3RyaW5ncyddKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleTIgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gc3RyaW5nc1trZXldWydzdHJpbmdzJ11ba2V5Ml07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYExvY2FsZXMgLT4gbm90IGZvdW5kIHN0cmluZzogJHtpZH1gKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IExvY2FsZXNNb2RlbDtcbiIsImNsYXNzIFRlbXBsYXRlTW9kZWwgZXh0ZW5kcyBCYWNrYm9uZS5Nb2RlbCB7XG5cblx0ZGVmYXVsdHMgPSB7XG5cdFx0aWQgICA6IFwiXCIsXG5cdFx0dGV4dCA6IFwiXCJcblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlTW9kZWw7XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4uL3ZpZXcvQWJzdHJhY3RWaWV3JztcbmltcG9ydCBSb3V0ZXIgZnJvbSAnLi9Sb3V0ZXInO1xuXG5jb25zdCBzdGF0aWNQcm9wcyA9IHtcbiAgICBFVkVOVF9DSEFOR0VfVklFVyAgICAgOiAnRVZFTlRfQ0hBTkdFX1ZJRVcnLFxuICAgIEVWRU5UX0NIQU5HRV9TVUJfVklFVyA6ICdFVkVOVF9DSEFOR0VfU1VCX1ZJRVcnXG59O1xuXG5jb25zdCBOYXYgPSBBYnN0cmFjdFZpZXcuZXh0ZW5kKHtcblxuICAgIHNlY3Rpb25zIDoge1xuICAgICAgICBIT01FICAgIDogJycsXG4gICAgICAgIEVYQU1QTEUgOiAnZXhhbXBsZSdcbiAgICB9LFxuXG4gICAgY3VycmVudCAgOiB7IGFyZWEgOiBudWxsLCBzdWIgOiBudWxsIH0sXG4gICAgcHJldmlvdXMgOiB7IGFyZWEgOiBudWxsLCBzdWIgOiBudWxsIH0sXG5cbiAgICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgTmF2Ll9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzKTtcblxuICAgICAgICB0aGlzLl9fTkFNRVNQQUNFX18oKS5yb3V0ZXIub24oUm91dGVyLkVWRU5UX0hBU0hfQ0hBTkdFRCwgdGhpcy5jaGFuZ2VWaWV3LmJpbmQodGhpcykpO1xuXG4gICAgfSxcblxuICAgIGdldFNlY3Rpb246IGZ1bmN0aW9uKHNlY3Rpb24pIHtcblxuICAgICAgICBpZiAoc2VjdGlvbiA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlY3Rpb25VcmkgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5zZWN0aW9ucykge1xuICAgICAgICAgICAgbGV0IHVyaSA9IHRoaXMuc2VjdGlvbnNba2V5XTtcbiAgICAgICAgICAgIGlmICh1cmkgPT09IHNlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBzZWN0aW9uVXJpID0ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlY3Rpb25Vcmk7XG5cbiAgICB9LFxuXG4gICAgY2hhbmdlVmlldzogZnVuY3Rpb24oYXJlYSwgc3ViLCBwYXJhbXMpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcImFyZWFcIixhcmVhKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdWJcIixzdWIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInBhcmFtc1wiLHBhcmFtcyk7XG5cbiAgICAgICAgdGhpcy5wcmV2aW91cyA9IHRoaXMuY3VycmVudDtcbiAgICAgICAgdGhpcy5jdXJyZW50ICA9IHsgYXJlYSA6IGFyZWEsIHN1YiA6IHN1YiB9O1xuXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzLmFyZWEgJiYgdGhpcy5wcmV2aW91cy5hcmVhID09PSB0aGlzLmN1cnJlbnQuYXJlYSkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKE5hdi5FVkVOVF9DSEFOR0VfU1VCX1ZJRVcsIHRoaXMuY3VycmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIoTmF2LkVWRU5UX0NIQU5HRV9WSUVXLCB0aGlzLnByZXZpb3VzLCB0aGlzLmN1cnJlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX19OQU1FU1BBQ0VfXygpLmFwcFZpZXcubW9kYWxNYW5hZ2VyLmlzT3BlbigpKSB7XG4gICAgICAgICAgICB0aGlzLl9fTkFNRVNQQUNFX18oKS5hcHBWaWV3Lm1vZGFsTWFuYWdlci5oaWRlT3Blbk1vZGFsKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFBhZ2VUaXRsZShhcmVhLCBzdWIpO1xuXG4gICAgfSxcblxuICAgIHNldFBhZ2VUaXRsZShhcmVhLCBzdWIpIHtcblxuICAgICAgICBjb25zdCB0aXRsZSA9IFwiUEFHRSBUSVRMRSBIRVJFIC0gTE9DQUxJU0UgQkFTRUQgT04gVVJMXCI7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5kb2N1bWVudC50aXRsZSAhPT0gdGl0bGUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5kb2N1bWVudC50aXRsZSA9IHRpdGxlO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0sIHN0YXRpY1Byb3BzKTtcblxuZXhwb3J0IGRlZmF1bHQgTmF2O1xuIiwiY29uc3Qgc3RhdGljUHJvcHMgPSB7XG4gICAgRVZFTlRfSEFTSF9DSEFOR0VEOiAnRVZFTlRfSEFTSF9DSEFOR0VEJ1xufVxuXG5jb25zdCBSb3V0ZXIgPSBCYWNrYm9uZS5Sb3V0ZXIuZXh0ZW5kKHtcblxuICAgIEZJUlNUX1JPVVRFOiB0cnVlLFxuXG4gICAgcm91dGVzIDoge1xuICAgICAgICAnKC8pKDphcmVhKSgvOnN1YikoLyknIDogJ2hhc2hDaGFuZ2VkJyxcbiAgICAgICAgJyphY3Rpb25zJyAgICAgICAgICAgICA6ICduYXZpZ2F0ZVRvJ1xuICAgIH0sXG5cbiAgICBhcmVhICAgOiBudWxsLFxuICAgIHN1YiAgICA6IG51bGwsXG4gICAgcGFyYW1zIDogbnVsbCxcblxuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcblxuICAgICAgICBCYWNrYm9uZS5oaXN0b3J5LnN0YXJ0KHtcbiAgICAgICAgICAgIHB1c2hTdGF0ZSA6IHRydWUsXG4gICAgICAgICAgICByb290ICAgICAgOiAnLydcbiAgICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgaGFzaENoYW5nZWQ6IGZ1bmN0aW9uKGFyZWE9bnVsbCwgc3ViPW51bGwpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhgPj4gRVZFTlRfSEFTSF9DSEFOR0VEIEBhcmVhID0gJHt0aGlzLmFyZWF9LCBAc3ViID0gJHt0aGlzLnN1Yn0gPDxgKTtcblxuICAgICAgICB0aGlzLmFyZWEgPSBhcmVhO1xuICAgICAgICB0aGlzLnN1YiAgPSBzdWI7XG5cbiAgICAgICAgaWYgKHRoaXMuRklSU1RfUk9VVEUpIHtcbiAgICAgICAgICAgIHRoaXMuRklSU1RfUk9VVEUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5hcmVhKSB7XG4gICAgICAgICAgICB0aGlzLmFyZWEgPSB0aGlzLl9fTkFNRVNQQUNFX18oKS5uYXYuc2VjdGlvbnMuSE9NRTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcihSb3V0ZXIuRVZFTlRfSEFTSF9DSEFOR0VELCB0aGlzLmFyZWEsIHRoaXMuc3ViLCB0aGlzLnBhcmFtcyk7XG5cbiAgICB9LFxuXG4gICAgbmF2aWdhdGVUbzogZnVuY3Rpb24od2hlcmU9JycsIHRyaWdnZXI9dHJ1ZSwgcmVwbGFjZT1mYWxzZSwgcGFyYW1zKSB7XG5cbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG5cbiAgICAgICAgaWYgKHdoZXJlLmNoYXJBdCgwKSAhPT0gXCIvXCIpIHtcbiAgICAgICAgICAgIHdoZXJlID0gYC8ke3doZXJlfWA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAod2hlcmUuY2hhckF0KCB3aGVyZS5sZW5ndGgtMSApICE9PSBcIi9cIikge1xuICAgICAgICAgICAgd2hlcmUgPSBgJHt3aGVyZX0vYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdHJpZ2dlcikge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyKFJvdXRlci5FVkVOVF9IQVNIX0NIQU5HRUQsIHdoZXJlLCBudWxsLCB0aGlzLnBhcmFtcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm5hdmlnYXRlKHdoZXJlLCB7IHRyaWdnZXI6IHRydWUsIHJlcGxhY2U6IHJlcGxhY2UgfSk7XG5cbiAgICB9LFxuXG4gICAgX19OQU1FU1BBQ0VfXzogZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgcmV0dXJuIHdpbmRvdy5fX05BTUVTUEFDRV9fO1xuXG4gICAgfVxuXG59LCBzdGF0aWNQcm9wcyk7XG5cbmV4cG9ydCBkZWZhdWx0IFJvdXRlcjtcbiIsIi8qXG4gQW5hbHl0aWNzIHdyYXBwZXJcbiovXG5jbGFzcyBBbmFseXRpY3Mge1xuXG4gICAgdGFncyAgICA9IG51bGw7XG4gICAgc3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgYXR0ZW1wdHMgICAgICAgID0gMDtcbiAgICBhbGxvd2VkQXR0ZW1wdHMgPSA1O1xuXG4gICAgY29uc3RydWN0b3IodGFncywgY2FsbGJhY2spIHtcblxuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICAgICAgJC5nZXRKU09OKHRhZ3MsIHRoaXMub25UYWdzUmVjZWl2ZWQuYmluZCh0aGlzKSk7XG5cbiAgICB9XG5cbiAgICBvblRhZ3NSZWNlaXZlZChkYXRhKSB7XG5cbiAgICAgICAgdGhpcy50YWdzICAgID0gZGF0YTtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuXG4gICAgfVxuXG4gICAgLy8gcGFyYW0gc3RyaW5nIGlkIG9mIHRoZSB0cmFja2luZyB0YWcgdG8gYmUgcHVzaGVkIG9uIEFuYWx5dGljcyBcbiAgICB0cmFjayhwYXJhbSkge1xuXG4gICAgICAgIGlmICghdGhpcy5zdGFydGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW0pIHtcblxuICAgICAgICAgICAgY29uc3QgdiA9IHRoaXMudGFnc1twYXJhbV07XG5cbiAgICAgICAgICAgIGlmICh2KSB7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBhcmdzID0gWydzZW5kJywgJ2V2ZW50J107XG4gICAgICAgICAgICAgICAgdi5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGFyZyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLyBsb2FkaW5nIEdBIGFmdGVyIG1haW4gYXBwIEpTLCBzbyBleHRlcm5hbCBzY3JpcHQgbWF5IG5vdCBiZSBoZXJlIHlldFxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuZ2EpIHtcbiAgICAgICAgICAgICAgICAgICAgZ2EuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmF0dGVtcHRzID49IHRoaXMuYWxsb3dlZEF0dGVtcHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhY2socGFyYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hdHRlbXB0cysrO1xuICAgICAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEFuYWx5dGljcztcbiIsImltcG9ydCBBYnN0cmFjdERhdGEgZnJvbSAnLi4vZGF0YS9BYnN0cmFjdERhdGEnO1xuaW1wb3J0IEZhY2Vib29rIGZyb20gJy4uL3V0aWxzL0ZhY2Vib29rJztcbmltcG9ydCBHb29nbGVQbHVzIGZyb20gJy4uL3V0aWxzL0dvb2dsZVBsdXMnO1xuXG5jbGFzcyBBdXRoTWFuYWdlciBleHRlbmRzIEFic3RyYWN0RGF0YSB7XG5cblx0dXNlckRhdGEgID0gbnVsbDtcblxuXHQvLyB0aGlzLnByb2Nlc3MgdHJ1ZSBkdXJpbmcgbG9naW4gcHJvY2Vzc1xuXHRwcm9jZXNzICAgICAgPSBmYWxzZTtcblx0cHJvY2Vzc1RpbWVyID0gbnVsbDtcblx0cHJvY2Vzc1dhaXQgID0gNTAwMDtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHRcdHN1cGVyKCk7XG5cblx0fVxuXG5cdGxvZ2luKHNlcnZpY2UsIGNiPW51bGwpIHtcblxuXHRcdC8vIGNvbnNvbGUubG9nKFwiKysrKyBQUk9DRVNTIFwiLCB0aGlzLnByb2Nlc3MpO1xuXG5cdFx0aWYgKHRoaXMucHJvY2Vzcykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuc2hvd0xvYWRlcigpO1xuXHRcdHRoaXMucHJvY2VzcyA9IHRydWU7XG5cblx0XHRjb25zdCAkZGF0YURmZCA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdHN3aXRjaCAoc2VydmljZSkge1xuXHRcdFx0Y2FzZSBcImdvb2dsZVwiOlxuXHRcdFx0XHRHb29nbGVQbHVzLmxvZ2luKCRkYXRhRGZkKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFwiZmFjZWJvb2tcIjpcblx0XHRcdFx0RmFjZWJvb2subG9naW4oJGRhdGFEZmQpO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHQkZGF0YURmZC5kb25lKCAocmVzKSA9PiB7IHRoaXMuYXV0aFN1Y2Nlc3MuY2FsbCh0aGlzLCBzZXJ2aWNlLCByZXMpOyB9KTtcblx0XHQkZGF0YURmZC5mYWlsKCAocmVzKSA9PiB7IHRoaXMuYXV0aEZhaWwuY2FsbCh0aGlzLCBzZXJ2aWNlLCByZXMpOyB9KTtcblx0XHQkZGF0YURmZC5hbHdheXMoICgpID0+IHsgdGhpcy5hdXRoQ2FsbGJhY2suY2FsbCh0aGlzLCBjYik7IH0pO1xuXG5cdFx0Lypcblx0XHRVbmZvcnR1bmF0ZWx5IG5vIGNhbGxiYWNrIGlzIGZpcmVkIGlmIHVzZXIgbWFudWFsbHkgY2xvc2VzIEcrIGxvZ2luIG1vZGFsLFxuXHRcdHNvIHRoaXMgaXMgdG8gYWxsb3cgdGhlbSB0byBjbG9zZSB3aW5kb3cgYW5kIHRoZW4gc3Vic2VxdWVudGx5IHRyeSB0byBsb2cgaW4gYWdhaW4uLi5cblx0XHQqL1xuXHRcdHRoaXMucHJvY2Vzc1RpbWVyID0gc2V0VGltZW91dCh0aGlzLmF1dGhDYWxsYmFjaywgdGhpcy5wcm9jZXNzV2FpdCk7XG5cblx0XHRyZXR1cm4gJGRhdGFEZmQ7XG5cblx0fVxuXG5cdGF1dGhTdWNjZXNzKHNlcnZpY2UsIGRhdGEpIHtcblxuXHRcdC8vIGNvbnNvbGUubG9nIFwibG9naW4gY2FsbGJhY2sgZm9yICN7c2VydmljZX0sIGRhdGEgPT4gXCIsIGRhdGFcblxuXHR9XG5cblx0YXV0aEZhaWwoc2VydmljZSwgZGF0YSkge1xuXG5cdFx0Ly8gY29uc29sZS5sb2cgXCJsb2dpbiBmYWlsIGZvciAje3NlcnZpY2V9ID0+IFwiLCBkYXRhXG5cblx0fVxuXG5cdGF1dGhDYWxsYmFjayhjYj1udWxsKSB7XG5cblx0XHRpZiAoIXRoaXMucHJvY2Vzcykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNsZWFyVGltZW91dCh0aGlzLnByb2Nlc3NUaW1lcik7XG5cblx0XHR0aGlzLmhpZGVMb2FkZXIoKTtcblx0XHR0aGlzLnByb2Nlc3MgPSBmYWxzZTtcblxuXHRcdGlmIChjYiAmJiB0eXBlb2YoY2IpID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjYigpO1xuXHRcdH1cblxuXHR9XG5cblx0Ly8gc2hvdyAvIGhpZGUgc29tZSBVSSBpbmRpY2F0b3IgdGhhdCB3ZSBhcmUgd2FpdGluZyBmb3Igc29jaWFsIG5ldHdvcmsgdG8gcmVzcG9uZFxuXHRzaG93TG9hZGVyKCkge1xuXG5cdFx0Ly8gY29uc29sZS5sb2cgXCJzaG93TG9hZGVyXCJcblxuXHR9XG5cblx0aGlkZUxvYWRlcigpIHtcblxuXHRcdC8vIGNvbnNvbGUubG9nIFwiaGlkZUxvYWRlclwiXG5cblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEF1dGhNYW5hZ2VyO1xuIiwiaW1wb3J0IEFic3RyYWN0RGF0YSBmcm9tICcuLi9kYXRhL0Fic3RyYWN0RGF0YSc7XG5cbi8qXG5cbkZhY2Vib29rIFNESyB3cmFwcGVyIC0gbG9hZCBhc3luY2hyb25vdXNseSwgc29tZSBoZWxwZXIgbWV0aG9kc1xuXG4qL1xuY2xhc3MgRmFjZWJvb2sgZXh0ZW5kcyBBYnN0cmFjdERhdGEge1xuXG5cdHN0YXRpYyB1cmwgPSAnLy9jb25uZWN0LmZhY2Vib29rLm5ldC9lbl9VUy9hbGwuanMnO1xuXG5cdHN0YXRpYyBwZXJtaXNzaW9ucyA9ICdlbWFpbCc7XG5cblx0c3RhdGljICRkYXRhRGZkICAgID0gbnVsbDtcblx0c3RhdGljIGxvYWRlZCAgICAgID0gZmFsc2U7XG5cblx0c3RhdGljIGxvYWQoKSB7XG5cblx0XHQkc2NyaXB0KEZhY2Vib29rLnVybCwgRmFjZWJvb2suaW5pdCk7XG5cblx0fVxuXG5cdHN0YXRpYyBpbml0KCkge1xuXG5cdFx0RmFjZWJvb2subG9hZGVkID0gdHJ1ZTtcblxuXHRcdEZCLmluaXQoe1xuXHRcdFx0YXBwSWQgIDogd2luZG93LmNvbmZpZy5mYl9hcHBfaWQsXG5cdFx0XHRzdGF0dXMgOiBmYWxzZSxcblx0XHRcdHhmYm1sICA6IGZhbHNlXG5cdFx0fSk7XG5cblx0fVxuXG5cdHN0YXRpYyBsb2dpbigkZGF0YURmZCkge1xuXG5cdFx0RmFjZWJvb2suJGRhdGFEZmQgPSAkZGF0YURmZDtcblxuXHRcdGlmICghRmFjZWJvb2subG9hZGVkKSB7XG5cdFx0XHRyZXR1cm4gRmFjZWJvb2suJGRhdGFEZmQucmVqZWN0KCdTREsgbm90IGxvYWRlZCcpO1xuXHRcdH1cblxuXHRcdEZCLmxvZ2luKCAocmVzKSA9PiB7XG5cblx0XHRcdGlmIChyZXNbJ3N0YXR1cyddID09PSAnY29ubmVjdGVkJykge1xuXHRcdFx0XHRGYWNlYm9vay5nZXRVc2VyRGF0YShyZXNbJ2F1dGhSZXNwb25zZSddWydhY2Nlc3NUb2tlbiddKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdEZhY2Vib29rLiRkYXRhRGZkLnJlamVjdCgnbm8gd2F5IGpvc2UnKTtcblx0XHRcdH1cblxuXHRcdH0sIHsgc2NvcGU6IEZhY2Vib29rLnBlcm1pc3Npb25zIH0pO1xuXG5cdH1cblxuXHRzdGF0aWMgZ2V0VXNlckRhdGEodG9rZW4pIHtcblxuXHRcdGNvbnN0IHVzZXJEYXRhID0ge307XG5cdFx0dXNlckRhdGEuYWNjZXNzX3Rva2VuID0gdG9rZW47XG5cblx0XHRjb25zdCAkbWVEZmQgICA9ICQuRGVmZXJyZWQoKTtcblx0XHRjb25zdCAkcGljRGZkICA9ICQuRGVmZXJyZWQoKTtcblxuXHRcdEZCLmFwaSgnL21lJywgKHJlcykgPT4ge1xuXG5cdFx0XHR1c2VyRGF0YS5mdWxsX25hbWUgPSByZXMubmFtZTtcblx0XHRcdHVzZXJEYXRhLnNvY2lhbF9pZCA9IHJlcy5pZDtcblx0XHRcdHVzZXJEYXRhLmVtYWlsICAgICA9IHJlcy5lbWFpbCB8fCBmYWxzZTtcblx0XHRcdCRtZURmZC5yZXNvbHZlKCk7XG5cblx0XHR9KTtcblxuXHRcdEZCLmFwaSgnL21lL3BpY3R1cmUnLCB7ICd3aWR0aCc6ICcyMDAnIH0sIChyZXMpID0+IHtcblxuXHRcdFx0dXNlckRhdGEucHJvZmlsZV9waWMgPSByZXMuZGF0YS51cmw7XG5cdFx0XHQkcGljRGZkLnJlc29sdmUoKTtcblxuXHRcdH0pO1xuXG5cdFx0JC53aGVuKCRtZURmZCwgJHBpY0RmZCkuZG9uZSggKCkgPT4ge1xuXG5cdFx0XHRGYWNlYm9vay4kZGF0YURmZC5yZXNvbHZlKHVzZXJEYXRhKTtcblxuXHRcdH0pO1xuXG5cdH1cblxuXHRzdGF0aWMgc2hhcmUob3B0cywgY2IpIHtcblxuXHRcdEZCLnVpKHtcblx0XHRcdG1ldGhvZCAgICAgIDogb3B0cy5tZXRob2QgfHwgJ2ZlZWQnLFxuXHRcdFx0bmFtZSAgICAgICAgOiBvcHRzLm5hbWUgfHwgJycsXG5cdFx0XHRsaW5rICAgICAgICA6IG9wdHMubGluayB8fCAnJyxcblx0XHRcdHBpY3R1cmUgICAgIDogb3B0cy5waWN0dXJlIHx8ICcnLFxuXHRcdFx0Y2FwdGlvbiAgICAgOiBvcHRzLmNhcHRpb24gfHwgJycsXG5cdFx0XHRkZXNjcmlwdGlvbiA6IG9wdHMuZGVzY3JpcHRpb24gfHwgJydcblx0XHR9LCAocmVzcG9uc2UpID0+IHtcblx0XHRcdGlmIChjYiAmJiB0eXBlb2YoY2IpID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGNiKHJlc3BvbnNlKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmFjZWJvb2s7XG4iLCJpbXBvcnQgQWJzdHJhY3REYXRhIGZyb20gJy4uL2RhdGEvQWJzdHJhY3REYXRhJztcblxuLypcblxuR29vZ2xlKyBTREsgd3JhcHBlciAtIGxvYWQgYXN5bmNocm9ub3VzbHksIHNvbWUgaGVscGVyIG1ldGhvZHNcblxuKi9cbmNsYXNzIEdvb2dsZVBsdXMgZXh0ZW5kcyBBYnN0cmFjdERhdGEge1xuXG5cdHN0YXRpYyB1cmwgPSAnaHR0cHM6Ly9hcGlzLmdvb2dsZS5jb20vanMvY2xpZW50OnBsdXNvbmUuanMnO1xuXG5cdHN0YXRpYyBwYXJhbXMgPSB7XG5cdFx0J2NsaWVudGlkJyAgICAgOiBudWxsLFxuXHRcdCdjYWxsYmFjaycgICAgIDogbnVsbCxcblx0XHQnc2NvcGUnICAgICAgICA6ICdodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL3VzZXJpbmZvLmVtYWlsJyxcblx0XHQnY29va2llcG9saWN5JyA6ICdub25lJ1xuXHR9O1xuXG5cdHN0YXRpYyAkZGF0YURmZCA9IG51bGw7XG5cdHN0YXRpYyBsb2FkZWQgICA9IGZhbHNlO1xuXG5cdHN0YXRpYyBsb2FkKCkge1xuXG5cdFx0JHNjcmlwdChHb29nbGVQbHVzLnVybCwgR29vZ2xlUGx1cy5pbml0KTtcblxuXHR9XG5cblx0c3RhdGljIGluaXQoKSB7XG5cblx0XHRHb29nbGVQbHVzLmxvYWRlZCA9IHRydWU7XG5cblx0XHRHb29nbGVQbHVzLnBhcmFtc1snY2xpZW50aWQnXSA9IHdpbmRvdy5jb25maWcuZ3BfYXBwX2lkO1xuXHRcdEdvb2dsZVBsdXMucGFyYW1zWydjYWxsYmFjayddID0gR29vZ2xlUGx1cy5sb2dpbkNhbGxiYWNrLmJpbmQodGhpcyk7XG5cblx0fVxuXG5cdHN0YXRpYyBsb2dpbigkZGF0YURmZCkge1xuXG5cdFx0R29vZ2xlUGx1cy4kZGF0YURmZCA9ICRkYXRhRGZkO1xuXG5cdFx0aWYgKEdvb2dsZVBsdXMubG9hZGVkKSB7XG5cdFx0XHRnYXBpLmF1dGguc2lnbkluKEdvb2dsZVBsdXMucGFyYW1zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0R29vZ2xlUGx1cy4kZGF0YURmZC5yZWplY3QoJ1NESyBub3QgbG9hZGVkJyk7XG5cdFx0fVxuXG5cdH1cblxuXHRzdGF0aWMgbG9naW5DYWxsYmFjayhyZXMpIHtcblxuXHRcdGlmIChyZXNbJ3N0YXR1cyddWydzaWduZWRfaW4nXSkge1xuXHRcdFx0R29vZ2xlUGx1cy5nZXRVc2VyRGF0YShyZXNbJ2FjY2Vzc190b2tlbiddKTtcblx0XHR9IGVsc2UgaWYgKHJlc1snZXJyb3InXVsnYWNjZXNzX2RlbmllZCddKSB7XG5cdFx0XHRHb29nbGVQbHVzLiRkYXRhRGZkLnJlamVjdCgnbm8gd2F5IGpvc2UnKTtcblx0XHR9XG5cblx0fVxuXG5cdHN0YXRpYyBnZXRVc2VyRGF0YSh0b2tlbikge1xuXG5cdFx0Z2FwaS5jbGllbnQubG9hZCgncGx1cycsJ3YxJywgKCkgPT4ge1xuXG5cdFx0XHRyZXF1ZXN0ID0gZ2FwaS5jbGllbnQucGx1cy5wZW9wbGUuZ2V0KHsgJ3VzZXJJZCc6ICdtZScgfSk7XG5cdFx0XHRyZXF1ZXN0LmV4ZWN1dGUoIChyZXMpID0+IHtcblxuXHRcdFx0XHRjb25zdCB1c2VyRGF0YSA9IHtcblx0XHRcdFx0XHRhY2Nlc3NfdG9rZW4gOiB0b2tlbixcblx0XHRcdFx0XHRmdWxsX25hbWUgICAgOiByZXMuZGlzcGxheU5hbWUsXG5cdFx0XHRcdFx0c29jaWFsX2lkICAgIDogcmVzLmlkLFxuXHRcdFx0XHRcdGVtYWlsICAgICAgICA6IHJlcy5lbWFpbHNbMF0gPyByZXMuZW1haWxzWzBdLnZhbHVlIDogZmFsc2UsXG5cdFx0XHRcdFx0cHJvZmlsZV9waWMgIDogcmVzLmltYWdlLnVybFxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdEdvb2dsZVBsdXMuJGRhdGFEZmQucmVzb2x2ZSh1c2VyRGF0YSk7XG5cblx0XHRcdH0pO1xuXG5cdFx0fSk7XG5cblx0fVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEdvb2dsZVBsdXM7XG4iLCIvKiAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICBNZWRpYSBRdWVyaWVzIE1hbmFnZXIgXG4gKiAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogICBcbiAqICAgQGF1dGhvciAgOiBGw6FiaW8gQXpldmVkbyA8ZmFiaW8uYXpldmVkb0B1bml0OS5jb20+IFVOSVQ5XG4gKiAgIEBkYXRlICAgIDogU2VwdGVtYmVyIDE0XG4gKiAgIEB1cGRhdGVkIDogSnVseSAyMDE1IChwb3J0IHRvIGVzNilcbiAqICAgXG4gKiAgIEluc3RydWN0aW9ucyBhcmUgaW4gL3Byb2plY3Qvc2Fzcy91dGlscy9fcmVzcG9uc2l2ZS5zY3NzLlxuICovXG5cbmNsYXNzIE1lZGlhUXVlcmllcyB7XG5cbiAgICAvLyBCcmVha3BvaW50c1xuICAgIHN0YXRpYyBTTUFMTCAgICAgICA9IFwic21hbGxcIjtcbiAgICBzdGF0aWMgSVBBRCAgICAgICAgPSBcImlwYWRcIjtcbiAgICBzdGF0aWMgTUVESVVNICAgICAgPSBcIm1lZGl1bVwiO1xuICAgIHN0YXRpYyBMQVJHRSAgICAgICA9IFwibGFyZ2VcIjtcbiAgICBzdGF0aWMgRVhUUkFfTEFSR0UgPSBcImV4dHJhLWxhcmdlXCI7XG5cbiAgICBzdGF0aWMgSlNfRUwgICAgICAgID0gbnVsbDtcbiAgICBzdGF0aWMgRUxfQ0xBU1NOQU1FID0gJ2pzLW1lZGlhcXVlcmllcyc7XG5cbiAgICBzdGF0aWMgc2V0dXAoKSB7XG5cbiAgICAgICAgTWVkaWFRdWVyaWVzLkpTX0VMID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIE1lZGlhUXVlcmllcy5KU19FTC5jbGFzc05hbWUgPSBNZWRpYVF1ZXJpZXMuRUxfQ0xBU1NOQU1FO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKE1lZGlhUXVlcmllcy5KU19FTCk7XG5cbiAgICAgICAgTWVkaWFRdWVyaWVzLlNNQUxMX0JSRUFLUE9JTlQgID0geyBuYW1lOiBcIlNtYWxsXCIsIGJyZWFrcG9pbnRzOiBbIE1lZGlhUXVlcmllcy5TTUFMTCBdIH07XG4gICAgICAgIE1lZGlhUXVlcmllcy5NRURJVU1fQlJFQUtQT0lOVCA9IHsgbmFtZTogXCJNZWRpdW1cIiwgYnJlYWtwb2ludHM6IFsgTWVkaWFRdWVyaWVzLk1FRElVTSBdIH07XG4gICAgICAgIE1lZGlhUXVlcmllcy5MQVJHRV9CUkVBS1BPSU5UICA9IHsgbmFtZTogXCJMYXJnZVwiLCBicmVha3BvaW50czogWyBNZWRpYVF1ZXJpZXMuSVBBRCwgTWVkaWFRdWVyaWVzLkxBUkdFLCBNZWRpYVF1ZXJpZXMuRVhUUkFfTEFSR0UgXSB9O1xuXG4gICAgICAgIE1lZGlhUXVlcmllcy5CUkVBS1BPSU5UUyA9IFtcbiAgICAgICAgICAgIE1lZGlhUXVlcmllcy5TTUFMTF9CUkVBS1BPSU5ULFxuICAgICAgICAgICAgTWVkaWFRdWVyaWVzLk1FRElVTV9CUkVBS1BPSU5ULFxuICAgICAgICAgICAgTWVkaWFRdWVyaWVzLkxBUkdFX0JSRUFLUE9JTlRcbiAgICAgICAgXTtcblxuICAgIH1cblxuICAgIHN0YXRpYyBnZXREZXZpY2VTdGF0ZSgpIHtcblxuICAgICAgICBjb25zdCByZSA9IC8oXFwnfFxcXCIpLztcblxuICAgICAgICBsZXQgdmFsdWUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShNZWRpYVF1ZXJpZXMuSlNfRUwpLmdldFByb3BlcnR5VmFsdWUoXCJjb250ZW50XCIpO1xuICAgICAgICBpZiAocmUudGVzdCh2YWx1ZS5jaGFyQXQoMCkpICYmIHJlLnRlc3QodmFsdWUuY2hhckF0KHZhbHVlLmxlbmd0aC0xKSkpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc3Vic3RyKDEsIHZhbHVlLmxlbmd0aC0yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZVxuXG4gICAgfVxuXG4gICAgc3RhdGljIGdldEJyZWFrcG9pbnQoKSB7XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgICAgPSBNZWRpYVF1ZXJpZXMuZ2V0RGV2aWNlU3RhdGUoKTtcbiAgICAgICAgbGV0IGJyZWFrcG9pbnQgPSBcIlwiO1xuXG4gICAgICAgIE1lZGlhUXVlcmllcy5CUkVBS1BPSU5UUy5mb3JFYWNoKCAocG9pbnQsIGkpID0+IHtcbiAgICAgICAgICAgIGlmIChNZWRpYVF1ZXJpZXMuQlJFQUtQT0lOVFNbaV0uYnJlYWtwb2ludHMuaW5kZXhPZihzdGF0ZSkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQgPSBwb2ludC5uYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gYnJlYWtwb2ludDtcblxuICAgIH1cblxuICAgIHN0YXRpYyBpc0JyZWFrcG9pbnQoYnJlYWtwb2ludCkge1xuXG4gICAgICAgIGxldCBicmVha3BvaW50TWF0Y2ggPSBmYWxzZTtcblxuICAgICAgICBicmVha3BvaW50LmJyZWFrcG9pbnRzLmZvckVhY2goIChwb2ludCkgPT4ge1xuICAgICAgICAgICAgaWYgKHBvaW50ID09IE1lZGlhUXVlcmllcy5nZXREZXZpY2VTdGF0ZSgpKVxuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRNYXRjaCA9IHRydWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBicmVha3BvaW50TWF0Y2g7XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFRdWVyaWVzO1xuXG53aW5kb3cuTWVkaWFRdWVyaWVzID0gTWVkaWFRdWVyaWVzO1xuIiwiLypcblJlcXVlc3RlclxuLSBXcmFwcGVyIGZvciBgJC5hamF4YCBjYWxsc1xuKi9cblxuY2xhc3MgUmVxdWVzdGVyIHtcblxuICAgIHN0YXRpYyByZXF1ZXN0cyA9IFtdO1xuXG4gICAgc3RhdGljIHJlcXVlc3QoIGRhdGEgKSB7XG4gICAgICAgIC8qXG4gICAgICAgIGBkYXRhID0ge2A8YnI+XG4gICAgICAgIGAgIHVybCAgICAgICAgIDogU3RyaW5nYDxicj5cbiAgICAgICAgYCAgdHlwZSAgICAgICAgOiBcIlBPU1QvR0VUL1BVVFwiYDxicj5cbiAgICAgICAgYCAgZGF0YSAgICAgICAgOiBPYmplY3RgPGJyPlxuICAgICAgICBgICBkYXRhVHlwZSAgICA6IGpRdWVyeSBkYXRhVHlwZWA8YnI+XG4gICAgICAgIGAgIGNvbnRlbnRUeXBlIDogU3RyaW5nYDxicj5cbiAgICAgICAgYH1gXG4gICAgICAgICovXG5cbiAgICAgICAgY29uc3QgciA9ICQuYWpheCh7XG4gICAgICAgICAgICB1cmwgICAgICAgICA6IGRhdGEudXJsLFxuICAgICAgICAgICAgdHlwZSAgICAgICAgOiBkYXRhLnR5cGUgPyBkYXRhLnR5cGUgOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGEgICAgICAgIDogZGF0YS5kYXRhID8gZGF0YS5kYXRhIDogbnVsbCxcbiAgICAgICAgICAgIGRhdGFUeXBlICAgIDogZGF0YS5kYXRhVHlwZSA/IGRhdGEuZGF0YVR5cGUgOiBcImpzb25cIixcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlIDogZGF0YS5jb250ZW50VHlwZSA/IGRhdGEuY29udGVudFR5cGUgOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD1VVEYtOFwiLFxuICAgICAgICAgICAgcHJvY2Vzc0RhdGEgOiAoZGF0YS5wcm9jZXNzRGF0YSAhPT0gbnVsbCAmJiBkYXRhLnByb2Nlc3NEYXRhICE9PSB1bmRlZmluZWQpID8gZGF0YS5wcm9jZXNzRGF0YSA6IHRydWVcblxuICAgICAgICB9KTtcblxuICAgICAgICByLmRvbmUoZGF0YS5kb25lKTtcbiAgICAgICAgci5mYWlsKGRhdGEuZmFpbCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcjtcblxuICAgIH1cblxuICAgIHN0YXRpYyBhZGRJbWFnZShkYXRhLCBkb25lLCBmYWlsKSB7XG4gICAgICAgIC8qXG4gICAgICAgICoqIFVzYWdlOiA8YnI+XG4gICAgICAgIGBkYXRhID0gY2FudmFzcy50b0RhdGFVUkwoXCJpbWFnZS9qcGVnXCIpLnNsaWNlKFwiZGF0YTppbWFnZS9qcGVnO2Jhc2U2NCxcIi5sZW5ndGgpYDxicj5cbiAgICAgICAgYFJlcXVlc3Rlci5hZGRJbWFnZSBkYXRhLCBcInpvZXRyb3BlXCIsIEBkb25lLCBAZmFpbGBcbiAgICAgICAgKi9cblxuICAgICAgICBSZXF1ZXN0ZXIucmVxdWVzdCh7XG4gICAgICAgICAgICB1cmwgICAgOiAnL2FwaS9pbWFnZXMvJyxcbiAgICAgICAgICAgIHR5cGUgICA6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGEgICA6IHsgaW1hZ2VfYmFzZTY0IDogZW5jb2RlVVJJKGRhdGEpIH0sXG4gICAgICAgICAgICBkb25lICAgOiBkb25lLFxuICAgICAgICAgICAgZmFpbCAgIDogZmFpbFxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIHN0YXRpYyBkZWxldGVJbWFnZShpZCwgZG9uZSwgZmFpbCkge1xuICAgICAgICBcbiAgICAgICAgUmVxdWVzdGVyLnJlcXVlc3Qoe1xuICAgICAgICAgICAgdXJsICAgIDogJy9hcGkvaW1hZ2VzLycraWQsXG4gICAgICAgICAgICB0eXBlICAgOiAnREVMRVRFJyxcbiAgICAgICAgICAgIGRvbmUgICA6IGRvbmUsXG4gICAgICAgICAgICBmYWlsICAgOiBmYWlsXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlcXVlc3RlcjtcbiAgICAiLCIvKlxuU2hhcmluZyBjbGFzcyBmb3Igbm9uLVNESyBsb2FkZWQgc29jaWFsIG5ldHdvcmtzLlxuSWYgU0RLIGlzIGxvYWRlZCwgYW5kIHByb3ZpZGVzIHNoYXJlIG1ldGhvZHMsIHRoZW4gdXNlIHRoYXQgY2xhc3MgaW5zdGVhZCwgZWcuIGBGYWNlYm9vay5zaGFyZWAgaW5zdGVhZCBvZiBgU2hhcmUuZmFjZWJvb2tgXG4qL1xuY2xhc3MgU2hhcmUge1xuXG4gICAgdXJsID0gbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgICAgIHRoaXMudXJsID0gdGhpcy5fX05BTUVTUEFDRV9fKCkuQkFTRV9QQVRIO1xuXG4gICAgfVxuXG4gICAgb3Blbldpbih1cmwsIHcsIGgpIHtcblxuICAgICAgICBjb25zdCBsZWZ0ID0gKCBzY3JlZW4uYXZhaWxXaWR0aCAgLSB3ICkgPj4gMTtcbiAgICAgICAgY29uc3QgdG9wICA9ICggc2NyZWVuLmF2YWlsSGVpZ2h0IC0gaCApID4+IDE7XG5cbiAgICAgICAgd2luZG93Lm9wZW4odXJsLCAnJywgJ3RvcD0nK3RvcCsnLGxlZnQ9JytsZWZ0Kycsd2lkdGg9Jyt3KycsaGVpZ2h0PScraCsnLGxvY2F0aW9uPW5vLG1lbnViYXI9bm8nKTtcblxuICAgIH1cblxuICAgIHBsdXModXJsPScnKSB7XG5cbiAgICAgICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCB8fCB0aGlzLnVybCk7XG5cbiAgICAgICAgdGhpcy5vcGVuV2luKGBodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9JHt1cmx9YCwgNjUwLCAzODUpO1xuXG4gICAgfVxuXG4gICAgcGludGVyZXN0KHVybD0nJywgbWVkaWE9JycsIGRlc2NyPScnKSB7XG5cbiAgICAgICAgdXJsICAgPSBlbmNvZGVVUklDb21wb25lbnQodXJsIHx8IHRoaXMudXJsKTtcbiAgICAgICAgbWVkaWEgPSBlbmNvZGVVUklDb21wb25lbnQobWVkaWEpO1xuICAgICAgICBkZXNjciA9IGVuY29kZVVSSUNvbXBvbmVudChkZXNjcik7XG5cbiAgICAgICAgdGhpcy5vcGVuV2luKGBodHRwOi8vd3d3LnBpbnRlcmVzdC5jb20vcGluL2NyZWF0ZS9idXR0b24vP3VybD0ke3VybH0mbWVkaWE9JHttZWRpYX0mZGVzY3JpcHRpb249JHtkZXNjcn1gLCA3MzUsIDMxMCk7XG5cbiAgICB9XG5cbiAgICB0dW1ibHIodXJsPScnLCBtZWRpYT0nJywgZGVzY3I9JycpIHtcblxuICAgICAgICB1cmwgICA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwgfHwgdGhpcy51cmwpO1xuICAgICAgICBtZWRpYSA9IGVuY29kZVVSSUNvbXBvbmVudChtZWRpYSk7XG4gICAgICAgIGRlc2NyID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlc2NyKTtcblxuICAgICAgICB0aGlzLm9wZW5XaW4oYGh0dHA6Ly93d3cudHVtYmxyLmNvbS9zaGFyZS9waG90bz9zb3VyY2U9JHttZWRpYX0mY2FwdGlvbj0ke2Rlc2NyfSZjbGlja190aHJ1PSR7dXJsfWAsIDQ1MCwgNDMwKTtcblxuICAgIH1cblxuICAgIGZhY2Vib29rKHVybD0nJywgY29weT0nJykge1xuXG4gICAgICAgIHVybCAgICAgICAgID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCB8fCB0aGlzLnVybCk7XG4gICAgICAgIGNvbnN0IGRlY3NyID0gZW5jb2RlVVJJQ29tcG9uZW50KGNvcHkpO1xuXG4gICAgICAgIHRoaXMub3BlbldpbihgaHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmUucGhwP3U9JHt1cmx9JnQ9JHtkZWNzcn1gLCA2MDAsIDMwMCk7XG5cbiAgICB9XG5cbiAgICB0d2l0dGVyKHVybD0nJywgY29weT0nJykge1xuXG4gICAgICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwgfHwgdGhpcy51cmwpO1xuICAgICAgICBpZiAoY29weSA9PT0gJycpIHtcbiAgICAgICAgICAgIGNvcHkgPSB0aGlzLl9fTkFNRVNQQUNFX18oKS5sb2NhbGUuZ2V0KCdzZW9fdHdpdHRlcl9jYXJkX2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZGVzY3IgPSBlbmNvZGVVUklDb21wb25lbnQoY29weSk7XG5cbiAgICAgICAgdGhpcy5vcGVuV2luKGBodHRwOi8vdHdpdHRlci5jb20vaW50ZW50L3R3ZWV0Lz90ZXh0PSR7ZGVzY3J9JnVybD0ke3VybH1gLCA2MDAsIDMwMCk7XG5cbiAgICB9XG5cbiAgICByZW5yZW4odXJsPScnKSB7XG5cbiAgICAgICAgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHVybCB8fCB0aGlzLnVybCk7XG5cbiAgICAgICAgdGhpcy5vcGVuV2luKGBodHRwOi8vc2hhcmUucmVucmVuLmNvbS9zaGFyZS9idXR0b25zaGFyZS5kbz9saW5rPSR7dXJsfWAsIDYwMCwgMzAwKTtcblxuICAgIH1cblxuICAgIHdlaWJvKHVybD0nJykge1xuXG4gICAgICAgIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudCh1cmwgfHwgdGhpcy51cmwpO1xuXG4gICAgICAgIHRoaXMub3BlbldpbihgaHR0cDovL3NlcnZpY2Uud2VpYm8uY29tL3NoYXJlL3NoYXJlLnBocD91cmw9JHt1cmx9Jmxhbmd1YWdlPXpoX2NuYCwgNjAwLCAzMDApO1xuXG4gICAgfVxuXG4gICAgX19OQU1FU1BBQ0VfXygpIHtcblxuICAgICAgICByZXR1cm4gd2luZG93Ll9fTkFNRVNQQUNFX187XG5cbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2hhcmU7XG4iLCJjb25zdCBBYnN0cmFjdFZpZXcgPSBCYWNrYm9uZS5WaWV3LmV4dGVuZCh7XG5cblx0ZWwgICAgICAgICAgIDogbnVsbCxcblx0aWQgICAgICAgICAgIDogbnVsbCxcblx0Y2hpbGRyZW4gICAgIDogbnVsbCxcblx0dGVtcGxhdGUgICAgIDogbnVsbCxcblx0dGVtcGxhdGVWYXJzIDogbnVsbCxcblxuXHRpbml0aWFsaXplOiBmdW5jdGlvbigpIHtcblx0XHRcblx0XHR0aGlzLmNoaWxkcmVuID0gW107XG5cblx0XHRpZiAodGhpcy50ZW1wbGF0ZSkge1xuXHRcdFx0Y29uc3QgdG1wSFRNTCA9IF8udGVtcGxhdGUodGhpcy5fX05BTUVTUEFDRV9fKCkudGVtcGxhdGVzLmdldCh0aGlzLnRlbXBsYXRlKSk7XG5cblx0XHRcdHRoaXMuc2V0RWxlbWVudChcblx0XHRcdFx0dG1wSFRNTCh0aGlzLnRlbXBsYXRlVmFycylcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuaWQpIHtcblx0XHRcdHRoaXMuJGVsLmF0dHIoJ2lkJywgdGhpcy5pZCk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY2xhc3NOYW1lKSB7XG5cdFx0XHR0aGlzLiRlbC5hZGRDbGFzcyh0aGlzLmNsYXNzTmFtZSk7XG5cdFx0fVxuXHRcdFxuXHRcdHRoaXMuaW5pdCgpO1xuXG5cdFx0dGhpcy5wYXVzZWQgPSBmYWxzZTtcblxuXHR9LFxuXG5cdGluaXQ6IGZ1bmN0aW9uKCkge30sXG5cblx0dXBkYXRlOiBmdW5jdGlvbigpIHt9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7fSxcblxuXHRhZGRDaGlsZDogZnVuY3Rpb24oY2hpbGQsIHByZXBlbmQgPSBmYWxzZSkge1xuXG5cdFx0aWYgKGNoaWxkLmVsKSB7XG5cdFx0XHR0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRhcmdldCA9IHRoaXMuYWRkVG9TZWxlY3RvciA/IHRoaXMuJGVsLmZpbmQodGhpcy5hZGRUb1NlbGVjdG9yKS5lcSgwKSA6IHRoaXMuJGVsO1xuXHRcdGNvbnN0IGMgICAgICA9IGNoaWxkLmVsID8gY2hpbGQuJGVsIDogY2hpbGQ7XG5cblx0XHRpZiAoIXByZXBlbmQpIHtcblx0XHRcdHRhcmdldC5hcHBlbmQoYyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5wcmVwZW5kKGMpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdHJlcGxhY2U6IGZ1bmN0aW9uKGRvbSwgY2hpbGQpIHtcblxuXHRcdGlmIChjaGlsZC5lbCkge1xuXHRcdFx0dGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcblx0XHR9XG5cblx0XHRjb25zdCBjID0gY2hpbGQuZWwgPyBjaGlsZC4kZWwgOiBjaGlsZDtcblxuXHRcdHRoaXMuJGVsLmNoaWxkcmVuKGRvbSkucmVwbGFjZVdpdGgoYyk7XG5cblx0fSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uKGNoaWxkKSB7XG5cblx0XHRpZiAoIWNoaWxkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdFxuXHRcdGNvbnN0IGMgPSBjaGlsZC5lbCA/IGNoaWxkLiRlbCA6ICQoY2hpbGQpO1xuXHRcdGlmIChjICYmIGNoaWxkLmRpc3Bvc2UpIHtcblx0XHRcdGNoaWxkLmRpc3Bvc2UoKTtcblx0XHR9XG5cblx0XHRpZiAoYyAmJiB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpICE9IC0xKSB7XG5cdFx0XHR0aGlzLmNoaWxkcmVuLnNwbGljZSggdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKSwgMSApO1xuXHRcdH1cblxuXHRcdGMucmVtb3ZlKCk7XG5cblx0fSxcblxuXHRvblJlc2l6ZTogZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCggKGNoaWxkKSA9PiB7XG5cdFx0XHRpZiAoY2hpbGQub25SZXNpemUpIHtcblx0XHRcdFx0Y2hpbGQub25SZXNpemUoKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9LFxuXG5cdG1vdXNlRW5hYmxlZDogZnVuY3Rpb24oIGVuYWJsZWQgKSB7XG5cblx0XHR0aGlzLiRlbC5jc3Moe1xuXHRcdFx0XCJwb2ludGVyLWV2ZW50c1wiOiBlbmFibGVkID8gXCJhdXRvXCIgOiBcIm5vbmVcIlxuXHRcdH0pO1xuXG5cdH0sXG5cblx0Q1NTVHJhbnNsYXRlOiBmdW5jdGlvbih4LCB5LCB2YWx1ZT0nJScsIHNjYWxlKSB7XG5cblx0XHRsZXQgc3RyO1xuXG5cdFx0aWYgKE1vZGVybml6ci5jc3N0cmFuc2Zvcm1zM2QpIHtcblx0XHRcdHN0ciA9IGB0cmFuc2xhdGUzZCgke3grdmFsdWV9LCAke3krdmFsdWV9LCAwKWA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0ciA9IGB0cmFuc2xhdGUoJHt4K3ZhbHVlfSwgJHt5K3ZhbHVlfSlgXG5cdFx0fVxuXG5cdFx0aWYgKHNjYWxlKSB7XG5cdFx0XHRzdHIgPSBgJHtzdHJ9IHNjYWxlKCR7c2NhbGV9KWBcblx0XHR9XG5cblx0XHRyZXR1cm4gc3RyO1xuXG5cdH0sXG5cblx0dW5NdXRlQWxsOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMuY2hpbGRyZW4uZm9yRWFjaCggKGNoaWxkKSA9PiB7XG5cblx0XHRcdGlmIChjaGlsZC51bk11dGUpIHtcblx0XHRcdFx0Y2hpbGQudW5NdXRlKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0Y2hpbGQudW5NdXRlQWxsKCk7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXHR9LFxuXG5cdG11dGVBbGw6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKCAoY2hpbGQpID0+IHtcblxuXHRcdFx0aWYgKGNoaWxkLm11dGUpIHtcblx0XHRcdFx0Y2hpbGQubXV0ZSgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoY2hpbGQuY2hpbGRyZW4ubGVuZ3RoKSB7XG5cdFx0XHRcdGNoaWxkLm11dGVBbGwoKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdH0sXG5cblx0cmVtb3ZlQWxsQ2hpbGRyZW46IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy5jaGlsZHJlbi5mb3JFYWNoKCAoY2hpbGQpID0+IHtcblx0XHRcdHRoaXMucmVtb3ZlKGNoaWxkKTtcblx0XHR9KTtcblxuXHR9LFxuXG5cdHRyaWdnZXJDaGlsZHJlbjogZnVuY3Rpb24obXNnLCBjaGlsZHJlbikge1xuXG5cdFx0Y2hpbGRyZW4gPSBjaGlsZHJlbiB8fCB0aGlzLmNoaWxkcmVuO1xuXG5cdFx0Y2hpbGRyZW4uZm9yRWFjaCggKGNoaWxkLCBpKSA9PiB7XG5cblx0XHRcdGNoaWxkLnRyaWdnZXIobXNnKTtcblxuXHRcdFx0aWYgKGNoaWxkLmNoaWxkcmVuLmxlbmd0aCkge1xuXHRcdFx0XHR0aGlzLnRyaWdnZXJDaGlsZHJlbihtc2csIGNoaWxkLmNoaWxkcmVuKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdH0sXG5cblx0Y2FsbENoaWxkcmVuOiBmdW5jdGlvbihtZXRob2QsIHBhcmFtcywgY2hpbGRyZW4pIHtcblxuXHRcdGNoaWxkcmVuID0gY2hpbGRyZW4gfHwgdGhpcy5jaGlsZHJlbjtcblxuXHRcdGNoaWxkcmVuLmZvckVhY2goIChjaGlsZCwgaSkgPT4ge1xuXG5cdFx0XHRpZiAoY2hpbGRbbWV0aG9kXSkge1xuXHRcdFx0XHRjaGlsZFttZXRob2RdKHBhcmFtcyk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChjaGlsZC5jaGlsZHJlbi5sZW5ndGgpIHtcblx0XHRcdFx0dGhpcy5jYWxsQ2hpbGRyZW4obWV0aG9kLCBwYXJhbXMsIGNoaWxkLmNoaWxkcmVuKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cdH0sXG5cblx0Y2FsbENoaWxkcmVuQW5kU2VsZjogZnVuY3Rpb24obWV0aG9kLCBwYXJhbXMsIGNoaWxkcmVuKSB7XG5cblx0XHRjaGlsZHJlbiA9IGNoaWxkcmVuIHx8IHRoaXMuY2hpbGRyZW47XG5cblx0XHRpZiAodGhpc1ttZXRob2RdKSB7XG5cdFx0XHR0aGlzW21ldGhvZF0ocGFyYW1zKTtcblx0XHR9XG5cblx0XHR0aGlzLmNhbGxDaGlsZHJlbihtZXRob2QsIHBhcmFtcywgY2hpbGRyZW4pO1xuXG5cdH0sXG5cblx0c3VwcGxhbnRTdHJpbmc6IGZ1bmN0aW9uKHN0ciwgdmFscykge1xuXG5cdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC97eyAoW157fV0qKSB9fS9nLCAoYSwgYikgPT4ge1xuXHRcdFx0Y29uc3QgciA9IHZhbHNbYl07XG5cdFx0XHRpZiAodHlwZW9mIHIgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIHIgPT09IFwibnVtYmVyXCIpIHtcblx0XHRcdFx0cmV0dXJuIHI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gYTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHR9LFxuXG5cdGRpc3Bvc2U6IGZ1bmN0aW9uKCkge1xuXG5cdFx0Lypcblx0XHRvdmVycmlkZSBvbiBwZXIgdmlldyBiYXNpcyAtIHVuYmluZCBldmVudCBoYW5kbGVycyBldGNcblx0XHQqL1xuXG5cdH0sXG5cblx0X19OQU1FU1BBQ0VfXygpIHtcblxuXHRcdHJldHVybiB3aW5kb3cuX19OQU1FU1BBQ0VfXztcblxuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdFZpZXc7XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4vQWJzdHJhY3RWaWV3JztcblxuY29uc3QgQWJzdHJhY3RWaWV3UGFnZSA9IEFic3RyYWN0Vmlldy5leHRlbmQoe1xuXG5cdF9zaG93biAgICAgOiBmYWxzZSxcblx0X2xpc3RlbmluZyA6IGZhbHNlLFxuXG5cdHNob3c6IGZ1bmN0aW9uKGNiKSB7XG5cblx0XHRpZiAodGhpcy5fc2hvd24pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fc2hvd24gPSB0cnVlO1xuXG5cdFx0Lypcblx0XHRDSEFOR0UgSEVSRSAtICdwYWdlJyB2aWV3cyBhcmUgYWx3YXlzIGluIERPTSAtIHRvIHNhdmUgaGF2aW5nIHRvIHJlLWluaXRpYWxpc2UgZ21hcCBldmVudHMgKFBJVEEpLiBObyBsb25nZXIgcmVxdWlyZSA6ZGlzcG9zZSBtZXRob2Rcblx0XHQqL1xuXHRcdHRoaXMuX19OQU1FU1BBQ0VfXygpLmFwcFZpZXcud3JhcHBlci5hZGRDaGlsZCh0aGlzKTtcblx0XHR0aGlzLmNhbGxDaGlsZHJlbkFuZFNlbGYoJ3NldExpc3RlbmVycycsICdvbicpO1xuXG5cdFx0Ly8gcmVwbGFjZSB3aXRoIHNvbWUgcHJvcGVyIHRyYW5zaXRpb24gaWYgd2UgY2FuXG5cdFx0dGhpcy4kZWwuY3NzKHsgJ3Zpc2liaWxpdHknIDogJ3Zpc2libGUnIH0pO1xuXHRcdFxuXHRcdGlmIChjYiAmJiB0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNiKCk7XG5cdFx0fVxuXG5cdH0sXG5cblx0aGlkZTogZnVuY3Rpb24oY2IpIHtcblxuXHRcdGlmICghdGhpcy5fc2hvd24pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fc2hvd24gPSBmYWxzZTtcblxuXHRcdC8qXG5cdFx0Q0hBTkdFIEhFUkUgLSAncGFnZScgdmlld3MgYXJlIGFsd2F5cyBpbiBET00gLSB0byBzYXZlIGhhdmluZyB0byByZS1pbml0aWFsaXNlIGdtYXAgZXZlbnRzIChQSVRBKS4gTm8gbG9uZ2VyIHJlcXVpcmUgOmRpc3Bvc2UgbWV0aG9kXG5cdFx0Ki9cblx0XHR0aGlzLl9fTkFNRVNQQUNFX18oKS5hcHBWaWV3LndyYXBwZXIucmVtb3ZlKHRoaXMpO1xuXG5cdFx0Ly8gdGhpcy5jYWxsQ2hpbGRyZW5BbmRTZWxmICdzZXRMaXN0ZW5lcnMnLCAnb2ZmJ1xuXG5cdFx0Ly8gcmVwbGFjZSB3aXRoIHNvbWUgcHJvcGVyIHRyYW5zaXRpb24gaWYgd2UgY2FuXG5cdFx0dGhpcy4kZWwuY3NzKHsgJ3Zpc2liaWxpdHknIDogJ2hpZGRlbicgfSk7XG5cdFx0XG5cdFx0aWYgKGNiICYmIHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y2IoKTtcblx0XHR9XG5cblx0fSxcblxuXHRkaXNwb3NlOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMuY2FsbENoaWxkcmVuQW5kU2VsZignc2V0TGlzdGVuZXJzJywgJ29mZicpO1xuXG5cdH0sXG5cblx0c2V0TGlzdGVuZXJzOiBmdW5jdGlvbihzZXR0aW5nKSB7XG5cblx0XHRpZiAoc2V0dGluZyA9PT0gdGhpcy5fbGlzdGVuaW5nKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5fbGlzdGVuaW5nID0gc2V0dGluZztcblxuXHR9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEFic3RyYWN0Vmlld1BhZ2U7XG4iLCJpbXBvcnQgQWJzdHJhY3RWaWV3IGZyb20gJy4uL0Fic3RyYWN0Vmlldyc7XG5cbmNvbnN0IEZvb3RlciA9IEFic3RyYWN0Vmlldy5leHRlbmQoe1xuXG5cdHRlbXBsYXRlIDogJ3NpdGUtZm9vdGVyJyxcblxuXHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLnRlbXBsYXRlVmFycyA9IHtcbiAgICAgICAgXHRkZXNjIDogdGhpcy5fX05BTUVTUEFDRV9fKCkubG9jYWxlLmdldChcImZvb3Rlcl9kZXNjXCIpXG5cdFx0fTtcblxuICAgICAgICBGb290ZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMpO1xuXG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEZvb3RlcjtcbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi4vQWJzdHJhY3RWaWV3JztcblxuY29uc3QgSGVhZGVyID0gQWJzdHJhY3RWaWV3LmV4dGVuZCh7XG5cblx0dGVtcGxhdGUgOiAnc2l0ZS1oZWFkZXInLFxuXHRcblx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy50ZW1wbGF0ZVZhcnMgPSB7XG5cdFx0XHRkZXNjICAgIDogdGhpcy5fX05BTUVTUEFDRV9fKCkubG9jYWxlLmdldChcImhlYWRlcl9kZXNjXCIpLFxuXHRcdFx0aG9tZSAgICA6IHtcblx0XHRcdFx0bGFiZWwgICAgOiAnR28gdG8gaG9tZXBhZ2UnLFxuXHRcdFx0XHR1cmwgICAgICA6IHRoaXMuX19OQU1FU1BBQ0VfXygpLkJBU0VfUEFUSCArICcvJyArIHRoaXMuX19OQU1FU1BBQ0VfXygpLm5hdi5zZWN0aW9ucy5IT01FXG5cdFx0XHR9LFxuXHRcdFx0ZXhhbXBsZSA6IHtcblx0XHRcdFx0bGFiZWwgICAgOiAnR28gdG8gZXhhbXBsZSBwYWdlJyxcblx0XHRcdFx0dXJsICAgICAgOiB0aGlzLl9fTkFNRVNQQUNFX18oKS5CQVNFX1BBVEggKyAnLycgKyB0aGlzLl9fTkFNRVNQQUNFX18oKS5uYXYuc2VjdGlvbnMuRVhBTVBMRVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRIZWFkZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMpO1xuXG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi4vQWJzdHJhY3RWaWV3JztcblxuY29uc3QgUHJlbG9hZGVyID0gQWJzdHJhY3RWaWV3LmV4dGVuZCh7XG5cblx0Y2IgOiBudWxsLFxuXHRcblx0VFJBTlNJVElPTl9USU1FIDogMC41LFxuXG5cdGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcblxuXHRcdFByZWxvYWRlci5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyk7XG5cblx0XHR0aGlzLnNldEVsZW1lbnQoJCgnI3ByZWxvYWRlcicpKTtcblxuXHR9LFxuXG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xuXG5cdH0sXG5cblx0c2hvdzogZnVuY3Rpb24oY2IpIHtcblxuXHRcdHRoaXMuY2IgPSBjYjtcblxuXHRcdHRoaXMuJGVsLmNzcyh7J2Rpc3BsYXknIDogJ2Jsb2NrJ30pO1xuXG5cdH0sXG5cblx0b25TaG93Q29tcGxldGU6IGZ1bmN0aW9uKCkge1xuXG5cdFx0aWYgKHRoaXMuY2IgJiYgdHlwZW9mKHRoaXMuY2IpID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aGlzLmNiKCk7XG5cdFx0fVxuXG5cdH0sXG5cblx0aGlkZTogZnVuY3Rpb24oY2IpIHtcblxuXHRcdHRoaXMuY2IgPSBjYjtcblxuXHRcdHRoaXMub25IaWRlQ29tcGxldGUoKTtcblxuXHR9LFxuXG5cdG9uSGlkZUNvbXBsZXRlOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMuJGVsLmNzcyh7J2Rpc3BsYXknIDogJ25vbmUnfSk7XG5cdFx0XG5cdFx0aWYgKHRoaXMuY2IgJiYgdHlwZW9mKHRoaXMuY2IpID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHR0aGlzLmNiKCk7XG5cdFx0fVxuXG5cdH1cblxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IFByZWxvYWRlcjtcbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi4vQWJzdHJhY3RWaWV3JztcbmltcG9ydCBIb21lVmlldyBmcm9tICcuLi9ob21lL0hvbWVWaWV3JztcbmltcG9ydCBFeGFtcGxlUGFnZVZpZXcgZnJvbSAnLi4vZXhhbXBsZVBhZ2UvRXhhbXBsZVBhZ2VWaWV3JztcbmltcG9ydCBOYXYgZnJvbSAnLi4vLi4vcm91dGVyL05hdic7XG5cbmNvbnN0IFdyYXBwZXIgPSBBYnN0cmFjdFZpZXcuZXh0ZW5kKHtcblxuXHRWSUVXX1RZUEVfUEFHRSAgOiAncGFnZScsXG5cdFZJRVdfVFlQRV9NT0RBTCA6ICdtb2RhbCcsXG5cblx0dGVtcGxhdGUgOiAnd3JhcHBlcicsXG5cblx0dmlld3MgICAgICAgICAgOiBudWxsLFxuXHRwcmV2aW91c1ZpZXcgICA6IG51bGwsXG5cdGN1cnJlbnRWaWV3ICAgIDogbnVsbCxcblx0YmFja2dyb3VuZFZpZXcgOiBudWxsLFxuXG5cdGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMudmlld3MgPSB7XG5cdFx0XHRob21lIDoge1xuXHRcdFx0XHRjbGFzc1JlZiA6IEhvbWVWaWV3LFxuXHRcdFx0XHRyb3V0ZSAgICA6IHRoaXMuX19OQU1FU1BBQ0VfXygpLm5hdi5zZWN0aW9ucy5IT01FLFxuXHRcdFx0XHR2aWV3ICAgICA6IG51bGwsXG5cdFx0XHRcdHR5cGUgICAgIDogdGhpcy5WSUVXX1RZUEVfUEFHRVxuXHRcdFx0fSxcblx0XHRcdGV4YW1wbGUgOiB7XG5cdFx0XHRcdGNsYXNzUmVmIDogRXhhbXBsZVBhZ2VWaWV3LFxuXHRcdFx0XHRyb3V0ZSAgICA6IHRoaXMuX19OQU1FU1BBQ0VfXygpLm5hdi5zZWN0aW9ucy5FWEFNUExFLFxuXHRcdFx0XHR2aWV3ICAgICA6IG51bGwsXG5cdFx0XHRcdHR5cGUgICAgIDogdGhpcy5WSUVXX1RZUEVfUEFHRVxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLmNyZWF0ZUNsYXNzZXMoKTtcblxuXHRcdFdyYXBwZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMpO1xuXG5cdFx0Ly8gZGVjaWRlIGlmIHlvdSB3YW50IHRvIGFkZCBhbGwgY29yZSBET00gdXAgZnJvbnQsIG9yIGFkZCBvbmx5IHdoZW4gcmVxdWlyZWQsIHNlZSBjb21tZW50cyBpbiBBYnN0cmFjdFZpZXdQYWdlLmNvZmZlZVxuXHRcdC8vIEBhZGRDbGFzc2VzKClcblxuXHR9LFxuXG5cdGNyZWF0ZUNsYXNzZXM6IGZ1bmN0aW9uKCkge1xuXG5cdFx0Zm9yIChsZXQga2V5IGluIHRoaXMudmlld3MpIHtcblxuXHRcdFx0dGhpcy52aWV3c1trZXldLnZpZXcgPSBuZXcgdGhpcy52aWV3c1trZXldLmNsYXNzUmVmO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0YWRkQ2xhc3NlczogZnVuY3Rpb24oKSB7XG5cblx0XHRmb3IgKGxldCBrZXkgaW4gdGhpcy52aWV3cykge1xuXG5cdFx0XHRpZiAodGhpcy52aWV3c1trZXldLnR5cGUgPT09IHRoaXMuVklFV19UWVBFX1BBR0UpIHtcblx0XHRcdFx0dGhpcy5hZGRDaGlsZCh0aGlzLnZpZXdzW2tleV0udmlldyk7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fSxcblxuXHRnZXRWaWV3QnlSb3V0ZTogZnVuY3Rpb24ocm91dGUpIHtcblxuXHRcdGxldCB2aWV3ID0gZmFsc2U7XG5cblx0XHRmb3IgKGxldCBrZXkgaW4gdGhpcy52aWV3cykge1xuXG5cdFx0XHRpZiAodGhpcy52aWV3c1trZXldLnJvdXRlID09PSByb3V0ZSkge1xuXHRcdFx0XHR2aWV3ID0gdGhpcy52aWV3c1trZXldO1xuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZpZXc7XG5cblx0fSxcblxuXHRpbml0OiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMuX19OQU1FU1BBQ0VfXygpLmFwcFZpZXcub24oJ3N0YXJ0JywgdGhpcy5zdGFydC5iaW5kKHRoaXMpKTtcblxuXHR9LFxuXG5cdHN0YXJ0OiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMuX19OQU1FU1BBQ0VfXygpLmFwcFZpZXcub2ZmKCdzdGFydCcsIHRoaXMuc3RhcnQuYmluZCh0aGlzKSk7XG5cblx0XHR0aGlzLmJpbmRFdmVudHMoKTtcblxuXHR9LFxuXG5cdGJpbmRFdmVudHM6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy5fX05BTUVTUEFDRV9fKCkubmF2Lm9uKE5hdi5FVkVOVF9DSEFOR0VfVklFVywgdGhpcy5jaGFuZ2VWaWV3LmJpbmQodGhpcykpO1xuXHRcdHRoaXMuX19OQU1FU1BBQ0VfXygpLm5hdi5vbihOYXYuRVZFTlRfQ0hBTkdFX1NVQl9WSUVXLCB0aGlzLmNoYW5nZVN1YlZpZXcuYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHQvKlxuXG5cdFRISVMgSVMgQSBNRVNTLCBTT1JUIElUIChuZWlsKVxuXG5cdCovXG5cdGNoYW5nZVZpZXc6IGZ1bmN0aW9uKHByZXZpb3VzLCBjdXJyZW50KSB7XG5cblx0XHRjb25zb2xlLmxvZyhcImNoYW5nZVZpZXc6IGZ1bmN0aW9uKHByZXZpb3VzLCBjdXJyZW50KSB7XCIsIHByZXZpb3VzLCBjdXJyZW50KTtcblxuXHRcdHRoaXMucHJldmlvdXNWaWV3ID0gdGhpcy5nZXRWaWV3QnlSb3V0ZShwcmV2aW91cy5hcmVhKTtcblx0XHR0aGlzLmN1cnJlbnRWaWV3ICA9IHRoaXMuZ2V0Vmlld0J5Um91dGUoY3VycmVudC5hcmVhKTtcblxuXHRcdGNvbnNvbGUubG9nKFwidGhpcy5wcmV2aW91c1ZpZXdcIiwgdGhpcy5wcmV2aW91c1ZpZXcpO1xuXHRcdGNvbnNvbGUubG9nKFwidGhpcy5jdXJyZW50Vmlld1wiLCB0aGlzLmN1cnJlbnRWaWV3KTtcblxuXHRcdGlmICghdGhpcy5wcmV2aW91c1ZpZXcpIHtcblxuXHRcdFx0aWYgKHRoaXMuY3VycmVudFZpZXcudHlwZSA9PT0gdGhpcy5WSUVXX1RZUEVfUEFHRSkge1xuXHRcdFx0XHR0aGlzLnRyYW5zaXRpb25WaWV3cyhmYWxzZSwgdGhpcy5jdXJyZW50Vmlldy52aWV3KTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5jdXJyZW50Vmlldy50eXBlID09PSB0aGlzLlZJRVdfVFlQRV9NT0RBTCkge1xuXHRcdFx0XHR0aGlzLmJhY2tncm91bmRWaWV3ID0gdGhpcy52aWV3cy5ob21lO1xuXHRcdFx0XHR0aGlzLnRyYW5zaXRpb25WaWV3cyhmYWxzZSwgdGhpcy5jdXJyZW50Vmlldy52aWV3LCB0cnVlKTtcblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmICh0aGlzLmN1cnJlbnRWaWV3LnR5cGUgPT09IHRoaXMuVklFV19UWVBFX1BBR0UgJiYgdGhpcy5wcmV2aW91c1ZpZXcudHlwZSA9PT0gdGhpcy5WSUVXX1RZUEVfUEFHRSkge1xuXHRcdFx0XHR0aGlzLnRyYW5zaXRpb25WaWV3cyh0aGlzLnByZXZpb3VzVmlldy52aWV3LCB0aGlzLmN1cnJlbnRWaWV3LnZpZXcpO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLmN1cnJlbnRWaWV3LnR5cGUgPT09IHRoaXMuVklFV19UWVBFX01PREFMICYmIHRoaXMucHJldmlvdXNWaWV3LnR5cGUgPT09IHRoaXMuVklFV19UWVBFX1BBR0UpIHtcblx0XHRcdFx0dGhpcy5iYWNrZ3JvdW5kVmlldyA9IHRoaXMucHJldmlvdXNWaWV3O1xuXHRcdFx0XHR0aGlzLnRyYW5zaXRpb25WaWV3cyhmYWxzZSwgdGhpcy5jdXJyZW50Vmlldy52aWV3LCB0cnVlKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5jdXJyZW50Vmlldy50eXBlID09PSB0aGlzLlZJRVdfVFlQRV9QQUdFICYmIHRoaXMucHJldmlvdXNWaWV3LnR5cGUgPT09IHRoaXMuVklFV19UWVBFX01PREFMKSB7XG5cdFx0XHRcdHRoaXMuYmFja2dyb3VuZFZpZXcgPSB0aGlzLmJhY2tncm91bmRWaWV3IHx8IHRoaXMudmlld3MuaG9tZTtcblx0XHRcdFx0aWYgKHRoaXMuYmFja2dyb3VuZFZpZXcgIT09IHRoaXMuY3VycmVudFZpZXcpIHtcblx0XHRcdFx0XHR0aGlzLnRyYW5zaXRpb25WaWV3cyh0aGlzLnByZXZpb3VzVmlldy52aWV3LCB0aGlzLmN1cnJlbnRWaWV3LnZpZXcsIGZhbHNlLCB0cnVlKTtcblx0XHRcdFx0fSBlbHNlIGlmICh0aGlzLmJhY2tncm91bmRWaWV3ID09PSB0aGlzLmN1cnJlbnRWaWV3KSB7XG5cdFx0XHRcdFx0dGhpcy50cmFuc2l0aW9uVmlld3ModGhpcy5wcmV2aW91c1ZpZXcudmlldywgZmFsc2UpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuY3VycmVudFZpZXcudHlwZSA9PT0gdGhpcy5WSUVXX1RZUEVfTU9EQUwgJiYgdGhpcy5wcmV2aW91c1ZpZXcudHlwZSA9PT0gdGhpcy5WSUVXX1RZUEVfTU9EQUwpIHtcblx0XHRcdFx0dGhpcy5iYWNrZ3JvdW5kVmlldyA9IHRoaXMuYmFja2dyb3VuZFZpZXcgfHwgdGhpcy52aWV3cy5ob21lO1xuXHRcdFx0XHR0aGlzLnRyYW5zaXRpb25WaWV3cyh0aGlzLnByZXZpb3VzVmlldy52aWV3LCB0aGlzLmN1cnJlbnRWaWV3LnZpZXcsIHRydWUpO1xuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH0sXG5cblx0Y2hhbmdlU3ViVmlldzogZnVuY3Rpb24oY3VycmVudCkge1xuXG5cdFx0dGhpcy5jdXJyZW50Vmlldy52aWV3LnRyaWdnZXIoTmF2LkVWRU5UX0NIQU5HRV9TVUJfVklFVywgY3VycmVudC5zdWIpO1xuXG5cdH0sXG5cblx0dHJhbnNpdGlvblZpZXdzOiBmdW5jdGlvbihmcm9tLCB0bywgdG9Nb2RhbD1mYWxzZSwgZnJvbU1vZGFsPWZhbHNlKSB7XG5cblx0XHRjb25zb2xlLmxvZyhcInRyYW5zaXRpb25WaWV3czogZnVuY3Rpb24oZnJvbSwgdG8sIHRvTW9kYWw9ZmFsc2UsIGZyb21Nb2RhbD1mYWxzZSkge1wiLCBmcm9tLCB0byk7XG5cblx0XHRpZiAoZnJvbSA9PT0gdG8pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodG9Nb2RhbCAmJiB0aGlzLmJhY2tncm91bmRWaWV3LnZpZXcpIHtcblx0XHRcdHRoaXMuYmFja2dyb3VuZFZpZXcudmlldy5zaG93KCk7XG5cdFx0fVxuXG5cdFx0aWYgKGZyb21Nb2RhbCAmJiB0aGlzLmJhY2tncm91bmRWaWV3LnZpZXcpIHtcblx0XHRcdHRoaXMuYmFja2dyb3VuZFZpZXcudmlldy5oaWRlKCk7XG5cdFx0fVxuXG5cdFx0aWYgKGZyb20gJiYgdG8pIHtcblx0XHRcdGZyb20uaGlkZSh0by5zaG93LmJpbmQodG8pKTtcblx0XHR9IGVsc2UgaWYgKGZyb20pIHtcblx0XHRcdGZyb20uaGlkZSgpO1xuXHRcdH0gZWxzZSBpZiAodG8pIHtcblx0XHRcdHRvLnNob3coKTtcblx0XHR9XG5cblx0fVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgV3JhcHBlcjtcbiIsImltcG9ydCBBYnN0cmFjdFZpZXdQYWdlIGZyb20gJy4uL0Fic3RyYWN0Vmlld1BhZ2UnO1xuXG5jb25zdCBFeGFtcGxlUGFnZVZpZXcgPSBBYnN0cmFjdFZpZXdQYWdlLmV4dGVuZCh7XG5cblx0dGVtcGxhdGUgOiAncGFnZS1leGFtcGxlJyxcblxuXHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLnRlbXBsYXRlVmFycyA9IHtcblx0XHRcdGRlc2MgOiB0aGlzLl9fTkFNRVNQQUNFX18oKS5sb2NhbGUuZ2V0KFwiZXhhbXBsZV9kZXNjXCIpXG5cdFx0fTtcblxuXHRcdC8qXG5cblx0XHRpbnN0YW50aWF0ZSBjbGFzc2VzIGhlcmVcblxuXHRcdHRoaXMuZXhhbXBsZUNsYXNzID0gbmV3IEV4YW1wbGVDbGFzcygpO1xuXG5cdFx0Ki9cblxuXHRcdEV4YW1wbGVQYWdlVmlldy5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyk7XG5cblx0XHQvKlxuXG5cdFx0YWRkIGNsYXNzZXMgdG8gYXBwIHN0cnVjdHVyZSBoZXJlXG5cblx0XHR0aGlzXG5cdFx0XHQuYWRkQ2hpbGQodGhpcy5leGFtcGxlQ2xhc3MpO1xuXG5cdFx0Ki9cblxuXHR9XG5cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IEV4YW1wbGVQYWdlVmlldztcbiIsImltcG9ydCBBYnN0cmFjdFZpZXdQYWdlIGZyb20gJy4uL0Fic3RyYWN0Vmlld1BhZ2UnO1xuXG5jb25zdCBIb21lVmlldyA9IEFic3RyYWN0Vmlld1BhZ2UuZXh0ZW5kKHtcblxuXHR0ZW1wbGF0ZSA6ICdwYWdlLWhvbWUnLFxuXG5cdGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcblxuXHRcdHRoaXMudGVtcGxhdGVWYXJzID0ge1xuXHRcdFx0ZGVzYyA6IHRoaXMuX19OQU1FU1BBQ0VfXygpLmxvY2FsZS5nZXQoXCJob21lX2Rlc2NcIilcblx0XHR9O1xuXG5cdFx0LypcblxuXHRcdGluc3RhbnRpYXRlIGNsYXNzZXMgaGVyZVxuXG5cdFx0dGhpcy5leGFtcGxlQ2xhc3MgPSBuZXcgRXhhbXBsZUNsYXNzKCk7XG5cblx0XHQqL1xuXG5cdFx0SG9tZVZpZXcuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmFwcGx5KHRoaXMpO1xuXG5cdFx0LypcblxuXHRcdGFkZCBjbGFzc2VzIHRvIGFwcCBzdHJ1Y3R1cmUgaGVyZVxuXG5cdFx0dGhpc1xuXHRcdFx0LmFkZENoaWxkKHRoaXMuZXhhbXBsZUNsYXNzKTtcblxuXHRcdCovXG5cblx0fVxuXG59KVxuXG5leHBvcnQgZGVmYXVsdCBIb21lVmlldztcbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi4vQWJzdHJhY3RWaWV3JztcblxuY29uc3QgQWJzdHJhY3RNb2RhbCA9IEFic3RyYWN0Vmlldy5leHRlbmQoe1xuXG5cdCR3aW5kb3cgOiBudWxsLFxuXG5cdC8vIG92ZXJyaWRlIGluIGluZGl2aWR1YWwgY2xhc3Nlc1xuXHRuYW1lICAgICA6IG51bGwsXG5cdHRlbXBsYXRlIDogbnVsbCxcblxuXHRjb25zdHJ1Y3RvcjogZnVuY3Rpb24oKSB7XG5cblx0XHR0aGlzLiR3aW5kb3cgPSAkKHdpbmRvdyk7XG5cblx0XHRBYnN0cmFjdE1vZGFsLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzKTtcblxuXHRcdHRoaXMuX19OQU1FU1BBQ0VfXygpLmFwcFZpZXcuYWRkQ2hpbGQodGhpcyk7XG5cdFx0dGhpcy5zZXRMaXN0ZW5lcnMoJ29uJyk7XG5cdFx0dGhpcy5hbmltYXRlSW4oKTtcblxuXHR9LFxuXG5cdGhpZGU6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy5hbmltYXRlT3V0KCAoKSA9PiB7XG5cdFx0XHR0aGlzLl9fTkFNRVNQQUNFX18oKS5hcHBWaWV3LnJlbW92ZSh0aGlzKTtcblx0XHR9KTtcblxuXHR9LFxuXG5cdGRpc3Bvc2U6IGZ1bmN0aW9uKCkge1xuXG5cdFx0dGhpcy5zZXRMaXN0ZW5lcnMoJ29mZicpO1xuXHRcdHRoaXMuX19OQU1FU1BBQ0VfXygpLmFwcFZpZXcubW9kYWxNYW5hZ2VyLm1vZGFsc1t0aGlzLm5hbWVdLnZpZXcgPSBudWxsO1xuXG5cdH0sXG5cblx0c2V0TGlzdGVuZXJzOiBmdW5jdGlvbihzZXR0aW5nKSB7XG5cblx0XHR0aGlzLiR3aW5kb3dbc2V0dGluZ10oJ2tleXVwJywgdGhpcy5vbktleVVwLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuJCgnW2RhdGEtY2xvc2VdJylbc2V0dGluZ10oJ2NsaWNrJywgdGhpcy5jbG9zZUNsaWNrLmJpbmQodGhpcykpO1xuXG5cdH0sXG5cblx0b25LZXlVcDogZnVuY3Rpb24oZSkge1xuXG5cdFx0aWYgKGUua2V5Q29kZSA9PT0gMjcpXG5cdFx0XHR0aGlzLmhpZGUoKTtcblxuXHR9LFxuXG5cdGFuaW1hdGVJbjogZnVuY3Rpb24oKSB7XG5cblx0XHRUd2VlbkxpdGUudG8odGhpcy4kZWwsIDAuMywgeyAndmlzaWJpbGl0eSc6ICd2aXNpYmxlJywgJ29wYWNpdHknOiAxLCBlYXNlIDogUXVhZC5lYXNlT3V0IH0pO1xuXHRcdFR3ZWVuTGl0ZS50byh0aGlzLiRlbC5maW5kKCcuaW5uZXInKSwgMC4zLCB7IGRlbGF5IDogMC4xNSwgJ3RyYW5zZm9ybSc6ICdzY2FsZSgxKScsICd2aXNpYmlsaXR5JzogJ3Zpc2libGUnLCAnb3BhY2l0eSc6IDEsIGVhc2UgOiBCYWNrLmVhc2VPdXQgfSk7XG5cblx0fSxcblxuXHRhbmltYXRlT3V0OiBmdW5jdGlvbihjYWxsYmFjaykge1xuXG5cdFx0VHdlZW5MaXRlLnRvKHRoaXMuJGVsLCAwLjMsIHsgZGVsYXkgOiAwLjE1LCAnb3BhY2l0eSc6IDAsIGVhc2UgOiBRdWFkLmVhc2VPdXQsIG9uQ29tcGxldGU6IGNhbGxiYWNrIH0pO1xuXHRcdFR3ZWVuTGl0ZS50byh0aGlzLiRlbC5maW5kKCcuaW5uZXInKSwgMC4zLCB7ICd0cmFuc2Zvcm0nOiAnc2NhbGUoMC44KScsICdvcGFjaXR5JzogMCwgZWFzZSA6IEJhY2suZWFzZUluIH0pO1xuXG5cdH0sXG5cblx0Y2xvc2VDbGljazogZnVuY3Rpb24oZSkge1xuXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0dGhpcy5oaWRlKCk7XG5cblx0fVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgQWJzdHJhY3RNb2RhbDtcbiIsImltcG9ydCBBYnN0cmFjdE1vZGFsIGZyb20gJy4vQWJzdHJhY3RNb2RhbCc7XG5cbmNvbnN0IE9yaWVudGF0aW9uTW9kYWwgPSBBYnN0cmFjdE1vZGFsLmV4dGVuZCh7XG5cblx0bmFtZSAgICAgOiAnb3JpZW50YXRpb25Nb2RhbCcsXG5cdHRlbXBsYXRlIDogJ29yaWVudGF0aW9uLW1vZGFsJyxcblxuXHRjYiA6IG51bGwsXG5cblx0Y29uc3RydWN0b3I6IGZ1bmN0aW9uKGNiKSB7XG5cblx0XHR0aGlzLmNiID0gY2I7XG5cblx0XHR0aGlzLnRlbXBsYXRlVmFycyA9IHsgbmFtZTogdGhpcy5uYW1lIH07XG5cblx0XHRPcmllbnRhdGlvbk1vZGFsLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzKTtcblxuXHR9LFxuXG5cdGluaXQ6IGZ1bmN0aW9uKCkge1xuXG5cdH0sXG5cblx0aGlkZTogZnVuY3Rpb24oc3RpbGxMYW5kc2NhcGU9dHJ1ZSkge1xuXG5cdFx0dGhpcy5hbmltYXRlT3V0KCAoKSA9PiB7XG5cdFx0XHR0aGlzLl9fTkFNRVNQQUNFX18oKS5hcHBWaWV3LnJlbW92ZSh0aGlzKTtcblx0XHRcdGlmICghc3RpbGxMYW5kc2NhcGUgJiYgY2IgJiYgdHlwZW9mIGNiID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdGNiKCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0fSxcblxuXHRzZXRMaXN0ZW5lcnM6IGZ1bmN0aW9uKHNldHRpbmcpIHtcblxuXHRcdE9yaWVudGF0aW9uTW9kYWwuX19zdXBlcl9fLnNldExpc3RlbmVycy5hcHBseSh0aGlzLCBbc2V0dGluZ10pO1xuXG5cdFx0dGhpcy5fX05BTUVTUEFDRV9fKCkuYXBwVmlld1tzZXR0aW5nXSgndXBkYXRlRGltcycsIHRoaXMub25VcGRhdGVEaW1zLmJpbmQodGhpcykpO1xuXHRcdHRoaXMuJGVsW3NldHRpbmddKCd0b3VjaGVuZCBjbGljaycsIHRoaXMuaGlkZS5iaW5kKHRoaXMpKTtcblxuXHR9LFxuXG5cdG9uVXBkYXRlRGltczogZnVuY3Rpb24oZGltcykge1xuXG5cdFx0aWYgKGRpbXMubyA9PT0gJ3BvcnRyYWl0Jykge1xuXHRcdFx0dGhpcy5oaWRlKGZhbHNlKTtcblx0XHR9XG5cblx0fVxuXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgT3JpZW50YXRpb25Nb2RhbDtcbiIsImltcG9ydCBBYnN0cmFjdFZpZXcgZnJvbSAnLi4vQWJzdHJhY3RWaWV3JztcbmltcG9ydCBPcmllbnRhdGlvbk1vZGFsIGZyb20gJy4vT3JpZW50YXRpb25Nb2RhbCc7XG5cbmNvbnN0IE1vZGFsTWFuYWdlciA9IEFic3RyYWN0Vmlldy5leHRlbmQoe1xuXG5cdC8vIHdoZW4gbmV3IG1vZGFsIGNsYXNzZXMgYXJlIGNyZWF0ZWQsIGFkZCBoZXJlLCB3aXRoIHJlZmVyZW5jZSB0byBjbGFzcyBuYW1lXG5cdG1vZGFsczoge1xuXHRcdG9yaWVudGF0aW9uTW9kYWwgOiB7IGNsYXNzUmVmIDogT3JpZW50YXRpb25Nb2RhbCwgdmlldyA6IG51bGwgfVxuXHR9LFxuXG5cdGNvbnN0cnVjdG9yOiBmdW5jdGlvbigpIHtcblxuXHRcdE1vZGFsTWFuYWdlci5fX3N1cGVyX18uY29uc3RydWN0b3IuYXBwbHkodGhpcyk7XG5cblx0fSxcblxuXHRpbml0OiBmdW5jdGlvbigpIHtcblxuXHR9LFxuXG5cdGlzT3BlbjogZnVuY3Rpb24oKSB7XG5cblx0XHRsZXQgbW9kYWxJc09wZW4gPSBmYWxzZTtcblxuXHRcdGZvciAobGV0IGtleSBpbiB0aGlzLm1vZGFscykge1xuXG5cdFx0XHRpZiAodGhpcy5tb2RhbHNba2V5XS52aWV3KSB7XG5cdFx0XHRcdG1vZGFsSXNPcGVuID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiBtb2RhbElzT3BlbjtcblxuXHR9LFxuXG5cdGhpZGVPcGVuTW9kYWw6IGZ1bmN0aW9uKCkge1xuXG5cdFx0bGV0IG9wZW5Nb2RhbCA9IG51bGw7XG5cblx0XHRmb3IgKGxldCBrZXkgaW4gdGhpcy5tb2RhbHMpIHtcblxuXHRcdFx0aWYgKHRoaXMubW9kYWxzW2tleV0udmlldykge1xuXHRcdFx0XHRvcGVuTW9kYWwgPSB0aGlzLm1vZGFsc1trZXldLnZpZXc7XG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRpZiAob3Blbk1vZGFsKSB7XG5cdFx0XHRvcGVuTW9kYWwuaGlkZSgpO1xuXHRcdH1cblxuXHR9LFxuXG5cdHNob3dNb2RhbDogZnVuY3Rpb24obmFtZSwgY2I9bnVsbCkge1xuXG5cdFx0aWYgKHRoaXMubW9kYWxzW25hbWVdLnZpZXcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLm1vZGFsc1tuYW1lXS52aWV3ID0gbmV3IHRoaXMubW9kYWxzW25hbWVdLmNsYXNzUmVmKGNiKTtcblxuXHR9XG5cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBNb2RhbE1hbmFnZXI7XG4iXX0=
