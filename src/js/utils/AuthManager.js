import AbstractData from '../data/AbstractData';
import Facebook from '../utils/Facebook';
import GooglePlus from '../utils/GooglePlus';

class AuthManager extends AbstractData {

	userData  = null;

	// this.process true during login process
	process      = false;
	processTimer = null;
	processWait  = 5000;

	constructor() {

		super();

	}

	login(service, cb=null) {

		// console.log("++++ PROCESS ", this.process);

		if (this.process) {
			return;
		}

		this.showLoader();
		this.process = true;

		const $dataDfd = $.Deferred();

		switch (service) {
			case "google":
				GooglePlus.login($dataDfd);
				break;
			case "facebook":
				Facebook.login($dataDfd);
				break;
		}

		$dataDfd.done( (res) => { this.authSuccess.call(this, service, res); });
		$dataDfd.fail( (res) => { this.authFail.call(this, service, res); });
		$dataDfd.always( () => { this.authCallback.call(this, cb); });

		/*
		Unfortunately no callback is fired if user manually closes G+ login modal,
		so this is to allow them to close window and then subsequently try to log in again...
		*/
		this.processTimer = setTimeout(this.authCallback, this.processWait);

		return $dataDfd;

	}

	authSuccess(service, data) {

		// console.log "login callback for #{service}, data => ", data

	}

	authFail(service, data) {

		// console.log "login fail for #{service} => ", data

	}

	authCallback(cb=null) {

		if (!this.process) {
			return;
		}

		clearTimeout(this.processTimer);

		this.hideLoader();
		this.process = false;

		if (cb && typeof(cb) === 'function') {
			cb();
		}

	}

	// show / hide some UI indicator that we are waiting for social network to respond
	showLoader() {

		// console.log "showLoader"

	}

	hideLoader() {

		// console.log "hideLoader"

	}

}

export default AuthManager;
