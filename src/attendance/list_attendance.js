import React, {useEffect, useReducer, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";
import { If, Then, ElseIf, Else } from 'react-if-elseif-else-render';
import {flushSync} from 'react-dom';


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

const attendanceReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                attendance: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                attendance: [],
                error: "Error when fetching data!"
            }
    }
}

const initialAttendanceState = {
    loading: false,
    attendance: {},
    error: ''
}

const initialEnrolmentState = {
    loading: false,
    enrolments: {},
    error: ''
}





function ListAttendance(props) {
    const [ enrolmentState, enrolmentDispatch] = useReducer(enrolmentReducer, initialEnrolmentState)
    const [ attendanceData, setAttendanceData] = useState([]);
    const location = useLocation()
    const { studentList , classID , classNumber } = location.state
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    const today = new Date();


    const datenow = today.setDate(today.getDate());
    const defaultValue = new Date(datenow).toISOString().split('T')[0] // yyyy-mm-dd
    const [selectedDate,setselectDate] = useState(defaultValue)
    const [selectedDateID,setselectDateID] = useState('')

                const selecteddateHandler = e => {
                    setselectDate(e.target.value)
                }


                useEffect(() => {
                    //setselectDate(defaultValue)
                    //alert(selectedDate)
                },[])







            useEffect(  () => {
                const data = {
                    'date': selectedDate,
                }
                 axios.post(BaseURL + 'collegeday/', data, {
                    headers: {
                        Authorization: "Token " + localStorage.getItem("token")
                    }
                }).then(response => {

                    setselectDateID(response.data.id);
                    getattendance();

                }).catch(error => {
                    console.log(error);
                })
            },[selectedDate]);


            const getattendance = async () => {
                axios.get(BaseURL +'attendance/',{
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
                }).then(response => {
                    setAttendanceData(response.data)
                    //attendanceDispatch({type: 'success', payload: response.data});
                }).catch(error => {
                    //attendanceDispatch({type: 'error'});
                    console.log(error);
                })
            }


            useEffect(() => {
                if (localStorage.getItem("token")){
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

            } else {

                navigate('/login')
                alert('Please login!')
            }
            }, [token]);

    return (
               <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Attendance</h1>
            <label htmlFor="collageday" className={'form-label'}>Collage Day</label>
            <input id="collageday" type="date"  onChange={selecteddateHandler}  defaultValue={defaultValue} />

            <table className={'table table-striped table-dark'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Student ID</th>
                        <th scope={'col'}>Student Name</th>
                        <th scope={'col'}>Attendance</th>
                    </tr>
                </thead>
                <tbody>

                {

                        enrolmentState.loading ? enrolmentState.enrolments.filter(enroll => enroll.classID === classID).map(enroll1 => {

                        return(

                            <tr>
                                <td>{enroll1.studentID}</td>
                                {
                                    studentList.map(student => {

                                        return (student.id === enroll1.studentID ?
                                            <td>{student.firstname} {student.lastname}</td> : '')
                                    })


                                }
                                <td>
                                <button id={enroll1.studentID} className={'btn btn-sm btn-success'} >Present</button>
                                <button to={'del'} id={enroll1.studentID} className={'btn btn-sm btn-outline-danger'} >Absent</button>
                                </td>

             



                                {/*{enrolmentState.loading ? attendanceState.attendance.map((item, index) => (*/}
                                {/*    <td>TEST</td>*/}
                                {/*)) : '' }*/}

                            </tr>
                        )
                    }): 'Loading data please wait...'
                }




                </tbody>
            </table>
        </div>
    );
}

export default ListAttendance;