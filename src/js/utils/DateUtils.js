class DateUtils

	// dateString should be in dd/mm/yy format

	static getLocalDate( dateString, timeString, dayCorrection=0 ) {

		const splitted   = dateString.split '/';
		const dateString = [splitted[1], splitted[0], "20" + splitted[2]].join('/')
		const d          = new Date `${dateString} ${timeString} UTC`
		const timestamp  = d.getTime() + 10800000 + dayCorrection * 86400000

		return new Date(timestamp);

	}

export default DateUtils;
