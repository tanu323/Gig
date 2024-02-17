import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import image from '../images/notification-icon.png'

function UserNavbar() {
    const location = useLocation()
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [currentTab, setCurrentTab] = useState();


    useEffect(() => {
        (() => {
            if (location.pathname === '/user/candidate-history') return setCurrentTab('history')
            return setCurrentTab('home')
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
            content: 'notification'
        },
        {
            time: 1681924428,
            content: 'notification',
            day: 'Yesterday'
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
        setNotificationStatus(!notificationStatus)
    }
    const notification = async (index) => {
        console.log("*********", index);
        console.log(notifications[index].time);
    }
    return (
        <div className='user-navbar-main'>
            <div className='user-company-logo'>
                logo
            </div>
            <div className='user-navbar-content-container'>
                <ul className='user-navbar-content'>
                    <li><Link to='/user' className={currentTab === 'home' ? 'active-link' : 'link'}>Home</Link></li>
                    <li><Link to='/user/candidate-history' className={currentTab === 'history' ? 'active-link' : 'link'}>History</Link></li>
                    {/* <li><img src={image} alt='bell-icon' className='bell-icon' onClick={notification_status} /></li> */}
                    <li><img src={image} alt='bell-icon' className='bell-icon' /></li>
                </ul>
            </div>

            {
                notificationStatus && notifications.length > 0 &&
                <div className='blind-back-drop' onClick={notification_status}>
                    <div className='user-notification-main-container'>
                        <div className='user-notification-inner-container'>
                            <div className='user-notification-content-backdrop'>
                                {/* <header>TODAY</header> */}
                                {
                                    notifications.map((data, index) => (
                                        <div key={index} >
                                            {data.day && <header style={{ marginTop: index !== 0 ? '22px' : 'none' }}>{data.day}</header>}
                                            <div className='user-notification-content' onClick={() => notification(index)}>
                                                <div className='user-notification-flex-content'>
                                                    <div className='notifictaion-dot'><span className='the-dot'></span></div>
                                                    <div className='notification-logo'></div>
                                                    <p className='notification-text'>Your Job alert for <span className='highlighted-text'>{data.content}</span> in Chennai see this opening and post the job</p>
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

export default UserNavbar