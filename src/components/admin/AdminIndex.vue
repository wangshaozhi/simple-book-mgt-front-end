<!--  -->
<template>
  <el-container class="app-index">
    <el-header>
      <vheader></vheader>
    </el-header>
    <el-container class="app-main">
      <el-aside class="admin-aside">
        <!-- <el-row class="tac"> -->
        <admin-menu :isCollpase="collapse"></admin-menu>
        <!-- </el-row> -->
      </el-aside>
      <el-main>
        <!-- <div>
          <el-button type="primary" @click=" hideMenu()">展开</el-button>
          <i class="el-icon-s-fold"></i>
        </div> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import vheader from "./common/header";
import AdminMenu from "./AdminMenu";
export default {
  data() {
    return {
      collapse: false
    };
  },
  components: {
    vheader,
    AdminMenu
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    hideMenu() {
      this.collapse = !this.collapse;
      console.log(this.collapse)
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.app-index {
  height: 100%;
  width: 100%;
}
.el-header {
  padding: 0px;
}
.app-main {
  width: 100vw;
  height: 100vh;
  overflow-y: hidden;
}
.admin-aside {
  height: 100vh;
  width: 200px !important;
  background-color: #001529;
}
@media screen and (min-width: 700px) {
  .header {
    background: #409eff;
  }
}
@media screen and (max-width: 700px) {
  .header {
    background: #333;
  }
}
</style>