class NumberUtils {

    static MATH_COS    = Math.cos;
    static MATH_SIN    = Math.sin;
    static MATH_RANDOM = Math.random;
    static MATH_ABS    = Math.abs;
    static MATH_ATAN2  = Math.atan2;

    static limit(number, min, max) {
        return Math.min( Math.max(min, number), max );
    }

    static getRandomColor() {

        const letters = '0123456789ABCDEF'.split('');
        let color     = '#';

        for (let i = 0, len = 6; i < len; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }

        return color;

    }

    static getTimeStampDiff(date1, date2) {

        // Get 1 day in milliseconds
        const one_day = 1000*60*60*24;;
        const time    = {};

        // Convert both dates to milliseconds
        const date1_ms = date1.getTime();
        const date2_ms = date2.getTime();

        // Calculate the difference in milliseconds
        let difference_ms = date2_ms - date1_ms;

        // take out milliseconds
        difference_ms = difference_ms/1000;
        time.seconds  = Math.floor(difference_ms % 60);

        difference_ms = difference_ms/60;
        time.minutes  = Math.floor(difference_ms % 60);

        difference_ms = difference_ms/60;
        time.hours    = Math.floor(difference_ms % 24);

        time.days     = Math.floor(difference_ms/24);

        return time;

    }

    static map( num, min1, max1, min2, max2, round = false, constrainMin = true, constrainMax = true ) {

        if (constrainMin && num < min1) {
            return min2;
        }

        if (constrainMax && num > max1) {
            return max2;
        }
        
        const num1 = (num - min1) / (max1 - min1);
        const num2 = (num1 * (max2 - min2)) + min2;

        if (round) {
            return Math.round(num2);
        }

        return num2;

    }

    static toRadians( degree ) {
        return degree * ( Math.PI / 180 );
    }

    static toDegree( radians ) {
        return radians * ( 180 / Math.PI );
    }

    static isInRange( num, min, max, canBeEqual ) {
        if (canBeEqual) {
            return (num >= min && num <= max);
        } else {
            return (num >= min && num <= max);
        }
    }

    // convert metres in to m / KM
    static getNiceDistance(metres) {

        if (metres < 1000) {

            return `${Math.round(metres)}M`

        } else {

            const km = (metres/1000).toFixed(2);
            return `${km}KM`

        }

    }

}

export default NumberUtils;
