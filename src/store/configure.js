const configure = {
    state: {
        HOST: 'http://localhost:8888',
        loginIn: false, // 用户是否登录
    },
    getters: {
        loginIn: state => {
            let loginIn = state.loginIn
            if (!loginIn) {
                loginIn = JSON.parse(window.sessionStorage.getItem('loginIn') || null)
            }
            return loginIn
        },
    },
    mutations: {
        setLoginIn: (state, loginIn) => {
            state.loginIn = loginIn
            window.sessionStorage.setItem('loginIn', JSON.stringify(loginIn))
        },

    },
    actions: {}
}

export default configure