import './App.scss';
import Timeslot from './components/Timeslot/Timeslot.js';
import Server from './components/Server/Server.js';
import Broadcast from './components/Broadcast/Broadcast.js';
import Setups from './components/Setups/Setups.js';

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
                    <p>
                        Below are the ones that are guaranteed to go official. <i>However, the &ldquo;Pacific Warmup&rdquo; is not a guaranteed slot yet.</i>
                    </p>
                </div>
            </div>
            <div className="timeslots-wrapper">
                <div className="section">
                    <h2 className="title">Race Times</h2>
                    <div className="timeslots">
                        <Timeslot
                            label="Pacific Warmup"
                            dayIndex={3}
                            time="01:00"
                            entries="~6"
                            sof="2676"
                        >
                            <p>
                                Convenient for some U.S. racers on the west&nbsp;coast, or Aussie racers on the east&nbsp;coast.
                            </p>
                            <p>
                                Not always official; show up, <a href="#chatter">join the VCR Discord</a>, and let&rsquo;s make it a regular&nbsp;thing!
                            </p>
                        </Timeslot>
                        <Timeslot
                            label="Midweek Madness"
                            dayIndex={3}
                            time="19:00"
                            entries="18"
                            sof="2676"
                        >
                            <p>
                                If you can make it at this time, you will find a variety of racers from beginner to veteran. Field size can vary greatly by&nbsp;track.
                            </p>
                        </Timeslot>
                        <Timeslot
                            label="Friday Night Race"
                            dayIndex={5}
                            time="21:00"
                            entries="21"
                            sof="2665"
                        >
                            <p>
                                The big race that is not the broadcast race. If you want <b>a full field with no broadcast pressure</b> this is it. Also a great practice race for the&nbsp;broadcast.
                            </p>
                        </Timeslot>
                        <Timeslot
                            label="Broadcast Race"
                            dayIndex={6}
                            time="17:00"
                            entries="40"
                            sof="2564"
                        >
                            <p>
                                <b>Our weekly broadcast race.</b> This will usually have the most participants and may even split once or twice per season. <a href="https://www.youtube.com/user/GSRCBroadcasting/videos" target="_blank" rel="noreferrer">Broadcasted live&nbsp;on&nbsp;GSRC</a>
                            </p>
                        </Timeslot>
                    </div>
                    <div className="footnote">Drivers &amp; SOF data averaged from 2022 Season 2</div>
                </div>
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
                        url="https://discord.gg/6arPQbNMbt"
                        description="The largest Kamel GT community. Setups, tips, and chatter about racing these cars."
                    />
                    <Server
                        title="Dirty Torque Racing League"
                        url="https://discord.gg/q7PwQFs8qN"
                        description="Home of racing Legends on strange tracks, the Historic IMSA Championship, and more."
                    />
                </div>
            </div>
            <div className="format section">
                <h2 className="title">Race Format</h2>
                <ul>
                    <li>Rolling start</li>
                    <li>Multiclass: Nissan GTP &amp; Audi GTO</li>
                    <li>Ten of the twelve races per season are 40 minutes long; require no pitstop</li>
                    <li>Two of the twelve races per season are 60 minutes (or a number of laps) "endurance" rounds that may require a pit stop for fuel and optionally tires.</li>
                </ul>
            </div>
            <div className="broadcast section">
                <h2 className="title">Previous Broadcast Races</h2>
                <Broadcast
                    title="2022 Season 3 Round 2: Fuji"
                    url="https://youtu.be/5huzNPgmsJc?t=1043"
                />
                <Broadcast
                    title="2022 Season 3 Round 1: Le Mans"
                    url="https://youtu.be/8zgn6ACLQlw?t=1095"
                />
                <Broadcast
                    title="2022 Season 2 Round 7: Interlagos"
                    url="https://youtu.be/OpP7wrWOsyA?t=888"
                />
                <Broadcast
                    title="2022 Season 2 Round 2: Homestead Miami"
                    url="https://youtu.be/vhaQO7XM5c0?t=51"
                />
                <Broadcast
                    title="2022 Season 2 Round 1: Road Atlanta"
                    url="https://youtu.be/bf1DsFC2Ku4?t=1209"
                />
            </div>
        </div>
    );
}

export default App;
