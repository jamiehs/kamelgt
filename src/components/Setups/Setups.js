import './Setups.scss';

import seasonSetups from '../../data/season-setups.json';
const sortedRounds = seasonSetups.sort((a,b) => {return new Date(a.weekStart) - new Date(b.weekStart)});

function sortSetups(a, b) {
    return b.file > a.file ? 1 : -1;
}

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

                    if(setupsExist && upcomingRound && outputRoundsCount < upcomingWeeks) {
                        console.log(round)
                        outputRoundsCount++;
                        return (
                            <div className="round-container" key={round.label}>
                                <h3><span className="week-prefix">Week {round.week}: </span>{round.label}</h3>
                                <div className="cars-grid">
                                    {round.audi90gto.length > 0 && (
                                        <div>
                                            <span className="car badge">Audi GTO</span>
                                            <ul>
                                                {round.audi90gto.sort(sortSetups).map(setup => (
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
                                                {round.nissangtpzxt.sort(sortSetups).map(setup => (
                                                    <li key={setup.file}>
                                                        <a href={`/setups/nissangtpzxt/${setup.file}`}>{setup.file}</a>
                                                        <span className="comment">{setup.comment}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
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