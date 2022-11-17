import React, {useEffect, useReducer, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {BaseURL} from "../components/constants";
import axios from "axios";

const initialState = {
    loading: false,
    students: {},
    error: ''
}

const reducer = (state, action) => {
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

function ListStudent(props) {
const [state, dispatch] = useReducer(reducer, initialState)
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get(BaseURL +'student/', {
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
            alert('Please login!')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Students</h1>
            <table className={'table table-striped table-dark'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Student ID</th>
                        <th scope={'col'}>First Name</th>
                        <th scope={'col'}>Last Name</th>
                        <th scope={'col'}>Email</th>
                        <th scope={'col'}>Date of Birth</th>
                        <th>
                            <Link to={'create'} className={'btn btn-sm btn-primary'} style={{float: "right"}}>Create</Link>
                            <Link to={'enrollments'} className={'btn btn-sm btn-primary'} style={{float: "right", marginRight: "20px"}}>Enrollment</Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                    state.loading ? state.students.map(student => {
                        return(
                        <tr>
                            <th scope={'row'}>{student.id}</th>
                            <td>{student.firstname}</td>
                            <td>{student.lastname}</td>
                            <td>{student.email}</td>
                            <td>{student.DOB}</td>
                            <td>
                                <Link to={'del'} state={{ studentID: student.id }} className={'btn btn-danger'} style={{float: "right"}}>Delete</Link>
                                <Link to={'update'} state={{
                                    studentID: student.id,
                                    studentFirstName: student.firstname,
                                    studentLastName: student.lastname,
                                    studentEmail: student.email,
                                    studentDOB: student.DOB
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

export default ListStudent;