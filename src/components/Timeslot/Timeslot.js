import './Timeslot.scss';
import moment from 'moment-timezone';

function Timeslot(props) {
    let {
        dayIndex,
        time,
        entries,
        sof,
        children,
    } = props
    

    const tz = moment.tz.guess()
    const nextRaceDate = moment.tz(nextRaceDay(dayIndex, time), tz)
    const nextRaceDayLocal = nextRaceDate.toDate().toLocaleDateString(undefined, { weekday: 'long' })
    const nextRaceDayEng = nextRaceDate.toDate().toLocaleString('en-us', {weekday:'long'})
    const nextRaceTimeLocal = nextRaceDate.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})

    return (
        <div className="Timeslot">
            <div className="timeslot-date">
                <div className="date-gmt">
                    <div className="date-label">GMT</div><br />
                    <div className="date-time">{nextRaceDayEng} {time}</div>
                </div>
                <div className="date-local">
                    <div className="date-label">{tz.replace('_', ' ')}</div><br />
                    <div className="date-time">{nextRaceDayLocal} {nextRaceTimeLocal}</div>
                </div>
            </div>
            <div className="timeslot-participation">
                <div>
                    <div className="participation-badge drivers">
                        Drivers: {entries}
                    </div>
                </div>
                <div>
                    <div className="participation-badge sof">
                        <abbr title="Strength of Field">SOF</abbr>: {sof}
                    </div>
                </div>
            </div>
            <div className="timeslot-info">
                {children}
            </div>
        </div>
    );
}

export default Timeslot;


function nextRaceDay(dayIndex, time) {
    const today = moment.tz().isoWeekday();

    // if we haven't yet passed the day of the week that I need:
    if (today <= dayIndex) { 
        // then just give me this week's instance of that day
        return moment.tz()
            .isoWeekday(dayIndex)
            .hour(time.split(':')[0])
            .minute(time.split(':')[1])
            .second(0)
    } else {
        // otherwise, give me *next week's* instance of that same day
        return moment.tz().add(1, 'weeks')
            .isoWeekday(dayIndex)
            .hour(time.split(':')[0])
            .minute(time.split(':')[1])
            .second(0)
    }    
}
