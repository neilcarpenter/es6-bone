import TemplateModel from '../models/core/TemplateModel';
import TemplatesCollection from '../collections/core/TemplatesCollection';

class Templates {

    templates = null;
    cb        = null;

    constructor(templates, callback) {

        console.log(templates, callback);

        this.cb = callback;

        $.ajax({
            url     : templates,
            success : this.parseXML.bind(this)
        });

    }

    parseXML(data) {

        const temp = [];

        $(data).find('template').each((key, value) => {
            const $value = $(value);
            temp.push(
                new TemplateModel({
                    id   : $value.attr('id').toString(),
                    text : $.trim($value.text())
                })
            );
        });

        this.templates = new TemplatesCollection(temp);

        this.cb();

    }

    get(id) {

        let t = this.templates.where({id : id});
        t     = t[0].get('text');

        return $.trim(t);

    }

}

export default Templates;
