
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import bellIcon from '../images/notification-icon.png'
import profileIcon from '../images/profile-icon.png'


function ProviderNavbar() {
    const location = useLocation()
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [currentTab, setCurrentTab] = useState();

    useEffect(() => {
        (() => {
            if (location.pathname === '/provider') return setCurrentTab('home')
            if (location.pathname === '/provider/job-history') return setCurrentTab('history')
            return setCurrentTab('profile')
        })()
    }, [location.pathname])
    const notifications = [
        {
            time: 1681924528,
            content: 'notification',
            day: 'Today'
        },
        {
            time: 1681924518,
            content: 'notification'
        },
        {
            time: 1681924508,
            content: 'notification '
        },
        {
            time: 1681914520,
            content: 'notification',
            day: 'Yesterday'
        },
        {
            time: 1681924428,
            content: 'notification'
        },
        {
            time: 1681924528,
            content: 'notification'
        },
        {
            time: 1681824528,
            content: 'notification'
        },
    ]
    const notification_status = async () => {
        return setNotificationStatus(!notificationStatus)
    }
    const notification = async (index) => {
        console.log(notifications[index].time);
    }
    return (
        <div className='provider-navbar-main'>
            <div className='provider-company-logo'>
                logo
            </div>
            <div className='provider-navbar-content-container'>
                <ul className='provider-navbar-content'>
                    <li><Link to='/provider' className={currentTab === 'home' ? 'active-link' : 'link'}>Home</Link></li>
                    <li><Link to='/provider/job-history' className={currentTab === 'history' ? 'active-link' : 'link'}>History</Link></li>
                    <li><img src={bellIcon} alt='bell-icon' className={notificationStatus ? 'active-bell-icon' : 'bell-icon'} /></li>
                    {/* <li><img src={bellIcon} alt='bell-icon' className={notificationStatus ? 'active-bell-icon' : 'bell-icon'} onClick={notification_status} /></li> */}
                    <li><Link to='/provider/profile'><img src={profileIcon} alt='profile-icon' className={currentTab === 'profile' ? 'profile-active' : 'profile-icon'} /></Link></li>
                </ul>
            </div>
            {
                notificationStatus && notifications.length > 0 &&
                <div className='blind-back-drop' onClick={notification_status}>
                    <div className='provider-notification-main-container'>
                        <div className='provider-notification-inner-container'>
                            <div className='provider-notification-content-backdrop'>
                                {/* <div className='notification-arrow'></div> */}
                                {/* <header>TODAY</header> */}
                                {
                                    notifications.map((data, index) => (
                                        <div key={index}>
                                            {data.day && <header style={{ marginTop: index !== 0 ? '22px' : 'none' }}>{data.day}</header>}
                                            <div className='provider-notification-content' onClick={() => notification(index)}>
                                                <div className='provider-notification-flex-content'>
                                                    <div className='notifictaion-dot'><span className='the-dot'></span></div>
                                                    <div className='notification-logo'></div>
                                                    <p className='notification-text'>Your Job alert for Architect in Chennai see this opening and post the job</p>
                                                    <p className='received-time'>1h</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default ProviderNavbar
