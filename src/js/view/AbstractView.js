const AbstractView = Backbone.View.extend({

	el           : null,
	id           : null,
	children     : null,
	template     : null,
	templateVars : null,

	initialize: function() {
		
		this.children = [];

		if (this.template) {
			const tmpHTML = _.template(this.__NAMESPACE__().templates.get(this.template));

			this.setElement(
				tmpHTML(this.templateVars)
			);
		}

		if (this.id) {
			this.$el.attr('id', this.id);
		}

		if (this.className) {
			this.$el.addClass(this.className);
		}
		
		this.init();

		this.paused = false;

	},

	init: function() {},

	update: function() {},

	render: function() {},

	addChild: function(child, prepend = false) {

		if (child.el) {
			this.children.push(child);
		}

		const target = this.addToSelector ? this.$el.find(this.addToSelector).eq(0) : this.$el;
		const c      = child.el ? child.$el : child;

		if (!prepend) {
			target.append(c);
		} else {
			target.prepend(c);
		}

		return this;
	},

	replace: function(dom, child) {

		if (child.el) {
			this.children.push(child);
		}

		const c = child.el ? child.$el : child;

		this.$el.children(dom).replaceWith(c);

	},

	remove: function(child) {

		if (!child) {
			return;
		}
		
		const c = child.el ? child.$el : $(child);
		if (c && child.dispose) {
			child.dispose();
		}

		if (c && this.children.indexOf(child) != -1) {
			this.children.splice( this.children.indexOf(child), 1 );
		}

		c.remove();

	},

	onResize: function(event) {

		this.children.forEach( (child) => {
			if (child.onResize) {
				child.onResize();
			}
		});

	},

	mouseEnabled: function( enabled ) {

		this.$el.css({
			"pointer-events": enabled ? "auto" : "none"
		});

	},

	CSSTranslate: function(x, y, value='%', scale) {

		let str;

		if (Modernizr.csstransforms3d) {
			str = `translate3d(${x+value}, ${y+value}, 0)`;
		} else {
			str = `translate(${x+value}, ${y+value})`
		}

		if (scale) {
			str = `${str} scale(${scale})`
		}

		return str;

	},

	unMuteAll: function() {

		this.children.forEach( (child) => {

			if (child.unMute) {
				child.unMute();
			}

			if (child.children.length) {
				child.unMuteAll();
			}

		});

	},

	muteAll: function() {

		this.children.forEach( (child) => {

			if (child.mute) {
				child.mute();
			}

			if (child.children.length) {
				child.muteAll();
			}

		});

	},

	removeAllChildren: function() {

		this.children.forEach( (child) => {
			this.remove(child);
		});

	},

	triggerChildren: function(msg, children) {

		children = children || this.children;

		children.forEach( (child, i) => {

			child.trigger(msg);

			if (child.children.length) {
				this.triggerChildren(msg, child.children);
			}

		});

	},

	callChildren: function(method, params, children) {

		children = children || this.children;

		children.forEach( (child, i) => {

			if (child[method]) {
				child[method](params);
			}

			if (child.children.length) {
				this.callChildren(method, params, child.children);
			}

		});

	},

	callChildrenAndSelf: function(method, params, children) {

		children = children || this.children;

		if (this[method]) {
			this[method](params);
		}

		this.callChildren(method, params, children);

	},

	supplantString: function(str, vals) {

		return str.replace(/{{ ([^{}]*) }}/g, (a, b) => {
			const r = vals[b];
			if (typeof r === "string" || typeof r === "number") {
				return r;
			} else {
				return a;
			}
		});

	},

	dispose: function() {

		/*
		override on per view basis - unbind event handlers etc
		*/

	},

	__NAMESPACE__() {

		return window.__NAMESPACE__;

	}

});

export default AbstractView;
