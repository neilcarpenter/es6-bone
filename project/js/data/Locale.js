import LocalesModel from '../models/core/LocalesModel';
import API from '../data/API';

/*
    Locale Loader

    Fires back an event when complete

*/
class Locale {

    lang     = null;
    data     = null;
    callback = null;
    backup   = null;
    default  = 'en-gb';

    constructor(data, cb) {

        // start Locale Loader, define locale based on browser language

        this.callback = cb;
        this.backup = data;

        this.lang = this.getLang();

        if (API.get('locale', { code : this.lang })) {

            $.ajax({
                url     : API.get( 'locale', { code : this.lang } ),
                type    : 'GET',
                success : this.onSuccess.bind(this),
                error   : this.loadBackup.bind(this),
            });

        } else {

            this.loadBackup();

        }

    }
            
    getLang() {

        let lang;

        if (window.location.search && window.location.search.match('lang=')) {

            lang = window.location.search.split('lang=')[1].split('&')[0];

        } else if (window.config.localeCode) {

            lang = window.config.localeCode;

        } else {

            lang = this.default;

        }

        return lang;

    }

    onSuccess(event) {

        // Fires back an event once it's complete

        let d = null;

        if (event.responseText) {
            d = JSON.parse(event.responseText);
        } else {
            d = event;
        }

        this.data = new LocalesModel(d);
        this.callback();

    }

    loadBackup() {

        // When API not available, tries to load the static .txt locale 

        $.ajax({
            url      : this.backup,
            dataType : 'json',
            complete : this.onSuccess.bind(this),
            error    : () => { console.log('error on loading backup') }
        });

    }

    get(id) {

        // get String from locale
        // + id : string id of the Localised String

        return this.data.getString(id);

    }

    getLocaleImage(url) {

        return (window.config.CDN + "/images/locale/" + window.config.localeCode + "/" + url);

    }

}

export default Locale;
