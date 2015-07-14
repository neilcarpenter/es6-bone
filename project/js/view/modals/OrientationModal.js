import AbstractModal from './AbstractModal';

const OrientationModal = AbstractModal.extend({

	name     : 'orientationModal',
	template : 'orientation-modal',

	cb : null,

	constructor: function(cb) {

		this.cb = cb;

		this.templateVars = { name: this.name };

		OrientationModal.__super__.constructor.apply(this);

	},

	init: function() {

	},

	hide: function(stillLandscape=true) {

		this.animateOut( () => {
			this.__NAMESPACE__().appView.remove(this);
			if (!stillLandscape && cb && typeof cb === 'function') {
				cb();
			}
		});

	},

	setListeners: function(setting) {

		OrientationModal.__super__.setListeners.apply(this, [setting]);

		this.__NAMESPACE__().appView[setting]('updateDims', this.onUpdateDims.bind(this));
		this.$el[setting]('touchend click', this.hide.bind(this));

	},

	onUpdateDims: function(dims) {

		if (dims.o === 'portrait') {
			this.hide(false);
		}

	}

});

export default OrientationModal;
