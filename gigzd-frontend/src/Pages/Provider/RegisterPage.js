import React, { useState, useRef, useEffect, useContext } from 'react'
import RegisterApproval from '../../Components/Modals/RegisterApproval'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// import { NavbarContext } from "../../App";
import image_logo from '../../images/image-logo.png'

function RegisterPage() {
    const navigationParams = useLocation()
    // const { companyName } = useContext(NavbarContext);
    const [companyName, setCompanyName] = useState('')
    const [showModal, setShowModal] = useState()
    const file_input = useRef(null)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)

    //input states
    const [contactPerson, setContactPerson] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('+91 ')
    const [gstNumber, setGstNumber] = useState('')
    const [panNumber, setPanNumber] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [ifscCode, setIfscCode] = useState('')
    const [address, setAddress] = useState('')


    useEffect(() => {
        (() => {
            setCompanyName(JSON.parse(sessionStorage.getItem('user_data')).name)
            return setShowModal(!navigationParams.state.isApproved)
        })()
    }, [navigationParams.state.data, navigationParams.state.isApproved])


    const submitForm = async () => {
        const data = new FormData()
        if (image) data.append('company_logo', image, image.fileName)
        data.append('contact_person', contactPerson)
        data.append('phone_number', phoneNumber)
        data.append('company_name', companyName)
        data.append('gst_number', gstNumber)
        data.append('pan', panNumber)
        data.append('bank_account_number', accountNumber)
        data.append('ifsc_code', ifscCode)
        data.append('company_address', address)

        if (!contactPerson || phoneNumber.length !== 14 || !companyName) {
            return alert('Required Fields Should Not be Left Empty');
        }
        const postResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/provider/register`, data)

        return setShowModal(!showModal);

    }


    const imageChooseHandler = async (file) => {

        setImage(file)
        var reader = new FileReader();

        reader.onload = function (e) {
            setImagePreview(e.target.result)
        }
        reader.readAsDataURL(file);
    }


    const storeContactPerson = async (e) => {
        setContactPerson(e.target.value);
    }
    const storePhoneNumber = async (e) => {
        if ((e.target.value).length > 14) return;
        setPhoneNumber(e.target.value);
    }
    const storeGstNumber = async (e) => {
        setGstNumber(e.target.value);
    }
    const storePanNumber = async (e) => {
        setPanNumber(e.target.value);
    }
    const storeAccountNumber = async (e) => {
        setAccountNumber(e.target.value);
    }
    const storeIfscCode = async (e) => {
        setIfscCode(e.target.value);
    }
    const storeAddress = async (e) => {
        setAddress(e.target.value);
    }

    return (
        <div className='register-main-page'>
            <RegisterApproval modalStatus={showModal} />
            <div className='register-container'>
                <div className='left up'>
                    <div className='arrow-icon'>
                        <img src='/asset/Icon-awesome-arrow.png' alt='logo' />
                    </div>
                    <header className='register-page-header'>register</header>
                    <form className='form'>

                        <fieldset className='image-fieldset-tag' onClick={() => file_input.current.click()}>
                            <div className='image-icon-name-div'>
                                {
                                    imagePreview ?
                                        <img className='preview-image' src={imagePreview} alt='preview-logo' />
                                        :
                                        <div className='image-text-div'>
                                            <img src={image_logo} className='image-input' alt='logo' />
                                            <span className='input-text'>Company Logo</span>
                                        </div>
                                }
                            </div>
                            <input type='file' accept='image/*' ref={file_input} hidden name='mail' alt='image' src={'public/logo192.png'} onChange={(e) => imageChooseHandler(e.target.files[0])} style={{ display: 'none' }} />
                        </fieldset>

                        <fieldset className='input-fieldset-tag'>
                            <legend>
                                <div className='legend-text required'>Company Name</div>
                            </legend>
                            <input type='text' disabled value={companyName} />
                        </fieldset>

                        <fieldset className='input-fieldset-tag'>
                            <legend>
                                <div className='legend-text required'>Contact Person</div>
                            </legend>
                            <input type='text' onChange={(e) => storeContactPerson(e)} />
                        </fieldset>

                        <fieldset className='input-fieldset-tag'>
                            <legend>
                                <div className='legend-text required'>Phone Number</div>
                            </legend>
                            <input onChange={(e) => storePhoneNumber(e)} type="tel" value={phoneNumber} />
                        </fieldset>
                    </form>
                </div>
                <div className='separator'></div>
                <div className='right down'>
                    <form className='form'>
                        <fieldset className='input-fieldset-tag'>
                            <legend>
                                <div className='legend-text'>GST Number</div>
                            </legend>
                            <input type='text' onChange={(e) => storeGstNumber(e)} />
                        </fieldset>

                        <fieldset className='input-fieldset-tag'>
                            <legend>
                                <div className='legend-text'>PAN Number</div>
                            </legend>
                            <input type='text' onChange={(e) => storePanNumber(e)} />
                        </fieldset>

                        <fieldset className='input-fieldset-tag'>
                            <legend>
                                <div className='legend-text'>Bank Account Number</div>
                            </legend>
                            <input type='text' onChange={(e) => storeAccountNumber(e)} />
                        </fieldset>

                        <fieldset className='input-fieldset-tag'>
                            <legend>
                                <div className='legend-text'>IFSC Code</div>
                            </legend>
                            <input type='text' onChange={(e) => storeIfscCode(e)} />
                        </fieldset>

                        <fieldset className='input-fieldset-tag'>
                            <legend>
                                <div className='legend-text'>Address</div>
                            </legend>
                            <input type='text' onChange={(e) => storeAddress(e)} />
                        </fieldset>
                    </form>
                    <button className='register-button' onClick={submitForm}>register</button>
                </div>
            </div>
        </div >
    )
}

export default RegisterPage