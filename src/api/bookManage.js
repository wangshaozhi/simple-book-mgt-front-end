import baseUrl from './base';
import axios from './http';
export default {
    /**
     * @params val 图书种类id
     * @returns axios请求
     */
    getBookByCid(val) {
        return axios.get(`${baseUrl.book}/getBooksByCid`, {
            params: {
                cid: val
            }
        })
    },
    //获取所有的图书信息
    getAllBooks() {
        return axios.get(`${baseUrl.book}/getAllBooks`);
    },
    /**
     * @param id 图书日期 
     * @param cover 封面图片
     * @param title 图书标题
     * @param author 图书作者
     * @param date 图书出版日期
     * @param press 出版社名称
     * @param abs 图书简介
     * @param  cid 分类id
     * @param tag 标记
     * @returns   
     */
    addOrUpdateBook(isbn, cover, title, author, date, press, abs, cid, isborrow, tag) {
        //根据tag值判断是添加接口或者是更新接口
        let api = tag === 1 ? `addBook` : `updateBook`;
        //参数
        let param = {
            isbn: isbn,
            cover: cover,
            title: title,
            author: author,
            date: date,
            press: press,
            abs: abs,
            cid: cid,
            isborrow: isborrow
        }
        console.log(tag)
        return axios.post(`${baseUrl.book}/${api}`, param)
    },
    /**
     * 
     * @param {删除图书信息} val 
     * @returns axios请求
     */
    deleteBook(val) {
        return axios.post(`${baseUrl.book}/deleteBook`, {
            isbn: val
        });
    },
    //根据图书isbn更新图书的状态，即图书被借走
    updateIsBrw(isbn) {
        return axios.post(`${baseUrl.book}/updateIsBrw`, {
            isbn: isbn
        })
    },
    //根据图书isbn更新图书的状态，即图书被归还
    updateIsReturn(isbn) {
        return axios.post(`${baseUrl.book}/updateIsReturn`, {
            isbn: isbn
        })
    }
}