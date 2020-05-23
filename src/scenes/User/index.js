import React, { useEffect, useState } from 'react';
import Oneshop from 'oneshop.web';
import ProfilePage from './Profile';
import { Redirect } from 'react-router-dom';
import './user.css';

function User(props){
    
    var [profile, setProfile] = useState(null);
    var [isLoading, setIsLoading] = useState(true);
    var OS = new Oneshop();

    useEffect(() => {
        OS.consumer.profile.get()
        .then((rows) => {
            var user = rows[0];
            setProfile(user);
            setIsLoading(false);
        })
        .catch((error) => {
            setIsLoading(false);
            setProfile(null);
        });
    },[]);

    return (
        <div className="user">
            <div className="wrapper">
                { isLoading ? loadingScreen() : (profile ? <ProfilePage profile={profile}/> : <Redirect to="/users/login"/>)}
            </div>
        </div>
    );
}

function loadingScreen(){
    return (<div className="loading">
        Loading...
    </div>);
}

 export default User;

