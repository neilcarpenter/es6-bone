import AbstractView from '../AbstractView';
import OrientationModal from './OrientationModal';

const ModalManager = AbstractView.extend({

	// when new modal classes are created, add here, with reference to class name
	modals: {
		orientationModal : { classRef : OrientationModal, view : null }
	},

	constructor: function() {

		ModalManager.__super__.constructor.apply(this);

	},

	init: function() {

	},

	isOpen: function() {

		let modalIsOpen = false;

		for (let key in this.modals) {

			if (this.modals[key].view) {
				modalIsOpen = true;
			}

		}

		return modalIsOpen;

	},

	hideOpenModal: function() {

		let openModal = null;

		for (let key in this.modals) {

			if (this.modals[key].view) {
				openModal = this.modals[key].view;
			}

		}

		if (openModal) {
			openModal.hide();
		}

	},

	showModal: function(name, cb=null) {

		if (this.modals[name].view) {
			return;
		}

		this.modals[name].view = new this.modals[name].classRef(cb);

	}

});

export default ModalManager;
