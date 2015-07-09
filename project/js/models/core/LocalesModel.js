class LocalesModel extends Backbone.Model {

    defaults = {
        code     : null,
        language : null,
        strings  : null
    };
            
    get_language() {

        return this.get('language');

    }

    getString(id) {

        const strings = this.get('strings');
        let value     = null;

        for (let key in strings) {
            for (let key2 in strings[key]['strings']) {
                if (key2 === id) {
                    value = strings[key]['strings'][key2];
                }
            }
        }

        if (value) {
            return value;
        } else {
            console.warn(`Locales -> not found string: ${id}`);
        }

    }

}

export default LocalesModel;
