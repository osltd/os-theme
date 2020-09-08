import React, { useState, useEffect } from 'react';
import ws from '../../helpers/websocket';
import { connect } from 'react-redux';


//  ------------ REDUX --------------
const mapStateToProps = state => ({
    shop  : state.shop.session,
    __    : state.i18n.__,
});
//  ------------ REDUX --------------


const ChatRow = (props) => {

    // get message content
    let { id, message, file, attachments, created_time, sender, previousItem, nextItem, shop, status, index, msgStatusDidChangeAtRowIndex, __ } = props;
    // place to left?
    let placeToLeft = !/^enquirer$/i.test(sender.type);
    // padding top
    let paddingTop = 
    previousItem == undefined ? "1px" :
    (
        /^enquirer$/i.test(sender.type) && /^replyer$/i.test(previousItem.sender.type) ? 
        "15px" 
        : "1px"
    );
    let paddingBottom = nextItem == undefined ? "1px" :
    (
        /^enquirer$/i.test(sender.type) && /^replyer$/i.test(nextItem.sender.type) ? 
        "15px" 
        : "1px"
    );
    // set attachments
    let [attachment, setAttachment] = useState((attachments || [])[0] || null);
    // client alias
    let [client, setClient] = useState(props.client || null);
    // upload progress
    let [percentage, setPercentage] = useState(0);


    // ----------------- LIFECYCLE --------------------
    useEffect(() => {
        // pending msg
        if(/^PENDING$/i.test(status)){
            // file exists?
            if(file != undefined){
                // upload image first
                uploadAttachment();
            } else {
                // send message directly
                sendMessage();
            }   
        }
    }, []);
    // ----------------- /LIFECYCLE --------------------



    // ------------------- send Messages -------------------
    const connect = (cb) => {
        ws.getClient(c => {
            // save client
            setClient(c);
            // callback?
            cb && cb(c);
        });
    }

    const sendMessage = (media) => {
        // send message
        const get = (c) => { 
            // prepare payload
            let payload = {  content : (message || "").trim().length > 0 ? message : " " };
            // append media
            if(media != undefined && (media || "").startsWith("https://")) payload.attachments = [media];
            // send cmd
            c
            .setAction('/leave.shop.message')
            .setArguments({ shopId : shop.id })
            .setForm(payload)
            .cmd(sendMessageHandler) 
        };
        // has client?
        !client ? connect(get) : get(client);
    }

    // handler
    const sendMessageHandler = result => {
        // got profile?
        if(result.result) {
            msgStatusDidChangeAtRowIndex(index, 'SENT');
        }
    }
    // ------------------- /send Messages -------------------





    // --------------------- ATTACHMENT -----------------------
    const uploadAttachment = () => {
        // send message
        client
        .setAction("/signatures")
        .setForm({ extension : file.type })
        .cmd(signatureHandler);
    }

    const signatureHandler = (result) => {
        // success
        if(result.result === true && ((result.data || {}).rows || []).length > 0) {
            // use signature to upload photo
            uploadPhoto(result.data.rows[0]);
        } else {
            // failed to get signature

        }
    }

    const uploadPhoto = (signature) => {
        // init form body
      let body = new FormData();
      // append data
      body.append("key", signature.fileName);
      body.append("acl", signature.bucketAcl);
      body.append("Content-Type", signature.mimeType);
      body.append("X-Amz-Credential", signature.amzCred);
      body.append("X-Amz-Date", signature.expDate);
      body.append("Policy", signature.encodedPolicy);
      body.append("X-Amz-Signature", signature.sign);
      body.append("X-Amz-Algorithm", "AWS4-HMAC-SHA256");
      body.append("file", file);
      // create xhr request
      let xhr = new XMLHttpRequest();
      // set request
      xhr.open( "POST", 'https://s3-ap-southeast-1.amazonaws.com/cdn.oneshop.cloud');
      // on upload
      xhr.upload.onprogress = ({ total, loaded }) => setPercentage((loaded/total)*100);
      // error
      xhr.onerror = (error) => {};
      // done
      xhr.onload = () => sendMessage(signature.endPoint);
      // start
      xhr.send(body);
    }
    // --------------------- ATTACHMENT -----------------------











    return (
        <div 
            className="cl-message-row"
            style={{
                justifyContent : placeToLeft ? 'flex-start' : 'flex-end',
                paddingTop,
                paddingBottom
            }}
        >
            <div 
                className="cl-message-bubble" 
                style={{
                    backgroundColor : placeToLeft ? '#f8f8f8' : '#0377fc',
                    border : placeToLeft ? "1px solid #f1f1f1" : "none",
                    color : placeToLeft ? 'black' : 'white',
                }}
            >   
                {
                    // -------------------------- ATTACHMENT --------------------------
                    attachment != null && attachment != undefined ? 
                    <a href={attachment} target="_blank">
                        <img src={attachment} className="msg-media" alt={attachment}/>
                    </a>
                    :
                    null
                }
                {
                    // -------------------------- MESSAGE --------------------------
                    (message || "").trim().length > 0 ?
                    <div className="msg-body">{message}</div> : null
                }
                <div className="msg-timestamp">
                    {/^PENDING$/i.test(status) ? __("SENDING") : toAmPm(created_time)}
                </div>
            </div>
        </div>
    )
}



// ----------------- Helper -----------------
const toAmPm = (timestring) => {
    // get time
    const time = new Date(timestring);
    // get hour
    let hh = time.getHours();
    let h = hh;
    // AM/PM ?
    const M = hh != 24 && hh >= 12 ? "PM" : "AM";
    // pad 0 to hr
    if (h >= 12) {
        h = hh - 12;
    }
    if (h == 0) {
        h = 12;
    }
    // minutes
    let min = time.getMinutes();
    // pad 0 to min
    min = min < 10 ? `0${min}` : min;
    // return time only
    return `${h}:${min} ${M}`;
}
// ----------------- /Helper -----------------



export default connect(mapStateToProps)(ChatRow);