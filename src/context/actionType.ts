import productActionType from "./Product/actionType";
import feedActionType from "./Feed/actionType";
import {commonActionType} from "./Common/actionType";
import authActionType from "./Auth/actionType";

const actionType = {
    product: productActionType,
    feed: feedActionType,
    common: commonActionType,
    auth: authActionType,
};


export default actionType