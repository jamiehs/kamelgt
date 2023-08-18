import React from 'react';
import './VideoSpotlight.scss';
import { getYouTubeId } from '../../helpers';

interface VideoSpotlightProps {
    youTubeUrl: string
    subheading: string
    linkText: string
    thumbnailSource?: string
    thumbnailIndex?: number
    children: React.ReactNode
}

function VideoSpotlight(props: VideoSpotlightProps) {
    let {
        youTubeUrl,
        subheading,
        linkText,
        thumbnailSource,
        thumbnailIndex = 3,
        children,
    } = props

    let thumbnail = ''
    if(youTubeUrl) {
        thumbnail = `https://img.youtube.com/vi/${getYouTubeId(youTubeUrl)}/hq${thumbnailIndex}.jpg`
    }
    if(thumbnailSource) {
        thumbnail = thumbnailSource
    }

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
                                    style={{backgroundImage: `url(${thumbnail})`}}
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