import AbstractView from '../AbstractView';

const Header = AbstractView.extend({

	template : 'site-header',
	
	constructor: function() {

		this.templateVars = {
			desc    : this.__NAMESPACE__().locale.get("header_desc"),
			home    : {
				label    : 'Go to homepage',
				url      : this.__NAMESPACE__().BASE_PATH + '/' + this.__NAMESPACE__().nav.sections.HOME
			},
			example : {
				label    : 'Go to example page',
				url      : this.__NAMESPACE__().BASE_PATH + '/' + this.__NAMESPACE__().nav.sections.EXAMPLE
			}
		};

		Header.__super__.constructor.apply(this);

	}

});

export default Header;
