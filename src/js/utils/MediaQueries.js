/*   ---------------------
 *   Media Queries Manager 
 *   ---------------------
 *   
 *   @author  : Fábio Azevedo <fabio.azevedo@unit9.com> UNIT9
 *   @date    : September 14
 *   @updated : July 2015 (port to es6)
 *   
 *   Instructions are in /project/sass/utils/_responsive.scss.
 */

class MediaQueries {

    // Breakpoints
    static SMALL       = "small";
    static IPAD        = "ipad";
    static MEDIUM      = "medium";
    static LARGE       = "large";
    static EXTRA_LARGE = "extra-large";

    static JS_EL        = null;
    static EL_CLASSNAME = 'js-mediaqueries';

    static setup() {

        MediaQueries.JS_EL = document.createElement('div');
        MediaQueries.JS_EL.className = MediaQueries.EL_CLASSNAME;
        document.body.appendChild(MediaQueries.JS_EL);

        MediaQueries.SMALL_BREAKPOINT  = { name: "Small", breakpoints: [ MediaQueries.SMALL ] };
        MediaQueries.MEDIUM_BREAKPOINT = { name: "Medium", breakpoints: [ MediaQueries.MEDIUM ] };
        MediaQueries.LARGE_BREAKPOINT  = { name: "Large", breakpoints: [ MediaQueries.IPAD, MediaQueries.LARGE, MediaQueries.EXTRA_LARGE ] };

        MediaQueries.BREAKPOINTS = [
            MediaQueries.SMALL_BREAKPOINT,
            MediaQueries.MEDIUM_BREAKPOINT,
            MediaQueries.LARGE_BREAKPOINT
        ];

    }

    static getDeviceState() {

        const re = /(\'|\")/;

        let value = window.getComputedStyle(MediaQueries.JS_EL).getPropertyValue("content");
        if (re.test(value.charAt(0)) && re.test(value.charAt(value.length-1))) {
            value = value.substr(1, value.length-2);
        }

        return value

    }

    static getBreakpoint() {

        const state    = MediaQueries.getDeviceState();
        let breakpoint = "";

        MediaQueries.BREAKPOINTS.forEach( (point, i) => {
            if (MediaQueries.BREAKPOINTS[i].breakpoints.indexOf(state) > -1) {
                breakpoint = point.name;
            }
        });

        return breakpoint;

    }

    static isBreakpoint(breakpoint) {

        let breakpointMatch = false;

        breakpoint.breakpoints.forEach( (point) => {
            if (point == MediaQueries.getDeviceState())
                breakpointMatch = true;
        });

        return breakpointMatch;

    }

}

export default MediaQueries;

window.MediaQueries = MediaQueries;
