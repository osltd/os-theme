import React, { useState } from 'react';
import Oneshop from 'oneshop.web';
import './profile.css';
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


function UserProfile(props){
    
    // get oneshop instance
    let OS = new Oneshop();
    // get translation method
    const { __ } = props.i18n;
    // get profile and set profile method
    const {profile, setProfile} = props;
    // form data for updating profile
    let [form, setForm] = useState(profile || {});
    // loading status
    let [isLoading, setIsLoading] = useState(false);

    // ------------------ HELPERS ------------------
    async function logout(){
        // set loading
        setIsLoading(true);
        // clear websocket protocol as well
        ws.clearProtocol();
        // logging out
        OS.consumer.logout()
        .then(() => {
            // loading finished
            setIsLoading(false);
            // clear profile
            setProfile(null);
            // redirect
            window.location.pathname = "/users";
        })
        .catch(error => {
            // loading finished
            setIsLoading(false);
            // show error msg
            alert(error.message);
        });
    }

    async function updateProfile(){
        try {
            // set loading
            setIsLoading(true);
            // update profile
            await OS.consumer.profile.update(form);
            // save form
            setProfile({...form});
            // finish loading
            setIsLoading(false);
        } catch (error) {
            // finish loading
            setIsLoading(false);
            // show error msg
            alert(error.message);
        }
    }


    function updateFormData(key, value){
        setForm(oldForm => {
            // clone old form
            let newForm = {...oldForm};
            // update form data
            newForm[key] = value;
            // return updated form
            return newForm;
        });
    }

    function hasChanges(){
        // preset result to false
        let formChanged = false;
        // searh any changes in profile
        Object.keys(profile || {}).forEach(key => {
            // changes has been made
            if(form[key] != undefined && profile[key] != form[key]){
                // set to true
                formChanged = true;
            }
        });
        // return result
        return formChanged;
    }
    // ------------------ /HELPERS ------------------

    return (
        <div className="profile">
            <div className="profile-wrapper">
                <div className="left-col">
                    <h1>{__("Profile")}</h1>
                    <div className="data-group">
                        <label>{__("First Name")}</label>
                        <input value={form.first_name} onChange={(e) => updateFormData('first_name', e.target.value)} />
                    </div>
                    <div className="data-group">
                        <label>{__("Last Name")}</label>
                        <input value={form.last_name} onChange={(e) => updateFormData('last_name', e.target.value)} />
                    </div>
                    {
                        hasChanges() ? 
                        // show save button and cancel button
                        <div>
                            <button onClick={updateProfile} disabled={isLoading}>
                                {
                                    isLoading ? 
                                    <MoonLoader 
                                        size={20}
                                        color={"white"}
                                        loading={true}
                                    /> :
                                    __("Save")
                                }
                            </button>
                            <button className="light" onClick={() => setForm({...profile})} disabled={isLoading}>
                                {__("Cancel")}
                            </button>
                        </div> : 
                        // show logout button only if no changes
                        <button className="light" onClick={logout} disabled={isLoading}>
                            {
                                isLoading ? 
                                <MoonLoader 
                                    size={20}
                                    color={"black"}
                                    loading={true}
                                /> :
                                __("Logout")
                            }
                        </button>
                    }
                </div>
                <div className="right-col">
                    <h1>{__("My Orders")}</h1>
                </div>
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);