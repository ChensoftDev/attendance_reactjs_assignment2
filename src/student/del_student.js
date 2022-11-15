import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

function DelStudent(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { studentID } = location.state

    const deleteSemester = () => {
        if(localStorage.getItem('token')) {
            axios.delete(BaseURL +'student/'+studentID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate('/students')
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
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Delete Student</h1>
            <p>Are you Sure you want to Delete?</p>
            <Link to={'/students'} className={'btn btn-success'}>No</Link>
            <button onClick={deleteSemester} className={'btn btn-danger'} type="submit">Yes</button>
        </div>
    );
}

export default DelStudent;