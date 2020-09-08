import React, { useState, useEffect } from 'react';
import MessageRow from './chatRow';
import './chat.css';
import { connect } from 'react-redux';
import ws from '../../helpers/websocket';

//  ------------ REDUX --------------
const mapStateToProps = state => ({
    shop          : state.shop.session,
    settings      : state.shop.settings,
    i18n          : state.i18n,
    globalProfile : state.user.profile
});
//  ------------ REDUX --------------


const Chat = (props) => {

    // get shop
    let { shop, globalProfile } = props;
    // get i18n settings
    let { __ } = props.i18n;
    // display chat box
    let [showChatBox, setShowChatBox] = useState(false);
    // save client ref
    let [client, setClient] = useState(null);
    // profile for chating session
    let [profile, setProfile] = useState(null);
    // get messages
    let [messages, setMessages] = useState([]);
    // input valve
    let [inputVal, setInputVal] = useState("");
    // attachment?
    let [attachment, setAttachment] = useState(null);
    // thumbnail
    let [thumbnail, setThumbnail] = useState(null);

    useEffect(() => {
        // profile from http exists but ws's not exists
        if(globalProfile && !profile) getProfile();
        // get messages
        if(client && profile && !messages.length) getMessages();
    }, [globalProfile, profile, client]);

    const connect = (cb) => {
        ws.getClient(c => {
            // save client
            setClient(c);
            // register
            c.registerBroadCastListener("web_chat", onBroadcast);
            // callback?
            cb && cb(c);
        });
    }

    const scrollToEnd = () => {
        // get element
        let msgsList = document.getElementById("messages");
        msgsList.scrollTop = msgsList.scrollHeight;
    }


    // -------------------- broadcast listener --------------------
    const onBroadcast = (broadcast) => {
        // new message from merchant
        if(/^shop\.to\.consumer$/i.test(broadcast.type || "") && broadcast.context != undefined){
            // get msg context
            let { id, message, attachments, sender, created_time, shop_id } = broadcast.context;
            // from the same shop?
            if(shop.id == shop_id) {
                // push new incoming messages
                setMessages(oldMsgs => [...oldMsgs].concat({
                    id, message, sender, created_time, attachments, status : 'SENT'
                }));
                // scroll to the end
                scrollToEnd();
            }
        }
    }
    // ---------------- /broadcast listener --------------------


    // ------------------ Message did chnage listener ------------------
    const msgStatusDidChangeAtRowIndex = (index, status) => {
        setMessages([...messages].map((m, idx) => {
            if(idx == index) m.status = status;
            return m;
        }));
        // scroll to the end
        scrollToEnd();
    }
    // ------------------ /Message did chnage listener ------------------


    // ------------------- Get profile -------------------
    const getProfile = () => {
        // get profile
        const get = (c) => { c.setAction('/my.profile').cmd(getProfileHandler) };
        // has client?
        !client ? connect(get) : get(client);
    }

    // handler
    const getProfileHandler = result => {
        // got profile?
        if(result.result) setProfile(result.data.rows[0]);
    }
    // ------------------- /Get profile -------------------



    // ------------------- Send Messages -------------------
    const sendMessage = () => {
        // clear msg and attachments
        setInputVal("");
        setAttachment(null);
        setThumbnail(null);
        // push into msg container
        setMessages(oldMsgs => {
            let newMsgs = [...oldMsgs];
            newMsgs.push({
                message      : (inputVal || ""),
                attachments  : thumbnail ? [`${thumbnail}`] : undefined,
                file         : attachment || undefined,
                created_time : new Date().toISOString(),
                sender : {
                    type : "enquirer" // me
                },
                status : 'PENDING'
            });
            return newMsgs;
        });
    }
    // ------------------- /Send Messages -------------------



    // ------------------- Get Messages -------------------
    const getMessages = () => {
        // get profile
        const get = (c) => { 
            c
            .setAction('/get.shop.messages')
            .setArguments({ 
                shopId : shop.id, 
                page   : Math.ceil(messages.length/15) + 1 
            })
            .cmd(getMessagesHandler) 
        };
        // has client?
        !client ? connect(get) : get(client);
    }

    // handler
    const getMessagesHandler = result => {
        // got profile?
        if(result.result && ((result.data || {}).rows || []).length > 0) {
            // save messages
            setMessages(
                [...messages]
                .concat(result.data.rows)
                .map(m => {
                    // mark status as SENT if the msg is from server
                    m.status = 'SENT';
                    return m;
                })
            );
            // scroll to the end
            scrollToEnd();
        }
    }
    // ------------------- /Get Messages -------------------



    let valid = (inputVal || "").trim().length > 0 || attachment;


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
                    profile == null ?
                    // ----------------- Disconnected -----------------
                    <div className="chat-box-placeholder">
                        <i className="fas fa-unlink"></i>
                        <span>
                            {__("Disconnected")}
                        </span>
                        <span>
                            {__("Please login again.")}
                        </span>
                    </div> :
                    // ----------------- Logged in, chatlist -----------------
                    <div className="chat-list">
                        <div className="cl-header">{shop.name}</div>
                        <div id="messages" className="cl-messages">
                            {messages
                            .filter((m, i, ms) => {
                                let mids = ms.map(m => m.id);
                                return mids.indexOf(m.id) === i;
                            })
                            .sort((a, b) => new Date(a.created_time).getTime() > new Date(b.created_time).getTime())
                            .map((m, i) => <MessageRow 
                                                {...m} 
                                                key={`msg_row_${i}`}
                                                client={client} 
                                                previousItem={messages[i-1]} 
                                                nextItem={messages[i+1]}
                                                index={i}
                                                msgStatusDidChangeAtRowIndex={msgStatusDidChangeAtRowIndex}
                                            />)}
                        </div>
                        {
                            thumbnail ? 
                            <div className="cl-attachment-view">
                                {/* ------- thumbnail image ------- */}
                                <img src={thumbnail} />
                                {/* ------- remove button -------- */}
                                <button onClick={() => {
                                    // clear attachment and thumbnail
                                    setAttachment(null);
                                    setThumbnail(null);
                                }}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div> : null
                        }
                        
                        <div className="cl-input-wrapper">
                            <button 
                                className="attachment-button"
                                onClick={() => {
                                    document.getElementById('fileButton').click();
                                }}
                                disabled={attachment != null}
                            >
                                <input 
                                    id="fileButton" 
                                    type="file" 
                                    hidden 
                                    accept=".png,.jpeg"
                                    onChange={e => {
                                    // get file
                                    let file = e.target.files[0];
                                    // file exists?
                                    if(file) {
                                        //create reader
                                        let reader = new FileReader();
                                        // on read
                                        reader.onload = e => {
                                            // save attachment file
                                            setAttachment(file);    
                                            // set thumbnail
                                            setThumbnail(e.target.result)
                                        }
                                        // start read file
                                        reader.readAsDataURL(file);
                                    }
                                }}/>
                                <i className="fas fa-image"></i>
                            </button>
                            <input 
                                type="text"
                                value={inputVal}
                                onChange={e => setInputVal(e.target.value)}
                                onKeyUp={e => {
                                    // press enter and valid to send?
                                    if((/^enter$/i.test(e.key) || e.keyCode === 13) && valid){
                                        // send
                                        sendMessage();
                                    }
                                }}
                                placeholder={__("Press Enter to send")}
                            />
                            <button 
                                className="send-button"
                                onClick={sendMessage}
                                disabled={!valid}
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )

}

export default connect(mapStateToProps)(Chat);