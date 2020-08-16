<!--  -->
<template>
  <div>
    <el-button class="book-table-add" type="success" size="small" @click="showEditForm">添加图书</el-button>
    <edit-book :dialogFormVisible="dialogVisible" :form="newBook" @changedv="changeDialogVisible"></edit-book>
    <el-card>
      <el-table
        :data="books"
        stripe="stripe"
        ref="bookRef"
        style="width:100%"
        @selection-change="handelSelectChange"
      >
        <template slot="empty" v-if="books.length===0">
          <i class="el-icon-loading"></i>
          <span>玩命加载中...</span>
        </template>
        <el-table-column type="expand" align="center">
          <template slot-scope="props">
            <el-form label-position="left" inline>
              <el-form-item>
                <span>{{props.row.abs}}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="title" label="书名(展开查看摘要)" fit align="center"></el-table-column>
        <el-table-column prop="category.name" label="分类" width="100" align="center"></el-table-column>
        <el-table-column prop="author" label="作者" fit align="center"></el-table-column>
        <el-table-column prop="date" label="出版日期" width="120" align="center"></el-table-column>
        <el-table-column prop="press" label="出版社" fit align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="editBook(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteBook(scope.row.isbn)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="book-table-footer">
        <el-button type="primary" size="small" @click="cancleSelect">取消选择</el-button>
        <el-button type="danger" size="small">批量删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import EditBook from "./editBookForm";
export default {
  data() {
    return {
      dialogVisible: false, //初始时不显示
      books: [], //初始化的图书数据
      book: {}, //修改之后的单个图书数据
      multiSelect: [],
      initBook: {
        isbn: "",
        title: "",
        author: "",
        date: "",
        press: "",
        cover: "",
        abs: "",
        cid: "",
        isborrow: "",
        category: {
          id: "",
          name: ""
        },
        tag: 1
      }
    };
  },
  components: {
    EditBook
  },
  computed: {
    tableHeight() {
      return window.innerHeight - 320;
    },
    newBook() {
      return this.book;
    }
  },
  methods: {
    //获取所有的图书资料
    getBooksData() {
      let _this = this;
      _this.$api.bookApi.getAllBooks().then(res => {
        if (res && res.data.code === 200) {
          console.log(res);
          this.books = res.data.data;
        }
      });
    },
    //修改图书信息
    editBook(val) {
      this.dialogVisible = true;
      let newBook = {
        isbn: val.isbn,
        cover: val.cover,
        title: val.title,
        author: val.author,
        date: val.date,
        press: val.press,
        abs: val.abs,
        isborrow: val.isborrow === 0 ? "否" : "是",
        category: {
          id: `${val.category.id}`,
          name: val.category.name
        }
      };
      this.book = newBook; //将新的图书信息赋值给newBook
    },
    //删除图书信息
    deleteBook(isbn) {
      this.$confirm("此操作将永久删除该图书, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api.bookApi
            .deleteBook(isbn)
            .then(res => {
              if (res && res.data.code === 200) {
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });
                this.getBooksData(); //重新加载图书信息
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //显示对话框 不能直接在DOM上操作dialogVisible
    showEditForm() {
      this.dialogVisible = true;
      this.book = this.initBook;
    },
    //改变对话框显示与否
    changeDialogVisible(val) {
      this.dialogVisible = val;
    },
    //处理选中当前图书的状态
    handelSelectChange(val) {
      this.multiSelect = val;
    },
    cancleSelect() {
      this.$refs.bookRef.clearSelection();
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getBooksData(); //初始化获取数据
    //这个地方如果初始化时，不赋值为空对象，会报错id undefined
    this.book = this.initBook;
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.book-table-main {
  width: 90%;
}
.book-table-add {
  margin: 18px 0 4px 10px;
}
.book-table-footer {
  margin-top: 20px;
}
</style>