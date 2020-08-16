<!--  -->
<template>
  <div class="article-manage">
    <div class="article-add">
      <el-button type="success" size="small" icon="el-icon-edit" @click="addArticle()">添加图书评论</el-button>
    </div>
    <el-timeline>
      <template v-for="item in article">
        <el-timeline-item
          :key="item.id"
          placement="top"
          :timestamp="item.article_title"
          :icon="item.icon"
          size="large"
          color="#0bbd87"
        >
          <el-card :key="item.id">
            <div class="article-manage-info">
              <p class="article-manage-info-p">{{item.article_author}}</p>
              <p class="article-manage-info-title">{{item.article_content}}</p>
              <P class="article-manage-info-p">{{item.article_date}}</P>
            </div>
          </el-card>
        </el-timeline-item>
      </template>
    </el-timeline>
    <article-Edit
      :dialogVis="dialogVisible"
      :reLoadArticle="reloadArticle"
      @reloadInfo="reLoadAticleInfo"
      @changedv="changeDialogVisible"
    ></article-Edit>
  </div>
</template>

<script>
import dateutils from "../../../utils/dateUtlis";
import articleEdit from "./ArticleEdtior";
export default {
  name: "ArticleManagment",
  data() {
    return {
      article: [],
      dialogVisible: false,
      reloadArticle: false
    };
  },
  components: {
    articleEdit
  },
  methods: {
    //加载文章信息
    loadArticleInfo() {
      let _this = this;
      _this.$api.articleApi
        .loadAllArticles()
        .then(res => {
          if (res && res.data.code === 200) {
            _this.article = res.data.data.reverse();
            let newData = _this.article.forEach(item => {
              let date = item.article_date;
              let timestamp = new Date(date).getTime();
              item.article_date = dateutils.getDateDiff(timestamp);
              item.icon = "el-icon-more";
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    addArticle() {
      this.dialogVisible = !this.dialogVisible;
    },
    //改变添加框的显示与否
    changeDialogVisible(val) {
      this.dialogVisible = val;
    },
    //重新加载文章信息
    reLoadAticleInfo(val) {
      !!val ? this.loadArticleInfo() : null;
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    //获取所有的文章信息
    this.loadArticleInfo();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
.article-add {
  margin-bottom: 20px;
}
.article-manage-info {
  float: left;
  height: 150px;
  width: 1000px;
  vertical-align: middle;
  line-height: 35px;
}
.article-manage-info-p {
  font-size: 14px;
  font-weight: 400;
  color: #3232cd;
}
.article-manage-info-title {
  color: #5c4033;
  font-size: 16px;
}
</style>