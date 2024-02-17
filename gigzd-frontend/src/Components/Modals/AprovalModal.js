import React from 'react'

function AprovalModal({ modalStatus, caller }) {
    return (
        <div className={modalStatus ? 'active-modal-container' : 'inactive-modal-container'} onClick={caller}>
            <div className='modal'>
                <img src='/asset/approval-modal.png' alt='modal-logo' />
                <p className='approval-modal-text'>JOB POSTED SUCCESSFUL !</p>
            </div>
        </div>
    )
}

export default AprovalModal