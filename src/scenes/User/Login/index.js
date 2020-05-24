import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Oneshop from 'oneshop.web';
import './login.css';
import { connect } from 'react-redux';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    shop : state.shop.session
});
// ------------------------ /REDUX ------------------------


function Login(props){

    // email state
    let [email, setEmail] = useState("");
    // password state
    let [password, setPassword] = useState("");
    // get oneshop instance
    const OS = new Oneshop();
    // get shop
    const { shop } = props;



    // -------------------- HELPER --------------------
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
    // -------------------- /HELPER --------------------


    return (
        <div className="user-login">
            <div className="user-login-wrapper">
                <div className="form">
                    <div className="greeting">
                        {shop.logo ? <img src={shop.logo}/> : null}
                        <h1>Welcome Back.</h1>
                    </div>
                    <div className="form-wrapper">
                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="text" 
                                value={email} 
                                onChange={(event) => { setEmail(event.target.value); }}
                                placeholder="peter.chan@abc.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                value={password}  
                                onChange={(event) => { setPassword(event.target.value); }}
                                placeholder="・・・・・・・・"
                            />
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
        </div>
    );
}

export default connect(mapStateToProps)(Login);