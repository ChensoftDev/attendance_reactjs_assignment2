import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {BaseURL} from "../components/constants";

function DelClass(props) {
    const location = useLocation()
    const navigate = useNavigate()
    const { classID } = location.state

    const deleteClass = () => {
        if(localStorage.getItem('token')) {
            axios.delete(BaseURL +'class/'+classID+'/', {
                headers: {
                Authorization: "Token "+localStorage.getItem("token")
                }
            }).then((response) => {
                console.log(response)
                navigate('/classes')
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
            <h1 className={'display-5'} style={{marginBottom: "30px"}}>Delete Class</h1>
            <p>Are you Sure you want to Delete?</p>
            <Link to={'/classes'} className={'btn btn-success'}>No</Link>
            <button onClick={deleteClass} className={'btn btn-danger'} type="submit">Yes</button>
        </div>
    );
}

export default DelClass;