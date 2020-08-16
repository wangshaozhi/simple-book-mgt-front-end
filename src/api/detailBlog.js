import baseUrl from './base';
import axios from './http';

const detailBlogApi = {
    getDetailBlog() {
        //${baseUrl.zh} 这里少了一个/所以没有跨域成功！！！
        return axios.get(`/api/news/latest`);
    }
}

export default detailBlogApi; //导出api