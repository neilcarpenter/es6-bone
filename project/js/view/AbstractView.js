const classProps = {
	el           : null,
	id           : null,
	children     : null,
	template     : null,
	templateVars : null
};

class AbstractView extends Backbone.View {

	constructor(props={}) {

		super(_.defaults(props, classProps));

	}
	
	initialize() {
		
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

	}

	init() {}

	update() {}

	render() {}

	addChild(child, prepend = false) {

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
	}

	// replace : (dom, child) =>

	// 	@children.push child if child.el
	// 	c = if child.el then child.$el else child
	// 	@$el.children(dom).replaceWith(c)

	// 	null

	remove(child) {

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

	}

	onResize(event) {

		this.children.forEach( (child) => {
			if (child.onResize) {
				child.onResize();
			}
		});

	}

	// mouseEnabled : ( enabled ) =>

	// 	@$el.css
	// 		"pointer-events": if enabled then "auto" else "none"

	// 	null

	// CSSTranslate : (x, y, value='%', scale) =>

	// 	if Modernizr.csstransforms3d
	// 		str = "translate3d(#{x+value}, #{y+value}, 0)"
	// 	else
	// 		str = "translate(#{x+value}, #{y+value})"

	// 	if scale then str = "#{str} scale(#{scale})"

	// 	str

	// unMuteAll : =>

	// 	for child in @children

	// 		child.unMute?()

	// 		if child.children.length

	// 			child.unMuteAll()

	// 	null

	// muteAll : =>

	// 	for child in @children

	// 		child.mute?()

	// 		if child.children.length

	// 			child.muteAll()

	// 	null

	// removeAllChildren: =>

	// 	@remove child for child in @children

	// 	null

	// triggerChildren : (msg, children=@children) =>

	// 	for child, i in children

	// 		child.trigger msg

	// 		if child.children.length

	// 			@triggerChildren msg, child.children

	// 	null

	// callChildren : (method, params, children=@children) =>

	// 	for child, i in children

	// 		child[method]? params

	// 		if child.children.length

	// 			@callChildren method, params, child.children

	// 	null

	// callChildrenAndSelf : (method, params, children=@children) =>

	// 	@[method]? params

	// 	for child, i in children

	// 		child[method]? params

	// 		if child.children.length

	// 			@callChildren method, params, child.children

	// 	null

	supplantString(str, vals) {

		return str.replace(/{{ ([^{}]*) }}/g, (a, b) => {
			const r = vals[b];
			if (typeof r === "string" || typeof r === "number") {
				return r;
			} else {
				return a;
			}
		});

	}

	dispose() {

		/*
		override on per view basis - unbind event handlers etc
		*/

	}

	__NAMESPACE__() {

		return window.__NAMESPACE__;

	}

}

// AbstractView.prototype.className = 'what';

export default AbstractView;
