import './Timeslot.scss';
import moment from 'moment-timezone';
import React from 'react';

import {nextRaceDay, numberAsK, toLocaleStringIfNumber} from '../../helpers'

// prevents GMT race days from being localized or shifted inadvertently
const dayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]

// If the time looks America-ish, we remove the leading zeros from
// the local time string.
const stripLeadingZeroIfAmericas = (timeString, timeZone) => {
    if(timeZone.match(/america/i) && timeString.match(/(a|p)m$/i)) {
        return timeString.replace(/^0/, '')
    }
    return timeString
}

// Wraps the emoji at the start of the string with a span
// alternatively it simply returns the input if emoji is not present.
const wrapEmojiAtStart = (input: string) => {
    let pattern = new RegExp(/^(\p{Emoji})/ug)
    let found = input.match(pattern)
    let inputWithoutFirstChar = input.replace(pattern, '')
    if(found && found.length) {
        return [<span key={input} className="emoji">{found}</span>, inputWithoutFirstChar]
    }
    return input
}

interface Timeslot {
    interval: ReturnType<typeof setInterval>
}
interface TimeslotProps {
    label: string
    dayIndex: number
    time: string
    entries: number
    gtoSof: number
    gtpSof: number
    children: JSX.Element
    regularity: string
}
interface TimeslotState {
    timestamp: number
}
class Timeslot extends React.Component<TimeslotProps, TimeslotState> {
    constructor(props) {
        super(props)
        this.state = {
            timestamp: Date.now()
        }
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setState({ timestamp: Date.now() }), 1000);
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
            gtoSof,
            gtpSof,
            children,
            regularity,
        } = this.props
    
        const tz = moment.tz.guess()
        const nextRaceDate = nextRaceDay(dayIndex, time)
        const nextRaceDayLocal = nextRaceDate.toLocaleDateString(undefined, { weekday: 'long' })
        const nextRaceTimeLocal = nextRaceDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        const avgSof = Math.round((gtoSof + gtpSof) / 2)

        return (
            <div className="Timeslot">
                <h3 className="label">{wrapEmojiAtStart(label)}</h3>
                {regularity && (
                    <div className="official-likelihood">
                        <div className="badge">
                            {regularity}
                        </div>
                    </div>
                )}
                <div className="timeslot-date">
                    <div className="date-gmt">
                        <div className="date-label">GMT</div>
                        <div className="date-time">{dayLabels[dayIndex]} {time}</div>
                    </div>
                    <div className="date-local">
                        <div className="date-label">{tz.replace('_', ' ')}</div>
                        <div className="date-time">{nextRaceDayLocal} {stripLeadingZeroIfAmericas(nextRaceTimeLocal, tz)}</div>
                    </div>
                </div>
                <div className="timeslot-participation">
                    {entries && (
                        <div>
                            <div className="badge drivers">
                                Drivers: {toLocaleStringIfNumber(entries)}
                            </div>
                        </div>
                    )}
                    {(gtoSof && gtpSof) ? (
                        <div>
                            <div className="badge sof">
                                <abbr title="Strength of Field">SoF</abbr>: <span className="sof-combined" title={`GTP: ${gtpSof}, GTO: ${gtoSof}`}>{numberAsK(avgSof)}</span>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className="timeslot-info">
                    {children}
                </div>
            </div>
        );
    }
}

export default Timeslot;
