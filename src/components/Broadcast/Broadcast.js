import './Broadcast.scss';

function Broadcast(props) {
    let {
        title,
        url,
    } = props

    function getId(url) {
        let matches = url.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/)
        return matches[1]
    }

    function randomGlitchId(variants = 5) {
        return Math.ceil(Math.random() * variants)
    }

    return (
        <div className="Broadcast">
            <a href={url} target="_blank" rel="noreferrer">
                <h3>{title}</h3>
            </a>
                <div className="yt-video">
            <a className="no-icon" href={url} target="_blank" rel="noreferrer">
                    <div className="thumb" style={{backgroundImage: `url(https://img.youtube.com/vi/${getId(url)}/1.jpg)`}}>
                        <div className={`glitch glitch-${randomGlitchId()}`}></div>
                    </div>
                    <div className="thumb" style={{backgroundImage: `url(https://img.youtube.com/vi/${getId(url)}/2.jpg)`}}>
                        <div className={`glitch glitch-${randomGlitchId()}`}></div>
                    </div>
                    <div className="thumb" style={{backgroundImage: `url(https://img.youtube.com/vi/${getId(url)}/3.jpg)`}}>
                        <div className={`glitch glitch-${randomGlitchId()}`}></div>
                    </div>
            </a>
                </div>
        </div>
    );
}

export default Broadcast;