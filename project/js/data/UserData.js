import AbstractData from './AbstractData';
import Requester from '../utils/Requester';
import API from './API';
import UserStatusModel from '../models/core/UserStatusModel';
import UserInfoModel from '../models/core/UserInfoModel';

class UserData extends AbstractData {

	status   = null;
	info     = null;

	EVENT_USER_LOGGED = 'EVENT_USER_LOGGED';

	constructor() {

		super()

		this.status   = new UserStatusModel();
		this.info     = new UserInfoModel();

		this.bindEvents();

	}

	bindEvents() {

		this.status.on('change:logged', this.onLoggedChange.bind(this));

	}

	onLoggedChange() {

		if (this.status.get('logged')) {

			this.trigger(this.EVENT_USER_LOGGED);

		}

	}

	register(data) {

		const r = Requester.request({
			url  : API.get('user.register'),
			type : "POST",
			data : data
		});

		r.done(this.registerSuccess.bind(this));
		r.fail(this.registerFail.bind(this));

		return r;

	}

	registerSuccess(res) {

		console.log("register successful -->", res);

		return res;

	}

	registerFail(res) {

		console.log("register fail -->", res);

		return res;

	}

	login(data) {

		const r = Requester.request({
			url  : API.get('user.login'),
			type : "POST",
			data : data
		});

		r.done(this.loginSuccess.bind(this));
		r.fail(this.loginFail.bind(this));

		return r;

	}

	loginSuccess(res) {

		console.log("login successful -->", res);

		return res;

	}

	loginFail(res) {

		console.log("failed to log in... -->", res);

		return res;

	}

	logout(removeUser=false) {

		const endpoint = removeUser ? API.get('user.remove') : API.get('user.logout');

		r = Requester.request({
			url  : endpoint,
			type : "POST"
		});

		r.done(this.onLogoutDone.bind(this));

	}

	removeUser() {

		this.logout(true);

	}

	onLogoutDone() {

		window.location.href = this.__NAMESPACE__().BASE_PATH;

	}

}

export default UserData;
