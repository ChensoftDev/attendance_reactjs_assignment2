import React, {useEffect, useReducer, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {BaseURL} from "../components/constants";
import axios from "axios";

const initialState = {
    loading: false,
    lecturers: {},
    error: ''
}

const reducer = (state, action) => {
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

function ListLecturer(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get(BaseURL +'lecturer/', {
                headers: {
                    Authorization: "Token "+localStorage.getItem("token")
                }
            }).then(response => {
                dispatch({type: 'success', payload: response.data});
            }).catch(error => {
                dispatch({type: 'error'});
            })
        } else {
            setToken('')
            navigate('/login')
            alert('Please login!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 className={'display-5'}>Lecturers</h1>
            <table className={'table table-striped table-dark'}>
                <thead>
                    <tr>

                        <th scope={'col'}>First Name</th>
                        <th scope={'col'}>Last Name</th>
                        <th scope={'col'}>Email</th>
                        <th scope={'col'}>Date of Birth</th>
                        <th><Link to={'create'} className={'btn btn-sm btn-primary'} style={{float: "right", width: "168px"}}>Create</Link></th>
                    </tr>
                </thead>
                <tbody>
                {
                    state.loading ? state.lecturers.map(lecturer => {
                        return(
                        <tr>
                            <td>{lecturer.firstname}</td>
                            <td>{lecturer.lastname}</td>
                            <td>{lecturer.email}</td>
                            <td>{lecturer.DOB}</td>
                            <td>
                                <Link to={'del'} state={{ lecturerID: lecturer.id }} className={'btn btn-danger'} style={{float: "right"}}>Delete</Link>
                                <Link to={'update'} state={{
                                    lecturerID: lecturer.id,
                                    lecturerFirstName: lecturer.firstname,
                                    lecturerLastName: lecturer.lastname,
                                    lecturerEmail: lecturer.email,
                                    lecturerDOB: lecturer.DOB
                                }} className={'btn btn-success'} style={{float: "right", marginRight: "20px"}}>Update</Link>
                            </td>
                        </tr>
                        )
                    }) : 'Loading data please wait...'
                }
                </tbody>
            </table>
        </div>
    );
}

export default ListLecturer;