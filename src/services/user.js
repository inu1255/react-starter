import Model from './model.js'

function UserModel() {
}
UserModel.prototype = new Model("user", "api.login")
UserModel.prototype.login = function(data) {
    return new Promise((resolve, reject) => {
        this.request("login", data).then((data) => {
            data.token = data.access.token
            Object.assign(this.storage, data)
            this.saveStorage()
            resolve(data)
        }, function(msg) {
            reject(msg)
        })
    })
}
UserModel.prototype.register = function(data) {
    return new Promise((resolve, reject) => {
        this.request("register", data).then((data) => {
            data.token = data.access.token
            Object.assign(this.storage, data)
            this.saveStorage()
            resolve(data)
        }, function(msg) {
            reject(msg)
        })
    })
}
UserModel.prototype.isLogin = function() {
    if (typeof this.storage.access != "object") return false
    const {token, expired_at} = this.storage.access
    return token && new Date(expired_at) > new Date()
}

export default UserModel