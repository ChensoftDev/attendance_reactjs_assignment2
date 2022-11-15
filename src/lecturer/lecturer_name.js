import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {BaseURL} from "../components/constants";
import {useNavigate} from "react-router-dom";

function LecturerName(props) {
    const [name,setName] = useState("");
    const navigate = useNavigate()

    useEffect(()=>{
        if(localStorage.getItem('token')) {
            if(props.lecturerID) {
                axios.get(BaseURL + "lecturer/" + props.lecturerID + "/", {
                    headers: {
                        Authorization: "Token " + localStorage.getItem("token")
                    }
                }).then(response => {
                    setName(response.data.firstname + " " + response.data.lastname)
                }).catch(error => {
                    console.log(error)
                })
            }
        }

    },[name]);
    return (
        <Fragment>
            {name}
        </Fragment>
    );
}

export default LecturerName;