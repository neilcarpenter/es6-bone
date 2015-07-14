import AbstractViewPage from '../AbstractViewPage';

const ExamplePageView = AbstractViewPage.extend({

	template : 'page-example',

	constructor: function() {

		this.templateVars = {
			desc : this.__NAMESPACE__().locale.get("example_desc")
		};

		/*

		instantiate classes here

		this.exampleClass = new ExampleClass();

		*/

		ExamplePageView.__super__.constructor.apply(this);

		/*

		add classes to app structure here

		this
			.addChild(this.exampleClass);

		*/

	}

})

export default ExamplePageView;
