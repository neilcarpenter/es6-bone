import AbstractView from './view/AbstractView';
// Preloader    = require './view/base/Preloader'
// Header       = require './view/base/Header'
// Wrapper      = require './view/base/Wrapper'
// Footer       = require './view/base/Footer'
// ModalManager = require './view/modals/_ModalManager'
// MediaQueries = require './utils/MediaQueries'

const classProps = {
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
    NON_MOBILE   : 'non_mobile'
};

class AppView extends AbstractView {

    constructor(props={}) {

        super(_.defaults(props, classProps));

        this.$window = $(window);
        this.$body   = $('body').eq(0);

    }

    // disableTouch: =>

    //     @$window.on 'touchmove', @onTouchMove
    //     return

    // enableTouch: =>

    //     @$window.off 'touchmove', @onTouchMove
    //     return

    // onTouchMove: ( e ) ->

    //     e.preventDefault()
    //     return

    render() {

        this.bindEvents();

        // this.preloader    = new Preloader();
        // this.modalManager = new ModalManager();

        // this.header  = new Header();
        // this.wrapper = new Wrapper();
        // this.footer  = new Footer();

        // this
        //     .addChild(this.header);
        //     .addChild(this.wrapper);
        //     .addChild(this.footer);

        this.onAllRendered();

    }

    bindEvents() {

        this.onResize();

        this.onResize = _.debounce(this.onResize.bind(this), 300);
        this.$window.on('resize orientationchange', this.onResize.bind(this));

    }

    onAllRendered() {

        console.log("onAllRendered : =>");

        this.$body.prepend(this.$el);

        this.$el.text('what?');

        this.begin();
    }

    begin() {

        this.trigger('start');

        // this.__NAMESPACE__().router.start();

        // this.preloader.hide();
        // this.updateMediaQueriesLog();

    }

    onResize() {

        this.getDims();
        // this.updateMediaQueriesLog();

    }

    // updateMediaQueriesLog : =>

    //     if @header then @header.$el.find(".breakpoint").html "<div class='l'>CURRENT BREAKPOINT:</div><div class='b'>#{MediaQueries.getBreakpoint()}</div>"
    //     return

    getDims() {

        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        this.dims = {
            w : w,
            h : h,
            o : h > w ? 'portrait' : 'landscape',
            c : w <= this.MOBILE_WIDTH ? this.MOBILE : this.NON_MOBILE
        };

        this.trigger(this.EVENT_UPDATE_DIMENSIONS, this.dims);

    }

    linkManager(e) {

        const href = $(e.currentTarget).attr('href');

        if (!href) {
            return false;
        }

        this.navigateToUrl(href, e);

    }

    navigateToUrl( href, e = null ) {

        const route   = href.match(this.__NAMESPACE__().BASE_PATH) ? href.split(this.__NAMESPACE__().BASE_PATH)[1] : href;
        const section = route.indexOf('/') === 0 ? route.split('/')[1] : route;

        if (this.__NAMESPACE__().nav.getSection(section)) {
            e.preventDefault();
            this.__NAMESPACE__().router.navigateTo(route);
        } else {
            this.handleExternalLink(href);
        }

    }

    handleExternalLink(data) {

        /*

        bind tracking events if necessary

        */

    }
}

export default AppView;
