import React, {useEffect, useReducer, useState} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";


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




const initialEnrolmentState = {
    loading: false,
    enrolments: {},
    error: ''
}





function ListAttendance(props) {
    const [ enrolmentState, enrolmentDispatch] = useReducer(enrolmentReducer, initialEnrolmentState)
    const location = useLocation()
    const { studentList , classID , classNumber } = location.state
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    const today = new Date();

    const datenow = today.setDate(today.getDate());
    const defaultValue = new Date(datenow).toISOString().split('T')[0] // yyyy-mm-dd
    const [selectedDate,setselectDate] = useState(defaultValue)
    const [collageID,setcollageID] = useState()


                const selecteddateHandler = e => {
                    setselectDate(e.target.value)
                }


            useEffect(  () => {
                console.log('selectedDate::', selectedDate)
                const data = {
                    'date': selectedDate,
                }
                 axios.post(BaseURL + 'collegeday/', data, {
                    headers: {
                        Authorization: "Token " + localStorage.getItem("token")
                    }
                }).then(response => {

                    setcollageID(response.data.id);
                    //getattendance();
                    getEnrollmentAttendance(response.data.id)
                }).catch(error => {
                    console.log(error);
                })
            },[selectedDate]);

            const getEnrollmentAttendance = async (selectId) => {
                const attendancePath = BaseURL +'attendance_details/?collagedayid=' + selectId
                const enrollmentPath = BaseURL +'enrollment/'
                const headers = {
                    Authorization: "Token "+localStorage.getItem("token")
                }

                const attendancePromise = axios.get(attendancePath, { headers })
                const enrollmentPromise = axios.get(enrollmentPath, { headers })

                Promise.all([enrollmentPromise, attendancePromise]).then(async responses => {
                    const [ enrollmentResult, attendanceResult ] = responses
                    const attendanceItems = attendanceResult.data ? attendanceResult.data : []
                    const enrollmentPayload = []
                    if (enrollmentResult.data && enrollmentResult.data.length > 0) {
                        for await (const enrollmentRes of enrollmentResult.data) {
                            const attendanceExist = attendanceItems.find((r) => r.studentID === enrollmentRes.studentID)
                            const student = studentList.find((r) => r.id === enrollmentRes.studentID)
                            console.log('attendanceExist::',attendanceExist )
                            const isEnableButton = attendanceExist ? true : false
                            const buttonStatus = attendanceExist ? attendanceExist.status : false
                            const studentFullName = student.firstname + ' ' + student.lastname
                            enrollmentPayload.push({...enrollmentRes, isEnableButton, buttonStatus, studentFullName})
                        }
                    }
                    console.log('enrollmentPayload::', enrollmentPayload)
                     enrolmentDispatch({type: 'success', payload: enrollmentPayload});
                }).catch(error => {
                    console.log(error)
                     enrolmentDispatch({type: 'error'});
                })
            }

            const UpdateAttendance = async (status,studentID) => {
                console.log('UpdateAttendanceCalled')
                try {
                    const data = {
                        'classID': classID,
                        'collegedayID': collageID,
                        'studentID': studentID,
                        'status': status,
                    }
                    axios.post(BaseURL + 'attendance/', data, {
                        headers: {
                            Authorization: "Token " + localStorage.getItem("token")
                        }
                    }).then(response => {
                        getEnrollmentAttendance(collageID)

                    }).catch(error => {
                        console.log(error);
                    })

                } catch (err) {}
            }

            const onPresent = async (studentID) => {
                console.log('onClickPresent', studentID)
                try {
                    UpdateAttendance(true,studentID)
                } catch (err) {}
            }



            const onAbsent = async (studentID) => {
                    console.log('onClickAbsent', studentID)
                try {
                    UpdateAttendance(false,studentID)
                } catch (err) {
                    console.log(err);
                }
            }

            const SendEmail = async (studentID) => {
                console.log('SendEmail Present')
                try {
                    const data = {
                        'studentID': studentID
                    }
                    axios.post(BaseURL + 'sendemail/', data, {
                        headers: {
                            Authorization: "Token " + localStorage.getItem("token")
                        }
                    }).then(response => {
                        alert("Email has been sent!")

                    }).catch(error => {
                        alert("Email cannot be sent!")
                        console.log(error);
                    })

                } catch (err) {}
            }

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
                        <th scope={'col'}>Email</th>
                    </tr>
                </thead>
                <tbody>


                {

                        enrolmentState.loading ? enrolmentState.enrolments.filter(enroll => enroll.classID === classID).map(enroll1 => {

                        return(

                            <tr key={enroll1.studentID}>
                                <td>{enroll1.studentID}</td>
                                <td>{enroll1.studentFullName}</td>
                                <td>

                                    {enroll1.isEnableButton
                                        ? <>
                                            <button type={'button'} onClick={() => onPresent(enroll1.studentID)} id={enroll1.studentID} className={enroll1.buttonStatus ? 'btn btn-sm btn-success' : 'btn btn-sm btn-outline-success'} >Present</button>

                                            <button type={'button'} onClick={() => onAbsent(enroll1.studentID)} to={'del'} id={enroll1.studentID} className={enroll1.buttonStatus ? 'btn btn-sm btn-outline-danger' : 'btn btn-sm btn-danger' } >Absent</button>
                                        </>
                                        : <>
                                            <button type={'button'} onClick={() => onPresent(enroll1.studentID)}  id={enroll1.studentID} className={'btn btn-sm btn-outline-success'} >Present</button>
                                            <button type={'button'} onClick={() => onAbsent(enroll1.studentID)} to={'del'} id={enroll1.studentID} className={'btn btn-sm btn-outline-danger'} >Absent</button>
                                        </>}

                                </td>

                                 <td>
                                <button type={'button'} onClick={() => SendEmail(enroll1.studentID)} to={'del'} id={enroll1.studentID} className={'btn btn-sm btn-outline-primary'} >Email</button>
                                </td>

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