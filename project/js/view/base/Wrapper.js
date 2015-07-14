import AbstractView from '../AbstractView';
import HomeView from '../home/HomeView';
import ExamplePageView from '../examplePage/ExamplePageView';
import Nav from '../../router/Nav';

const Wrapper = AbstractView.extend({

	VIEW_TYPE_PAGE  : 'page',
	VIEW_TYPE_MODAL : 'modal',

	template : 'wrapper',

	views          : null,
	previousView   : null,
	currentView    : null,
	backgroundView : null,

	constructor: function() {

		this.views = {
			home : {
				classRef : HomeView,
				route    : this.__NAMESPACE__().nav.sections.HOME,
				view     : null,
				type     : this.VIEW_TYPE_PAGE
			},
			example : {
				classRef : ExamplePageView,
				route    : this.__NAMESPACE__().nav.sections.EXAMPLE,
				view     : null,
				type     : this.VIEW_TYPE_PAGE
			}
		};

		this.createClasses();

		Wrapper.__super__.constructor.apply(this);

		// decide if you want to add all core DOM up front, or add only when required, see comments in AbstractViewPage.coffee
		// @addClasses()

	},

	createClasses: function() {

		for (let key in this.views) {

			this.views[key].view = new this.views[key].classRef;

		}

	},

	addClasses: function() {

		for (let key in this.views) {

			if (this.views[key].type === this.VIEW_TYPE_PAGE) {
				this.addChild(this.views[key].view);
			}

		}

	},

	getViewByRoute: function(route) {

		let view = false;

		for (let key in this.views) {

			if (this.views[key].route === route) {
				view = this.views[key];
			}

		}

		return view;

	},

	init: function() {

		this.__NAMESPACE__().appView.on('start', this.start.bind(this));

	},

	start: function() {

		this.__NAMESPACE__().appView.off('start', this.start.bind(this));

		this.bindEvents();

	},

	bindEvents: function() {

		this.__NAMESPACE__().nav.on(Nav.EVENT_CHANGE_VIEW, this.changeView.bind(this));
		this.__NAMESPACE__().nav.on(Nav.EVENT_CHANGE_SUB_VIEW, this.changeSubView.bind(this));

	},

	/*

	THIS IS A MESS, SORT IT (neil)

	*/
	changeView: function(previous, current) {

		console.log("changeView: function(previous, current) {", previous, current);

		this.previousView = this.getViewByRoute(previous.area);
		this.currentView  = this.getViewByRoute(current.area);

		console.log("this.previousView", this.previousView);
		console.log("this.currentView", this.currentView);

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

	changeSubView: function(current) {

		this.currentView.view.trigger(Nav.EVENT_CHANGE_SUB_VIEW, current.sub);

	},

	transitionViews: function(from, to, toModal=false, fromModal=false) {

		console.log("transitionViews: function(from, to, toModal=false, fromModal=false) {", from, to);

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

export default Wrapper;
