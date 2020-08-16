<template>
  <div class="dashboard-editor-container">
    <template>
      <el-carousel :interval="3000" type="card" height="200px">
        <el-carousel-item v-for="item in 4" :key="item">
          <!-- <h3 class="medium">{{ item }}</h3> -->
        </el-carousel-item>
      </el-carousel>
    </template>
    <div style="margin-top:60px">
      <el-card>
        <h4>项目简介</h4>
        <p
          class="index_p"
        >本项目所采用的技术栈为springboot+vue,采用前后端分离的模式来编写，前后端交互通过Restful规范的接口来实现数据的交互，前后端交互的数据格式为json格式。</p>
        <p
          class="index_p"
        >前端采用的技术栈为VUE全家桶，前端项目基于vue-cli进行开发，路由用vue-router，网络请求采用axios，全局状态管理采用vuex，UI框架采用Element-UI。采用的IDE为vscode。</p>
        <p
          class="index_p"
        >后端采用采用的技术栈为Springboot，权限加密采用shiro框架，数据库框架采用Mybatis，采用的IDE为IDEA，数据库可视化工具采用Navicat Premium 12。</p>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardAdmin",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background: url(../../.././assets/images/1.jpg) center center/cover;
}

.el-carousel__item:nth-child(2n + 1) {
  background: url(../../.././assets/images/2.jpg) center center/cover;
}

.el-carousel__item:nth-child(3) {
  background: url(../../.././assets/images/3.jpg) center center/cover;
}

.el-carousel__item:nth-child(4) {
  background: url(../../.././assets/images/4.jpg) center center/cover;
}
.index_p {
  line-height: 50px;
  font-size: 16px;
  letter-spacing: 0.1em;
}
</style>