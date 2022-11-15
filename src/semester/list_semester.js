import React, {useEffect, useReducer, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";


const reducer = (state, action) => {
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

function ListSemesters(props) {
    const [semesterState, dispatch] = useReducer(reducer, "")
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    let semesterCourseIDs = []

    useEffect(() => {
        if (localStorage.getItem("token")){
            setToken(localStorage.getItem("token"))
            axios.get(BaseURL +'semester/', {
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
            alert('Please login')
        }
    }, [token]);

    return (
        <div className={'container'}>
            <h1 className={'display-5'}>Semesters</h1>
            <table className={'table table-striped table-dark'}>
                <thead>
                <tr>
                    <th scope="col">Year</th>
                    <th scope="col">Semester</th>
                    <th><Link to={'create'} className={'btn btn-sm btn-primary'} style={{float: "right", width: "168px"}}>Create</Link></th>
                </tr>
                </thead>
                <tbody>
                {
                    semesterState.loading ? semesterState.semesters.map(semester => {
                        return(
                            <tr>
                                <td key={semester.id}>{semester.year}</td>
                                <td>{semester.semester}</td>
                                <td>
                                    <Link to={'del'} state={{ semesterID: semester.id }} className={'btn btn-danger'} style={{float: "right"}}>Delete</Link>
                                    <Link to={'update'} state={{
                                        semesterID: semester.id,
                                        semesterYear: semester.year,
                                        semesterSemester: semester.semester
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
}

export default ListSemesters;