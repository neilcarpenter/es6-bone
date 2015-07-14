const staticProps = {
    EVENT_HASH_CHANGED: 'EVENT_HASH_CHANGED'
}

const Router = Backbone.Router.extend({

    FIRST_ROUTE: true,

    routes : {
        '(/)(:area)(/:sub)(/)' : 'hashChanged',
        '*actions'             : 'navigateTo'
    },

    area   : null,
    sub    : null,
    params : null,

    start: function() {

        Backbone.history.start({
            pushState : true,
            root      : '/'
        });

    },

    hashChanged: function(area=null, sub=null) {

        console.log(`>> EVENT_HASH_CHANGED @area = ${this.area}, @sub = ${this.sub} <<`);

        this.area = area;
        this.sub  = sub;

        if (this.FIRST_ROUTE) {
            this.FIRST_ROUTE = false;
        }

        if (!this.area) {
            this.area = this.__NAMESPACE__().nav.sections.HOME;
        }

        this.trigger(Router.EVENT_HASH_CHANGED, this.area, this.sub, this.params);

    },

    navigateTo: function(where='', trigger=true, replace=false, params) {

        this.params = params;

        if (where.charAt(0) !== "/") {
            where = `/${where}`;
        }

        if (where.charAt( where.length-1 ) !== "/") {
            where = `${where}/`;
        }

        if (!trigger) {
            this.trigger(Router.EVENT_HASH_CHANGED, where, null, this.params);
            return;
        }

        this.navigate(where, { trigger: true, replace: replace });

    },

    __NAMESPACE__: function() {

        return window.__NAMESPACE__;

    }

}, staticProps);

export default Router;
