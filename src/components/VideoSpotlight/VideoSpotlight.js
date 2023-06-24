import './VideoSpotlight.scss';
import { getYouTubeId } from '../../helpers';

function VideoSpotlight(props) {
    let {
        youTubeUrl,
        subheading,
        linkText,
        children,
    } = props

    return (
        <div id="video-spotlight">
            <div className="section">
                <header>
                    <h3>
                        Kamel Clip Spotlight
                        <span>{subheading}</span>
                    </h3>
                </header>
                <div className="clip">
                    {youTubeUrl && (
                        <div className="thumbnail-wrapper">
                            <a className="no-icon" href={youTubeUrl} target="_blank" rel="noreferrer">
                                <div
                                    className="thumbnail"
                                    style={{backgroundImage: `url(https://img.youtube.com/vi/${getYouTubeId(youTubeUrl)}/hq3.jpg)`}}
                                />
                            </a>
                        </div>
                    )}
                    <div className="description">
                        {linkText && youTubeUrl && (
                            <a className="no-icon" href={youTubeUrl} target="_blank" rel="noreferrer">
                                <h5>{linkText}</h5>
                            </a>
                        )}
                        {children && (
                            <p>
                                {children}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoSpotlight;