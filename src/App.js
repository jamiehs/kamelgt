import './App.scss';
import React from 'react';
import Fuse from 'fuse.js';
import Timeslot from './components/Timeslot/Timeslot.js';
import Broadcast from './components/Broadcast/Broadcast.js';
import Announcement from './components/Announcement/Announcement.js';
import VideoSpotlight from './components/VideoSpotlight/VideoSpotlight.js';
import Setups from './components/Setups/Setups.js';
import seasonSetups from './data/season-setups.json';
import broadcasts from './data/broadcasts';
import {VCR_DISCORD_URL} from './data/constants';
import { ReactComponent as DiscordIcon } from './images/Discord-Logo-Color.svg';
import { ReactComponent as DownloadSetupIcon } from './images/download-setup.svg';
import {getCurrentWeekData, localDateFromString} from './helpers.js';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentWeekData: getCurrentWeekData(seasonSetups),
            broadcastsSeason: broadcasts[broadcasts.length-1].id,
            broadcastSearchQuery: null,
        }
    }
    componentDidMount() {
        this.interval = setInterval(() => this.setState({
            currentWeekData: getCurrentWeekData(seasonSetups)
        }), 1000);

        this.flattenedBroadcasts = broadcasts.map((season) => {
            return season.youTube.map((event, index) => {
                const round = index + 1
                return {
                    id: season.id,
                    label: season.label,
                    round: round,
                    title: event.title,
                    alternateTitle: event.alternateTitle,
                    url: event.url,
                }
            })
        }).flat()

        this.fuse = new Fuse(this.flattenedBroadcasts, {
            keys: ['title', 'alternateTitle'],
            threshold: 0.2,
            distance: 200,
            minMatchCharLength: 1,
            shouldSort: false,
        })
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    handleBroadcastSeasonChange(event) {
        const selectedSeason = event.target.value
        this.setState({
            broadcastsSeason: selectedSeason
        })
    }

    handleSearch(event) {
        this.setState({
            broadcastSearchQuery: event.target.value,
            broadcastSearchResults: this.fuse.search(event.target.value).reverse(),
        })
    }

    render() {
        let currentWeek = this.state.currentWeekData
        let {
            broadcastSearchQuery,
            broadcastSearchResults
        } = this.state

        const hasBroadcastSearchQuery = broadcastSearchQuery && broadcastSearchQuery !== ''

        return (
            <div className="App">
                <header className="main-header">
                    <div className="header-section">
                        <h1>Kamel GT Championship</h1>
                        <h2>Nissan GTP ZX-T &amp; Audi 90 GTO</h2>
                    </div>
                </header>

                <div className="intro section">
                    <div className="intro-copy">
                        <p>
                            Kamel GT is a &ldquo;low participation series&rdquo;. There is great racing in this series but you will need to show up at specific times. The time slots below are the most popular ones; if you want a time slot that isn&rsquo;t here, you will need to start the discussion and get people to&nbsp;show&nbsp;up.
                        </p>
                        <span className="discord inline-callout intro-callout">
                            <DiscordIcon /><a href={VCR_DISCORD_URL} target="_blank" rel="noreferrer">Discord Server</a>
                        </span>
                        <span className="setups inline-callout intro-callout">
                            <DownloadSetupIcon /><a href="#setups">Download Setups</a>
                        </span>
                    </div>
                </div>
                <div id="announcements">
                    <div className="section">
                        <Announcement begins="2023-06-26" expires="2023-07-14">
                            <h3>
                                We have proposed two additional time slots
                            </h3>
                            <p>
                                These are good for US Pacific, Australia, New Zealand & Japan. See the <a href="#proposed-timeslots">proposed times below</a>!
                            </p>
                        </Announcement>
                    </div>
                </div>
                <VideoSpotlight
                    youTubeUrl="https://youtu.be/1Dd8jGkICr4"
                    subheading="This one was posted by iRacing on their official YouTube channel!"
                    linkText="iRacing Kamel GT - Epic GTO Battle for the Lead"
                >
                    Jouko Leskela and Ville Ruola battle for the GTO lead in the Kamel GT Series - side by side for a lap and a half!  Massive respect from everyone involved, including the faster GTP cars behind.
                </VideoSpotlight>
                <div className="timeslots-container">
                    <div id="timeslots" className="timeslots-wrapper">
                        <div className="section">
                            <header>
                                <h2 className="title">
                                    Official Race Times
                                    {currentWeek && (
                                        <span className="week-info">
                                            Week {currentWeek.week}: {currentWeek.label}
                                        </span>
                                    )}
                                </h2>
                                {currentWeek.notes && currentWeek.notes.length > 0 && (
                                    <div className="notes">
                                        {currentWeek.notes.map((note, i) => <div key={i} className="note badge light">{note}</div>)}
                                    </div>
                                )}
                            </header>
                            <div className="timeslots">
                                <Timeslot
                                    label="Midweek Madness"
                                    dayIndex={3}
                                    time="19:00"
                                    entries="56"
                                    gtoSof="2975"
                                    gtpSof="3197"
                                >
                                    <p>
                                        If you can race at this time, you will find entrants from beginner to veteran. Field size can vary greatly by&nbsp;track.
                                    </p>
                                </Timeslot>
                                <Timeslot
                                    label="Midweek Americas"
                                    dayIndex={4}
                                    time="01:00"
                                    entries="31"
                                    gtoSof="1947"
                                    gtpSof="2098"
                                >
                                    <p>
                                        Wednesday race for the US time zones. Early evening on the west coast and late evening on the east&nbsp;coast.
                                    </p>
                                </Timeslot>
                                <Timeslot
                                    label="Friday Night Race"
                                    dayIndex={5}
                                    time="21:00"
                                    entries="41"
                                    gtoSof="2379"
                                    gtpSof="2158"
                                >
                                    <p>
                                        The big race that is not the broadcast race. If you want a full field to practice/compete in, this&nbsp;is&nbsp;it.
                                    </p>
                                </Timeslot>
                                <Timeslot
                                    label="Pacific Americas"
                                    dayIndex={6}
                                    time="03:00"
                                    entries="20"
                                    gtoSof="2342"
                                    gtpSof="1632"
                                >
                                    <p>
                                        Uses the 03:00 GMT time slot as an alternative to the "Midweek Americas" slot. This is around noon on Saturday in Australia!
                                    </p>
                                </Timeslot>
                                <Timeslot
                                    label="🎥 Broadcast Race"
                                    dayIndex={6}
                                    time="17:00"
                                    entries="68"
                                    gtoSof="3017"
                                    gtpSof="3635"
                                >
                                    <p>
                                        <b>Our weekly broadcast race.</b> This will usually have the most participants and may split. <a href="https://www.youtube.com/user/GSRCBroadcasting/videos" target="_blank" rel="noreferrer">Broadcasted live&nbsp;on&nbsp;GSRC</a>
                                    </p>
                                </Timeslot>
                                <Timeslot
                                    label="Australia & NZ"
                                    dayIndex={0}
                                    time="09:00"
                                    entries="10"
                                    gtoSof="2265"
                                    gtpSof="2507"
                                    regularity="new for 23S3"
                                >
                                    <p>
                                        5pm in the west & 7pm in the east of Australia; 9pm in New Zealand. This is also late-morning for much of Europe. 
                                    </p>
                                </Timeslot>
                            </div>
                            <div className="footnote">Drivers &amp; SoF numbers averaged from 2023 Season 3 data</div>
                        </div>
                    </div>
                </div>
                <div id="faq" className="faq section">
                    <h2 className="title">Common Questions</h2>
                    <dl className="text-content">
                        <dt>When are the races?</dt>
                        <dd>
                            <p>
                                The official race slots shown above in your local times are the only races guaranteed to go official. Like other low-participation series, you may see other sessions going official during a week when the Nordschleife or Le Mans is on the schedule. If you want to race, just practice and show up to one of the <a href="#timeslots">times posted on&nbsp;this&nbsp;page</a>.
                            </p>
                        </dd>

                        <dt>Is this a league?</dt>
                        <dd>
                            <p>
                                No. We run the official iRacing scheduled races 3 times per week and the Saturday race is broadcasted live on GSRC. Points are calculated for this broadcast race. 1st and 2nd splits are scored, and there are two cups: VCR Championship and VCR Junior (junior is &lt; 2800 iRating) See <code>#vcr-rules</code> and <code>#vcr-standings</code> in the <span className="inline-discord-callout"><a href={VCR_DISCORD_URL} target="_blank" rel="noreferrer">VCR Discord Server</a> for&nbsp;more&nbsp;info.</span> 
                            </p>
                        </dd>

                        <dt>Do I need to pit?</dt>
                        <dd>
                            <p>
                                Maybe. Two of the twelve races per season will require a pit stop; these are 60 minute races. The other 10 races are 40 minutes long, or (rarely) a number of laps approximating 40 or 60 minutes; usually Le Mans, Monza Combined, or the Nordschleife.
                            </p>
                        </dd>

                        <dt>Where can I get a setup?</dt>
                        <dd>
                            <ul>
                                <li>
                                    The section below on this page should have a list of setups, or links to dowload archives of setups for&nbsp;each&nbsp;car.
                                </li>
                                <li>
                                    The <code>#audi-setups</code> and <code>#nissan-setups</code> channels on the <span className="inline-discord-callout"><a href={VCR_DISCORD_URL} target="_blank" rel="noreferrer">VCR Discord Server</a> are active and new setups are typically posted multiple times per week.</span>
                                </li>
                                <li>
                                    There is also <a href="https://forums.iracing.com/discussion/9089/audi-90-gto-setup-packs" target="_blank" rel="noreferrer">a thread in the iRacing forums for the Audi</a>.
                                </li>
                                <li>
                                    One of our regulars, Laust has been posting <a href="https://forums.iracing.com/discussion/29309/nissan-gtp-setups-22s4" target="_blank" rel="noreferrer">Nissan setups in the forums</a> as well.
                                </li>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <div id="setups" className="setups section">
                    <h2 className="title">Setups</h2>
                    <Setups upcomingWeeks={3} />
                </div>
                <div className="format section">
                    <h2 className="title">Race Format</h2>
                    <ul className="text-content">
                        <li>
                            <p>
                                <strong>Multiclass series</strong> featuring the Nissan GTP &amp; Audi GTO
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Rolling start</strong>, GTO field leaves a generous gap to the GTPs ahead
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Ten races per season are 40 minutes long</strong>; require no pitstop
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Two races per season are ~60 minute "endurance" rounds</strong> that may require a pit stop and may be counted in laps
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>Tires and fuel are worked on at the same time</strong> during a pit stop
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="tips section">
                    <h2 className="title">Race Tips</h2>
                    <div className="text-content">
                        <h3>For GTP Drivers:</h3>
                        <ol>
                            <li>
                                <p>
                                    The Audi understeers a lot and uses the whole track. What might look like opening a door is just the Audi preparing to take the apex. Follow some Audis in practice to identify where they are likely to track out.
                                </p>
                            </li>
                            <li>
                                <p>
                                    The GTP stops more quickly than the GTO can. If you pass a GTO and then pull in front of it into the braking zone, you may very well get hit from behind. It's hard to avoid a slowing GTP when already hard on the brakes.
                                </p>
                            </li>
                        </ol>
                        <h3>For GTO Drivers:</h3>
                        <ol>
                            <li>
                                <p>
                                    Do not try to move out of the way or let GTPs by. Choose your line and stick to it. This communicates to the faster class that they should navigate around you. Do not move or react unexpectedly. Be predictable.
                                </p>
                            </li>
                            <li>
                                <p>
                                    If you are missing shifts, try to pre-select the gear when upshifting and <em>then</em> press the clutch; flat-shift, there is no need to lift. When downshifting you just need to blip as you select the gear; no clutch needed. For more info on shifting the Audi, see <a href="#shifting">Taming the Audi 90 GTO gearbox</a> below.
                                </p>
                            </li>
                        </ol>
                        <h4>For everyone:</h4>
                        <p><a href="https://yousuckatracing.com/2021/04/07/the-vortex-of-danger-is-your-fault/" target="_blank" rel="noreferrer">The vortex of danger</a> is real. Read about it and understand how it applies to your racing.</p>
                        <p>We aspire to be a fun &amp; exciting series made up of a civilized group of racers. There's no need to moan and whine when you wreck, and you can get protested for your conduct just like in any other iRacing series. Remember the human on the other side of the connection. Remember that netcode and mistakes are facts of life/racing.</p>
                    </div>
                </div>
                <div id="broadcasts" className="broadcast section">
                    <h2 className="title">Previous Broadcast Races</h2>
                    <div className="broadcast-season-selector" data-disabled={hasBroadcastSearchQuery}>
                        <h3>Choose a season:</h3>
                        <select
                            disabled={hasBroadcastSearchQuery}
                            className="broadcast-season"
                            defaultValue={this.state.broadcastsSeason}
                            onChange={(event) => this.handleBroadcastSeasonChange(event)}
                        >
                            {broadcasts.slice().reverse().map(season => (
                                <option key={season.id} value={season.id}>
                                    {season.id}
                                    {`: `}
                                    {localDateFromString(season.startDate)}
                                    &#8201;&ndash;&#8201;
                                    {localDateFromString(season.endDate)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="broadcast-searcher">
                        <h3>Search all broadcasts:</h3>
                        <div className="search-controls">
                            <input type="search" placeholder="lime rock park" onChange={(event) => {this.handleSearch(event)}} />
                        </div>
                    </div>

                    {hasBroadcastSearchQuery ? (
                        broadcastSearchResults.length > 0 ? (
                            <div className="videos-grid">
                                {broadcastSearchResults.map(result => {
                                    return (
                                        <Broadcast
                                            key={`${result.item.url}.${result.item.id}.${result.item.title}`}
                                            title={`${result.item.id} - R${result.item.round}: ${result.item.title}`}
                                            url={result.item.url}
                                        />
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="no-results">No results</div>
                        )
                    ) : (
                        broadcasts.map(season => {
                            if(season && season.id === this.state.broadcastsSeason) {
                                return (
                                    <div key={season.id} className="videos-grid">
                                        {season.youTube.map((week, index) => {
                                            const round = index + 1
                                            const {url, title} = week
                                            if(title && title !== '') {
                                                return (
                                                    <Broadcast
                                                        key={`${season.id}.${url}.${title}`}
                                                        title={`R${round}: ${title}`}
                                                        url={url}
                                                    />
                                                )
                                            } else {
                                                return null // no valid URL or title
                                            }
                                        })}
                                    </div>
                                )
                            } else {
                                return null // season is invalid or missing
                            }
                        })
                    )}
                </div>
                <div id="shifting" className="audi-shifting section">
                    <h2 className="title">Taming the Audi <span className="hidden-xs">90 GTO</span> Gearbox</h2>
                    
                    
                    <h3>Why are you missing shifts?</h3>
                    <p>
                        In a real manual transmission car, the shifting is intuitive and happens simultaneously with clutch movement. However in sim racing, the h-pattern shifter needs to send the signal to the sim that the gear is engaged; this signal can take time to fully register as you shift out of one gear, into neutral, and into the other gear. If you happen to release the clutch even a millisecond before your shifter tells the sim that you are in gear again, you will find neutral instead.
                    </p>

                    <p>
                        If you are missing shifts constantly, slow down your shifting process.
                    </p>

                    <div className="highlight">
                        <h3>A note about pre-selecting gears</h3>
                        <p>
                            You may have heard someone suggest pre-selecting gears; while it removes some of the immersion, it can help with missed shifts quite a bit. iRacing even references it in <a href="https://support.iracing.com/support/solutions/articles/31000157032-transmission-gearbox-shifting-types-method" target="_blank" rel="noreferrer">their FAQ about shifting</a> under "Synchromesh H-Pattern".
                        </p>
                        <blockquote>
                            You may pre-select gears by moving the shifter into the position for the next gear before you intend to shift. The load on the transmission from the will hold the car in its current gear, and the gear change will not begin until you release load the transmission via a blip on downshift, a lift for an upshift, or press in the clutch to engage the next gear.
                        </blockquote>
                        <p>
                            If you're missing upshifts, we suggest you try pre-selecting gears; it only has to be a little before the clutch press.
                        </p>
                    </div>

                    <h3>Types of shifting setups</h3>
                    <p>
                        The following combinations of shifter setups for the Audi are all valid and work fine.
                    </p>
                    <ul>
                        <li>
                            <p><b>H-Pattern shifter and a clutch pedal</b><br />
                            Slam those gears in like a Group B rally driver; have fun! (pre-select if you need to).</p>
                        </li>
                        <li>
                            <p><b>H-Pattern shifter and a clutch button mapped to your wheel</b><br />
                            Hit the clutch button (immediately after) upshifts, blip on downshifts.</p>
                        </li>
                        <li>
                            <p><b>H-Pattern shifter and no clutch ("Anti-Stall Clutch" assist on)</b><br />
                            Pre-select and then lift briefly to upshift; blip on downshifts. It is still recommended to map a clutch button in this situation as a tap of the clutch can rescue you from a false neutral.</p>
                        </li>
                        <li>
                            <p><b>Paddles and a clutch pedal</b><br />
                            Be sure to hold the paddle for the duration of the shift; only after the gear is in can you let go!</p>
                        </li>
                        <li>
                            <p><b>Paddles and a clutch button mapped to your wheel</b><br />
                            Be sure to hold the paddle for the duration of the shift (pre-select); press the button to complete the shift.</p>
                        </li>
                        <li>
                            <p><b>Paddles and auto-clutch</b><br />
                            Be sure to hold the paddle for the entire duration of the shift!</p>
                        </li>
                        <li>
                            <p><b>H-Pattern shifter and auto-clutch</b><br />
                            The sim should take care of everything except the actual shifting for you!</p>
                        </li>
                    </ul>

                    <p>
                        Dave Cam on YouTube created <a href="https://www.youtube.com/watch?v=uTBmMDmNMUk" target="_blank" rel="noreferrer">a great video where he benchmarks the different clutch assists</a> in iRacing. tl;dw: anything other than 'None' or 'Anti-Stall Clutch' will make you a bit slower. Keep in mind that as a beginner in Kamel, survival is the goal, not speed!
                    </p>

                    <h3>Upshifting</h3>
                    <p>
                        You can flat-shift in the Audi most of the time. Just keep your foot on the accelerator and change gear while hitting the clutch quickly. This will unload the transmission and the gear should go in immediately. On slower upshifts (ones that occur in slow corners or out of chicanes) you may get better performance by shifting slowly and intentionally (lift, clutch, shift, release clutch).
                    </p>

                    <h3>Downshifting</h3>
                    <p>
                        While heel & toe makes you feel like Hans-Joachim Stuck, it's not necessary in this car.
                    </p>
                    <p>
                        You can simply left-foot brake and blip the throttle while downshifting. This works better for some of us than others, but it can be a great help when starting out in the Audi. <i>Note: It's technically not necessary to blip as some folks can downshift without blipping. Your mileage may vary!</i>
                    </p>
                    <p>
                        See <a href="https://www.youtube.com/watch?v=gNqVtUF6Vj0" target="_blank" rel="noreferrer">Phil's Audi 90 shifting video</a> for more details on all of the above.
                    </p>

                    <h3>Clutch calibration</h3>
                    <p>
                        It can be helpful to "short-calibrate" your clutch too. The idea is to avoid taking too long to fully depress the clutch during a shift. To short-calibrate your clutch, simply follow the iRacing calibration wizard but only press your clutch pedal 20% - 25% while calibrating. This tells iRacing that 25% clutch in the real-world is 100% clutch in the sim. You'll still press it much further than 25% during a race, but the sim will register 100% clutch input every time and this will help ensure your shifts complete correctly.
                    </p>

                    <hr />

                    <p>Hopefully this information helps you avoid "a box full of neutrals".</p>



                </div>
            </div>
        )
    }
}

export default App;
