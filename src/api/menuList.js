import base from './base'; //baseurl
import axios from './http'; //axios
const menuListApi = {
    //获得菜单信息
    getMenuList() {
        return axios.get(`${base.book}/getMenu`);
    }
}
export default menuListApi;