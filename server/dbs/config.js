export default {
  dbs: 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '3544306302@qq.com'
    },
    get pass() {
      return 'cqogdvipchfjcjcb'
    },
    get code() {
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    get expire() {
      return () => {
        return parseInt(new Date().getTime()) + (60*1000);
      }
    }
  },
  sign: "c0159e56b92b0f7e191b2228d917afc9",
  requestUrl: "http://cp-tools.cn"
}
