import APIRouteModel from '../models/core/APIRouteModel';

class API {

	static model = new APIRouteModel();

	static getConstants = () => {

		// add more if we wanna use in API strings
		const constants = {
			BASE_PATH : API.__NAMESPACE__().BASE_PATH
		}

		return constants;

	}

	static get = (name, vars) => {

		const allVars = $.extend(true, vars, API.getConstants());
		return API.supplantString(API.model.get(name), allVars);

	}

	static supplantString = (str, vals) => {

		return str.replace(/{{ ([^{}]*) }}/g, (a, b) => {
			const r = vals[b] || typeof vals[b] === 'number' ? vals[b].toString() : '';
			if (typeof r === "string" || typeof r === "number") {
				return r;
			} else {
				return a;
			}
		});

	}

	static __NAMESPACE__  = () => {

		return window.__NAMESPACE__;

	}

}

window.API = API;

export default API;
