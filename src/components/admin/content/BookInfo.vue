<!--  -->
<template>
  <div>
    <div class="book-info-search">
      <el-input v-model="search" size="small" placeholder="根据图书名称进行搜索..."></el-input>
    </div>
    <div class="book-info-main" v-if="!search">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <template v-for="(item,index) in category">
          <el-tab-pane :label="item.label" :name="item.name" :key="index">
            <template v-for="(book,index) in books">
              <book-Item :item="book" :key="index" :reloadTag="reLoadTag" @reloadBk="reLoadBook"></book-Item>
            </template>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <div class="book-info-multiple" v-else>
      <template
        v-for="(m_book,index) in allBooks.filter(data => !search || data.title.includes(search))"
      >
        <book-Item :item="m_book" :key="index" :reloadTag="reLoadTag" @reloadBk="reLoadBook"></book-Item>
      </template>
    </div>
  </div>
</template>

<script>
import bookItem from "./bookItem";
export default {
  data() {
    return {
      category: [
        {
          label: "文学",
          name: "first"
        },
        {
          label: "流行",
          name: "second"
        },
        {
          label: "文化",
          name: "third"
        },
        {
          label: "生活",
          name: "fourth"
        },
        {
          label: "经管",
          name: "fifth"
        },
        {
          label: "科技",
          name: "sixth"
        }
      ],
      activeName: "first",
      cid: 1,
      books: [],
      allBooks: [],
      search: "",
      reLoadTag: false
    };
  },
  components: {
    bookItem
  },
  methods: {
    handleClick(tab) {
      switch (tab.name) {
        case "second":
          this.cid = 2;
          break;
        case "third":
          this.cid = 3;
          break;
        case "fourth":
          this.cid = 4;
          break;
        case "fifth":
          this.cid = 5;
          break;
        case "sixth":
          this.cid = 6;
          break;
        default:
          this.cid = 1;
          break;
      }
      //根据当前id获取不同种类的图书
      this.getBooksData(this.cid);
    },
    //获取图书的数据
    getBooksData(val) {
      this.$api.bookApi
        .getBookByCid(val)
        .then(res => {
          if (res && res.data.code === 200) {
            this.books = res.data.data;
            // console.log(this.books);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAllBooks() {
      let _this = this;
      _this.$api.bookApi
        .getAllBooks()
        .then(res => {
          if (res && res.data.code === 200) {
            _this.allBooks = res.data.data;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //借阅图书成功时，重新加载所有图书
    reLoadBook(val) {
      console.log(val);
      //重新加载所有图书信息
      if (val) {
        this.getAllBooks();
        this.getBooksData(this.cid);
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    //初始化时获取文化的id
    this.getBooksData(this.cid);
    //获取所有的图书信息
    this.getAllBooks();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.book-info-main {
  margin-top: 10px;
  width: 100%;
  height: 100%;
}
.book-info-search {
  height: 30px;
}
.el-input {
  float: right;
  width: 16%;
}
.book-info-multiple {
  height: 200px;
}
</style>