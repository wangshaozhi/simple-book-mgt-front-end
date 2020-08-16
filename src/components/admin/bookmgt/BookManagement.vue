<!--  -->
<template>
  <div>
    <book-Table></book-Table>
  </div>
</template>

<script>
import bookTable from "./bookTable";
export default {
  data() {
    return {};
  },
  components: {
    bookTable
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>