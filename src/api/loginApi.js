import baseUrl from './base';
import axios from './http';
const loginApi = {
    login(val1, val2) {
        return axios.post(`${baseUrl.book}/login`, {
            username: val1,
            password: val2
        })
    },
    logout() {
        return axios.get(`${baseUrl.book}/logout`);
    }
}
//导出loginAPi
export default loginApi;