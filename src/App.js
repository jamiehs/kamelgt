import './App.scss';
import Timeslot from './components/Timeslot/Timeslot.js';
import Server from './components/Server/Server.js';
import Broadcast from './components/Broadcast/Broadcast.js';

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
                        Kamel GT is a &ldquo;low participation series&rdquo;. There's great racing here, but you&rsquo;ll need to show up at specific times. The timeslots below are (organically) community generated; if you want a timeslot that isn&rsquo;t here, you&rsquo;ll need to start the discussion and get people to&nbsp;show&nbsp;up.
                    </p>
                    <p>
                        The timeslots here are the ones that are guaranteed to go official.
                    </p>
                </div>
            </div>
            <div className="timeslots-wrapper">
                <div className="section">
                    <h2 className="title">Race Times</h2>
                    <div className="timeslots">
                        <Timeslot
                            dayIndex={3}
                            time="19:00"
                            entries="20"
                            sof="2935"
                        >
                            <p>
                                The <b>&ldquo;Midweek Madness&rdquo;</b> session; if you can make it at this time, you will find a variety of racers from beginner to veteran. Field size can vary greatly by&nbsp;track.
                            </p>
                        </Timeslot>
                        <Timeslot
                            dayIndex={5}
                            time="21:00"
                            entries="27"
                            sof="2879"
                        >
                            <p>
                                The big race that is not the broadcast race. If you want <b>a full field with no broadcast pressure</b> this is it. Also a great practice race for the&nbsp;broadcast.
                            </p>
                        </Timeslot>
                        <Timeslot
                            dayIndex={6}
                            time="17:00"
                            entries="45"
                            sof="3016"
                        >
                            <p>
                                <b>Our weekly broadcast race.</b> This will usually have the most participants and may even split once or twice per season. <a href="https://www.youtube.com/channel/UC76vyQZnIIF7iA5ta24ukVw" target="_blank" rel="noreferrer">Broadcasted live&nbsp;on&nbsp;GSRC</a>
                            </p>
                        </Timeslot>
                    </div>
                    <div className="footnote">Drivers &amp; SOF data averaged from 2022 Season 1</div>
                </div>
            </div>
            <div className="chatter section">
                <h2 className="title">Chatter &amp; Community</h2>
                <div className="chatter-servers">
                    <Server
                        title="VCR Discord (official races, with custom scoring)"
                        url="https://discord.gg/6arPQbNMbt"
                        description="The largest Kamel GT community. Setups and tips are being shared weekly."
                    />
                    <Server
                        title="Thrillhouse Arcade Discord (TART&nbsp;GTO&nbsp;League)"
                        url="https://discord.gg/qxUW3Uj"
                        description="Australian timezone league races with fast paced heat and or pit stop racing."
                    />
                </div>
            </div>
            <div className="format section">
                <h2 className="title">Race Format</h2>
                <ul>
                    <li>Rolling start</li>
                    <li>Multiclass: Nissan GTP &amp; Audi GTO</li>
                    <li>Ten of the twelve races per season are 40 minutes long; require no pitstop</li>
                    <li>Two of the twelve races per season are 60 minutes (or a number of laps) "endurance" rounds that may require a stop</li>
                </ul>
            </div>
            <div className="broadcast section">
                <h2 className="title">Previous Broadcast Race</h2>
                <Broadcast
                    title="2022 Season 2 Round 2: Homestead Miami"
                    url="https://www.youtube.com/watch?v=vhaQO7XM5c0"
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
