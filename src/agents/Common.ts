import axios from "axios/index";

export const REACT_APP_S3_API_HOST = 'https://s3-ap-southeast-1.amazonaws.com/assets.oneshop.cloud'

export interface Signature {
    fileName: string
    mimeType: string
    sign: string
    bucket: string
    endPoint: string
    expDate: string
    bucketAcl: string
    encodedPolicy: string
    amzCred: string


}


const Common = {
    getS3Signature: (file: File) => axios.post('/signatures', {extension: file.type}).then((res) => res.data.data.signatures[0]
    ).catch(err => console.log("====> Error：", err)),
};

export default Common