import { query } from '../services/login.js'

export default {
    namespace: 'app',
    state: {
        login: false
    },

    subscriptions: {
        setup({dispatch, history}) { // eslint-disable-line
            dispatch({
                type: 'login'
            })
        },
    },

    effects: {
        *login({payload}, {call, put}) { // eslint-disable-line
            const data = yield call(query, parse(payload))
            console.log(data)
            yield put({
                type: 'logined',
                payload: data
            });
        },
    },

    reducers: {
        logind(state, action) {
            console.log(action)
            return {
                ...state,
                loading: true
            };
        },
    },

};
