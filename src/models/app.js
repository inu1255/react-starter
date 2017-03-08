import UserModel from '../services/user.js'
import { routerRedux } from 'dva/router'
const model = new UserModel()

function allStorage() {
    // body...
}

export default {
    app: {

    },
    storage: allStorage(),
    pure: {
        update() {}
    }
};
