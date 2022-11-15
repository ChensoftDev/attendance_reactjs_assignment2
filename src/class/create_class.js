import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

function CreateClass(props) {
    const location = useLocation()
    const { semesterList, coursesList } = location.state

    const navigate = useNavigate()
    const [number, setNumber] = useState('');
    const [semester, setSemester] = useState('');
    const [course, setCourse] = useState('');

    const numberHandler = e => {
        setNumber(e.target.value)
    }
    const semesterHandler = e => {
        setSemester(e.target.value)
    }
    const courseHandler = e => {
        setCourse(e.target.value)
    }

    const createClass = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'number': number,
                'semester': semester,
                'course': course
            }
            axios.post(BaseURL+'class/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/classes')
            }).catch((err) => {
                console.log(err)
                alert('cannot created!')
            })
        } else {
            navigate('/login')
            alert('Please login!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Create Class</h1>
            <div className={'mb-3'}>
                <label htmlFor="number" className={'form-label'}>Number</label>
                <input id={'number'} onChange={numberHandler} type={'number'} className={'form-control'} />
            </div>
            <div className="mb-3">
                <label htmlFor="semester" className={'form-label'}>Semester</label>
                <select className={'form-select'} name={'semester'} onChange={semesterHandler}>
                    <option disabled={true} selected={true}></option>
                    {
                        semesterList.map(semester => {
                            return(<option value={semester.id}>{semester.year} {semester.semester}</option>)
                        })
                    }
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="course" className={'form-label'}>Course</label>
                <select className={'form-select'} name={'course'} onChange={courseHandler}>
                    <option disabled={true} selected={true}></option>
                    {
                        coursesList.map(course => {
                            return(<option value={course.id}>{course.name}</option>)
                        })
                    }
                </select>
            </div>
            <button onClick={createClass} className={'btn btn-primary'} type={'submit'}>Create</button>
            <Link to={'/classes'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default CreateClass;