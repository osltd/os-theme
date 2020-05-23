import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Oneshop from 'oneshop.web';
import './login.css';

function Login(){

    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    // get oneshop instance
    var OS = new Oneshop();

    function login(){
        OS.consumer.login({
            email : email,
            passwd : password
        })
        // login success
        .then(() => {
            window.location.href = "/users";
        })
        // error
        .catch(error => {
            alert(error.message);
        });
    }

    return (
        <div className="user-login">
            <div className="user-login-wrapper">
                <div className="form">
                    <h1>Login</h1>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" value={email} onChange={(event) => { setEmail(event.target.value); }}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password}  onChange={(event) => { setPassword(event.target.value); }}/>
                    </div>
                    <button onClick={login}>
                        Login
                    </button>
                    <div className="register">
                        <Link to="/users/new">Not a Member? Register Now!</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;