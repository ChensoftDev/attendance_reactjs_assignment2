import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

function UpdateCourse(props) {
    const location = useLocation()
    const { courseID, courseName, courseCode } = location.state

    const navigate = useNavigate()
    const [cName, setCname] = useState(courseName);
    const [cCode, setCcode] = useState(courseCode);

    const cnameHandler = e => {
        setCname(e.target.value)
    }
    const ccodeHandler = e => {
        setCcode(e.target.value)
    }

    const updateCourse = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'name': cName,
                'code': cCode
            }
            axios.put(BaseURL+'course/'+courseID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate('/courses')
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
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Update Course</h1>
            <div className={'mb-3'}>
                <label htmlFor="cname" className={'form-label'}>Course Name</label>
                <input id={'cname'} onChange={cnameHandler} type={'text'} className={'form-control'} min={2020} max={2200} defaultValue={courseName}/>
            </div>
            <div className={'mb-3'}>
                <label htmlFor="code" className={'form-label'}>Course Code</label>
                <input id={'ccode'} onChange={ccodeHandler} type={'text'} className={'form-control'} min={2020} max={2200} defaultValue={courseCode}/>
            </div>

            <button onClick={updateCourse} className={'btn btn-success'} type="submit">Update</button>
            <Link to={'/courses'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default UpdateCourse;