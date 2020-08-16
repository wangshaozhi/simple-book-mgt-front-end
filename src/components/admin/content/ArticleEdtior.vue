<!--  -->
<template>
  <el-dialog title="添加图书评论信息" :visible.sync="dialogvis" width="28%">
    <el-form :model="article" label-position="left">
      <el-form-item label="图书标题" :label-width="formLabelWidth">
        <el-input v-model="article.article_title" placeholder="文章的标题" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图书评论内容" :label-width="formLabelWidth">
        <el-input
          v-model="article.article_content"
          type="textarea"
          :rows="3"
          placeholder="图书的评论"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="addArticle()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      article: {
        article_title: "",
        article_content: "",
        article_date: "",
        article_author: ""
      },
      formLabelWidth: "80px"
    };
  },
  props: {
    dialogVis: Boolean,
    reloadArticle: Boolean
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  computed: {
    dialogvis: {
      get() {
        return this.dialogVis;
      },
      //这里的val就是dialogvis的最新值
      set(val) {
        this.$emit("changedv", val);
      }
    },
    //重新加载文章信息
    reLoadArticleTag: {
      get() {
        return this.reloadArticle;
      },
      set(val) {
        this.$emit("reloadInfo", val);
      }
    }
  },
  methods: {
    addArticle() {
      let _this = this,
        curr_user = localStorage.getItem("username");
      this.$api.articleApi
        .addArticleInfo(
          _this.article.article_title,
          _this.article.article_content,
          "",
          curr_user
        )
        .then(res => {
          console.log(res);
          if (res && res.data.code === 200) {
            _this.reLoadArticleTag = true;
            _this.$message({
              type: "success",
              message: "添加图书评论成功！"
            });
            _this.dialogvis = !this.dialogvis;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    cancel() {
      this.dialogvis = false;
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>