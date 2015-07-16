import AbstractView from '../AbstractView';

const Preloader = AbstractView.extend({

	cb : null,
	
	TRANSITION_TIME : 0.5,

	constructor: function() {

		Preloader.__super__.constructor.apply(this);

		this.setElement($('#preloader'));

	},

	init: function() {

	},

	show: function(cb) {

		this.cb = cb;

		this.$el.css({'display' : 'block'});

	},

	onShowComplete: function() {

		if (this.cb && typeof(this.cb) === 'function') {
			this.cb();
		}

	},

	hide: function(cb) {

		this.cb = cb;

		this.onHideComplete();

	},

	onHideComplete: function() {

		this.$el.css({'display' : 'none'});
		
		if (this.cb && typeof(this.cb) === 'function') {
			this.cb();
		}

	}

});

export default Preloader;
