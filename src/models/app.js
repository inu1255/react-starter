import UserModel from '../services/user.js'
const model = new UserModel()

export default {
    namespace: 'app',
    state: {
        login: model.isLogin(),
    },
    subscriptions: {
    },
    reducers: {
        login(origin, {payload}) {
            return {
                ...origin,
                login: true
            };
        }
    },

};
