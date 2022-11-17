import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BaseURL} from "../components/constants";
import axios from "axios";

function Enroll(props) {
    const location = useLocation()
    const { studentList, classList } = location.state

    const navigate = useNavigate()
    const [student, setStudent] = useState('');
    const [classid, setClass] = useState('');

    const studentHandler = e => {
        setStudent(e.target.value)
    }
    const classHandler = e => {
        setClass(e.target.value)
    }

    const enrolStudent = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'studentID': student,
                'classID': classid,
            }
            axios.post(BaseURL+'enrollment/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/students/enrollments')
            }).catch((err) => {
                console.log(err)
                alert('cannot enrolled!')
            })
        } else {
            navigate('/login')
            alert('Please login!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Create Class</h1>
            <div className="mb-3">
                <label htmlFor="student" className={'form-label'}>Student</label>
                <select className={'form-select'} name={'student'} onChange={studentHandler}>
                    <option disabled={true} selected={true}></option>
                    {
                        studentList.map(student => {
                            return(<option value={student.id}>{student.firstname} {student.lastname}</option>)
                        })
                    }
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="class" className={'form-label'}>Class</label>
                <select className={'form-select'} name={'class'} onChange={classHandler}>
                    <option disabled={true} selected={true}></option>
                    {
                        classList.map(class1 => {
                            return(<option value={class1.id}>{class1.number}</option>)
                        })
                    }
                </select>
            </div>
            <button onClick={enrolStudent} className={'btn btn-primary'} type={'submit'}>Enroll</button>
            <Link to={'/students/enrollments'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default Enroll;