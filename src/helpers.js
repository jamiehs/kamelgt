import moment from 'moment-timezone'

/**
 * Next Race Day
 * @param {integer} dayIndex 0 is Sunday and 6 is Saturday
 * @param {string} timeSlot eg: '17:00' a timeslot token
 * @param {string} nowString eg: '2022-08-01 12:00' used for testing
 * @returns JavaScript date object
 */
const nextRaceDay = (dayIndex, timeSlot, nowString = null) => {
    let nowMoment = null
    if(nowString === null) {
        nowMoment = moment.tz('GMT')
    } else {
        nowMoment = moment.tz(nowString, 'GMT')
    }

    const today = nowMoment.isoWeekday();
    const nowHour = parseInt(nowMoment.hour(), 10);
    const nowMinute = parseInt(nowMoment.minute(), 10);
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


export {
    nextRaceDay,
}