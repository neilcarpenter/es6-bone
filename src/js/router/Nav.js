import AbstractView from '../view/AbstractView';
import Router from './Router';

const staticProps = {
    EVENT_CHANGE_VIEW     : 'EVENT_CHANGE_VIEW',
    EVENT_CHANGE_SUB_VIEW : 'EVENT_CHANGE_SUB_VIEW'
};

const Nav = AbstractView.extend({

    sections : {
        HOME    : '',
        EXAMPLE : 'example'
    },

    current  : { area : null, sub : null },
    previous : { area : null, sub : null },

    constructor: function() {

        Nav.__super__.constructor.apply(this);

        this.__NAMESPACE__().router.on(Router.EVENT_HASH_CHANGED, this.changeView.bind(this));

    },

    getSection: function(section) {

        if (section === '') {
            return true;
        }

        let sectionUri = false;

        for (let key in this.sections) {
            let uri = this.sections[key];
            if (uri === section) {
                sectionUri = key;
            }
        }

        return sectionUri;

    },

    changeView: function(area, sub, params) {

        console.log("area",area);
        console.log("sub",sub);
        console.log("params",params);

        this.previous = this.current;
        this.current  = { area : area, sub : sub };

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

    setPageTitle(area, sub) {

        const title = "PAGE TITLE HERE - LOCALISE BASED ON URL";

        if (window.document.title !== title) {
            window.document.title = title;
        }

    }

}, staticProps);

export default Nav;
