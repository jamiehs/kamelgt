import React from 'react';
import './Server.scss';
import { ReactComponent as DiscordIcon } from './images/Discord-Logo-Color.svg';


interface ServerProps {
    title: string
    url: string
    description: string
}
function Server(props: ServerProps) {
    let {
        title,
        url,
        description,
    } = props

    return (
        <div className="Server">
            <h3>{title}</h3>
            <div>{description}</div>
            <div className="discord-url">
                <DiscordIcon />
                <a href={url} target="_blank" rel="noreferrer">{url}</a>
            </div>
        </div>
    );
}

export default Server;