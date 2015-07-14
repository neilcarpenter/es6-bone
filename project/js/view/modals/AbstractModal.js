import AbstractView from '../AbstractView';

const AbstractModal = AbstractView.extend({

	$window : null,

	// override in individual classes
	name     : null,
	template : null,

	constructor: function() {

		this.$window = $(window);

		AbstractModal.__super__.constructor.apply(this);

		this.__NAMESPACE__().appView.addChild(this);
		this.setListeners('on');
		this.animateIn();

	},

	hide: function() {

		this.animateOut( () => {
			this.__NAMESPACE__().appView.remove(this);
		});

	},

	dispose: function() {

		this.setListeners('off');
		this.__NAMESPACE__().appView.modalManager.modals[this.name].view = null;

	},

	setListeners: function(setting) {

		this.$window[setting]('keyup', this.onKeyUp.bind(this));
		this.$('[data-close]')[setting]('click', this.closeClick.bind(this));

	},

	onKeyUp: function(e) {

		if (e.keyCode === 27)
			this.hide();

	},

	animateIn: function() {

		TweenLite.to(this.$el, 0.3, { 'visibility': 'visible', 'opacity': 1, ease : Quad.easeOut });
		TweenLite.to(this.$el.find('.inner'), 0.3, { delay : 0.15, 'transform': 'scale(1)', 'visibility': 'visible', 'opacity': 1, ease : Back.easeOut });

	},

	animateOut: function(callback) {

		TweenLite.to(this.$el, 0.3, { delay : 0.15, 'opacity': 0, ease : Quad.easeOut, onComplete: callback });
		TweenLite.to(this.$el.find('.inner'), 0.3, { 'transform': 'scale(0.8)', 'opacity': 0, ease : Back.easeIn });

	},

	closeClick: function(e) {

		e.preventDefault();

		this.hide();

	}

});

export default AbstractModal;
