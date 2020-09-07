import React, { useEffect, useState } from 'react';
import Oneshop from 'oneshop.web';
import ProfilePage from './Profile';
import { Redirect } from 'react-router-dom';
import './user.css';
import { MoonLoader } from 'react-spinners';
import { connect } from 'react-redux';
import actions from '../../helpers/actions';


// --------------------- REDUX ---------------------
const mapStateToProps = state => ({
    shop     : state.shop.session,
    settings : state.shop.settings,
    i18n     : state.i18n,
    profile  : state.user.profile
});

const mapDispatchToProps = dispatch => ({
    setProfile : profile => dispatch({
        type    : actions.SET_USER,
        payload : profile
    })
});
// --------------------- /REDUX ---------------------




function User(props){
    
    let [isLoading, setIsLoading] = useState(true);
    let OS = new Oneshop();
    let { profile, setProfile } = props;

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

 export default connect(mapStateToProps, mapDispatchToProps)(User);

