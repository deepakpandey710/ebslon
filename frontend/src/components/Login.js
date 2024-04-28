import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../environment/testEnvironment";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
        //eslint-disable-next-line
    }, [])

    const handlelogin = async () => {
        let result = await axios.post(`${API_BASE_URL}/login`, { email, password });
        if (result.data.token) {
            localStorage.setItem('user', JSON.stringify(result.data));                 
            localStorage.setItem('token', JSON.stringify(result.data.token));           
            navigate('/');
        }
        else {
            alert("Please enter correct details");
        }
    }

    return (
        <div className="login">
            <input className="inputBox" type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} />
            <input className="inputBox" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button onClick={handlelogin} className="appButton" type="button">Log In</button>
        </div>
    )
}
export default Login;