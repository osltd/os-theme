import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Oneshop from 'oneshop.web';
import './login.css';
import { connect } from 'react-redux';
import { MoonLoader } from 'react-spinners';
import actions from '../../../helpers/actions';
import ws from '../../../helpers/websocket';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    shop    : state.shop.session,
    i18n    : state.i18n,
    profile : state.user.profile
});

const mapDispatchToProps = dispatch => ({
    setProfile : profile => dispatch({
        type    : actions.SET_USER,
        payload : profile
    })
});
// ------------------------ /REDUX ------------------------


function Login(props){

    // email state
    let [email, setEmail] = useState("");
    // password state
    let [password, setPassword] = useState("");
    // loading status
    let [isLoading, setIsLoading] = useState(false);
    // redirect path
    let [redirect, setRedirect] = useState(null);
    // get oneshop instance
    const OS = new Oneshop();
    // get shop
    const { shop, setProfile, profile } = props;
    // get i18n method
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
                // update user profile
                setProfile(profile);
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
    function login(){
        // start loading
        setIsLoading(true);
        // execute two task
        Promise.all([
            // http login
            OS.consumer.login({
                email  : email,
                passwd : password
            }),
            // login to websocket as well
            new Promise((resolve, reject) => {
                // handler
                const handler = (result) => {
                    result.result ? resolve() : reject();
                }
                // get websocket client
                ws.getClient(c => {
                    c.setAction("/login").setArguments({ shopId : shop.id }).setForm({ email, passwd : password }).cmd(handler);
                });
            })
        ])
        // login success
        .then(() => {
            // finish loading
            setIsLoading(false);
            // redirect to checking again
            window.location.href = "/users";
        })
        // error
        .catch(error => {
            // finish loading
            setIsLoading(false);
            // show message
            alert(__("invalid_credential"));
        });
    }
    // -------------------- /HELPER --------------------


    return redirect != null ? <Redirect to={redirect} /> : (
        <div className="user-login">
            <div className="user-login-wrapper">
                <div className="form">
                    <div className="greeting">
                        {shop.logo ? <img src={shop.logo}/> : null}
                        <h1>{__("Welcome Back")}</h1>
                    </div>
                    <div className="form-wrapper">
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
                        <div className="recovery-btn">
                            <Link to="/users/account_rescue">{__("Password Recovery/Account Activation?")}</Link>
                        </div>
                        <button onClick={login} disabled={isLoading}>
                            {
                                isLoading ? 
                                <MoonLoader 
                                    size={20}
                                    color={"white"}
                                    loading={true}
                                /> :
                                __("Login")
                            }
                        </button>
                        <div className="register">
                            <Link to="/users/new">{__("Not a member? Register now!")}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);