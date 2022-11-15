import React, {useState} from 'react';
import {BaseURL} from "../components/constants";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function Assign(props) {
    const location = useLocation()
    const { classID, classLecturer, lecturerList, classNumber, classSemester, classCourse } = location.state

    const navigate = useNavigate()
    const [lecturer, setLecturer] = useState(classLecturer);

    const lecturerHandler = e => {
        setLecturer(e.target.value)
    }

    const assignLecturer = () => {
        if(localStorage.getItem('token')) {
            const data = {
                'number': classNumber,
                'semester': classSemester,
                'course': classCourse,
                'lecturer': lecturer,
            }
            axios.put(BaseURL +'class/'+classID+'/', data, {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                navigate('/classes')
            }).catch((err) => {
                console.log(err)
                alert('cannot assigned!!')
            })
        } else {
            navigate('/login')
            alert('Please login!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Assign Lecturer</h1>
            <div className="mb-3">
                <label htmlFor="semester" className={'form-label'}>Lecturer</label>
                <select className={'form-select'} name={'semester'} onChange={lecturerHandler} defaultValue={classLecturer}>
                    <option disabled={true} selected={true}></option>
                    {
                        lecturerList.map(lecturer => {
                            return(<option value={lecturer.id}>{lecturer.firstname} {lecturer.lastname}</option>)
                        })
                    }
                </select>
            </div>
            <button onClick={assignLecturer} className={'btn btn-primary'} type={'submit'}>Assign</button>
            <Link to={'/classes'} className={'btn btn-danger'}>Back</Link>
        </div>
    );
}

export default Assign;