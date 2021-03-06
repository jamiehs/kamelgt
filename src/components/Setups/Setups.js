import './Setups.scss'
import {VCR_DISCORD_URL} from '../../data/constants'

import seasonSetups from '../../data/season-setups.json';
const sortedRounds = seasonSetups.sort((a,b) => {return new Date(a.weekStart) - new Date(b.weekStart)});

function Setups(props) {
    const {upcomingWeeks} = props;
    var outputRoundsCount = 0;

    return (
        <div className="Setups">
            <div className="rounds-grid">
                {sortedRounds.map((round) => {
                    let weekStartGmt = new Date(round.weekStart + 'T00:00+00:00');
                    let weekEndGmt = new Date(weekStartGmt.setDate(weekStartGmt.getDate() + 7));
                    let upcomingRound = weekEndGmt > new Date();
                    const setupsExist = (round.audi90gto && round.audi90gto.length > 0) || (round.nissangtpzxt && round.nissangtpzxt.length > 0);

                    if(upcomingRound && outputRoundsCount < upcomingWeeks) {
                        outputRoundsCount++;
                        return (
                            <div className="round-container" key={round.label}>
                                <h3><span className="week-prefix">Week {round.week}: </span>{round.label}</h3>
                                {setupsExist ? (
                                    <div className="cars-grid">
                                        {round.audi90gto.length > 0 && (
                                            <div>
                                                <span className="car badge">Audi GTO</span>
                                                <ul>
                                                    {round.audi90gto.map(setup => (
                                                        <li key={setup.file}>
                                                            <a href={`/setups/audi90gto/${setup.file}`}>{setup.file}</a>
                                                            <span className="comment">{setup.comment}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {round.nissangtpzxt.length > 0 && (
                                            <div>
                                                <span className="car badge">Nissan GTP</span>
                                                <ul>
                                                    {round.nissangtpzxt.map(setup => (
                                                        <li key={setup.file}>
                                                            <a href={`/setups/nissangtpzxt/${setup.file}`}>{setup.file}</a>
                                                            <span className="comment">{setup.comment}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="no-setups">
                                        There are no recent setups in the archive yet. Check the <a href={VCR_DISCORD_URL} target="_blank" rel="noreferrer">VCR Discord Server's</a> <code>#audi-setups</code> & <code>#nissan-setups</code> channels, or check here again closer to the race date.
                                    </div>
                                )}
                            </div>
                        )
                    }
                    return null;
                })}
            </div>
            <div className="download-zips">
                <p>If you prefer, you can download all the (recent-ish) setups for your car:</p>
                <ul>
                    <li>
                        <a href="/audi90gto-setups.zip">audi90gto-setups.zip</a>
                    </li>
                    <li>
                        <a href="/nissangtpzxt-setups.zip">nissangtpzxt-setups.zip</a>
                    </li>
                </ul>
                <p>
                    For the latest and greatest setups, along with discussion about wing angles, rake, camber, roll-bars, and tire pressures, check out the <code>#nissan-setups</code> and <code>#audi-setups</code> channels in <a href="#chatter">the VCR Discord</a>.
                </p>
            </div>
        </div>
    );
}

export default Setups;