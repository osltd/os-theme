"use strict";
exports.__esModule = true;
var fs = require("fs");
var zh_HK_1 = require("../constants/locale/zh_HK");
var temp = '';
var temps = '';
Object.keys(zh_HK_1.zh_HK).map(function (n) {
    temp += n + " = '" + n + "',\n                    ";
    temps += n + ":string;  ";
});
var t = 'export enum keyOfI18n{' + temp + '}' +
    '' + 'export interface I18n{' + temps + '}';
fs.writeFile('src/constants/locale/interface.ts', t, function (err) {
    if (err)
        console.log(err);
});
