import AbstractView from './view/AbstractView';
import Preloader from './view/base/Preloader';
import Header from './view/base/Header';
import Wrapper from './view/base/Wrapper';
import Footer from './view/base/Footer';
import ModalManager from './view/modals/_ModalManager';
import MediaQueries from './utils/MediaQueries';

const AppView = AbstractView.extend({

    template : 'main',

    $window  : null,
    $body    : null,

    wrapper  : null,
    footer   : null,

    dims : {
        w : null,
        h : null,
        o : null,
        c : null
    },

    events : {
        'click a' : 'linkManager'
    },

    EVENT_UPDATE_DIMENSIONS : 'EVENT_UPDATE_DIMENSIONS',

    MOBILE_WIDTH : 700,
    MOBILE       : 'mobile',
    NON_MOBILE   : 'non_mobile',

    constructor: function() {

        AppView.__super__.constructor.apply(this);

        this.$window = $(window);
        this.$body   = $('body').eq(0);

    },

    disableTouch: function() {

        this.$window.on('touchmove', this.onTouchMove.bind(this));
        
    },

    enableTouch: function() {

        this.$window.off('touchmove', this.onTouchMove.bind(this));
        
    },

    onTouchMove: function( e ) {

        e.preventDefault();
        
    },

    render: function() {

        this.bindEvents();

        this.preloader    = new Preloader();
        this.modalManager = new ModalManager();

        this.header  = new Header();
        this.wrapper = new Wrapper();
        this.footer  = new Footer();

        this
            .addChild(this.header)
            .addChild(this.wrapper)
            .addChild(this.footer);

        this.onAllRendered();

    },

    bindEvents: function() {

        this.onResize();

        this.onResize = _.debounce(this.onResize.bind(this), 300);
        this.$window.on('resize orientationchange', this.onResize.bind(this));

    },

    onAllRendered: function() {

        console.log("onAllRendered : =>");

        this.$body.prepend(this.$el);

        this.begin();
    },

    begin: function() {

        this.trigger('start');

        this.__NAMESPACE__().router.start();

        this.preloader.hide();
        this.updateMediaQueriesLog();

    },

    onResize: function() {

        this.getDims();
        this.updateMediaQueriesLog();

    },

    updateMediaQueriesLog: function() {

        if (this.header) {
            this.header.$el
                .find(".breakpoint")
                    .html(`<div class='l'>CURRENT BREAKPOINT:</div><div class='b'>${MediaQueries.getBreakpoint()}</div>`);
        }

    },

    getDims: function() {

        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        this.dims = {
            w : w,
            h : h,
            o : h > w ? 'portrait' : 'landscape',
            c : w <= this.MOBILE_WIDTH ? this.MOBILE : this.NON_MOBILE
        };

        this.trigger(this.EVENT_UPDATE_DIMENSIONS, this.dims);

    },

    linkManager: function(e) {

        const href = $(e.currentTarget).attr('href');

        if (!href) {
            return false;
        }

        this.navigateToUrl(href, e);

    },

    navigateToUrl: function( href, e = null ) {

        const route   = href.match(this.__NAMESPACE__().BASE_PATH) ? href.split(this.__NAMESPACE__().BASE_PATH)[1] : href;
        const section = route.indexOf('/') === 0 ? route.split('/')[1] : route;

        if (this.__NAMESPACE__().nav.getSection(section)) {
            e.preventDefault();
            this.__NAMESPACE__().router.navigateTo(route);
        } else {
            this.handleExternalLink(href);
        }

    },

    handleExternalLink: function(data) {

        /*

        bind tracking events if necessary

        */

    }

});

export default AppView;
