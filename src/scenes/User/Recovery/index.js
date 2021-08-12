import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Oneshop from 'oneshop.web';
import './recovery.css';
import { connect } from 'react-redux';
import { MoonLoader } from 'react-spinners';
import actions from '../../../helpers/actions';

// ------------------------ REDUX ------------------------
const mapStateToProps = state => ({
    shop    : state.shop.session,
    i18n    : state.i18n,
});

const mapDispatchToProps = dispatch => ({
    setProfile : profile => dispatch({
        type    : actions.SET_USER,
        payload : profile
    })
});
// ------------------------ /REDUX ------------------------


function Recovery(props){

    // get oneshop instance
    const OS = new Oneshop();
    // get shop
    const { shop, setProfile, profile } = props;
    // get i18n method
    const { __ } = props.i18n;
    // recovery type
    const [type, setType] = useState("recovery");
    // step
    const [step, setStep] = useState(1);
    // password reset form
    let [form, setForm] = useState({
        id : "",
        code : "",
        passwd : "",
        confpasswd : ""
    })
    // email state
    let [email, setEmail] = useState("");
    // loading status
    let [isLoading, setIsLoading] = useState(false);
    // redirect path
    let [redirect, setRedirect] = useState(null);


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
    const isResetPass = /^recovery$/.test(type);

    function sendRecoveryEmail(){
        // start loading
        setIsLoading(true);
        // create validation
        OS.validation.create({
            email,
            type : isResetPass ? "code" : "link"
        })
        // login success
        .then(res => {
            console.log("---> row: ", res);
            // finish loading
            setIsLoading(false);
            // save validation id if reset password
            if(isResetPass) {
                setForm({
                    ...form,
                    id : res.rows[0].id
                })
            }
            // next step
            setStep(2);
        })
        // error
        .catch(error => {
            // finish loading
            setIsLoading(false);
            console.log(error)
            // show message
            alert(((error || {}).messages || [])[0] || __("Please ensure the email address is correct"));
        });
    }

    function resetPassword() {
        // start loading
        setIsLoading(true);
        // create validation
        OS.validation.consume(form.id, {
            ...form
        })
        // login success
        .then(([row]) => {
            console.log("---> row: ", row);
            // finish loading
            setIsLoading(false);
            // next step
            setStep(3);
        })
        // error
        .catch(error => {
            // finish loading
            setIsLoading(false);
            // show message
            alert(((error || {}).messages || [])[0] || __("Please ensure the code is correct and it's enter within 15mins"));
        });
    }


    const isValid = function(){
        if(step === 1) {
            return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(email || "")
        } else if(step === 2 && isResetPass) {
            return /^[0-9]{6}$/.test(form.code) && form.passwd.trim().length >= 8 && form.passwd == form.confpasswd
        } else {
            return true
        }
    }()
    // -------------------- /HELPER --------------------

    // -------------------- Rendering ----------------------- //
    const showSuccessMsg = () => (
        <div className="success-msg">
            {__(isResetPass ? "reset_pw_ok_1" : "reset_pw_ok_2")}
        </div>
    )

    const renderPasswordForm = () => (
        <>
            <div className="form-group">
                <label>{__("Enter the code you have received in your email")}</label>
                <input 
                    type="text" 
                    value={form.code} 
                    onChange={(event) => { setForm({ ...form, code : event.target.value }); }}
                    placeholder={__("6 digits code")}
                    disabled={isLoading}
                />
            </div>
            <div className="form-group">
                <label>{__("New Password")}</label>
                <input 
                    type="password" 
                    value={form.password} 
                    onChange={(event) => { setForm({ ...form, passwd : event.target.value }); }}
                    placeholder="．．．．．．．．"
                    disabled={isLoading}
                />
            </div>
            <div className="form-group">
                <label>{__("Confirm New Password")}</label>
                <input 
                    type="password" 
                    value={form.confPassword} 
                    onChange={(event) => { setForm({ ...form, confpasswd : event.target.value }); }}
                    placeholder="．．．．．．．．"
                    disabled={isLoading}
                />
            </div>
        </>
    )

    const renderBasicForm = () => (
        <>
            <div className="form-group">
                <label>{__("1. Choose your action")}</label>
                <div className="recovery-options">
                    <button 
                        onClick={() => setType("recovery")} 
                        style={{ 
                            fontWeight : isResetPass ? "700" : "500",
                            textDecoration : isResetPass ? "underline" : "none"
                        }} 
                        disabled={step > 1}
                    >
                        {__("Reset password")}
                    </button>
                    <button 
                        onClick={() => setType("activate")} 
                        style={{ 
                            fontWeight : !isResetPass ? "700" : "500",
                            textDecoration : !isResetPass ? "underline" : "none"
                        }}
                        disabled={step > 1}
                    >
                        {__("Resend activation email")}
                    </button>
                </div>
            </div>
            <div className="form-group">
                <label>{__("2. Enter Your Email")}</label>
                <input 
                    type="text" 
                    value={email} 
                    onChange={(event) => { setEmail(event.target.value); }}
                    placeholder="peter.chan@abc.com"
                    disabled={step > 1}
                />
            </div>
        </>
    )
    // -------------------- /Rendering ----------------------- //


    return redirect != null ? 
        <Redirect to={redirect} /> : 
        <div className="recovery">
            <div className="recovery-wrapper">
                <div className="form">
                    <div className="greeting">
                        {shop.logo ? <img src={shop.logo}/> : null}
                        <h1>{__("Find Your Account")}</h1>
                    </div>
                    <div className="form-wrapper">
                        {
                            // Selection and email input
                            ((step < 3 && isResetPass) || step == 1) ? renderBasicForm() : null
                        }
                        {
                            // Password form
                            step === 2 && isResetPass ? renderPasswordForm() : null 
                        }
                        {
                            // success message
                            (step == 2 && !isResetPass) || (step == 3 && isResetPass) ? showSuccessMsg() : null
                        }
                        <button
                            onClick={() => {
                                if(step === 1) {
                                    // send
                                    sendRecoveryEmail();
                                } else if(step === 2 && isResetPass) {
                                    // reset pass
                                    resetPassword()
                                } else {
                                    // go back
                                    setRedirect("/users");
                                }
                            }}
                            disabled={isLoading || !isValid}
                        >
                            {
                                isLoading ? 
                                <MoonLoader 
                                    size={20}
                                    color={"white"}
                                    loading={true}
                                /> :
                                __(step === 1 ? "Confirm" : (step === 2 && isResetPass ? "Reset Password" : "Go Login"))
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(Recovery);