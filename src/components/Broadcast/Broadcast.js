import './Broadcast.scss';
import React from 'react';
import { getYouTubeId } from '../../helpers';

class Broadcast extends React.Component {
    constructor(props) {
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

    randomGlitchId(variants = 5) {
        return Math.ceil(Math.random() * variants)
    }

    render() {
        let {
            title,
            url,
        } = this.props

        return (
            url ? (
                <div className="Broadcast">
                    <a className="no-icon" href={url} target="_blank" rel="noreferrer">
                        <h3 title={title}>{title}</h3>
                    </a>
                    <div className="yt-video">
                        <a className="no-icon" href={url} target="_blank" rel="noreferrer">
                            <div className={`thumb jump-${this.state.videoGlitchId}`} style={{backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeId(url)}/3.jpg)`}}>
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
                            <div className={`glitch glitch-${this.state.glitchId}`}></div>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default Broadcast;