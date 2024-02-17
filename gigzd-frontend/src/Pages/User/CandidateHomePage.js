import React, { useContext, useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi';
import { IoBriefcaseOutline } from 'react-icons/io5';
import { TbWallet } from 'react-icons/tb';
import { GoLocation } from 'react-icons/go';
import { AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import CandidateJobFilter from '../../Components/Modals/CandidateJobFilter';
import CandidateDetailModal from '../../Components/Modals/CandidateDetailModal';
import axios from 'axios';
import { NavbarContext } from "../../App";
import image from '../../images/image-logo.png'


function CandidateHomePage() {
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [jobs, setJobs] = useState([])
    const [searchString, setSearchString] = useState('')
    const [searchSuggestion, setSearchSuggestion] = useState([])
    const navigate = useNavigate()
    const [status, setStatus] = useState(false);

    const userName = JSON.parse(sessionStorage.getItem('user_data')).name;
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/candidate/home/userData?userName=${userName}`); //check approval status from database
            if (data.data.length === 0) return setShowDetailModal(true)
            return
        })()
    }, [userName])
    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/candidate/home?userName=${userName}`)
            setJobs(data.data)
            return
        })()
    }, [userName])


    const jobFilterModalStatusChanger = () => {
        setShowFilterModal(!showFilterModal)
    }
    const candidateDetailModalStatusChanger = () => {
        setShowDetailModal(!showDetailModal)
    }

    //for suggestions
    const searchForSuggestions = async (e) => {
        setStatus(true)
        setSearchString(e.target.value)
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/candidate/home?userName=${userName}&search=${e.target.value}`)
        if (data.data.length === 0) setStatus(false)
        return setSearchSuggestion(data.data)
    }

    //for search button
    const search = async (e) => {
        //route to job full page here
        setStatus(false)
        setSearchString('')
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/candidate/home?userName=${userName}&search=${searchString}`)
        return setJobs(data.data)
    }
    const stopOnclick = async (e) => {
        return e.stopPropagation()
    }
    return (
        <div className='candidate-home-page-main' onClick={() => setStatus(false)}>
            <CandidateDetailModal modalStatus={showDetailModal} statusChanger={candidateDetailModalStatusChanger} />
            <CandidateJobFilter modalStatus={showFilterModal} statusChanger={jobFilterModalStatusChanger} sortJob={setJobs} userName={userName} />
            <div className='candidate-home-page-container'>
                <div className='left'>
                    <div className='search-bar-backdrop'>
                        <div className='search-bar' onClick={(e) => stopOnclick(e)}>
                            <h2 className='search-icon'><BiSearch /></h2>
                            <input type='text' className='job-search-bar' placeholder='Jobs' value={searchString} onChange={searchForSuggestions} />
                            <button type='button' className='search-button' onClick={search}>Find Jobs</button>
                        </div>
                    </div>
                    {jobs.length===0&& <div className='job-container-backdrop-no-jobs'> Change Filter To See Available Jobs</div>}
                    <div className='job-container-backdrop'>
                        {jobs.map((i, index) => (
                            <div key={index} className='job-container' onClick={() => navigate('/user/job-full-view', {
                                state: {
                                    data: i
                                }
                            })}>
                                {!i.company_logo ?
                                    <div className='image-div-without-image'>
                                        <img src={image} alt='logo' className='image-logo' />
                                    </div> :
                                    <div className='image-div-with-image'>
                                        <img src={`${process.env.REACT_APP_BASE_URL}${i.company_logo}`} alt='logo' className='image-logo' />
                                    </div>
                                }
                                <div className='job-content-container'>
                                    <header>{i.designation}</header>
                                    <p className='company-name'>{i.company_name}</p>
                                    <div className='job-infos-row'>
                                        <div className='job-info job-experience'> <IoBriefcaseOutline /> <span className='experience'>{i.position}</span></div>
                                        <div className='job-info job-vacancy'> <AiOutlineUser />{i.no_of_position}</div>
                                        <div className='job-info job-stiphend'> <TbWallet /> <span className='stiphend'>{i.stipend}</span></div>
                                        <div className='job-info job-location'> <GoLocation /><span className='location'>{i.city}</span></div>
                                    </div>
                                    {/* <p className='description'> <strong>Description:</strong> {i.description}</p> */}
                                    <div className='posted-time'>Posted : {i ? i.posted_on.split('T')[0] : ''}</div>
                                    {/* <button className='apply-button' onClick={(e) => postJob(e, i)}>Apply</button> */}
                                    <button className='apply-button' >View</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {status &&
                        <div className='search-suggestion-box' onClick={(e) => stopOnclick(e)}>
                            <div className='suggestion-container'>
                                {
                                    searchSuggestion.map((suggestion, index) => (
                                        <div className='suggestion' onClick={() => navigate('/user/job-full-view', {
                                            state: {
                                                data: suggestion
                                            }
                                        })} key={index}>{suggestion.designation}</div>
                                    ))
                                }
                            </div>
                        </div>
                    }

                </div>
                <div className='right'>
                    <div className='filter-box' onClick={jobFilterModalStatusChanger}>
                        <img src='/asset/filter_icon.png' className='filter-logo' alt='filter-icon' />
                    </div>
                    <img src='/asset/image.png' className='image' alt='history-logo' />
                </div>
            </div>
        </div >
    )
}

export default CandidateHomePage