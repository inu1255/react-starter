import api from '../utils/request';
import storage from 'asha/libs/storage.js'

function Model(table, stor) {
    this.name = table || "model"
    this.storage = storage(stor || this.name)
}
Model.prototype.info = function(id) {
    return api.request("/" + this.name + "/info/" + id)
}
Model.prototype.del = function(id) {
    return api.request("/" + this.name + "/delete/" + id)
}
Model.prototype.save = function(data) {
    return api.request("/" + this.name + "/save", data)
}
Model.prototype.search = function(condition) {
    return api.request("/" + this.name + "/search", data)
}
Model.prototype.request = function(uri, data) {
    if (uri.CharAt(0) == "/") return api.request(uri, data)
    return api.request("/" + this.name + "/" + uri, data)
}
Model.prototype.saveStorage = function() {
    this.storage.saveStorage()
}

export default Model