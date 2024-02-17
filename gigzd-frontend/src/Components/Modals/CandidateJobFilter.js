import React, { useState } from 'react'
import axios from 'axios';


function CandidateJobFilter({ modalStatus, statusChanger, sortJob, userName }) {
    const [filterString, setFilterString] = useState({
        location:'',
        age:'',
        education:''
    })
    const [citySuggested, setCitySuggested] = useState([])
    const [city, setCity] = useState('')
    const [ageIndecator, setAgeIndicator] = useState('')
    const [age, setAge] = useState('')
    const [showCitySuggested, setShowCitySuggested] = useState(false)
    const handleChange = async (e) => {
        let { name, value } = e.target;
        if(filterString[name] !== value){
            setFilterString(prevState => ({
                ...prevState,
                [name]: value
            }));
            return;
        }
        setFilterString(prevState => ({
            ...prevState,
            [name]: ''
        }));
        return;
    };

    const fetchWithFilter = async () => {
        const filterValue = Object.values(filterString).filter(v=>v).join('-');
        const { data } =filterValue? await axios.get(`${process.env.REACT_APP_BASE_URL}/candidate/home?userName=${userName}&filter=${filterValue.toLowerCase()}`):await axios.get(`${process.env.REACT_APP_BASE_URL}/candidate/home?userName=${userName}`)
        sortJob(data.data);
        return statusChanger()
    }

    const educationData = {
        displayName: 'Education',
        filterName:'education',
        data:['12th pass','ITI','Diploma','Graduation'],
        queryString: 'education:='
    }
    const fetchLocation = async (e) => {
        if (!e.target.value) return setCitySuggested([]);
        setShowCitySuggested(true)
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/fetchPlace?string=${e.target.value}`)
        setCitySuggested(data.data.predictions)
    }
    const clearState = async()=>{
        setFilterString({
            location:'',
            age:'',
            education:''
        })
        setShowCitySuggested(false)
        setCity('')
        setAgeIndicator('')
        setAge('')
        return;
    }
    return (
        <div className={modalStatus ? 'active-modal-container' : 'inactive-modal-container'} >
            <div className='filter-modal'>
                <h2 className='filter-modal-cancel-button' onClick={statusChanger}>X</h2>
                <div className='modal-content-container'>
                    <header className='filter-header'>FILTER</header>
                    <div className='filters-container' >
                        <header className='filter-sub-header'>Location</header>
                        <input onChange={(e) => {fetchLocation(e); setCity(e.target.value)}} name='city' value={filterString.location?filterString.location.split('=')[1] :city} className='filter-city-input'/>
                        {
                            citySuggested.length > 0 && showCitySuggested &&
                                <div className='filter-city-suggestion'>
                                        {
                                            citySuggested.map((items, index) => (
                                                <button className='filter-suggested-cities' key={index} onClick={(e)=>{handleChange(e);setCity(items.description);setShowCitySuggested(false)}}  name='location' value={`city:=${items.description}`}>{items.description}</button>
                                            ))
                                        }
                                </div>
                        }
                    </div>
                    <div className='filters-container' >
                        <header className='filter-sub-header'>Education</header>
                        {educationData.data.length>0&&
                            <div className='filter-defaults'>
                                {
                                    educationData.data.map((defaults,index)=>(
                                        <button key={index} onClick={handleChange} name={educationData.filterName} value={`${educationData.queryString}${defaults}`}  className={filterString.location.split('=')[1]===defaults || filterString.education.split('=')[1]===defaults?'active-button':'defaults'}>{defaults}</button>
                                    ))
                                }
                            </div>
                        }
                    </div>
                    <div className='filters-container' >
                        <header className='filter-sub-header'>Age</header>
                        <div className='age-boxes'>
                            <button className={ageIndecator === '<'?'active-less-than-button':'less-than-button'} onClick={()=>ageIndecator === '<'?setAgeIndicator(''): setAgeIndicator('<')}>{'<'}</button>
                            <button className={ageIndecator === '>'?'active-greater-than-button':'greater-than-button'} onClick={()=>ageIndecator === '>'?setAgeIndicator(''): setAgeIndicator('>')}>{'>'}</button>
                            <input className='age-input' onChange={(e)=>setAge(e.target.value)} value={age}/>
                            <button className='age-add-button' onClick={handleChange} name='age' value={`age:${ageIndecator?ageIndecator:'>'}${age}`}>ADD</button>
                        </div>
                    </div>
                

                    <div className='filter-modal-footer-button'>
                        <button className='filter-button clear-button' onClick={clearState}>CLEAR</button>
                        <button className='filter-button apply-button' onClick={fetchWithFilter}>APPLY</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CandidateJobFilter