import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Oneshop from 'oneshop.web';
import './register.css';

function Register(){

    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    var [confirmPassword, setConfirmPassword] = useState("");
    var [firstName, setFirstName] = useState("");
    var [lastName, setLastName] = useState("");
    // get oneshop instance
    var OS = new Oneshop();

    function register(){
        
        OS.consumer.signUp({
            email : email,
            passwd : password,
            confpasswd : confirmPassword,
            first_name : firstName,
            last_name : lastName
        })
        .then(() => {
            window.location.href = "/users/login";
        })
        .catch(error => alert(error.message));
    }

    return (
        <div className="user-register">
            <div className="user-register-wrapper">
                <div className="form">
                    <h1>Register</h1>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" value={firstName} onChange={(event) => { setFirstName(event.target.value); }}/>
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" value={lastName} onChange={(event) => { setLastName(event.target.value); }}/>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" value={email} onChange={(event) => { setEmail(event.target.value); }}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password}  onChange={(event) => { setPassword(event.target.value); }}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" value={confirmPassword}  onChange={(event) => { setConfirmPassword(event.target.value); }}/>
                    </div>
                    <button onClick={register}>
                        Register
                    </button>
                    <div className="register">
                        <Link to="/users/login">Already a Member?</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;