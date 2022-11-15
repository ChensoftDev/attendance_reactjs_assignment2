import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

function UpdateStudent(props) {
    const location = useLocation()
    const { studentID, studentFirstName, studentLastName , studentEmail , studentDOB } = location.state

    const navigate = useNavigate()
    const [FName, setFname] = useState(studentFirstName);
    const [LName, setLname] = useState(studentLastName);
    const [Email, setEmail] = useState(studentEmail);
    const [DOB, setDOB] = useState(studentDOB);

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

    const updateStudent = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'firstname': FName,
                'lastname': LName,
                'email': Email,
                'DOB': DOB

            }
            axios.put(BaseURL+'student/'+studentID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate('/students')
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
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Update Student</h1>
            <div className={'mb-3'}>
                <label htmlFor="fname" className={'form-label'}>First Name</label>
                <input id={'fname'} onChange={fnameHandler} type={'text'} className={'form-control'} min={2020} max={2200} defaultValue={studentFirstName}/>
            </div>
            <div className={'mb-3'}>
                <label htmlFor="lname" className={'form-label'}>Last Name</label>
                <input id={'lname'} onChange={lnameHandler} type={'text'} className={'form-control'} min={2020} max={2200} defaultValue={studentLastName}/>
            </div>
            <div className={'mb-3'}>
                <label htmlFor="email" className={'form-label'}>Email</label>
                <input id={'email'} onChange={emailHandler} type={'text'} className={'form-control'} min={2020} max={2200} defaultValue={studentEmail}/>
            </div>
            <div className={'mb-3'}>
                <label htmlFor="DOB" className={'form-label'}>Date of birth</label>
                <input id={'DOB'} onChange={dobHandler} type={'text'} className={'form-control'} min={2020} max={2200} defaultValue={studentDOB}/>
            </div>

            <button onClick={updateStudent} className={'btn btn-success'} type="submit">Update</button>
            <Link to={'/students'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default UpdateStudent;