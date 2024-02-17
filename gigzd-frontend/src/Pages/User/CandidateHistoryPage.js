import React, { useEffect, useState } from 'react'
import { IoBriefcaseOutline } from 'react-icons/io5';
import { TbWallet } from 'react-icons/tb';
import { GoLocation } from 'react-icons/go';
import { AiOutlineUser } from 'react-icons/ai';
import CandidateJobFilter from '../../Components/Modals/CandidateJobFilter';
import axios from 'axios';
import image from '../../images/image-logo.png'


function CandidateHistoryPage() {
    const userName = JSON.parse(sessionStorage.getItem('user_data')).name;
    const [appliedJobs, setAppliedJobs] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/candidate/history?userName=${userName}`)
            setAppliedJobs(data.data)
        })()
    }, [userName])
    const caller = () => {
        setShowModal(!showModal)
    }

    const filter = async () => {
        console.log("***************");
    }
    return (
        <div className='candidate-history-page-main'>
            <CandidateJobFilter modalStatus={showModal} caller={caller} />
            <div className='candidate-history-page-container'>
                <div className='left'>
                    <header className='candidate-history-page-header'>job history</header>
                    <div className='history-page-job-container-backdrop'>
                        {appliedJobs.length === 0 ? <div className='no-data'>Not Yet Applied</div> :
                            appliedJobs.map((i, index) => (
                                <div key={index} className='history-page-job-conatainer' >
                                    {
                                        !i.company_logo ?
                                            <div className='history-page-image-div'>
                                                <img src={image} alt='logo' className='image-logo' />
                                            </div>
                                            :
                                            <div className='history-page-image-div'>
                                                <img src={`${process.env.REACT_APP_BASE_URL}${i.company_logo}`} alt='logo' className='image-logo' />
                                            </div>

                                    }
                                    <div className='history-page-job-content-container'>
                                        <header>{i.designation}</header>
                                        <p className='company-name'>{i.company_name}</p>
                                        <div className='job-infos-row'>
                                            <div className='job-info job-experience'> <IoBriefcaseOutline /> <span className='experience'>{i.position}</span></div>
                                            <div className='job-info job-vacancy'> <AiOutlineUser />{i.no_of_position}</div>
                                            <div className='job-info job-stiphend'> <TbWallet /> <span className='stiphend'>{i.stipend}</span></div>
                                            <div className='job-info job-location'> <GoLocation /><span className='location'>{i.city}</span></div>
                                        </div>
                                        <div className='job-detail-footer'>
                                            <div className='status'>Status: {(i.application_status.status).toUpperCase()}</div>
                                            {i.application_status.status !== 'rejected'&& <div className='date'>Reporting On: {i.application_status.report_date.split('T')[0]}</div>}
                                            <div className='posted-time'>Posted On : {i.posted_on.split('T')[0]}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                </div>
                <div className='right'>
                    {/* <div className='history-page-filter-box' onClick={caller}>
                        <img src='/asset/filter_icon.png' className='history-page-filter-logo' alt='filter-icon' />
                    </div> */}
                    <img src='/asset/image.png' className='history-page-image' alt='history-logo' />
                </div>
            </div>
        </div>
    )
}

export default CandidateHistoryPage