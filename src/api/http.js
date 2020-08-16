import axios from 'axios';
import store from '../store/index';
import router from '../router';
import {
    Message
} from 'element-ui'
/**
 * 携带当前路由页，当登录完成后,返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}
const errorHandle = (status, other) => {
    switch (status) {
        case 401:
            toLogin();
            break;
        case 403:
            localStorage.removeItem('token');
            store.commit('loginSuccess', null);
            setTimeout(() => {
                toLogin()
            }, 1000)
            break;
            //访问资源不存在
        case 404:
            Message({
                type: 'warning',
                message: '访问的资源不存在！'
            })
            break;
        default:
            console.log(other)
            break;

    }
}
axios.defaults.timeout = 15000; //请求超时时间为15秒
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; //post请求的数据格式xxx=''&&xxx=''
axios.defaults.withCredentials = true;//请求带上凭证信息 少些了这句，没能获取菜单信息

axios.interceptors.request.use(config => {
        const token = store.state.token; //取出axios中的token
        token && (config.headers.Authorization = token); //如果有token，则让请求头带上token，如果没有token，则不执行config.headers.Authorization
        return config;
    },
    error => {
        return Promise.error(error)
    }
)
axios.interceptors.response.use(res => res.status == 200 ? Promise.resolve(res) : errorHandle(res.status),
    error => {
        console.log(error)
        const {
            response
        } = error;
        //请求已发出，但是不是200
        if (response) {
            errorHandle(response.status, response.data.message)
            return Promise.reject(response);
        } else {
            if (!window.navigator.onLine) {

            } else {
                return Promise.reject(error)
            }
        }
    })
//导出axios
export default axios;