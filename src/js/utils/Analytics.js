/*
 Analytics wrapper
*/
class Analytics {

    tags    = null;
    started = false;

    attempts        = 0;
    allowedAttempts = 5;

    constructor(tags, callback) {

        this.callback = callback;

        $.getJSON(tags, this.onTagsReceived.bind(this));

    }

    onTagsReceived(data) {

        this.tags    = data;
        this.started = true;
        this.callback();

    }

    // param string id of the tracking tag to be pushed on Analytics 
    track(param) {

        if (!this.started) {
            return;
        }

        if (param) {

            const v = this.tags[param];

            if (v) {

                const args = ['send', 'event'];
                v.forEach((arg) => {
                    args.push(arg);
                });

                // loading GA after main app JS, so external script may not be here yet
                if (window.ga) {
                    ga.apply(null, args);
                } else if (this.attempts >= this.allowedAttempts) {
                    this.started = false;
                } else {
                    setTimeout( () => {
                        this.track(param);
                        this.attempts++;
                    }, 2000);
                }

            }
        }

    }

}

export default Analytics;
