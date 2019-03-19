import {I18n} from "./interface";
import {en} from "./en";

const getZH= ():I18n=>{
    let temp:any = {}
    Object.keys(
        en
    ).map(
        (key,i)=>{
            temp[key]='中文'
        }
    )
    return temp
}
export const zh_HK: I18n = getZH()