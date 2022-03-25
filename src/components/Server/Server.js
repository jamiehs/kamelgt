import './Server.scss';
import discord from '../../images/Discord-Logo-Color.svg'

function Server(props) {
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
                <img src={discord} />
                <a href="{url}" target="_blank" rel="noreferrer">{url}</a>
            </div>
        </div>
    );
}

export default Server;