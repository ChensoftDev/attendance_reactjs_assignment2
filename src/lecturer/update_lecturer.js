import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

function UpdateLecturer(props) {
    const location = useLocation()
    const { lecturerID, lecturerFirstName, lecturerLastName , lecturerEmail , lecturerDOB } = location.state

    const navigate = useNavigate()
    const [FName, setFname] = useState(lecturerFirstName);
    const [LName, setLname] = useState(lecturerLastName);
    const [Email, setEmail] = useState(lecturerEmail);
    const [DOB, setDOB] = useState(lecturerDOB);

    const fnameHandler = e => {
        setFname(e.target.value)
    }

    const lnameHandler = e => {
        setLname(e.target.value)
    }

    const emailHandler = e => {
        setEmail(e.target.value)
    }

    const dobHandler = e => {
        setDOB(e.target.value)
    }

    const updateLecturer = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'firstname': FName,
                'lastname': LName,
                'email': Email,
                'DOB': DOB

            }
            axios.put(BaseURL+'lecturer/'+lecturerID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate('/lecturers')
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
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Update Lecturer</h1>
            <div className={'mb-3'}>
                <label htmlFor="fname" className={'form-label'}>First Name</label>
                <input id={'fname'} onChange={fnameHandler} type={'text'} className={'form-control'} min={2020} max={2200} defaultValue={lecturerFirstName}/>
            </div>
            <div className={'mb-3'}>
                <label htmlFor="lname" className={'form-label'}>Last Name</label>
                <input id={'lname'} onChange={lnameHandler} type={'text'} className={'form-control'} min={2020} max={2200} defaultValue={lecturerLastName}/>
            </div>
            <div className={'mb-3'}>
                <label htmlFor="email" className={'form-label'}>Email</label>
                <input id={'email'} onChange={emailHandler} type={'text'} className={'form-control'} min={2020} max={2200} defaultValue={lecturerEmail}/>
            </div>
            <div className={'mb-3'}>
                <label htmlFor="DOB" className={'form-label'}>Date of birth</label>
                <input id={'DOB'} onChange={dobHandler} type={'text'} className={'form-control'} min={2020} max={2200} defaultValue={lecturerDOB}/>
            </div>

            <button onClick={updateLecturer} className={'btn btn-success'} type="submit">Update</button>
            <Link to={'/courses'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default UpdateLecturer;