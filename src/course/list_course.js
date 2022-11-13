import React, {useEffect, useReducer, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

const initialState = {
    loading: false,
    courses: {},
    error: ''
}

const reducer = (state, action) => {
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

function ListCourse(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get(BaseURL +'course/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                dispatch({type: 'success', payload: response.data});
            }).catch(error => {
                dispatch({type: 'error'});
                console.log(error);
            })
        } else {
            setToken('')
            navigate('/login')
            alert('Please login')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 className={'display-1'} style={{marginBottom: "30px"}}>Courses</h1>
            <table className={'table'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Name</th>
                        <th scope={'col'}>Code</th>
                        <th><Link to={'create'} className={'btn btn-primary'} style={{float: "right", width: "168px"}}>Create Course</Link></th>
                    </tr>
                </thead>
                <tbody>
                {
                    state.loading ? state.courses.map(course => {
                        return(
                        <tr>
                            <td>{course.name}</td>
                            <td>{course.code}</td>
                            <td>
                                <Link to={'delete'} state={{ courseID: course.id }} className={'btn btn-danger'} style={{float: "right"}}>Delete</Link>
                                <Link to={'update'} state={{ courseID: course.id, courseName: course.name, courseCode: course.code }} className={'btn btn-success'} style={{float: "right", marginRight: "20px"}}>Update</Link>
                            </td>
                        </tr>
                        )
                    }) : 'Loading...'
                }
                </tbody>
            </table>
        </div>
    );
}

export default ListCourse;