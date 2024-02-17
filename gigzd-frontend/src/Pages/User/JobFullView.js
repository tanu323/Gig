import React, { useEffect, useState } from 'react'
import { IoBriefcaseOutline } from 'react-icons/io5';
import { TbWallet } from 'react-icons/tb';
import { GoLocation } from 'react-icons/go';
import { AiOutlineUser } from 'react-icons/ai';
import { useNavigate, useLocation } from 'react-router-dom';
import CandidateJobAppliedModal from '../../Components/Modals/CandidateJobAppliedModal';
import axios from 'axios';
import image from '../../images/post-image.png'
import imageLogo from '../../images/image-logo.png'



function JobFullView() {
    const userName = JSON.parse(sessionStorage.getItem('user_data')).name;

    const { state } = useLocation()
    const [jobDetail, setJobDetail] = useState({})
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)


    useEffect(() => {
        (() => {
            if (state) {
                sessionStorage.setItem("jobDetail", JSON.stringify(state.data))
                return (setJobDetail(state.data));
            }
            setJobDetail(JSON.parse(sessionStorage.getItem("jobDetail")))
            return

        })()
    }, [state])


    const postJob = async () => {
        const postData = {
            user_name: userName,
            company_name: jobDetail.company_name,
            job_id: jobDetail.job_id ? jobDetail.job_id : jobDetail.id
        }
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/candidate/home/job-apply`, postData)
            .catch((error) => {
                if (error.response) {
                    return error.response.status
                }
            })
        if (result === 403) return alert('Job Already Applied')
        return setShowModal(!showModal);
    }

    const backButton = async () => {
        navigate('/user')
        return sessionStorage.removeItem("jobDetail")
    }

    return (
        <div className='job-full-view-page-main'>
            <CandidateJobAppliedModal modalStatus={showModal} caller={() => backButton()} />
            <div className='job-full-view-container'>
                <div className='arrow-icon' onClick={backButton} >
                    <img src='/asset/Icon-awesome-arrow.png' alt='logo' />
                </div>
                <div className='left'>
                    <div className='job-info-container-backdrop'>
                        <div className='job-info-container'>
                            <div className='image-div'>
                                <img src={imageLogo} alt='logo' />
                            </div>
                            <header>{jobDetail.designation}</header>
                            <p className='company-name'>{jobDetail.company_name}</p>
                            <div className='job-infos-row'>
                                <div className='job-info job-experience'> <IoBriefcaseOutline /> <span className='experience'>{jobDetail.position}</span></div>
                                <div className='job-info job-vacancy'> <AiOutlineUser />{jobDetail.no_of_position}</div>
                                <div className='job-info job-stiphend'> <TbWallet /> <span className='stiphend'>{jobDetail.stipend}</span></div>
                                <div className='job-info job-location'> <GoLocation /><span className='location'>{jobDetail.city}</span></div>
                            </div>
                            <p className='description'> <strong>Description: </strong>{jobDetail.description}</p>
                            <div className='job-info-footer'>
                                <div className='posted-time'>Posted : time</div>
                                <button className='apply-button' onClick={postJob}>Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='job-full-view-image-div'>
                        <img src={image} alt='post-logo' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobFullView