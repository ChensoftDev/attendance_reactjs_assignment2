import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

function CreateLecturer(props) {
 const navigate = useNavigate()
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [DOB, setDOB] = useState('');

    const firstnameHandler = e => {
        setFirstname(e.target.value)
    }
    const lastnameHandler = e => {
        setLastname(e.target.value)
    }

    const emailHandler = e => {
        setEmail(e.target.value)
    }

    const DOBHandler = e => {
        setDOB(e.target.value)
    }

    const createLecturer = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'firstname': firstname,
                'lastname': lastname,
                'email': email,
                'DOB': DOB,
            }
            axios.post(BaseURL+'lecturer/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/lecturers')
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
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Create Lecturer</h1>
            <div className={'mb-3'}>
                <label htmlFor="fname" className={'form-label'}>First Name</label>
                <input id={'fname'} onChange={firstnameHandler} type={'text'} className={'form-control'} min={2020} max={2200}/>
            </div>
            <div className="mb-3">
                <label htmlFor="lname" className={'form-label'}>Last Name</label>
                <input id={'lname'} onChange={lastnameHandler} type={'text'} className={'form-control'} min={2020} max={2200}/>

            </div>
            <div className="mb-3">
                <label htmlFor="email" className={'form-label'}>Email</label>
                <input id={'email'} onChange={emailHandler} type={'Email'} className={'form-control'} min={2020} max={2200}/>
            </div>
            <div className="mb-3">
                <label htmlFor="DOB" className={'form-label'}>Date of birth</label>
                <input id={'DOB'} onChange={DOBHandler} type={'text'} className={'form-control'} min={2020} max={2200}/>
            </div>
            <button onClick={createLecturer} className={'btn btn-primary'} type={'submit'}>Create</button>
            <Link to={'/lecturers'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default CreateLecturer;