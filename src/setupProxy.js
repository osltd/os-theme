//@ts-ignore

const proxy = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(proxy(process.env.REACT_APP_API_PATH, {

        target: process.env.REACT_APP_API_HOST,
        secure: false, // https
        changeOrigin: true,
        // Fix cookies not saved in browser issue
        onProxyRes: proxyResponse => {

            // if (proxyResponse.headers['set-cookie']) {
            //     const cookies = proxyResponse.headers['set-cookie'].map(cookie => {
            //         return cookie
            //             .replace(/domain=.*/, '')
            //             .replace(/path=.*/, '')
            //             .replace(/HttpOnly/, '')
            //             .replac
            //
            //e(/Secure/, '')
            //     });
            //     proxyResponse.headers['set-cookie'] = cookies;
            // }
        }
    }));
    app.use(proxy(process.env.REACT_APP_S3_API_PATH, {
        target: process.env.REACT_APP_S3_API_HOST,
        pathRewrite: {[`^${process.env.REACT_APP_S3_API_PATH}`]: ''},
        secure: false, // https
        changeOrigin: true,
    }))
};