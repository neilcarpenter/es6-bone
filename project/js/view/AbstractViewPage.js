import AbstractView from './AbstractView';

const AbstractViewPage = AbstractView.extend({

	_shown     : false,
	_listening : false,

	show: function(cb) {

		if (this._shown) {
			return;
		}
		this._shown = true;

		/*
		CHANGE HERE - 'page' views are always in DOM - to save having to re-initialise gmap events (PITA). No longer require :dispose method
		*/
		this.__NAMESPACE__().appView.wrapper.addChild(this);
		this.callChildrenAndSelf('setListeners', 'on');

		// replace with some proper transition if we can
		this.$el.css({ 'visibility' : 'visible' });
		
		if (cb && typeof cb === 'function') {
			cb();
		}

	},

	hide: function(cb) {

		if (!this._shown) {
			return;
		}
		this._shown = false;

		/*
		CHANGE HERE - 'page' views are always in DOM - to save having to re-initialise gmap events (PITA). No longer require :dispose method
		*/
		this.__NAMESPACE__().appView.wrapper.remove(this);

		// this.callChildrenAndSelf 'setListeners', 'off'

		// replace with some proper transition if we can
		this.$el.css({ 'visibility' : 'hidden' });
		
		if (cb && typeof cb === 'function') {
			cb();
		}

	},

	dispose: function() {

		this.callChildrenAndSelf('setListeners', 'off');

	},

	setListeners: function(setting) {

		if (setting === this._listening) {
			return;
		}

		this._listening = setting;

	}

})

export default AbstractViewPage;
