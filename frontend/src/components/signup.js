import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from "../environment/testEnvironment";
const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
        // eslint-disable-next-line
    }, [])

    const collectData = async () => {
        let result = await fetch(`${API_BASE_URL}/register`, {
            method: 'post',
            body: JSON.stringify({ userName, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json()
        if (result.success) {
            alert("Registered Successfully")
        }
        navigate('/');

    }


    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Username" />
            <input className="inputBox" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" />
            <input className="inputBox" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
            <button onClick={collectData} className="appButton" type="button">Sign up</button>
            <span>Already Registered? <Link to="/login" ><u>LOGIN</u></Link></span>
        </div>
    )
}

export default SignUp;