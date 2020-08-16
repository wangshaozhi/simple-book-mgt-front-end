<template>
  <div>
    <el-table
      :data="bookInfos.filter(data => !search || data.bookName.toLowerCase().includes(search.toLowerCase()))"
      stripe
      style="width: 100%"
    >
      <template slot="empty" v-if="bookInfos.length===0">
        <i class="el-icon-loading"></i>
        <span style="color:lightgreen">还没有图书借阅信息，快去借书吧...</span>
      </template>
      <el-table-column prop="isbn" label="图书ISBN" width="190" align="center"></el-table-column>
      <el-table-column prop="bookName" label="图书名称" width="150" align="center"></el-table-column>
      <el-table-column prop="bookAuthor" label="图书作者" width="150" align="center"></el-table-column>
      <el-table-column prop="borrow_date" label="图书借书时间" width="190" align="center"></el-table-column>
      <el-table-column prop="return_date" label="图书归还时间" width="190" align="center"></el-table-column>
      <el-table-column label="距离还书还剩几天" width="190" align="center">
        <template slot-scope="scope">
          <span
            :class="!!(parseInt((new Date(scope.row.return_date) - (new Date().getTime()))/(24*3600*1000))<0)?'returnDay-info':'remainDay-info'"
          >{{!!(parseInt((new Date(scope.row.return_date) - (new Date().getTime()))/(24*3600*1000))>0)?`距离还书还有${parseInt((new Date(scope.row.return_date) - (new Date().getTime()))/(24*3600*1000))}天`:`距离还书日期已经过去了${-parseInt((new Date(scope.row.return_date) - (new Date().getTime()))/(24*3600*1000))}天，请尽快还书!`}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="small" placeholder="根据图书名称进行搜索..." />
        </template>
        <template slot-scope="scope">
          <el-button type="success" size="small" round @click="returnBook(scope.row)">归还图书</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dateUtils from "../../../utils/dateUtlis";
export default {
  data() {
    return {
      //借阅的图书信息
      bookInfos: [],
      search: ""
    };
  },
  computed: {
    // remainDay() {
    //   return;
    // }
  },
  methods: {
    getAllBookBorrowInfos() {
      let _this = this,
        curr_user = localStorage.getItem("username");
      _this.$api.bkbrwApi
        .getAllBookBorrowInfos(curr_user)
        .then(res => {
          if (res && res.data.code === 200) {
            _this.bookInfos = res.data.data;
            //转换为时间戳进行排序
            for (var i = 0; i < _this.bookInfos.length; i++) {
              _this.bookInfos[i].borrow_date = _this.dateToTime(
                _this.bookInfos[i].borrow_date
              );
            }
            _this.bookInfos.sort(function(a, b) {
              return b.borrow_date > a.borrow_date ? -1 : 1;
            });
          }
          //再将时间戳变换为标准时间
          _this.bookInfos.forEach(item => {
            item.borrow_date = dateUtils.formatStandard(item.borrow_date);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    dateToTime(str) {
      return new Date(str.replace(/-/g, "/")).getTime(); //用/替换日期中的-是为了解决Safari的兼容
    },
    //归还图书
    returnBook(row) {
      let _this = this;
      _this.$api.bkbrwApi
        .returnBook(row.isbn)
        .then(res => {
          console.log(res.status);
          if (res && res.data.code === 200) {
            _this.$api.bookApi
              .updateIsReturn(row.isbn)
              .then(res => {
                if (res && res.data.code === 200) {
                  _this.$message({
                    type: "success",
                    message: "图书归还成功!"
                  });
                  _this.getAllBookBorrowInfos();
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    remainDay(row) {
      let a = new Date(row.return_date) - new Date(row.borrow_date);
      console.log(parseInt(a / (24 * 60 * 60 * 1000)));
    }
  },
  mounted() {
    //组件加载时获取图书的信息
    this.getAllBookBorrowInfos();
  }
};
</script>

<style scoped>
.remainDay-info {
  color: green;
}
.returnDay-info {
  color: red;
}
</style>