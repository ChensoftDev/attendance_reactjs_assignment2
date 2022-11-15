import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

function DelLecturer(props) {
const location = useLocation()
    const navigate = useNavigate()
    const { lecturerID } = location.state

    const deleteLecturer = () => {
        if(localStorage.getItem('token')) {
            axios.delete(BaseURL +'lecturer/'+lecturerID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate('/lecturers')
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
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Delete Lecturer</h1>
            <p>Are you Sure you want to Delete?</p>
            <Link to={'/lecturers'} className={'btn btn-success'}>No</Link>
            <button onClick={deleteLecturer} className={'btn btn-danger'} type="submit">Yes</button>
        </div>
    );
}

export default DelLecturer;