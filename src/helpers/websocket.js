import Cookies from "universal-cookie";
const cookies = new Cookies();


/** @endpoint_wws */
//const endPoint = "wss://enquiry.oneshop.cloud";
const endpoint = "ws://localhost";

// setup ws
let ws = null;

const clearProtocol = (cb) => {
    try {
        // remove
        cookies.set('protocol', null);
        // close connection
        if(ws != null && typeof ws.close == 'function') ws.close();
    } catch (error) {}
    cb && cb();
};



const getProtocol = () => {
     // ------------------------- protocol -------------------------
    // save to storage
    let protocol = cookies.get('protocol');
    // has protocol?
    if(protocol == null){
        // generate a new one
        protocol = uuid();
        // save to storage
        cookies.set('protocol', protocol, { samesite : 'None', secure : true });
    }
    // ------------------------- /protocol -------------------------
    return protocol;
}



const getClient = async (cb) => {
    
    // ------------------------- Connection -------------------------
    // connect to web socket
    ws = new WebSocket(endpoint, getProtocol());
    // setup reconnect retryTimer
    let retryTimer = null;
    // setup keep alive timer
    let respawnTimer = null;
    // is connecting
    let isConnecting = false;
    // commands container
    let commands = {};
    // broadcastListeners container
    let broadcastListeners = {};
    // reconnecting listeners
    let connectionListeners = {};


    const keepConnectionAlive = () => {
        // interval of sending ping mssage to server
        const intervalInSeconds = 15;
        // AWS ELB default connection timeout is 60 seconds
        // to keep the websocket client connection alive
        // send msg every 15 seconds
        respawnTimer = setTimeout(() => {
            // ensure it still valid
            if(ws && ws.readyState == WebSocket.OPEN) {
                // send some bullshit
                ws.send(`{"message":"keep in touch!"}`);
                // broadcast is connected
                Object.values(connectionListeners).forEach(l => typeof l == 'function' && l(true));
            } else {
                // disconnected?
                reconnect();
            }
            // loop func
            keepConnectionAlive();
        }, intervalInSeconds * 1000);
    }


    // on open handler
    const onopen = async () => {
        console.log('====> connection opened, protocol: ', await getProtocol());
        // cancel reconnect retryTimer
        retryTimer && clearTimeout(retryTimer);
        // connected
        isConnecting = false;
        // reset respawn timer
        respawnTimer && clearTimeout(respawnTimer);
        // keep connection alive
        keepConnectionAlive();
        // broadcast to all the client is connected
        Object.values(connectionListeners).forEach(l => typeof l == 'function' && l(true));
        // return the connected client
        cb && cb(ws);
    };

    const attachMethods = (ws) => {
        // ---- bind methods ---
        ws.payload = { method : "get" }; // init payload
        ws.setAction = (action) => { ws.payload = ws.payload || {}; ws.payload.action = action; return ws; } // set action api
        ws.setArguments = (args) => { ws.payload = ws.payload || {}; ws.payload.arguments = args; return ws; } // set argument api
        ws.setForm = (form) => { ws.payload = ws.payload || {}; ws.payload.form = form; return ws; } // set form api
        ws.setMethod = (method) => { ws.payload = ws.payload || {}; ws.payload.method = method; return ws; } // set form method api
        ws.cmd = (handler, idCallback) => {
            ws.payload = ws.payload || {};
            // set id
            ws.payload.id = uuid();
            // register handler
            commands[ws.payload.id] = {
                handler,
                idCallback
            };
            // has id callback?
            commands[ws.payload.id].idCallback != undefined && commands[ws.payload.id].idCallback(ws.payload.id);
            // send command
            ws.send(JSON.stringify(ws.payload));
            // clear payload context
            ws.payload = { method : "get" };
        }
        // broadcast listener
        ws.getBroadCastListener = (identifier) => { return broadcastListeners[identifier]; };
        ws.registerBroadCastListener = (identifier, listener) => { broadcastListeners[identifier] = listener; };
        ws.removeBroadCastListener = (identifier) => { delete broadcastListeners[identifier]; };
        // connection Status listener
        ws.getConnectionListeners = (identifier) => { return connectionListeners[identifier]; };
        ws.registerConnectionListeners = (identifier, listener) => { connectionListeners[identifier] = listener; };
        ws.removeConnectionListeners = (identifier) => { delete connectionListeners[identifier]; };

        ws.onmessage = (msg) => {
            // result container
            let result = {};
            // parse json
            try { result = JSON.parse(((msg || {}).data || '')); } 
            catch (error) { result = result || {}; }
            // broadcast message
            if(result.broadcast != undefined) {
                Object.values(broadcastListeners).forEach(l => typeof l == 'function' && l(result.broadcast));
            }
            // has id?
            if(result.id && typeof commands[result.id].handler == "function"){
                // execute handler
                commands[result.id].handler(result);
                // remove handlers
                delete commands[result.id];
            }
        }
        // ---- /bind methods ---
    };
    // attach method
    attachMethods(ws);

    // reconnection handler
    const reconnect = () => {
        // reset respawn timer
        respawnTimer && clearTimeout(respawnTimer);
        // is not connecting?
        if(!isConnecting){
            // connecting
            isConnecting = true;
            // execute after one second
            retryTimer = setTimeout(async () => { 
                // trying to connect
                ws = new WebSocket(endpoint, getProtocol());
                // broadcast reconnecting
                Object.values(connectionListeners).forEach(l => typeof l == 'function' && l(false));
                // attach method
                attachMethods(ws);
                // opened
                ws.onopen = onopen;
                // when connection is closed OR error
                ws.onclose = reconnect;
                ws.onerror = reconnect;
            } , 1000);
        }
    };
    
    // connected successfully
    ws.onopen = onopen;

    // when connection is closed OR error
    ws.onclose = reconnect;
    ws.onerror = reconnect;
    // ------------------------- /Connection -------------------------

}


export default {
    getClient, clearProtocol 
};


// ----------------- helper functions --------------------- //
function uuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
// ----------------- /helper functions --------------------- //