import AbstractData from '../data/AbstractData';

/*

Google+ SDK wrapper - load asynchronously, some helper methods

*/
class GooglePlus extends AbstractData {

	static url = 'https://apis.google.com/js/client:plusone.js';

	static params = {
		'clientid'     : null,
		'callback'     : null,
		'scope'        : 'https://www.googleapis.com/auth/userinfo.email',
		'cookiepolicy' : 'none'
	};

	static $dataDfd = null;
	static loaded   = false;

	static load() {

		$script(GooglePlus.url, GooglePlus.init);

	}

	static init() {

		GooglePlus.loaded = true;

		GooglePlus.params['clientid'] = window.config.gp_app_id;
		GooglePlus.params['callback'] = GooglePlus.loginCallback.bind(this);

	}

	static login($dataDfd) {

		GooglePlus.$dataDfd = $dataDfd;

		if (GooglePlus.loaded) {
			gapi.auth.signIn(GooglePlus.params);
		} else {
			GooglePlus.$dataDfd.reject('SDK not loaded');
		}

	}

	static loginCallback(res) {

		if (res['status']['signed_in']) {
			GooglePlus.getUserData(res['access_token']);
		} else if (res['error']['access_denied']) {
			GooglePlus.$dataDfd.reject('no way jose');
		}

	}

	static getUserData(token) {

		gapi.client.load('plus','v1', () => {

			request = gapi.client.plus.people.get({ 'userId': 'me' });
			request.execute( (res) => {

				const userData = {
					access_token : token,
					full_name    : res.displayName,
					social_id    : res.id,
					email        : res.emails[0] ? res.emails[0].value : false,
					profile_pic  : res.image.url
				};

				GooglePlus.$dataDfd.resolve(userData);

			});

		});

	}

}

export default GooglePlus;
