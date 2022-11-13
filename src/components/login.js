import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {BaseURL} from "./constants";

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true);
        } else {
            props.setIsLoggedIn(false);
        }
    }, [props.isLoggedIn]);

    const usernameHandler = (event) => {
        setUsername(event.target.value)
        localStorage.setItem("username", event.target.value)
    }
    const passwordHandler = (event) => {
        setPassword(event.target.value)
    }

    const login = () => {
        axios.post(BaseURL+'auth/', {
            "username": username,
            "password": password
        }).then(response => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("group", response.data.group)
            props.setIsLoggedIn(true)
            navigate('/')
        }).catch(error => {
            console.log(error)
        })
    }

       return (
        <div className={'container'}>
            <h1 className={'display-2'} style={{marginBottom: "30px"}}>Login to attendance system</h1>
            <div className={'mb-3'}>
                <label htmlFor="username" className={'form-label'}>Username</label>
                <input id={'username'} onChange={usernameHandler} type={'text'} className={'form-control'}/>
            </div>
            <div className={'mb-3'}>
                <label htmlFor="password" className={'form-label'}>Password</label>
                <input id={'password'} onChange={passwordHandler} type={'password'} className={'form-control'}/>
            </div>
            <br />
            <button onClick={login} className={'btn btn-primary'} type={"submit"}>Log In</button>
        </div>
    );
}

export default Login;