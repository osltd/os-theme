import React from 'react';
import Oneshop from 'oneshop.web';
import './profile.css';

function UserProfile(props){
    console.log(props);
    // get profile
    var profile = props.profile;
    // get oneshop instance
    var OS = new Oneshop();

    function logout(){
        OS.consumer.logout()
        .then(() => {
            window.location.pathname = "/users";
        })
        .catch(error => {
            alert(error.message);
        });
    }

    return (
        <div className="profile">
            <div className="profile-wrapper">
                <h1>Profile</h1>
                <div className="data-group">
                    <label>First Name</label>
                    <div>{profile.first_name}</div>
                </div>
                <div className="data-group">
                    <label>Last Name</label>
                    <div>{profile.last_name}</div>
                </div>
                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default UserProfile;