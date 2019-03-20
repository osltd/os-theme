"use strict";
exports.__esModule = true;
var en_1 = require("./en");
var getZH = function () {
    var temp = {};
    Object.keys(en_1.en).map(function (key, i) {
        temp[key] = '中文';
    });
    return temp;
};
exports.zh_HK = getZH();
