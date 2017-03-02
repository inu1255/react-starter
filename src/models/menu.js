
export default {
  namespace: 'menu',
  state: {
    sider:[
        {
            icon:"cloud",
            to:"index",
            title:"网站名"
        },
        {
            title:"注册",
            to:"register",
            right:true
        },
        {
            title:"登录",
            to:"login",
            right:true
        }
    ]
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
