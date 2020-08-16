import axios from './http';
import baseUrl from './base'
export default {
    //加载图书评论信息
    loadArticleInfos(val) {
        return axios.get(`${baseUrl.book}/getArticleById`, {
            params: {
                id: val
            }
        })
    },
    //获取所有的图片评论信息
    loadAllArticles() {
        return axios.get(`${baseUrl.book}/getAllArticles`);
    },
    //添加图书评论信息
    addArticleInfo(title, content, date, author) {
        return axios.post(`${baseUrl.book}/addArticleInfo`, {
            article_title: title,
            article_content: content,
            article_date: date,
            article_author: author,
        })
    }
}