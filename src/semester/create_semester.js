import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BaseURL} from "../components/constants";
import axios from "axios";

function CreateSemester(props) {
 const navigate = useNavigate()
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('S1');

    const yearHandler = e => {
        setYear(e.target.value)
    }
    const semesterHandler = e => {
        setSemester(e.target.value)
    }

    const createSemester = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'year': year,
                'semester': semester
            }
            axios.post(BaseURL+'semester/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/semesters')
            }).catch((err) => {
                alert('cannot created!')
            })
        } else {
            navigate('/login')
            alert('Please login!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Create Semester</h1>
            <div className={'mb-3'}>
                <label htmlFor="year" className={'form-label'}>Year</label>
                <input id={'year'} onChange={yearHandler} type={'number'} className={'form-control'} min={2020} max={2200}/>
            </div>
            <div className="mb-3">
                <label htmlFor="semester" className={'form-label'}>Semester</label>
                <select className={'form-select'} name={'semester'} onChange={semesterHandler}>
                    <option value={'S1'} selected>S1</option>
                    <option value={'S2'}>S2</option>
                    <option value={'S3'}>S3</option>
                    <option value={'S4'}>S4</option>
                </select>
            </div>
            <button onClick={createSemester} className={'btn btn-primary'} type={'submit'}>Create</button>
            <Link to={'/semesters'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default CreateSemester;