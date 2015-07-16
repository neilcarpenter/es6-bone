import AbstractView from './AbstractView';

const AbstractViewModal = AbstractView.extend({

	_shown     : false,
	_listening : false,

	TRANSITION_TIME : 0.3,

	show: function(cb) {

		if (this._shown) {
			return;
		}
		this._shown = true;

		this.__NAMESPACE__().appView.wrapper.addChild(this);

		this.animateIn(cb);

	},

	hide: function(cb) {

		if (!this._shown) {
			return;
		}
		this._shown = false;
		
		this.animateOut(cb);

	},

	dispose: function() {

		this.callChildrenAndSelf('setListeners', 'off');
		
	},

	setListeners: function(setting) {

		if (setting === this._listening) {
			return 'noListenerChange';
		}
		this._listening = setting;

		this.$el[setting]('click', '[data-close-modal]', this.onCloseClick.bind(this));

	},

	onCloseClick: function(e) {

		e.preventDefault();
		this.close();

	},

	close: function() {

		this.__NAMESPACE__().router.navigateTo(this.__NAMESPACE__().appView.wrapper.backgroundView.route);
		
	},

	animateIn: function(cb) {

		this.$el.css({ 'visibility' : 'visible' });

		const fromParams = {
			'transform' : this.CSSTranslate(-50, -45),
			'opacity'   : 0
		};
		const toParams   = {
			'transform'      : this.CSSTranslate(-50, -50),
			'opacity'        : 1,
			ease             : Cubic.easeInOut,
			onComplete       : this.animateInDone,
			onCompleteParams : [cb]
		};

		TweenLite.fromTo(this.$el, this.TRANSITION_TIME, fromParams, toParams);

	},

	animateInDone: function(cb) {

		this.callChildrenAndSelf('setListeners', 'on');

		if (cb && typeof cb === 'function') {
			cb();
		}

		this.__NAMESPACE__().appView.modalPlayBtn.show();

	},

	animateOut: function(cb) {

		this.__NAMESPACE__().appView.modalPlayBtn.hide();

		const toParams = {
			'transform'      : @CSSTranslate(-50, -55),
			'opacity'        : 0,
			ease             : Cubic.easeInOut,
			onComplete       : @animateOutDone,
			onCompleteParams : [cb]
		};

		TweenLite.to(this.$el, this.TRANSITION_TIME, toParams);

	},

	animateOutDone: function(cb) {

		this.$el.css({ 'visibility' : 'hidden' });

		this.__NAMESPACE__().appView.wrapper.remove(this);

		if (cb && typeof cb === 'function') {
			cb();
		}

	}

})

export default AbstractViewModal;
