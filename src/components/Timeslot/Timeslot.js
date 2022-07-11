import './Timeslot.scss';
import moment from 'moment-timezone';
import React from 'react';

// prevents GMT race days from being localized or shifted inadvertantly
const dayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]
class Timeslot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: Date.now()
        }
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let {
            label,
            dayIndex,
            time,
            entries,
            sof,
            children,
        } = this.props
    
        const tz = moment.tz.guess()
        const nextRaceDate = moment.tz(nextRaceDay(dayIndex, time), tz)
        const nextRaceDayLocal = nextRaceDate.toDate().toLocaleDateString(undefined, { weekday: 'long' })
        const nextRaceTimeLocal = nextRaceDate.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    
        return (
            <div className="Timeslot">
                <h3 className="label">{label}</h3>
                <div className="timeslot-date">
                    <div className="date-gmt">
                        <div className="date-label">GMT</div>
                        <div className="date-time">{dayLabels[dayIndex]} {time}</div>
                    </div>
                    <div className="date-local">
                        <div className="date-label">{tz.replace('_', ' ')}</div>
                        <div className="date-time">{nextRaceDayLocal} {nextRaceTimeLocal}</div>
                    </div>
                </div>
                <div className="timeslot-participation">
                    {entries && (
                        <div>
                            <div className="badge drivers">
                                Drivers: {entries}
                            </div>
                        </div>
                    )}
                    {sof && (
                        <div>
                            <div className="badge sof">
                                <abbr title="Strength of Field">SOF</abbr>: {sof}
                            </div>
                        </div>
                    )}
                </div>
                <div className="timeslot-info">
                    {children}
                </div>
            </div>
        );
    }
}

export default Timeslot;


function nextRaceDay(raceDay, time) {
    const today = moment.tz().isoWeekday();
    const nowHour = parseInt(moment.tz().hour(), 10);
    const nowMinute = parseInt(moment.tz().minute(), 10);
    const raceHour = parseInt(time.split(':')[0], 10);
    const raceMinute = parseInt(time.split(':')[1], 10);

    let momentObj = moment.tz()

    if(today < raceDay) {
        // race is upcoming
    } else if(today === raceDay) {
        // race is today, still upcoming
        if(nowHour > raceHour && nowMinute > raceMinute) {
            // race was today
            momentObj = moment.tz().add(1, 'weeks')
        }
    } else {
        // race has passed
        momentObj = moment.tz().add(1, 'weeks')
    }

    return momentObj
        .isoWeekday(raceDay)
        .hour(raceHour)
        .minute(raceMinute)
        .second(0)
}
