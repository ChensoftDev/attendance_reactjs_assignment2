import React, {useState} from 'react';
import axios from "axios";
import {BaseURL} from "../components/constants";
import {Link, useLocation, useNavigate} from "react-router-dom";

function UpdateSemester(props) {
const location = useLocation()
    const { semesterID, semesterYear, semesterSemester } = location.state

    const navigate = useNavigate()
    const [year, setYear] = useState(semesterYear);
    const [semester, setSemester] = useState(semesterSemester.toString());

    const yearHandler = e => {
        setYear(e.target.value)
    }
    const semesterHandler = e => {
        setSemester(e.target.value)
    }

    const updateSemester = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'year': year,
                'semester': semester
            }
            axios.put(BaseURL+'semester/'+semesterID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate('/semesters')
            }).catch((err) => {
                console.log(err)
                alert('cannot updated!')
            })
        } else {
            navigate('/login')
            alert('Please login!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Update Semester</h1>
            <div className={'mb-3'}>
                <label htmlFor="year" className={'form-label'}>Year</label>
                <input id={'year'} onChange={yearHandler} type={'number'} className={'form-control'} min={2020} max={2200} defaultValue={semesterYear}/>
            </div>
            <div className={'mb-3'}>
                <label htmlFor="semester" className={'form-label'}>Semester</label>
                <select className={'form-select'} id={'semester'} onChange={semesterHandler} defaultValue={semesterSemester}>
                    <option value={'S1'}>S1</option>
                    <option value={'S2'}>S2</option>
                    <option value={'S3'}>S3</option>
                    <option value={'S4'}>S4</option>
                </select>
            </div>

            <button onClick={updateSemester} className={'btn btn-success'} type="submit">Update</button>
            <Link to={'/semesters'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default UpdateSemester;