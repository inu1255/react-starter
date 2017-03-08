import storage from 'asha/libs/storage.js'

storage.register("app", {
    isLogin() {
        if (typeof this.access != "object") return false
        const {token, expired_at} = this.access
        return token && new Date(expired_at) > new Date()
    }
})