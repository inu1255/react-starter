import fetch from 'dva/fetch';
import storage from 'asha/libs/storage.js'
import pick from 'asha/libs/file/picker.js'
var data = storage("api.login")

import { API, OPTION } from './config.js'

module.exports = {
    request(uri, data) {
        var option = Object.assign({}, OPTION)
        if (data)
            option.method = "POST"
        uri = (uri.indexOf("?") >= 0 ? "&" : "?") + "access_token=" + data.token
        return new Promise(function(resolve, reject) {
            fetch(API + uri, option).then(function(res) {
                if (res.ok) return res.json();
            }).then(function(res) {
                if (!res) reject(404)
                if (typeof res.code == "undefined") resolve(res)
                if (res.code == 0) resolve(res.data)
                else reject(res.msg)
            })
        })
    },
    login(d) {
        Object.assign(data, d)
        data.saveStorage()
    },
    logout() {
        for (var k in data) {
            Reflect.deleteProperty(data, k)
        }
        data.saveStorage()
    }
}
