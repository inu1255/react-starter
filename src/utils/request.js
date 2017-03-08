import fetch from 'dva/fetch';
import storage from 'asha/libs/storage.js'
import pick from 'asha/libs/file/picker.js'
var sto = storage("app")
import { message } from 'antd'

import { API, OPTION } from './config.js'

module.exports = {
    request(uri, data) {
        var option = Object.assign({}, OPTION)
        if (data) {
            option.method = "POST"
            if (typeof data !== "string")
                option.body = JSON.stringify(data)
            else
                option.body = data
        }
        uri += (uri.indexOf("?") >= 0 ? "&" : "?") + "access_token=" + sto.token
        return new Promise(function(resolve, reject) {
            fetch(API + uri, option).then(function(res) {
                if (res.ok) return res.json();
            }).then(function(res) {
                if (!res) reject(404)
                else if (typeof res.code == "undefined") resolve(res)
                else if (res.code == 0) resolve(res.data)
                else {
                    message.error(res.msg)
                    reject(res.msg)
                }
            })
        })
    }
}
