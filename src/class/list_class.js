import React, {useEffect, useReducer, useState} from 'react';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {BaseURL} from "../components/constants";
import LecturerName from "../lecturer/lecturer_name";

const initialStudentState = {
    loading: false,
    students: {},
    error: ''
}

const initialClassState = {
    loading: false,
    courses: {},
    error: ''
}
const initialSemesterState = {
    loading: false,
    semesters: {},
    error: ''
}
const initialCourseState = {
    loading: false,
    courses: {},
    error: ''
}
const initialLecturerState = {
    loading: false,
    courses: {},
    error: ''
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
const semesterReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                semesters: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                semesters: [],
                error: "Error when fetching data!"
            }
    }
}
const courseReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                courses: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                courses: [],
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

const lecturerReducer = (state, action) => {
    switch (action.type) {
        case 'success':
            return {
                loading: true,
                lecturers: action.payload,
                error: ''
            }
        case 'error':
            return {
                loading: true,
                lecturers: [],
                error: "Error when fetching data!"
            }
    }
}

function ListClass(props) {
    const [classState, classDispatch] = useReducer(classReducer, initialClassState)
    const [semesterState, semesterDispatch] = useReducer(semesterReducer, initialSemesterState)
    const [courseState, courseDispatch] = useReducer(courseReducer, initialCourseState)
    const [lecturerState, lecturerDispatch] = useReducer(lecturerReducer, initialLecturerState)
    const [studentState, studentDispatch] = useReducer(studentReducer, initialStudentState)

    const [token, setToken] = useState('')
    const navigate = useNavigate()
    const permission = localStorage.getItem("group")
    const myid = localStorage.getItem("myid")

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))

            axios.get(BaseURL +'class/', {
                headers:{

                    Authorization: "Token "+localStorage.getItem("token"),
                }
            }).then(response => {
                classDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                classDispatch({type: 'error'});
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

            axios.get(BaseURL +'semester/', {
                headers: {

                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                semesterDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                semesterDispatch({type: 'error'});
                console.log(error);
            })
            axios.get(BaseURL +'course/', {
                headers: {

                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                courseDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                courseDispatch({type: 'error'});
                console.log(error);
            })
            axios.get(BaseURL +'lecturer/', {
                headers: {

                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                lecturerDispatch({type: 'success', payload: response.data});
            }).catch(error => {
                lecturerDispatch({type: 'error'});
                console.log(error);
            })
        } else {
            setToken('')
            navigate('/login')
            alert('Please login!')
        }
    }, [token]);

      if(localStorage.getItem("token") && permission === 'admin') {
    return (


        <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Classes</h1>
            <table className={'table table-striped table-dark'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Number</th>
                        <th scope={'col'}>Semester</th>
                        <th scope={'col'}>Course</th>
                        <th scope={'col'}>Lecturer</th>
                        <th><Link to={'create'} state={{ semesterList: semesterState.semesters, coursesList: courseState.courses }} className={'btn btn-sm btn-primary'} style={{float: "right", width: "168px"}}>Create</Link></th>
                    </tr>
                </thead>
                <tbody>
                {
                    classState.loading ? classState.classes.map(class1 => {
                        return(
                            <tr>
                                <td key={class1.id}>{class1.number}</td>
                                {
                                    semesterState.loading ? semesterState.semesters.map(semester => {
                                        return (class1.semester === semester.id ? <td>{semester.year} {semester.semester}</td> : '')
                                    }): 'Loading...'
                                }
                                {
                                    courseState.loading ? courseState.courses.map(course => {
                                        return (class1.course === course.id ? <td>{course.name}</td> : '')
                                    }): 'Loading...'
                                }

                                {
                                    class1.lecturer ? <td><LecturerName lecturerID={class1.lecturer} /> - <Link to={'assign'} state={{
                                                classID: class1.id,
                                                classNumber: class1.number,
                                                classSemester: class1.semester,
                                                classCourse: class1.course,
                                                classLecturer: class1.lecturer,
                                                lecturerList: lecturerState.lecturers
                                            }} className={'btn btn-sm btn-warning'}>Change</Link></td> : <td><Link to={'assign'} state={{
                                                classID: class1.id,
                                                classNumber: class1.number,
                                                classSemester: class1.semester,
                                                classCourse: class1.course,
                                                classLecturer: class1.lecturer,
                                                lecturerList: lecturerState.lecturers
                                            }} className={'btn btn-sm btn-primary'}>Assign</Link></td>
                                }



                                <td>
                                    <Link to={'del'} state={{ classID: class1.id }} className={'btn btn-danger'} style={{float: "right"}}>Delete</Link>
                                    <Link to={'update'} state={{ classID: class1.id,
                                        classNumber: class1.number,
                                        classSemester: class1.semester,
                                        classCourse: class1.course,
                                        semesterList: semesterState.semesters,
                                        coursesList: courseState.courses,
                                    }} className={'btn btn-success'} style={{float: "right", marginRight: "20px"}}>Update</Link>
                                </td>
                            </tr>
                        )
                    }): 'Loading data please wait...'
                }
                </tbody>
            </table>
        </div>


    );

      } else if(localStorage.getItem("token") && permission === 'lecturer') {

      return(
                  <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>My Class</h1>
            <table className={'table table-striped table-dark'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Number</th>
                        <th scope={'col'}>Semester</th>
                        <th scope={'col'}>Course</th>
                        <th scope={'col'}>Attendance</th>
                    </tr>
                </thead>
                <tbody>

                {


                    classState.loading ? classState.classes.filter(class2 => class2.lecturer == myid).map(class1 => {

                        return(

                            <tr>
                                <td key={class1.id}>{class1.number}</td>
                                {
                                    semesterState.loading ? semesterState.semesters.map(semester => {
                                        return (class1.semester === semester.id ? <td>{semester.year} {semester.semester}</td> : '')
                                    }): 'Loading...'
                                }
                                {
                                    courseState.loading ? courseState.courses.map(course => {
                                        return (class1.course === course.id ? <td>{course.name}</td> : '')
                                    }): 'Loading...'
                                }







                                <td>
                                    <Link to={'attendance'} state={{ classID: class1.id, classNumber: class1.number,
                                        studentList:studentState.students,
                                    }} className={'btn btn-success'}>Enter Attendance</Link>
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


}

export default ListClass;