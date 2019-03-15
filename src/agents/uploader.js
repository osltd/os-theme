var Uploader = function () {
};


var futch = function (xhr, url, opts, onProgress, onAbort, callback, endpoint) {

    xhr.open(opts.method || 'get', url);
    xhr.onload = function (e) {
        console.log("=====> xhr.onload: ", e);
        callback && callback({response: e, endpoint: endpoint}, null);
    };
    xhr.onerror = function (e) {
        console.log("=====> xhr.onerror : ", e);
        callback && callback({}, {error: e})
    };
    xhr.onabort = () => {
        console.log("=====> onabort: ", onabort);
        onAbort && onAbort();
    };
    xhr.upload.onprogress = onProgress;
    xhr.send(opts.body);
};


Uploader.prototype.upload = function (url, file, signature, callback, onProgress, onAbort) {
    var xhr = new XMLHttpRequest();
    try {
        var form = new FormData();

        form.append('key', signature.fileName);
        form.append('acl', 'public-read');
        form.append('Content-Type', signature.mimeType);
        form.append('X-Amz-Credential', signature.amzCred);
        form.append('X-Amz-Algorithm', "AWS4-HMAC-SHA256");
        form.append('X-Amz-Date', signature.expDate);
        form.append('Policy', signature.encodedPolicy);
        form.append('X-Amz-Signature', signature.sign);
        form.append('file', file);
        //    perform upload file
        futch(xhr, url, {
            'method': 'post',
            'body': form
        }, onProgress, onAbort, callback, signature.endPoint);

    } catch (e) {
        console.log("=====> catch:", e);
        callback && callback({}, {error: e})
    }
    return xhr;
};


Uploader.prototype.cancel = function (request) {
    //wait for ready to be abort
    var interval = setInterval(() => {
        if (request.readyState > 0) {
            clearInterval(interval);
            request.abort();
        }
    }, 20);
};


export default new Uploader();
