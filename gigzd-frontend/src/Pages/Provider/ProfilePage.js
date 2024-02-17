import axios from 'axios'
import React, { useEffect, useState } from 'react'
import editIcon from '../../images/edit-pencil-icon.png'
import ProfileEditModal from '../../Components/Modals/ProfileEditModal'
import image from '../../images/image-logo.png'

function ProfilePage() {
    const companyName = JSON.parse(sessionStorage.getItem('user_data')).name;
    const [companyData, setCompanyData] = useState({})
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        (async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/provider/profile?companyName=${companyName}`)
            setCompanyData(data.data[0])
            return;
        })()
    }, [companyName])
    const pageRefresher = () => {
        setShowModal(!showModal)
        return window.location.reload()
    }

    return (
        <div className='profile-page-main'>
            <ProfileEditModal modalStatus={showModal} caller={pageRefresher} />
            <div className='profile-page-content'>
                <h2 className='container-header'>Profile</h2>
                <div className='edit-icon' onClick={() => setShowModal(!showModal)}>
                    <img src={editIcon} alt='edict-icons' />
                </div>
                <div className='container'>
                    <div className='left up'>
                        <form className='form'>
                            <div className='image-tag'>
                                {
                                    companyData.company_logo ?
                                        <img className='image-not-null' alt='logo' src={`http://localhost:3002${companyData.company_logo}`} />
                                        :
                                        <img className='image-null' alt='logo' src={image} />
                                }
                            </div>

                            <fieldset>
                                <legend>
                                    <div className='legend-text required'>Company Name</div>
                                </legend>
                                <input type='text' disabled value={companyData.company_name} />
                            </fieldset>

                            <fieldset>
                                <legend>
                                    <div className='legend-text required'>Contact Person</div>
                                </legend>
                                <input type='text' disabled value={companyData.contact_person} />
                            </fieldset>

                            <fieldset>
                                <legend>
                                    <div className='legend-text required'>Phone Number</div>
                                </legend>
                                <input type='text' disabled value={companyData.phone_number} />
                            </fieldset>
                        </form>
                    </div>
                    <div className='seperator'></div>
                    <div className='right down'>
                        <form className='form'>
                            <fieldset>
                                <legend>
                                    <div className='legend-text'>GST Number</div>
                                </legend>
                                <input type='text' disabled value={companyData.gst_number} />
                            </fieldset>

                            <fieldset>
                                <legend>
                                    <div className='legend-text'>PAN Number</div>
                                </legend>
                                <input type='text' disabled value={companyData.pan} />
                            </fieldset>

                            <fieldset>
                                <legend>
                                    <div className='legend-text'>Bank Account Number</div>
                                </legend>
                                <input type='text' disabled value={companyData.bank_account_number} />
                            </fieldset>

                            <fieldset>
                                <legend>
                                    <div className='legend-text'>IFSC Code</div>
                                </legend>
                                <input type='text' disabled value={companyData.ifsc_code} />
                            </fieldset>

                            <fieldset>
                                <legend>
                                    <div className='legend-text'>Address</div>
                                </legend>
                                <input type='text' disabled value={companyData.company_address} />
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage