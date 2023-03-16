import './Timeslot.scss';
import moment from 'moment-timezone';
import React from 'react';

import {nextRaceDay} from '../../helpers.js'

// prevents GMT race days from being localized or shifted inadvertantly
const dayLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]

const toLocaleStringIfNumber = (input) => {
    if(isNaN(input)) {
        return input
    }

    return Number(input).toLocaleString()
}

class Timeslot extends React.Component {
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
            sof,
            children,
            guaranteed,
        } = this.props
    
        const tz = moment.tz.guess()
        const nextRaceDate = nextRaceDay(dayIndex, time)
        const nextRaceDayLocal = nextRaceDate.toLocaleDateString(undefined, { weekday: 'long' })
        const nextRaceTimeLocal = nextRaceDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

        return (
            <div className="Timeslot" data-guaranteed={guaranteed}>
                <h3 className="label">{label}</h3>
                <div className="official-likelihood">
                    <div className="badge">
                        {guaranteed ? (
                            'Always official'
                        ) : (
                            'Often official'
                        )}
                    </div>
                </div>
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
                                Drivers: {toLocaleStringIfNumber(entries)}
                            </div>
                        </div>
                    )}
                    {sof && (
                        <div>
                            <div className="badge sof">
                                <abbr title="Strength of Field">SOF</abbr>: {toLocaleStringIfNumber(sof)}
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
