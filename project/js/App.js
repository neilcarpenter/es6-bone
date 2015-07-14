import Analytics from './utils/Analytics';
import AuthManager from './utils/AuthManager';
import Share from './utils/Share';
import Facebook from './utils/Facebook';
import GooglePlus from './utils/GooglePlus';
import Templates from './data/Templates';
import Locale from './data/Locale';
import Router from './router/Router';
import Nav from './router/Nav';
import AppData from './AppData';
import AppView from './AppView';
import MediaQueries from './utils/MediaQueries';

class App {

    static _toClean = ['objReady', 'setFlags', 'objectComplete', 'init', 'initObjects', 'initSDKs', 'initApp', 'go', 'cleanup'];

    LIVE       = null;
    BASE_PATH  = window.config.hostname;
    localeCode = window.config.localeCode;
    objReady   = 0;

    constructor(LIVE) {
        this.LIVE = LIVE;
    }

    setFlags() {
        const ua = window.navigator.userAgent.toLowerCase();

        MediaQueries.setup();

        this.IS_ANDROID    = ua.indexOf('android') > -1;
        this.IS_FIREFOX    = ua.indexOf('firefox') > -1;
        this.IS_CHROME_IOS = ua.match('crios') ? true : false; // http://stackoverflow.com/a/13808053
    }

    objectComplete() {
        this.objReady++;

        if (this.objReady >= 4) {
            this.initApp();
        }
    }

    init() {
        this.initObjects();
    }

    initObjects() {
        this.templates = new Templates("/data/templates.xml", this.objectComplete.bind(this));
        this.locale    = new Locale("/data/locales/strings.json", this.objectComplete.bind(this));
        this.analytics = new Analytics("/data/tracking.json", this.objectComplete.bind(this));
        this.appData   = new AppData(this.objectComplete.bind(this));

        // if new objects are added don't forget to change the `this.objectComplete` function
    }

    initSDKs() {

        Facebook.load();
        GooglePlus.load();

    }

    initApp() {
        this.setFlags();

        /* Starts application */
        this.appView = new AppView();
        this.router  = new Router();
        this.nav     = new Nav();
        this.auth    = new AuthManager();
        this.share   = new Share();

        this.go();

        this.initSDKs();
    }

    go() {
        /* After everything is loaded, kicks off website */
        this.appView.render();

        /* remove redundant initialisation methods / properties */
        this.cleanup();
    }

    cleanup() {
        App._toClean.forEach( (item) => {
            this[item] = null;
            delete this[item];
        });
    }

}

export default App;
