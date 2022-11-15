import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

function DelCourse(props) {
     const location = useLocation()
    const navigate = useNavigate()
    const { courseID } = location.state

    const deleteCourse = () => {
        if(localStorage.getItem('token')) {
            axios.delete(BaseURL +'course/'+courseID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate('/courses')
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
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Delete Course</h1>
            <p>Are you Sure you want to Delete?</p>
            <Link to={'/courses'} className={'btn btn-success'}>No</Link>
            <button onClick={deleteCourse} className={'btn btn-danger'} type="submit">Yes</button>
        </div>
    );
}

export default DelCourse;