import * as  fs from 'fs'
import {zh_HK} from "./constants/locale/zh_HK";

let temp = ''
let temps = ''
Object.keys(zh_HK).map(
    (n)=>{
        temp+=`${n} = '${n}',
                    `
        temps+=`${n}:string;  `
    }
)
const t = 'export enum keyOfI18n{' + temp +'}' +
    ''+'export interface I18n{'+ temps+ '}'

fs.writeFile('src/constants/locale/interface.ts',t,err=>{
    if(err) console.log(err)
    }
)