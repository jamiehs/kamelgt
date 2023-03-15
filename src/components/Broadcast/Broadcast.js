import './Broadcast.scss';
import React from 'react';

class Broadcast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            glitchId: 0
        }
    }
    componentDidMount() {
        this.setState({
            glitchId: this.randomGlitchId()
        })
    }

    getId(url) {
        let matches = url.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/)
        return matches[1]
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
            <div className="Broadcast">
                <a href={url} target="_blank" rel="noreferrer">
                    <h3>{title}</h3>
                </a>
                    <div className="yt-video">
                <a className="no-icon" href={url} target="_blank" rel="noreferrer">
                    <div className="thumb" style={{backgroundImage: `url(https://img.youtube.com/vi/${this.getId(url)}/3.jpg)`}}>
                        <div className={`glitch glitch-${this.state.glitchId}`}></div>
                    </div>
                </a>
                    </div>
            </div>
        );
    }
}

export default Broadcast;