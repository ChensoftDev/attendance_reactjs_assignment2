import React, {useEffect, useReducer, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

const initialEnrolmentState = {
    loading: false,
    enrolments: {},
    error: ''
}
const initialStudentState = {
    loading: false,
    students: {},
    error: ''
}
const initialClassState = {
    loading: false,
    classes: {},
    error: ''
}

const enrolmentReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                enrolments: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                enrolments: [],
                error: "Error when fetching data!"
            }
    }
}
const studentReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                students: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                students: [],
                error: "Error when fetching data!"
            }
    }
}
const classReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                classes: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                classes: [],
                error: "Error when fetching data!"
            }
    }
}


function EnrollList(props) {
const [ enrolmentState, enrolmentDispatch] = useReducer(enrolmentReducer, initialEnrolmentState)
    const [studentState, studentDispatch] = useReducer(studentReducer, initialStudentState)
    const [classState, classDispatch] = useReducer(classReducer, initialClassState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get(BaseURL +'enrollment/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                enrolmentDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                enrolmentDispatch({type: 'error'});
                console.log(error);
            })

            axios.get(BaseURL +'student/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                studentDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                studentDispatch({type: 'error'});
                console.log(error);
            })

            axios.get(BaseURL +'class/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                classDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                classDispatch({type: 'error'});
                console.log(error);
            })
        } else {
            setToken('')
            navigate('/login')
            alert('Please login!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Enrolments</h1>
            <table className={'table table-striped table-dark'}>
                <thead>
                <tr>
                    <th scope="col">Student</th>
                    <th scope="col">Class</th>
                    <th>
                        <Link to={'enroll'} state={{ studentList: studentState.students, classList: classState.classes }} className={'btn btn-sm btn-primary'} style={{float: "right", width: "82px"}}>Enroll</Link>
                        <Link to={'/students'} className={'btn btn-sm btn-light'} style={{float: "right", marginRight: "20px"}}>Student List</Link>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    enrolmentState.loading ? enrolmentState.enrolments.map(enrolment => {
                        return(
                            <tr>
                                {
                                    studentState.loading ? studentState.students.map(student => {
                                        return (enrolment.studentID === student.id ? <td>{student.firstname} {student.lastname}</td> : '')
                                    }): 'Loading...'
                                }
                                {
                                    classState.loading ? classState.classes.map(class1 => {
                                        return (enrolment.classID === class1.id ? <td>{class1.number}</td> : '')
                                    }): 'Loading...'
                                }
                                <td>
                                    <Link to={'remove'} state={{ enrolmentID: enrolment.id,  }} className={'btn btn-sm btn-danger'} style={{float: "right"}}>Remove</Link>
                                </td>
                            </tr>
                        )
                    }): 'Loading...'
                }
                </tbody>
            </table>
        </div>
    );
}

export default EnrollList;