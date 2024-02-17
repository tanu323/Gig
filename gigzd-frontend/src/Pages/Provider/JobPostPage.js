import React, { useContext, useState } from 'react'
import AprovalModal from '../../Components/Modals/AprovalModal'
import { NavbarContext } from "../../App";
import axios from 'axios';

function JobPostPage() {
    const companyName = JSON.parse(sessionStorage.getItem('user_data')).name;

    const [showModal, setShowModal] = useState(false)
    const [locationArr, setLocationArr] = useState([])

    const [postData, setPostData] = useState({
        education: '',
        no_of_positions: '',
        position: '',
        min_age: '',
        max_age: '',
        designation: '',
        package: '',
        stipend: '',
        door_no: '',
        street_name: '',
        city: '',
        pin_code: '',
        description: ''

    })
    const handleChange = async (e) => {
        const { name, value } = e.target;
        setPostData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const [citySuggested, setCitySuggested] = useState([])
    const [showCitySuggested, setShowCitySuggested] = useState(false)

    const pageRefresher = () => {
        setShowModal(!showModal)
        return window.location.reload()
    }
    const submitForm = async (e) => {
        try {
            e.preventDefault();
            const nullValues = Object.keys(postData).filter(v => {
                if (v === 'city') return;
                return postData[v] === ''
            })
            if (locationArr.length === 0) return alert(`Field Required: city`);
            if (nullValues.length > 0) {
                return alert(`Field Required: ${nullValues}`);
            }
            postData.company_name = companyName
            postData.city = locationArr.toString()
            const postResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/provider/home/post-job`, postData)
            setShowModal(!showModal);
            return;
        } catch (error) {
            return console.log("Error: @", error)
        }
    }

    const fetchLocation = async (e) => {
        if (!e.target.value) return setCitySuggested([]);
        setShowCitySuggested(true)
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/fetchPlace?string=${e.target.value}`)
        setCitySuggested(data.data.predictions)
    }
    const storeCity = async (e) => {
        const { name, value } = e;
        setPostData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const addCity = async (e) => {
        e.preventDefault();
        setLocationArr([...locationArr, postData.city])
        setPostData(prevState => ({
            ...prevState,
            city: ""
        }));
    }

    return (
        <div className='job-post-main' onClick={() => setShowCitySuggested(false)}>
            <AprovalModal modalStatus={showModal} caller={pageRefresher} />
            <div className='job-post-page-content'>
                <header className='container-header'>job posting</header>
                <div className='container'>
                    <div className='left up'>
                        <form>
                            <fieldset>
                                <legend>
                                    <div className='legend-text required'>Education</div>
                                </legend>
                                <input type='text' onChange={handleChange} value={postData.education} name='education'>
                                </input>
                            </fieldset>

                            <fieldset>
                                <legend>
                                    <div className='legend-text required'>No of Position</div>
                                </legend>
                                <input onChange={handleChange} value={postData.no_of_positions} name='no_of_positions' />
                            </fieldset>

                            <fieldset>
                                <legend>
                                    <div className='legend-text required'>Position</div>
                                </legend>
                                <select onChange={handleChange} name='position'>
                                    <option>-select-</option>
                                    <option>Fresher</option>
                                    <option>Experience</option>
                                </select>
                            </fieldset>

                            <div className='age-field-container'>
                                <fieldset className='age-field'>
                                    <legend>
                                        <div className='legend-text required'>Min-Age</div>
                                    </legend>
                                    <input type='text' onChange={handleChange} value={postData.min_age} name='min_age' />
                                </fieldset>
                                <fieldset className='age-field'>
                                    <legend>
                                        <div className='legend-text required'>Max-Age</div>
                                    </legend>
                                    <input type='text' onChange={handleChange} value={postData.max_age} name='max_age' />
                                </fieldset>
                            </div>

                            <fieldset>
                                <legend>
                                    <div className='legend-text required'>Designation</div>
                                </legend>
                                <input type='text' onChange={handleChange} value={postData.designation} name='designation' />
                            </fieldset>

                            <fieldset>
                                <legend>
                                    <div className='legend-text required'>Package</div>
                                </legend>
                                <input type='text' onChange={handleChange} value={postData.package} name='package' />
                            </fieldset>

                            <fieldset>
                                <legend>
                                    <div className='legend-text required'>Stipend</div>
                                </legend>
                                <input type='text' onChange={handleChange} value={postData.stipend} name='stipend' />
                            </fieldset>
                        </form>
                    </div>
                    <div className='separator'></div>
                    <div className='right down'>
                        <form>

                            <fieldset>
                                <legend>
                                    <div className='legend-text required'>Door No/Building Name</div>
                                </legend>
                                <input type='text' onChange={handleChange} value={postData.door_no} name='door_no' />
                            </fieldset>

                            <fieldset>
                                <legend>
                                    <div className='legend-text required'>Street Name</div>
                                </legend>
                                <input type='text' onChange={handleChange} value={postData.street_name} name='street_name' />
                            </fieldset>
                            <div className='city'>
                                <fieldset className='city-fieldset'>
                                    <legend>
                                        <div className='legend-text required'>City</div>
                                    </legend>
                                    <input onChange={(e) => { handleChange(e); fetchLocation(e); }} name='city' value={postData.city} />
                                </fieldset>
                                <button className='add-more-city' onClick={addCity}>{locationArr.length > 0 && !postData.city ? `Added ${locationArr.length}` : 'Add'}</button>
                                {
                                    citySuggested.length > 0 && showCitySuggested &&
                                    <div className='city-suggestion'>
                                        {
                                            citySuggested.map((items, index) => (
                                                <p className='cities' key={index} onClick={() => storeCity({ name: 'city', value: items.description })}>{items.description}</p>
                                            ))
                                        }
                                    </div>
                                }
                            </div>

                            <fieldset>
                                <legend>
                                    <div className='legend-text required'>Pincode</div>
                                </legend>
                                <input type='text' onChange={handleChange} value={postData.pin_code} name='pin_code' />
                            </fieldset>

                            <div className='description-feildset'>
                                <label className='description-label'>Description</label>
                                <textarea className='description-textarea' onChange={handleChange} value={postData.description} name='description'>
                                </textarea>
                            </div>

                            <button className='post-button' onClick={submitForm}>post job</button>
                            <img src='asset/post-image.png' alt='post-png' className='post-image' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobPostPage