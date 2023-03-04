import './Announcement.scss';

function Announcement(props) {
    let {
        begins,
        expires,
        children,
    } = props

    const beginsCondition = begins ? new Date(begins) < new Date() : true
    const endsCondition = expires ? new Date(expires) > new Date() : true

    if(beginsCondition && endsCondition) {
        return (
            <div className="Announcement">
                <div className="text-content">
                    {children}
                </div>
            </div>
        );
    } else {
        return null
    }

}

export default Announcement;