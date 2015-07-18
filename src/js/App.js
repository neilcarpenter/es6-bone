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

    static _toClean = ['depedencyDfds', 'setFlags', 'objectComplete', 'init', 'initObjects', 'initObject','initSDKs', 'initApp', 'go', 'cleanup'];

    BASE_PATH     = window.config.hostname;
    localeCode    = window.config.localeCode;
    depedencyDfds = [];

    constructor() {}

    setFlags() {
        const ua = window.navigator.userAgent.toLowerCase();

        MediaQueries.setup();

        this.IS_ANDROID    = ua.indexOf('android') > -1;
        this.IS_FIREFOX    = ua.indexOf('firefox') > -1;
        this.IS_CHROME_IOS = ua.match('crios') ? true : false; // http://stackoverflow.com/a/13808053
    }

    depedencyLoaded(dfd) {
        dfd.resolve();
    }

    init() {
        this.initObjects();
    }

    initObjects() {
        this.initObject('templates', Templates, "/data/templates.xml");
        this.initObject('locale', Locale, "/data/locales/strings.json");
        this.initObject('analytics', Analytics, "/data/tracking.json");
        this.initObject('appData', AppData);

        $.when.apply($, this.depedencyDfds).done(this.initApp.bind(this));
    }

    initObject(classProp, ClassRef, remoteDep=null) {
        const dfd = $.Deferred();
        this.depedencyDfds.push(dfd);

        this[classProp] = new ClassRef(remoteDep, this.depedencyLoaded.bind(this, dfd));
    }

    initSDKs() {
        Facebook.load();
        GooglePlus.load();
    }

    initApp() {
        this.setFlags();

        this.appView = new AppView();
        this.router  = new Router();
        this.nav     = new Nav();
        this.auth    = new AuthManager();
        this.share   = new Share();

        this.go();

        this.initSDKs();
    }

    go() {
        // After everything is loaded, kicks off website
        this.appView.render();

        // remove redundant initialisation methods / properties
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
