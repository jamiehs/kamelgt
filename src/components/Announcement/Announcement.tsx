import React from 'react';
import './Announcement.scss';

interface AnnouncementProps {
    begins: string
    expires: string
    children: React.ReactNode
}

function Announcement(props: AnnouncementProps) {
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
    }
    return null
}

export default Announcement;
