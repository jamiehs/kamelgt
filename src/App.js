import './App.scss';
import Timeslot from './components/Timeslot/Timeslot.js';
import Server from './components/Server/Server.js';
import Broadcast from './components/Broadcast/Broadcast.js';
import Setups from './components/Setups/Setups.js';
import {VCR_DISCORD_URL, DTRL_DISCORD_URL} from './data/constants';
import discord from './images/Discord-Logo-Color.svg'

function App() {
    return (
        <div className="App">
            <header>
                <div className="header-section">
                    <h1>Kamel GT Championship</h1>
                    <h2>Nissan GTP ZX-T &amp; Audi 90 GTO</h2>
                </div>
            </header>

            <div className="intro section">
                <div className="intro-copy">
                    <p>
                        Kamel GT is a &ldquo;low participation series&rdquo;. There is great racing in this series but you will need to show up at specific times. The timeslots below are the most popular ones; if you want a timeslot that isn&rsquo;t here, you will need to start the discussion and get people to&nbsp;show&nbsp;up.
                    </p>
                    <div style={{
                        padding: '4em 0 7em',
                        textAlign: 'center'
                    }}>
                        <h3>It&rsquo;s week 13!</h3>
                        <p>
                            The Audi 90 is in the iRacing 13th Week Deutsche&nbsp;Drifters (Fun) Series!
                        </p>
                        <p>
                            Nürburgring Nordschleife - Industriefahrten <a href="/setups/audi90gto/nords-22S3W13-r1.sto">Setup&nbsp;for&nbsp;the&nbsp;Audi&nbsp;90&nbsp;GTO</a>
                        </p>
                        <p>60L of fuel should be enough, but if you're not sure you can take 66L or so.</p>
                    </div>
                    <span className="inline-discord-callout">
                        <img src={discord} alt="" /><a href={VCR_DISCORD_URL} target="_blank" rel="noreferrer">Discord Server</a>
                    </span>
                </div>
            </div>
            <div id="timeslots" className="timeslots-wrapper">
                <div className="section">
                    <h2 className="title">Official Race Times</h2>
                    <div className="timeslots">
                        <Timeslot
                            label="Midweek Madness"
                            dayIndex={3}
                            time="19:00"
                            entries="29"
                            sof="2346"
                        >
                            <p>
                                If you can race at this time, you will find entrants from beginner to veteran. Field size can vary greatly by&nbsp;track.
                            </p>
                        </Timeslot>
                        <Timeslot
                            label="Friday Night Race"
                            dayIndex={5}
                            time="21:00"
                            entries="27"
                            sof="2287"
                        >
                            <p>
                                The big race that is not the broadcast race. If you want <b>a full field with no broadcast pressure</b> this is it. Also a great practice race for the&nbsp;broadcast.
                            </p>
                        </Timeslot>
                        <Timeslot
                            label="Broadcast Race"
                            dayIndex={6}
                            time="17:00"
                            entries="50"
                            sof="2797"
                        >
                            <p>
                                <b>Our weekly broadcast race.</b> This will usually have the most participants and may even split once or twice per season. <a href="https://www.youtube.com/user/GSRCBroadcasting/videos" target="_blank" rel="noreferrer">Broadcasted live&nbsp;on&nbsp;GSRC</a>
                            </p>
                        </Timeslot>
                    </div>
                    <div className="footnote">Drivers &amp; SOF data averaged from previous weeks</div>
                </div>
            </div>
            <div className="faq section">
                <h2 className="title">Common Questions</h2>
                <dl>
                    <dt>When are the races?</dt>
                    <dd>
                        The official race slots shown above in your local times are the only races guaranteed to go official. Like other low-participation series, you may see other sessions going official during a week when the Nordschleife or Le Mans is on the schedule. If you want to race, just practice and show up to one of the <a href="#timeslots">times posted on&nbsp;this&nbsp;page</a>.
                    </dd>

                    <dt>Is this a league?</dt>
                    <dd>
                        No. We run the official iRacing scheduled races 3 times per week and the Saturday race is broadcasted live on GSRC. Points are calculated for the broadcast race. 1st and 2nd splits are scored, and there are two cups: VCR Championship and VCR Junior (junior is &lt; 2800 iRating) See <code>#vcr-rules</code> and <code>#vcr-standings</code> in the <span className="inline-discord-callout"><a href={VCR_DISCORD_URL} target="_blank" rel="noreferrer">VCR Discord Server</a> for&nbsp;more&nbsp;info.</span> 
                    </dd>

                    <dt>Do I need to pit?</dt>
                    <dd>
                        Maybe. Two of the twelve races per season will require a pit stop; these are 60 minute races. The other 10 races are 40 minutes long, or (rarely) a number of laps approximating 40 minutes; usually Le Mans, Monza Combined, or the Nordschleife.
                    </dd>

                    <dt>Where can I get a setup?</dt>
                    <dd>
                        On this page. If you can't find a setup here that suits you then you may have luck checking the <code>#audi-setups</code> and <code>#nissan-setups</code> channels on the <span className="inline-discord-callout"><a href={VCR_DISCORD_URL} target="_blank" rel="noreferrer">VCR Discord Server</a></span>
                    </dd>

                </dl>
            </div>
            <div id="setups" className="setups section">
                <h2 className="title">Setups</h2>
                <Setups upcomingWeeks={3} />
            </div>
            <div id="chatter" className="chatter section">
                <h2 className="title">Chatter &amp; Community</h2>
                <div className="chatter-servers">
                    <Server
                        title="VCR Discord (official races, with custom scoring)"
                        url={VCR_DISCORD_URL}
                        description="The largest Kamel GT community. Setups, tips, and chatter about racing these cars."
                    />
                    <Server
                        title="Dirty Torque Racing League"
                        url={DTRL_DISCORD_URL}
                        description="Home of racing Legends on strange tracks, the Historic IMSA Championship, and more."
                    />
                </div>
            </div>
            <div className="format section">
                <h2 className="title">Race Format</h2>
                <ul>
                    <li><strong>Multiclass series</strong> featuring the Nissan GTP &amp; Audi GTO</li>
                    <li><strong>Rolling start</strong>, GTO field leaves a gap to the GTPs ahead</li>
                    <li><strong>Ten races per season are 40 minutes long</strong>; require no pitstop</li>
                    <li><strong>Two races per season are 60 minute "endurance" rounds</strong> that may require a pit stop</li>
                    <li><strong>Tires and fuel are worked on at the same time</strong> during a pit stop</li>
                </ul>
            </div>
            <div className="tips section">
                <h2 className="title">Race Tips</h2>
                <h3>For GTP Drivers:</h3>
                <ol>
                    <li>
                        The Audi understeers a lot and uses the whole track. What might look like opening a door is just the Audi preparing to take the apex. Follow some Audis in practice to identify where they are likely to go wide.
                    </li>
                    <li>
                        The GTP stops more quickly than the GTO can. If you pass a GTO and then pull in front of it into the braking zone, you may very well get hit from behind. It's hard to avoid a slowing GTP when already hard on the brakes.
                    </li>
                </ol>
                <h3>For GTO Drivers:</h3>
                <ol>
                    <li>
                        Do not try to move out of the way or let GTPs by. Choose your line and stick to it. This communicates to the GTP that they should navigate around you. Do not move or react unexpectedly. Be predictable.
                    </li>
                    <li>
                        If you are missing shifts, try to pre-select the gear and then press the clutch; flat-shift; there is no need to lift. When downshifting you just need to blip; no clutch needed.
                    </li>
                </ol>
                <h4>For everyone:</h4>
                <p><a href="https://yousuckatracing.com/2021/04/07/the-vortex-of-danger-is-your-fault/" target="_blank" rel="noreferrer">The vortex of danger</a> is real. Read about it and understand how it applies to your racing.</p>
                <p>We aspire to be a fun &amp; exciting series made up of a civilized group of racers. There's no need to moan and whine when you wreck, and you can get protested for your conduct just like in any other iRacing series. Remember the human on the other side of the connection. Remember that netcode and mistakes are facts of life/racing.</p>
            </div>
            <div className="broadcast section">
                <h2 className="title">Previous Broadcast Races</h2>
                <Broadcast
                    title='2022 Season 3 Round 12: Long Beach'
                    url="https://youtu.be/TYR0gs6-ZUU?t=977"
                />
                <Broadcast
                    title='2022 Season 3 Round 11: Sonoma'
                    url="https://youtu.be/UQX4hLHHtIo?t=983"
                />
                <Broadcast
                    title='2022 Season 3 Round 10: CTMP "Mosport"'
                    url="https://youtu.be/WbBzeqt_Pq4?t=1024"
                />
                <Broadcast
                    title="2022 Season 3 Round 9: Charlotte Roval"
                    url="https://youtu.be/lxJ72IILRY8?t=1049"
                />
                <Broadcast
                    title="2022 Season 3 Round 8: Nurburgring GP"
                    url="https://youtu.be/ci4nn0qrgWk?t=1086"
                />
                <Broadcast
                    title="2022 Season 3 Round 7: Phillip Island"
                    url="https://youtu.be/O2G6NyzfsZ4?t=1167"
                />
                <Broadcast
                    title="2022 Season 3 Round 6: Silverstone Historic GP"
                    url="https://youtu.be/ulo0uVTLQy4?t=1167"
                />
                <Broadcast
                    title="2022 Season 3 Round 5: Sebring"
                    url="https://youtu.be/hHPyFl15foI?t=1199"
                />
                <Broadcast
                    title="2022 Season 3 Round 4: Brands Hatch"
                    url="https://youtu.be/Ydq0wDq0GBY?t=1191"
                />
                <Broadcast
                    title="2022 Season 3 Round 3: Watkins Glen"
                    url="https://youtu.be/bncdRkxyUZI?t=1208"
                />
                <Broadcast
                    title="2022 Season 3 Round 2: Fuji"
                    url="https://youtu.be/5huzNPgmsJc?t=1043"
                />
                <Broadcast
                    title="2022 Season 3 Round 1: Le Mans"
                    url="https://youtu.be/8zgn6ACLQlw?t=1095"
                />
            </div>
        </div>
    );
}

export default App;
