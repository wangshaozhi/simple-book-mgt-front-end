<!--  -->
<template>
  <div class="book-main">
    <el-tooltip effect="dark" placement="right">
      <p slot="content" class="book-profile-title">{{item.title}}</p>
      <p slot="content" class="book-profile-author">
        <span>{{item.author}}</span> /
        <span>{{item.date}}</span> /
        <span>{{item.press}}</span>
      </p>
      <p slot="content" class="book-profile-content">{{item.abs}}</p>
      <el-card class="book-main-card" bodyStyle="padding:10px" shadow="hover">
        <div class="book-content-cover">
          <img :src="item.cover" alt="封面" />
        </div>
        <div class="book-content-title">
          <!-- <div class="title"> -->
          <a href>{{item.title}}</a>
          <!-- </div> -->
        </div>
        <div class="book-content-author">
          {{item.author}} |
          <i
            style="font-size:12px;color:#67C23A;font-style:normal;cursor:pointer"
            @click="lentBook()"
          >借阅</i>
        </div>
      </el-card>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  //props是数组，里边用''
  props: {
    item: Object,
    reloadTag: Boolean
  },
  computed: {
    reloadTg: {
      get() {
        return this.reloadTag;
      },
      set(val) {
        this.$emit("reloadBk", val);
      }
    }
  },
  methods: {
    lentBook() {
      let _this = this,
        curr_user = localStorage.getItem("username");
      _this.$api.bkbrwApi
        .addBkBrwRecord(curr_user, _this.item.isbn, 0, 0, false)
        .then(res => {
          if (res && res.data.code === 200) {
            _this.$api.bookApi
              .updateIsBrw(_this.item.isbn)
              .then(res => {
                if (res && res.data.code === 200) {
                  //借阅成功，重新加载所有图书信息
                  _this.reloadTg = true;
                  _this.$message({
                    type: "success",
                    message: "借阅成功！"
                  });
                } else {
                  _this.$message({
                    type: "error",
                    message: "借阅失败！"
                  });
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
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */

.book-main {
  width: 180px;
  height: 240px;
  float: left;
  text-align: center;
  margin: 0px 30px;
}
.book-profile-title {
  font-size: 14px;
  margin-bottom: 6px;
  text-align: center;
}
.book-profile-author {
  font-size: 13px;
  margin-bottom: 6px;
  text-align: center;
}
.book-profile-content {
  width: 300px;
  display: block;
  line-height: 17px;
  text-align: center;
}
.book-main-card {
  width: 135px;
  margin-bottom: 20px;
  height: 233px;
  /* padding: 0 20px; */
  /* margin-right: 10px; */
  text-align: center;
}
.book-main-card:hover {
  transform: scale(1.03);
  transition: all 0.5s;
}
.book-content-cover {
  width: 115px;
  height: 172px;
  margin-bottom: 7px;
  overflow: hidden;
  cursor: pointer;
}

.book-content-title {
  font-size: 14px;
  text-align: center;
}
.book-content-author {
  color: #333;
  font-size: 11px;
  margin-bottom: 6px;
  text-align: center;
}
img {
  width: 115px;
  height: 172px;
  /*margin: 0 auto;*/
}
.el-icon-delete {
  cursor: pointer;
  float: right;
}
.switch {
  display: flex;
  position: absolute;
  left: 780px;
  top: 25px;
}
a {
  text-decoration: none;
}
a:link,
a:visited,
a:focus {
  color: #3377aa;
}
</style>