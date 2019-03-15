import axios from "axios/index";
import Uploader from "./uploader";


const Common = {
    uploadMedia: (file) => axios.post('https://panel.oneshop.cloud/api/signatures', {extension: file.type}).then(res => {
        return new Promise(
            (resolve, reject) => {
                let signature = (res.data.data.signatures || [])[0];
                new Uploader.upload(
                    'https://s3-ap-southeast-1.amazonaws.com/assets.oneshop.cloud',
                    file,
                    signature,
                    () => {
                        console.log(
                            "=====> Signature: ", signature
                        );
                        resolve(signature.endPoint)
                    },
                    (progress) => {
                        console.log("====> progress: ", progress);
                    },
                    () => {
                        console.log("Abort!!!!!.");
                    })

            }
        )

    }).catch(err => console.log("====> Error：", err)),
};

export default Common