import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Oneshop from 'oneshop.web';
import './register.css';
import { connect } from 'react-redux';
import { MoonLoader } from 'react-spinners';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    shop : state.shop.session,
    i18n : state.i18n
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
    // redirect path
    let [redirect, setRedirect] = useState(null);
    // get oneshop instance
    var OS = new Oneshop();
    // get shop
    const { shop } = props;
    // get translation method
    const { __ } = props.i18n;

    // ------------------ LIFECYCLE ------------------
    useEffect(() => {
        // retreive profile eveyr time
        OS.consumer.profile.get()
        // got 
        .then((rows) => {
            // get user
            let user = rows[0];
            // logged in already?
            if(user != null){
                // back to users page
                setRedirect('/users');
            }
        })
        .catch((error) => {
            // ignore error    
        });
    }, []);
    // ------------------ /LIFECYCLE ------------------

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

    return redirect != null ? <Redirect to={redirect} /> : (
        <div className="user-register">
            <div className="user-register-wrapper">
                <div className="form">
                    <div className="greeting">
                        {shop.logo ? <img src={shop.logo}/> : null}
                        <h1>{__("Get Your Account")}</h1>
                    </div>
                    <div className="form-wrapper">
                        <div className="form-group">
                            <label>{__("First Name")}</label>
                            <input 
                                type="text" 
                                value={firstName} 
                                onChange={(event) => { setFirstName(event.target.value); }}
                                placeholder={__("Peter")}
                            />
                        </div>
                        <div className="form-group">
                            <label>{__("Last Name")}</label>
                            <input 
                                type="text" 
                                value={lastName} 
                                onChange={(event) => { setLastName(event.target.value); }}
                                placeholder={__("Chan")}
                            />
                        </div>
                        <div className="form-group">
                            <label>{__("Email")}</label>
                            <input 
                                type="text" 
                                value={email} 
                                onChange={(event) => { setEmail(event.target.value); }}
                                placeholder="peter.chan@abc.com"
                            />
                        </div>
                        <div className="form-group">
                            <label>{__("Password")}</label>
                            <input 
                                type="password" 
                                value={password}  
                                onChange={(event) => { setPassword(event.target.value); }}
                                placeholder="・・・・・・・・"
                            />
                        </div>
                        <div className="form-group">
                            <label>{__("Confirm Password")}</label>
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
                                __("Register")
                            }
                        </button>
                        <div className="register">
                            <Link to="/users/login">{__("Already a member?")}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(Register);