import axios from './http';
import baseUrl from './base';

export default {
    //根据用户姓名获取所有已经借过的图书
    getAllBookBorrowInfos(uname) {
        return axios.post(`${baseUrl.book}/getAllBookBorrowInfos`, {
            username: uname
        })
    },
    //添加借阅的记录
    addBkBrwRecord(uname, isbn, brwdate, redate, isreturn) {
        return axios.post(`${baseUrl.book}/addBkBrwRecord`, {
            username: uname,
            isbn: isbn,
            borrowdate: brwdate,
            returndate: redate,
            isreturn: isreturn
        })
    },
    //删除借书信息，即将图书归还
    deleteBrwRecord(isbn) {
        return axios.post(`${baseUrl.book}/deleteBrwInfo`, {
            isbn: isbn
        })
    },
     //更新状态，即将图书归还
    returnBook(isbn) {
        return axios.post(`${baseUrl.book}/returnBook`, {
            isbn: isbn
        })
    }
}