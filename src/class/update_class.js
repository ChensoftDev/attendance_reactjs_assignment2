import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

function UpdateClass(props) {
const location = useLocation()
    const { classID, classSemester, classNumber, classCourse, semesterList, coursesList } = location.state

    const navigate = useNavigate()
    const [number, setNumber] = useState(classNumber);
    const [semester, setSemester] = useState(classSemester);
    const [course, setCourse] = useState(classCourse);

    const numberHandler = e => {
        setNumber(e.target.value)
    }
    const semesterHandler = e => {
        setSemester(e.target.value)
    }
    const courseHandler = e => {
        setCourse(e.target.value)
    }

    const updateClass = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'number': number,
                'semester': semester,
                'course': course
            }
            axios.put(BaseURL+'class/'+classID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/classes')
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
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Update Class</h1>
            <div className={'mb-3'}>
                <label htmlFor="number" className={'form-label'}>Number</label>
                <input id={'number'} onChange={numberHandler} type={'number'} className={'form-control'} defaultValue={classNumber} />
            </div>
            <div className="mb-3">
                <label htmlFor="semester" className={'form-label'}>Semester</label>
                <select className={'form-select'} name={'semester'} onChange={semesterHandler} defaultValue={classSemester}>
                    {
                        semesterList.map(semester => {
                            return(<option value={semester.id}>{semester.year} {semester.semester}</option>)
                        })
                    }
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="course" className={'form-label'}>Course</label>
                <select className={'form-select'} name={'course'} onChange={courseHandler} defaultValue={classCourse}>
                    {
                        coursesList.map(course => {
                            return(<option value={course.id}>{course.name}</option>)
                        })
                    }
                </select>
            </div>
            <button onClick={updateClass} className={'btn btn-primary'} type={'submit'}>Update</button>
            <Link to={'/classes'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default UpdateClass;