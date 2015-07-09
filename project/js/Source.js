import App from './App';

// PRODUCTION ENVIRONMENT - may want to use server-set variables here
// IS_LIVE = do -> return if window.location.host.indexOf('localhost') > -1 or window.location.search is '?d' then false else true

/*

WIP - this will ideally change to old format (above) when can figure it out

*/

const IS_LIVE = false;

// ONLY EXPOSE APP GLOBALLY IF LOCAL OR DEV'ING
const view = IS_LIVE ? {} : (window || document);

// DECLARE MAIN APPLICATION
view.__NAMESPACE__ = new App(IS_LIVE);
view.__NAMESPACE__.init();
