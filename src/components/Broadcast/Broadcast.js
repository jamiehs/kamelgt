import './Broadcast.scss';

function Broadcast(props) {
    let {
        title,
        url,
    } = props

    function getId(url) {
        let matches = url.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/)
        return matches[1]
    }

    return (
        <div className="Broadcast">
            <a className="no-icon" href={url} target="_blank" rel="noreferrer">
                <h3>{title}</h3>
                <div className="yt-video">
                    <div className="thumb" style={{backgroundImage: `url(https://img.youtube.com/vi/${getId(url)}/1.jpg)`}}></div>
                    <div className="thumb" style={{backgroundImage: `url(https://img.youtube.com/vi/${getId(url)}/2.jpg)`}}></div>
                    <div className="thumb" style={{backgroundImage: `url(https://img.youtube.com/vi/${getId(url)}/3.jpg)`}}></div>
                </div>
            </a>
        </div>
    );
}

export default Broadcast;