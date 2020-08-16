<!--  -->
<template>
  <transition name="el-fade-in">
    <el-menu
      :default-active="currentPath"
      class="el-menu-vertical"
      router
      model="vertical"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollpase"
    >
      <!-- <div style="heiht:80px"></div> -->
      <el-submenu
        v-for="(item,index) in menuList"
        :key="index"
        :index="index+''"
        style="text-align:left"
      >
        <template slot="title">
          <span slot="title" style="font-size:15px">
            <i :class="item.iconCls"></i>
            {{item.nameZh}}
          </span>
        </template>
        <!-- 二级菜单 -->
        <template v-for="child in item.children">
          <el-submenu
            :key="child.path"
            :index="child.path"
            v-if="child.children&&child.children.length"
          >
            <template slot="title">
              <i :class="child.iconCls"></i>
              {{child.nameZh}}
            </template>
            <!-- 三级菜单 -->
            <el-menu-item
              v-for="children in child.children"
              :key="children.path"
              :index="children.path"
            >
              <i :class="children.iconCls"></i>
              {{children.nameZh}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :key="child.path" :index="child.path">
            <i :class="child.iconCls&&child.iconCls"></i>
            {{child.nameZh}}
          </el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    isCollpase: Boolean
  },
  computed: {
    menuList() {
      return this.$store.state.menuList.length > 0
        ? this.$store.state.menuList
        : null;
    },
    currentPath() {
      return this.$route.path;
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
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100%;
}
</style>