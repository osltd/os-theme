import React, { useState, useEffect } from 'react';
import {  Link } from 'react-router-dom';
import './chat.css';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    shop     : state.shop.session,
    settings : state.shop.settings,
    i18n     : state.i18n,
    user     : state.user
});

const Chat = (props) => {

    // get shop
    let { shop, settings } = props;
    // get i18n settings
    let { __ } = props.i18n;
    // display chat box
    let [showChatBox, setShowChatBox] = useState(false);


    useEffect(() => {

    }, [])


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
                    { width : "50px", height : "50px", borderRadius : "25px", zIndex : -1, right: "0px", borderColor : 'white' }
                }
            >

            </div>
        </div>
    )

}

export default connect(mapStateToProps)(Chat);