import React from 'react'

function RegisterApproval({ modalStatus }) {
    return (
        <div className={modalStatus ? 'active-modal-container' : 'inactive-modal-container'}>
            <div className='modal'>
                <img src='/asset/register-approval.png' alt='modal-logo' />
                <p className='approval-modal-text'>WAITING FOR APPROVAL !!!</p>
            </div>
        </div>
    )
}

export default RegisterApproval