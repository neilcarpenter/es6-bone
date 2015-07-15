# es6-bone

JS (ES6) port of [coffee-bone](https://github.com/unit9/coffee-bone).

Boilerplate for single page app built on ES6, Backbone, Sass, Gulp, Browserify, amongst other things...

Although it technically works "out of the box" (*-ish*), really requires some configuration, and probably contains a lot of extra crap you don't need.

### ES6+ notes

There is currently no easy way to integrate Backbone with ES6 classes, [see GH issue here](https://github.com/jashkenas/backbone/issues/3560). In light of this, Backbone-derived modules are written using the Backbone `extend` syntax, rather than ES6 class syntax.

Also note, ES7 `classProperties` are currently enabled through babel, but this is an [experimental feature](http://babeljs.io/blog/2015/03/31/5.0.0/) based on a proposed spec, so it is subject to change. Class properties are only used within a few modules at the moment so removing them wouldn't be a huge issue if it came to that.

### Install

1. Clone repo into `[DIR NAME]`
2. `$ cd [DIR NAME]`
3. `$ [sudo] npm install`
4. `$ node install.js [APP NAMESPACE]` *optional - just namespaces app in all js files*
5. `$ gulp`

### Gulp tasks

* `$ gulp` - *development mode*
    * Watchify (browserify)
    * Compile Sass
    * Autoprefix CSS
    * Minify XML templates
    * Optimise images
    * BrowserSync (local server)
    * + watch for changes in `.js`, `.scss`, `templates.xml` and images, trigger repeat

* `$ gulp build` - *pre-deploy build*
    * Browserify
    * Remove `console.log`s
    * Compile Sass
    * Autoprefix CSS
    * Combine media queries
    * Minify CSS
    * Minify XML templates
    * Concatenate vendor JS
    * Uglify JS (vendor + main application JS)
    * Custom modernizr build based on refs used through app *-- TO DO*
    * Iconizr *-- TO DO*

* Others:
    * *Check `/gulp/tasks` - each file corresponds to an individual gulp task*

### General FE app structure notes

* `Router.js` - capture / modify URL hashChange events
* `Nav.js` - list all available site routes, handle / delegate URL hashChange events
* `AppView.js` - Core view, all UI bound here. Anything with a deeplink in `Wrapper`, any modal-only content in `ModalManager`
* `Wrapper.js`
    * mapping for all site deeplinked views
    * each view may be an `AbstractViewPage` or `AbstractViewModal`
    * handle management of deeplinked pages / modals based on view 'type' and history state
    * trigger sub-route event changing
* `AbstractViewPage` / `AbstractViewModal` - URL based pages, built in methods for page transitions
* `_ModalManager.js` - custom modal management (non URL-based popups)

### Important FE utils / data management

* `API.js` - use to retrieve all endpoints
* `UserData.js` - holds all user data, convenience methods to integrate with assumed user API endpoints (login / logout etc)
* `Templates.js` - all application HTML is loaded via single XML file, this templates wrapper allows getter based on ID
* `Locale.js` - all localised copy is expected in JSON file format, based on predefined (or detected) ISO-compatible locale code. This class offers wrapper to get localised string based on unique ID.
* `Analytics.js` - Google Analytics custom event firing, requires custom JSON containing ID / event string mappings.
* `Share.js` - Wrapper for sharing to various social networks in popup windows (except FB, this should be done via `Facebook.js` class)
* Others - just look around :)

### Included SDKs

These come packaged in wrapper classes that load the SDKs asynchronously and have some helper methods for API interaction
* Facebook (`Facebook.js`)
* Google+ (`GooglePlus.js`)

### Included JS libs

* Backbone (+ jQuery + Underscore + Backbone DeepModel)
* TweenLite.js (+ CSSPlugin + EasePack)

### Sass

* Normalise
* Custom easing
* Various helpers + mixins
