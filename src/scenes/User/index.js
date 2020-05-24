import React, { useEffect, useState } from 'react';
import Oneshop from 'oneshop.web';
import ProfilePage from './Profile';
import { Redirect } from 'react-router-dom';
import './user.css';
import { MoonLoader } from 'react-spinners';


function User(props){
    
    let [profile, setProfile] = useState(null);
    let [isLoading, setIsLoading] = useState(true);
    let OS = new Oneshop();


    // --------------- LIFECYCLE ---------------
    useEffect(() => {
        // retreive profile eveyr time
        OS.consumer.profile.get()
        // got 
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
    // --------------- /LIFECYCLE ---------------

    return (
        <div className="user">
            <div className="wrapper">
                { 
                    isLoading ? 
                    // show loading screen when loading
                    loadingScreen() 
                    : (
                        // logged in already?
                        profile ? 
                        // show profile
                        <ProfilePage profile={profile}/> 
                        : 
                        // redriect to loging page
                        <Redirect to="/users/login"/>
                    )}
            </div>
        </div>
    );
}

function loadingScreen(){
    return (<div className="loading">
        <MoonLoader 
            size={20}
            color={"#000000"}
            loading={true}
        /> 
    </div>);
}

 export default User;

