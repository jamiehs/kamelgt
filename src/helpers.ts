import moment from 'moment-timezone'

/**
 * Next Race Day
 * @param {integer} dayIndex 0 is Sunday and 6 is Saturday
 * @param {string} timeSlot eg: '17:00' a timeslot token
 * @param {string} nowString eg: '2022-08-01 12:00' used for testing
 * @returns JavaScript date object
 */
const nextRaceDay = (dayIndex: number, timeSlot: string, nowString: string|null = null) => {
    let nowMoment = moment.tz('GMT')
    if(nowString !== null) {
        nowMoment = moment.tz(nowString, 'GMT')
    }

    const today = nowMoment.isoWeekday();
    const nowHour = nowMoment.hour();
    const nowMinute = nowMoment.minute();
    const raceHour = parseInt(timeSlot.split(':')[0], 10);
    const raceMinute = parseInt(timeSlot.split(':')[1], 10);

    let momentObj = nowMoment

    if(today < dayIndex) {
        // race is upcoming
    } else if(today === dayIndex) {
        // race is today, still upcoming
        if(nowHour > raceHour && nowMinute > raceMinute) {
            // race was today
            momentObj = nowMoment.add(1, 'weeks')
        }
    } else {
        // race has passed
        momentObj = nowMoment.add(1, 'weeks')
    }

    return momentObj
        .isoWeekday(dayIndex)
        .hour(raceHour)
        .minute(raceMinute)
        .second(0)
        .toDate()
}


/**
 * Get Current Week Data
 * @param {array} seasonSetups the array of season events and setup files
 * @param {integer} rolloverDay 5 is after the broadcast; 7 is on Mon/Tues
 * @returns {object} a single week number, label & notes
 */
const getCurrentWeekData = (seasonSetups: Array<SetupWeek>, rolloverDay: number = 5): CurrentWeek => {
    const sortedRounds = seasonSetups.sort((a,b) => {
        return new Date(a.weekStart).valueOf() - new Date(b.weekStart).valueOf()
    });
    var currentWeek = {}
    
    sortedRounds.some((round, i) => {
        let weekStartGmt = new Date(round.weekStart + 'T00:00+00:00');

        // rolloverDay +7 days is for Monday/Tuesday rollover
        // rolloverDay +5 days is for the week to end after the broadcast
        let weekEndGmt = new Date(weekStartGmt.setDate(weekStartGmt.getDate() + rolloverDay));
        
        currentWeek = {
            week: round.week,
            label: round.title,
            notes: round.notes,
        }

        // Stop if this week is not over
        return weekEndGmt > new Date();
    })

    return currentWeek
}

/**
 * Local Date From String
 * @param {string} dateString input date: 2023-03-28 
 * @returns {string} as a local date: 28. März 2023
 */
const localDateFromString = (dateString: string): string => {
    const dateStringParts = dateString.split('-')
    const year = parseInt(dateStringParts[0], 10)
    const month = parseInt(dateStringParts[1], 10)
    const day = parseInt(dateStringParts[2], 10)

    const event: Date = new Date(Date.UTC(year, month-1, day, 0, 0, 0));
    const options: object = { year: 'numeric', month: 'short', day: 'numeric' };

    return event.toLocaleDateString(undefined, options)
}

/**
 * Date From String with Time
 * @param {String} dateString date in format 'YYYY-MM-DD'
 * @param {String} timeString time in GMT 24h format '17:00'
 * @returns Date
 */
const dateTimeFromString = (dateString: string, timeString: string): Date => {
    const dateStringParts = dateString.split('-')
    const year = parseInt(dateStringParts[0], 10)
    const month = parseInt(dateStringParts[1], 10)
    const day = parseInt(dateStringParts[2], 10)

    const timeStringParts = timeString.split(':')
    const hour = parseInt(timeStringParts[0], 10)
    const minute = parseInt(timeStringParts[1], 10)

    return new Date(Date.UTC(year, month-1, day, hour, minute, 0));
}

/**
 * Add Days to Date
 * https://stackoverflow.com/a/19691491/24559
 * @param {Date} date input date
 * @param {integer} days number of days to add
 * @returns Date
 */
const addDaysToDate = (date: Date, days: number): Date => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const getYouTubeId = (url: string): string|null => {
    let matches = url.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/)
    if(matches) {
        return matches[1]
    }
    return null
}

const toLocaleStringIfNumber = (input: any): string => {
    if(isNaN(input)) {
        return input
    }
    return Number(input).toLocaleString()
}

/**
 * Number as K notation with one decimal
 * 
 * This is to replicate the Race Labs display of iRating as
 * 2.2K for 2,280 etc.
 * @param {integer} input 
 * @returns string
 */
const numberAsK = (input: number): string => {
    return `${(input / 1000).toFixed(1)}K`
}



export {
    getYouTubeId,
    nextRaceDay,
    getCurrentWeekData,
    localDateFromString,
    addDaysToDate,
    toLocaleStringIfNumber,
    numberAsK,
    dateTimeFromString,
}