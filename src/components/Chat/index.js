import React, { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';
import './chat.css';
import { connect, useSelector } from 'react-redux';
import ws from '../../helpers/websocket';

//  ------------ REDUX --------------
const mapStateToProps = state => ({
    shop     : state.shop.session,
    settings : state.shop.settings,
    i18n     : state.i18n,
    user     : state.user
});
//  ------------ REDUX --------------


const Chat = (props) => {

    // get shop
    let { shop, settings } = props;
    // get i18n settings
    let { __ } = props.i18n;
    // display chat box
    let [showChatBox, setShowChatBox] = useState(false);
    // save client ref
    let [client, setClient] = useState(null);
    // profile for chating session
    let [profile, setProfile] = useState(null);

    useEffect(() => {
        // get profile
        getProfile();
    }, []);

    const connect = (cb) => {
        ws.getClient(c => {
            // save client
            setClient(c);
            // callback?
            cb && cb(c);
        });
    }

    // ------------------- Get profile -------------------
    const getProfile = () => {
        // get profile
        const get = (c) => { c.setAction('/my.profile').cmd(getProfileHandler) };
        // has client?
        client == null ? connect(get) : get();
    }

    // handler
    const getProfileHandler = result => {
        console.log('-----> result: ', result);
        // got profile?
        if(result.result) setProfile(result.data.rows[0]);
    }

    // ------------------- /Get profile -------------------


    return (
        <div className="chat-wrapper">
            {/* ----- Chat button ----- */}
            <button className="chat-button" onClick={() => setShowChatBox(!showChatBox)}>
                {showChatBox ? <i className="fas fa-times"></i> : <i className="fas fa-comment"></i>} 
            </button>
            {/* ----- /Chat button ----- */}
            <div 
                className="chat-box" 
                style={
                    // show chat box
                    showChatBox ? { width : "300px", height : "400px", borderRadius : "10px", right: "65px", zIndex : 99999 } 
                    :  // hide it
                    { width : "48px", height : "48px", borderRadius : "24px", zIndex : -1, right: "0px", borderColor : 'white' }
                }
            >
                {
                    profile ?
                    <div className="chat-box-placeholder">
                        {__("Disconnected, please login again.")}
                    </div> :
                    <div>

                    </div>
                }
            </div>
        </div>
    )

}

export default connect(mapStateToProps)(Chat);