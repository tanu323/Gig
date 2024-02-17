import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import image from '../../images/post-image.png'
import arrowIcon from '../../images/Icon-awesome-arrow.png'
import imageLogo from '../../images/image-logo.png'
import { IoBriefcaseOutline } from 'react-icons/io5';
import { TbWallet } from 'react-icons/tb';
import { GoLocation } from 'react-icons/go';
import { AiOutlineUser, AiOutlineInfoCircle } from 'react-icons/ai';
import JobApplicantdetailModal from '../../Components/Modals/JobApplicantdetailModal';
import MoreActionModal from '../../Components/Modals/MoreActionModal';
import axios from 'axios';

function DetailPage() {
    const { state } = useLocation()
    const [jobDetail, setJobDetail] = useState({})
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false)
    const [showMoreModal, setShowMoreModal] = useState(false)
    const [userName, setUserName] = useState('')
    const [applicantData, setApplicantData] = useState([])
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
    const fetchApplicantData = async()=>{
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/provider/history/get-applicant-data?id=${jobDetail.id}`)
        setApplicantData(data.data)
    }

    const statusChanger = async (e) => {
        e.preventDefault();
        fetchApplicantData()
        if(e.target === e.currentTarget){
            return setShowModal(!showModal)
        }
       return;
    }
    const modalChanger = async(user_name)=>{
        setUserName(user_name)
        setShowModal(true)
        setShowMoreModal(!showMoreModal)
        return;
        
    }
    const backButton = async () => {
        navigate('/provider/job-history')
        return sessionStorage.removeItem("jobDetail")
    }
    return (
        <div className='detail-page-main'>
            <JobApplicantdetailModal showModal={showModal} applicantData={applicantData} statusChanger={statusChanger} triggerMoreModal={modalChanger}/>
            <MoreActionModal viewModal={showMoreModal} modelStatusChanger={modalChanger} userName={userName} jobId={jobDetail.id} resetFetchData = {fetchApplicantData}/>
            <div className='detail-container'>
                <div className='arrow-icon' onClick={backButton} >
                    <img src={arrowIcon} alt='logo' />
                </div>
                <div className='info-icon-box' onClick={statusChanger}>
                    <AiOutlineInfoCircle className='info-icon' onClick={statusChanger} />
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
                                {/* <button className='apply-button' onClick={postJob}>Apply</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='detail-page-image-div'>
                        <img src={image} alt='post-logo' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPage