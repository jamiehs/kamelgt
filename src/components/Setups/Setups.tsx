import React from 'react'
import './Setups.scss'
import {VCR_DISCORD_URL} from '../../data/constants'

import seasonSetups from '../../data/season-setups'
import trackData from '../../data/track-data'
const sortedRounds = seasonSetups.sort((a,b) => {
    return new Date(a.weekStart).valueOf() - new Date(b.weekStart).valueOf()
})

interface SetupsProps {
    upcomingWeeks: number
}
function Setups(props: SetupsProps) {
    const {upcomingWeeks} = props
    var outputRoundsCount = 0

    // Remove folder path and leading slash from raw filepath
    function cleanSetupName(filename) {
        return filename.replace(/^[^/]+\//, '')
    }

    console.log(trackData)

    return (
        <div className="Setups">
            <div className="rounds-grid">
                {sortedRounds.map((round, index) => {
                    let weekStartGmt = new Date(round.weekStart + 'T00:00+00:00')
                    let weekNumber = index + 1

                    // +7 days is for Monday/Tuesday rollover
                    // +5 days is for the week to end after the broadcast
                    let weekEndGmt = new Date(weekStartGmt.setDate(weekStartGmt.getDate() + 5))
                    
                    let upcomingRound = weekEndGmt > new Date();
                    const setupsExist = (round.setups?.audi90gto && round.setups?.audi90gto.length > 0) || (round.setups?.nissangtpzxt && round.setups?.nissangtpzxt.length > 0)

                    if(upcomingRound && outputRoundsCount < upcomingWeeks) {
                        outputRoundsCount++
                        return (
                            <div className="round-container" key={round.title}>
                                <h3><span className="week-prefix">Week {weekNumber}: </span>{round.title}</h3>
                                {round.notes && round.notes.length > 0 && (
                                    <div className="notes">
                                        {round.notes.map((note, i) => <div key={i} className="note badge light">{note}</div>)}
                                    </div>
                                )}
                                {setupsExist ? (
                                    <div className="cars-grid">
                                        {round.setups?.nissangtpzxt.length > 0 && (
                                            <div>
                                                <span className="car badge" data-class="first">Nissan GTP</span>
                                                <ul>
                                                    {round.setups?.nissangtpzxt.map(setup => (
                                                        <li key={setup.file} className="setup-row">
                                                            <a href={`/setups/nissangtpzxt/${setup.file}`}>{cleanSetupName(setup.file)}</a>
                                                            <span className="comment">{setup.comment}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {round.setups?.audi90gto.length > 0 && (
                                            <div>
                                                <span className="car badge" data-class="second">Audi GTO</span>
                                                <ul>
                                                    {round.setups?.audi90gto.map(setup => (
                                                        <li key={setup.file} className="setup-row">
                                                            <a href={`/setups/audi90gto/${setup.file}`}>{cleanSetupName(setup.file)}</a>
                                                            <span className="comment">{setup.comment}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="no-setups">
                                        Check the <a href={VCR_DISCORD_URL} target="_blank" rel="noreferrer">VCR Discord Server's</a> <code>#audi-setups</code> & <code>#nissan-setups</code> channels.
                                    </div>
                                )}
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            <div className="download-zips text-content">
                <p>You can download all the (recent-ish) setups for your car:</p>
                <ul>
                    <li>
                        <a href="/audi90gto-setups.zip">audi90gto-setups.zip</a>
                    </li>
                    <li>
                        <a href="/nissangtpzxt-setups.zip">nissangtpzxt-setups.zip</a>
                    </li>
                </ul>
                <p>
                    For the latest and greatest setups, along with discussion about wing angles, rake, camber, roll-bars, and tire pressures, check out the <code>#nissan-setups</code> and <code>#audi-setups</code> channels in <a href={VCR_DISCORD_URL} target="_blank" rel="noreferrer">the VCR Discord</a>.
                </p>
            </div>
        </div>
    );
}

export default Setups;