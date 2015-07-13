import AbstractData from './data/AbstractData';
import Requester from './utils/Requester';
import API from './data/API';

class AppData extends AbstractData {

    callback = null;

    constructor(callback) {

        super();

        /*

        add all data classes here

        */

        this.callback = callback;

        this.getStartData();

    }

    // get app bootstrap data - embed in HTML or API endpoint
    getStartData() {
        
        if (API.get('start')) {

            const r = Requester.request({
                url  : API.get('start'),
                type : 'GET'
            });

            r.done(this.onStartDataReceived.bind(this));
            r.fail( () => {

                // console.error "error loading api start data"

                /*
                this is only temporary, while there is no bootstrap data here, normally would handle error / fail
                */
                if (this.callback && typeof(this.callback) === 'function') {
                    this.callback();
                }

            });

        } else {

            if (this.callback && typeof(this.callback) === 'function') {
                this.callback();
            }

        }

    }

    onStartDataReceived(data) {

        /*

        bootstrap data received, app ready to go

        */

        if (this.callback && typeof(this.callback) === 'function') {
            this.callback();
        }

    }

}

export default AppData;
