import axios from 'axios';
import React, { useContext, useState } from 'react'
import { NavbarContext } from "../../App";

function ProfileEditModal({ modalStatus, caller }) {
    const { companyName } = useContext(NavbarContext);
    const [bankAccountNumber, setBankAccountNumber] = useState('')
    const [IfscCode, setIfscCode] = useState('')

    const storeBankAccountNumber = async (e) => {
        return setBankAccountNumber(e.target.value);
    }
    const storeIfscCode = async (e) => {
        return setIfscCode(e.target.value);
    }
    const clearData = async () => {
        setBankAccountNumber('')
        return setIfscCode('')
    }
    const submit = async () => {
        const updateData = new FormData()
        updateData.append('companyName', companyName)
        if (bankAccountNumber) updateData.append('bank_account_number', bankAccountNumber);
        if (IfscCode) updateData.append('ifsc_code', IfscCode);
        if (!bankAccountNumber && !IfscCode) return alert('Enter Any One filter');
        alert(`Update confirmation`)
        const { data } = await axios.patch(`${process.env.REACT_APP_BASE_URL}/provider/profile/update`, updateData)
        return caller()
    }
    return (
        <div className={modalStatus ? 'active-modal-container' : 'inactive-modal-container'}>
            <div className='profile-edit-modal'>
                <div className='cancel-icon' onClick={caller}>X</div>
                <div className='edit-content'>
                    <fieldset>
                        <legend>
                            <div className='legend-text required'>Bank Account Number</div>
                        </legend>
                        <input onChange={(e) => storeBankAccountNumber(e)} type="tel" value={bankAccountNumber} />
                    </fieldset>
                    <fieldset >
                        <legend>
                            <div className='legend-text required'>IFSC code</div>
                        </legend>
                        <input onChange={(e) => storeIfscCode(e)} type="tel" value={IfscCode} />
                    </fieldset>
                    <div className='edit-footer'>
                        <button className='clear-button' onClick={clearData}>clear</button>
                        <button className='apply-button' onClick={submit}>apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileEditModal