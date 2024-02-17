import React from 'react'

function CandidateJobAppliedModal({ modalStatus, caller }) {
    return (
        <div className={modalStatus ? 'active-modal-container' : 'inactive-modal-container'} onClick={caller}>
            <div className='job-applied-modal' onClick={caller}>
                <img src='/asset/approval-modal.png' alt='modal-logo' />
                <p className='approval-modal-text'>JOB APPLIED SUCCESSFUL !</p>
            </div>
        </div>
    )
}

export default CandidateJobAppliedModal