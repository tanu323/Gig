import React, { useEffect, useState } from 'react'
import { IoBriefcaseOutline } from 'react-icons/io5';
import { TbWallet } from 'react-icons/tb';
import { GoLocation } from 'react-icons/go';
import { AiOutlineUser } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import image from '../../images/image-logo.png'
import logo from '../../images/image.png'
import axios from 'axios';


function JobHistoryPage() {
    const companyName = JSON.parse(sessionStorage.getItem('user_data')).name;
    const navigate = useNavigate()
    const [postedJobs, setPostedJobs] = useState([])
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/provider/history?companyName=${companyName}`)
            setPostedJobs(data.data.message)
            return;
        })()
    }, [companyName])
    const deleteJobPosted = async (event, id) => {
        const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/provider/history?id=${id}`)
        window.location.reload()
    }
    const updateJobPosted = async () => {
        // const { data } = await axios.delete(`${process.env.REACT_APP_BASE_URL}/provider/history?id=&{}`)
    }

    const filter = async () => {
        console.log("***************");
    }

    return (
        <div className='job-history-main'>
            <div className='job-history-page-content'>
                <header className='container-header'>job history</header>
                <div className='container'>
                    <div className='left'>
                        {
                            postedJobs.length > 0 ? postedJobs.map((i, index) => (
                                <div key={index} className='history-page-job-container' onClick={() => navigate('/provider/job-history/detail', {
                                    state: {
                                        data: i
                                    }
                                })}>
                                    <div className='history-page-image-div'>
                                        <img src={image} alt='logo' className='image-logo' />
                                    </div>
                                    <div className='history-page-job-content-container'>
                                        <header>{i.designation}</header>
                                        <p className='company-name'>{i.company_name}</p>
                                        <div className='job-infos-row'>
                                            <div className='job-info job-experience'> <IoBriefcaseOutline /> <span className='experience'>{i.position}</span></div>
                                            <div className='job-info job-vacancy'> <AiOutlineUser />{i.no_of_position}</div>
                                            <div className='job-info job-stipend'> <TbWallet /> <span className='stipend'>{i.stipend}</span></div>
                                            <div className='job-info job-location'> <GoLocation /><span className='location'>{i.city}</span></div>
                                        </div>
                                        <p className='description'> <strong>Description:</strong> {i.description}</p>
                                        <div className='job-footer'>
                                            <p>Posted: {i.posted_on.split('T')[0]}</p>
                                            <div className='icons'>
                                                <div className='edit-button' onClick={updateJobPosted}><GrEdit /></div>
                                                <div className='delete-button' onClick={(e) => deleteJobPosted(e, i.id)}><RiDeleteBin6Line /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                                :
                                <div className='no-data'>Not Jobs Posted</div>
                        }
                    </div>
                    <div className='right'>
                        <div className='filter-box' onClick={filter}>
                            <img src='/asset/filter_icon.png' className='filter' alt='filter-icon' />
                        </div>
                        <img src={logo} className='image' alt='history-logo' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default JobHistoryPage