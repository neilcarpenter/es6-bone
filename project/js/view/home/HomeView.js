import AbstractViewPage from '../AbstractViewPage';

const HomeView = AbstractViewPage.extend({

	template : 'page-home',

	constructor: function() {

		this.templateVars = {
			desc : this.__NAMESPACE__().locale.get("home_desc")
		};

		/*

		instantiate classes here

		this.exampleClass = new ExampleClass();

		*/

		HomeView.__super__.constructor.apply(this);

		/*

		add classes to app structure here

		this
			.addChild(this.exampleClass);

		*/

	}

})

export default HomeView;
