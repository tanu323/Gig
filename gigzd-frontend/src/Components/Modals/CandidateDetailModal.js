import React, { useState } from 'react'
// import { FiUpload } from 'react-icons/fi';
import axios from 'axios';


function CandidateDetailModal({ modalStatus, statusChanger }) {
    const userName = JSON.parse(sessionStorage.getItem('user_data')).name;

    //use this to send profile image

    // const file_input = useRef(null)
    // const [image, setImage] = useState(null)
    // const [imagePreview, setImagePreview] = useState(null)

    const [showEducation, setEducation] = useState('')
    const [showCourse, setCourse] = useState('')
    const submit = async () => {
        const postData = {
            user_name: userName,
            education: showEducation,
            course: showCourse
        }
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/candidate/home`, postData)

        //use below code for sending image

        // const postData = new FormData()
        // postData.append('profile_image', image, image.fileName)
        // postData.append('user_name', userName)
        // postData.append('education', showEducation)
        // postData.append('course', showCourse)
        // const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/candidate/home`, postData)
        // console.log("result for post: ", result);

        statusChanger()
    }

    // const imageChooseHandler = async (file) => {
    //     setImage(file)
    //     var reader = new FileReader();

    //     reader.onload = function (e) {
    //         setImagePreview(e.target.result)
    //     }

    //     reader.readAsDataURL(file);
    //     console.log(image);
    // }

    const storeEducation = async (e) => {
        if (e.target.value === '--Select--') return alert('Select Education field');
        setEducation(e.target.value);
    }

    const storeCourse = async (e) => {
        setCourse(e.target.value);
    }

    const education = [
        {
            name: '--Select--'
        },
        {
            name: '12th (Passed)'
        },
        {
            name: 'Diploma'
        },
        {
            name: 'Graduation'
        },

    ]

    return (
        <div className={modalStatus ? 'active-modal-container' : 'inactive-modal-container'} >
            <div className='candidate-detail-modal'>
                <h2 className='candidate-detail-modal-cancel-button' onClick={statusChanger}>X</h2>
                <div className='modal-content-container'>
                    <header className='candidate-detail-header'>BASIC DETAILS</header>
                    <form className='candidate-detail-form'>
                        <fieldset >
                            <legend className='required'>Education</legend>
                            <select onChange={(e) => storeEducation(e)}>
                                {
                                    education.map((data, index) => (
                                        <option key={index}>{data.name}</option>
                                    ))
                                }
                            </select>
                        </fieldset>
                        <fieldset>
                            <legend className='required'>Group / Course</legend>
                            <input type='text' className='user-course-input' onChange={storeCourse} />
                        </fieldset>
                        {/* <fieldset className='image-upload-fieldset-tag' onClick={() => file_input.current.click()}>
                            <div className='image-icon-name-div'>
                                {
                                    imagePreview ?
                                        <img className='preview-image' src={imagePreview} alt='preview-logo' />
                                        :
                                        <>
                                            <h1><FiUpload /> </h1>
                                            <span className='input-text'>Upload Profile Image</span>
                                        </>

                                }
                            </div>
                            <input type='file' accept='image/*' ref={file_input} hidden name='mail' alt='image' src={'public/logo192.png'} onChange={(e) => imageChooseHandler(e.target.files[0])} style={{ display: 'none' }} />

                        </fieldset> */}
                    </form>
                    <button className='submit-button' onClick={submit}>SUBMIT</button>
                </div>
            </div>
        </div>
    )
}

export default CandidateDetailModal