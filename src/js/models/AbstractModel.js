class AbstractModel extends Backbone.DeepModel {

	constructor(attrs, option) {

		super()

		attrs = this._filterAttrs(attrs);

		return Backbone.DeepModel.apply(this, arguments);

	}

	set(attrs, options) {

		options = options || {};

		attrs = this._filterAttrs(attrs);

		options.data = JSON.stringify(attrs);

		return Backbone.DeepModel.prototype.set.call(this, attrs, options);

	}

	_filterAttrs(attrs) {

		return attrs;

	}

	__NAMESPACE__() {

		return window.__NAMESPACE__;

	}

}

export default AbstractModel;
