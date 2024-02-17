import axios from 'axios'
import React, { useEffect, useState } from 'react'

function JobApplicantdetailModal({ showModal, applicantData, statusChanger ,triggerMoreModal}) {
    return (
        <div className={showModal ? 'active-modal-container-backdrop' : 'inactive-modal-container-backdrop'} onClick={statusChanger}>
            {applicantData.length > 0 ?
                <div className='table-modal'>
                    <table>
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Phone</th>
                                <th>Mail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                applicantData.map((userData, i) => (
                                    <tr key={i} onClick={()=>triggerMoreModal(userData.user_name)}>
                                        <td>{userData.user_name}</td>
                                        <td>{userData.phone_number ? userData.phone_number : '-'}</td>
                                        <td>{userData.mail_id ? userData.mail_id : '-'}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    {/* <div className='modal-footer'>
                        <button>download</button>
                    </div> */}
                </div> :
                <div className='modal'>
                    <p>No Applicants</p>
                </div>
            }
        </div>
    )
}

export default JobApplicantdetailModal