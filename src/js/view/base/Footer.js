import AbstractView from '../AbstractView';

const Footer = AbstractView.extend({

	template : 'site-footer',

	constructor: function() {

		this.templateVars = {
        	desc : this.__NAMESPACE__().locale.get("footer_desc")
		};

        Footer.__super__.constructor.apply(this);

	}

});

export default Footer;
