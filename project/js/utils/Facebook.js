import AbstractData from '../data/AbstractData';

/*

Facebook SDK wrapper - load asynchronously, some helper methods

*/
class Facebook extends AbstractData {

	static url = '//connect.facebook.net/en_US/all.js';

	static permissions = 'email';

	static $dataDfd    = null;
	static loaded      = false;

	static load() {

		$script(Facebook.url, Facebook.init);

	}

	static init() {

		Facebook.loaded = true;

		FB.init({
			appId  : window.config.fb_app_id,
			status : false,
			xfbml  : false
		});

	}

	static login($dataDfd) {

		Facebook.$dataDfd = $dataDfd;

		if (!Facebook.loaded) {
			return Facebook.$dataDfd.reject('SDK not loaded');
		}

		FB.login( (res) => {

			if (res['status'] === 'connected') {
				Facebook.getUserData(res['authResponse']['accessToken']);
			} else {
				Facebook.$dataDfd.reject('no way jose');
			}

		}, { scope: Facebook.permissions });

	}

	static getUserData(token) {

		const userData = {};
		userData.access_token = token;

		const $meDfd   = $.Deferred();
		const $picDfd  = $.Deferred();

		FB.api('/me', (res) => {

			userData.full_name = res.name;
			userData.social_id = res.id;
			userData.email     = res.email || false;
			$meDfd.resolve();

		});

		FB.api('/me/picture', { 'width': '200' }, (res) => {

			userData.profile_pic = res.data.url;
			$picDfd.resolve();

		});

		$.when($meDfd, $picDfd).done( () => {

			Facebook.$dataDfd.resolve(userData);

		});

	}

	static share(opts, cb) {

		FB.ui({
			method      : opts.method || 'feed',
			name        : opts.name || '',
			link        : opts.link || '',
			picture     : opts.picture || '',
			caption     : opts.caption || '',
			description : opts.description || ''
		}, (response) => {
			if (cb && typeof(cb) === 'function') {
				cb(response);
			}
		});

	}

}

export default Facebook;
