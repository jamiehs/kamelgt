import './Broadcast.scss';
import React from 'react';
import { getYouTubeId } from '../../helpers';

interface BroadcastProps {
    title: string
    url: string
    date: Date
}
interface BroadcastState {
    videoGlitchId: number,
    glitchId: number,
}
class Broadcast extends React.Component<BroadcastProps, BroadcastState> {
    constructor(props: BroadcastProps) {
        super(props)
        this.state = {
            videoGlitchId: 0,
            glitchId: 0,
        }
    }
    componentDidMount() {
        this.setState({
            videoGlitchId: this.randomGlitchId(3),
            glitchId: this.randomGlitchId(),
        })
    }

    randomGlitchId(variants: number = 5):number {
        return Math.ceil(Math.random() * variants)
    }

    render() {
        let {
            title,
            url,
            date,
        } = this.props

        // format the date object nicely for the missing video
        let dateString = ''
        if(date && date instanceof Date) {
            dateString = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
        }

        return (
            url ? (
                <div className="Broadcast">
                    <a className="no-icon" href={url} target="_blank" rel="noreferrer">
                        <h3 title={title}>{title}</h3>
                    </a>
                    <div className="yt-video">
                        <a className="no-icon" href={url} target="_blank" rel="noreferrer">
                            <div className={`thumb jump-${this.state.videoGlitchId}`} style={{backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeId(url)}/hq3.jpg)`}}>
                                <div className={`glitch glitch-${this.state.glitchId}`}></div>
                            </div>
                        </a>
                    </div>
                </div>
            ) : (
                <div className="Broadcast">
                    <h3 title={title}>{title}</h3>
                    <div className="yt-video">
                        <div className={`thumb jump-${this.state.videoGlitchId}`}>
                            <div className="upcoming-date-wrapper">
                                <span className="upcoming-date">{dateString}</span>
                            </div>
                            <div className={`glitch glitch-${this.state.glitchId}`}></div>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default Broadcast;