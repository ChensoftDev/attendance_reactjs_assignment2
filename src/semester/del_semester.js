import React from 'react';
import axios from "axios";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BaseURL} from "../components/constants";

function DelSemester(props) {
     const location = useLocation()
    const navigate = useNavigate()
    const { semesterID } = location.state

    const deleteSemester = () => {
        if(localStorage.getItem('token')) {
            axios.delete(BaseURL +'semester/'+semesterID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate('/semesters')
            }).catch((err) => {
                console.log(err)
                alert('cannot deleted')
            })
        } else {
            navigate('/login')
            alert('Please login!')
        }
    }

    return (
        <div className={'container'}>
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Delete Semester</h1>
            <p>Are you Sure you want to Delete?</p>
            <Link to={'/semesters'} className={'btn btn-success'}>No</Link>
            <button onClick={deleteSemester} className={'btn btn-danger'} type="submit">Yes</button>
        </div>
    );
}

export default DelSemester;