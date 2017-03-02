
export default {
  namespace: 'index',
  state: {
    menu:[
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
  reducers: {},
  effects: {},
  subscriptions: {},
};
