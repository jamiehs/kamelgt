import React from 'react';
import './Announcement.scss';
import now from '../../now';

interface AnnouncementProps {
    begins: string;
    expires: string;
    children: React.ReactNode;
}

function Announcement(props: AnnouncementProps) {
    let { begins, expires, children } = props;

    const beginsCondition = begins ? new Date(begins) < now() : true;
    const endsCondition = expires ? new Date(expires) > now() : true;

    if (beginsCondition && endsCondition) {
        return (
            <div className="Announcement">
                <div className="text-content">{children}</div>
            </div>
        );
    }
    return null;
}

export default Announcement;
