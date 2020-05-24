import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Oneshop from 'oneshop.web';
import './register.css';
import { connect } from 'react-redux';
import { MoonLoader } from 'react-spinners';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    shop : state.shop.session
});
// ------------------------ /REDUX ------------------------


function Register(props){

    // form data state
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    // loading status
    let [isLoading, setIsLoading] = useState(false);
    // get oneshop instance
    var OS = new Oneshop();
    // get shop
    const { shop } = props;

    // -------------------- HELPER --------------------
    function register(){
        // set loading
        setIsLoading(true);
        // sign up
        OS.consumer.signUp({
            email      : email,
            passwd     : password,
            confpasswd : confirmPassword,
            first_name : firstName,
            last_name  : lastName
        })
        .then(() => {
            // finished loading
            setIsLoading(false);
            // back to login page
            window.location.href = "/users/login";
        })
        .catch(error => {
            // finished loading
            setIsLoading(false);
            // error message
            alert(error.message);
        });
    }
    // -------------------- /HELPER --------------------

    return (
        <div className="user-register">
            <div className="user-register-wrapper">
                <div className="form">
                    <div className="greeting">
                        {shop.logo ? <img src={shop.logo}/> : null}
                        <h1>Get Your Account</h1>
                    </div>
                    <div className="form-wrapper">
                        <div className="form-group">
                            <label>First Name</label>
                            <input 
                                type="text" 
                                value={firstName} 
                                onChange={(event) => { setFirstName(event.target.value); }}
                                placeholder="Peter"
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input 
                                type="text" 
                                value={lastName} 
                                onChange={(event) => { setLastName(event.target.value); }}
                                placeholder="Chan"
                            />
                        </div>
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
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input 
                                type="password" 
                                value={confirmPassword}  
                                onChange={(event) => { setConfirmPassword(event.target.value); }}
                                placeholder="・・・・・・・・"
                            />
                        </div>
                        <button onClick={register} disabled={isLoading}>
                            {
                                isLoading ? 
                                <MoonLoader 
                                    size={20}
                                    color={"white"}
                                    loading={true}
                                /> :
                                "Register"
                            }
                        </button>
                        <div className="register">
                            <Link to="/users/login">Already a member?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Register);