import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

function CreateCourse(props) {
 const navigate = useNavigate()
    const [coursename, setCoursename] = useState('');
    const [coursecode, setCoursecode] = useState('');

    const coursenameHandler = e => {
        setCoursename(e.target.value)
    }
    const coursecodeHandler = e => {
        setCoursecode(e.target.value)
    }

    const createCourse = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'code': coursecode,
                'name': coursename
            }
            axios.post(BaseURL+'course/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/courses')
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
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Create Course</h1>
            <div className={'mb-3'}>
                <label htmlFor="name" className={'form-label'}>Name</label>
                <input id={'name'} onChange={coursenameHandler} type={'text'} className={'form-control'} min={2020} max={2200}/>
            </div>
            <div className="mb-3">
                <label htmlFor="code" className={'form-label'}>Code</label>
                <input id={'code'} onChange={coursecodeHandler} type={'number'} className={'form-control'} min={2020} max={2200}/>
            </div>
            <button onClick={createCourse} className={'btn btn-primary'} type={'submit'}>Create</button>
            <Link to={'/courses'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default CreateCourse;