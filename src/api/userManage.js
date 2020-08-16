import baseUrl from './base';
import axios from './http';
export default {
    /**
     * 根据用户姓名获取用户信息
     * @param {用户姓名} val 
     */
    getUserByUsername(val) {
        return axios.get(`${baseUrl.book}/getUserInfo`, {
            params: {
                username: val
            }
        })
    },
    /**
     * 更新用户的密码
     * @param {新的用户密码} newpassword 
     */
    updateUserPassword(username, newpassword) {
        return axios.post(`${baseUrl.book}/updatePassword`, {
            username: username,
            password: newpassword
        })
    },
    getAllUsers() {
        return axios.get(`${baseUrl.book}/getAllUsers`);
    },
    /**
     * 根据id删除用户
     * @param {*} val id
     */
    deleteUser(val) {
        return axios.post(`${baseUrl.book}/deleteUserById`, {
            id: val
        })
    },
    addUser(uname, pwd, salt, name, phone, email, enabled) {
        return axios.post(`${baseUrl.book}/register`, {
            username: uname,
            password: pwd,
            salt: salt,
            name: name,
            phone: phone,
            email: email,
            enabled: enabled
        })
    },
    updateUserInfo(uname, type, phone, email, enabled, id) {
        return axios.post(`${baseUrl.book}/updateUserInfo`, {
            username: uname,
            name: type,
            phone: phone,
            email: email,
            enabled: enabled,
            id: id
        })
    }
}