import axios from 'axios';
import React, { useState } from 'react'
import {FaUser} from 'react-icons/fa'

function MoreActionModal({viewModal,modelStatusChanger,userName,jobId,resetFetchData}) {
    const [postData, setPostData] = useState({
        applicationStatus: '',
        date: ''
    })
    const handleChange = async (e) => {
        const {name,value } = e.target;
        console.log("# ",value);
        setPostData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const submitResponse = async()=>{
        if(!postData.applicationStatus) alert('Required Info: Application Status')
        postData.user_name=userName;
        postData.jobId=jobId;
        if(!postData.date){
            const date = new Date().toJSON().split('T')[0];
            postData.date=date
        }
        await axios.post(`${process.env.REACT_APP_BASE_URL}/provider/history/add-applicant-status`, postData)
        setPostData({
            applicationStatus: '',
            date: ''
        })
        resetFetchData()
        return modelStatusChanger();
    }
  return (
    <div className={viewModal ? 'active-more-modal-container-backdrop' : 'inactive-more-modal-container-backdrop'}>
        <div className='more-modal'>
            <header> <span className='user-icon'><FaUser/></span> {userName}</header>
            <div className='more-options-menu'>
                <button className={postData.applicationStatus==='selected'?'selected-button-active':'selected-button-inactive'} onClick={handleChange} value='selected' name='applicationStatus'>Selected</button>
                <button className={postData.applicationStatus==='rejected'?'rejected-button-active':'rejected-button-inactive'} onClick={handleChange} value='rejected' name='applicationStatus'>Rejected</button>
                <button className={postData.applicationStatus==='call_for_interview'?'call-for-interview-button-active':'call-for-interview-button-inactive'} onClick={handleChange} value='call_for_interview' name='applicationStatus'>Call for interview</button>
                <input className='input-field' type='date' placeholder='Date' onChange={handleChange} name='date'/>
                <button className='submit-button' onClick={submitResponse}>Submit</button>
            </div>
            <div className='modal-footer'>
                <button className='cancel-button' onClick={()=>modelStatusChanger()}>Cancel</button>
            </div>
        </div>
    </div>

  )
}

export default MoreActionModal