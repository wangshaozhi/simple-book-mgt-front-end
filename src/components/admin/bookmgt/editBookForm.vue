<!--  -->
<template>
  <div class="edit-book-main">
    <el-dialog title="添加图书/修改图书信息" :visible.sync="dialogvis" @close="!dialogvis" width="40%">
      <el-form v-model="form" ref="form" label-position="right">
        <el-form-item prop="isbn" label="图书isbn" :label-width="labelWidth" v-if="addOrUpdateTag">
          <el-input v-model="form.isbn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书名" :label-width="labelWidth" prop="title">
          <el-input v-model="form.title" auto-complete="off" placeholder="不加《》"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="labelWidth" prop="author">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" :label-width="labelWidth" prop="date">
          <el-input v-model="form.date" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="labelWidth" prop="press">
          <el-input v-model="form.press" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否被借走" :label-width="labelWidth" prop="isborrow">
          <el-input v-model="form.isborrow" autocomplete="off" placeholder="0代表没有被借走，1代表被借走"></el-input>
        </el-form-item>
        <el-form-item label="封面" :label-width="labelWidth" prop="cover">
          <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
        </el-form-item>
        <el-form-item label="简介" :label-width="labelWidth" prop="abs">
          <el-input type="textarea" v-model="form.abs" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类" :label-width="labelWidth" prop="cid">
          <el-select v-model="form.category.id" placeholder="请选择分类">
            <el-option label="文学" value="1"></el-option>
            <el-option label="流行" value="2"></el-option>
            <el-option label="文化" value="3"></el-option>
            <el-option label="生活" value="4"></el-option>
            <el-option label="经管" value="5"></el-option>
            <el-option label="科技" value="6"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onSubmit">确定</el-button>
        <el-button @click="closeDialog()" type="primary">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from "./ImgUpload";
export default {
  name: "editBookForm",
  data() {
    return {
      labelWidth: "90px"
      // addOrUpdateTag: !this.form.title ? 1 : 0
    };
  },
  props: {
    form: Object,
    dialogFormVisible: Boolean
  },
  components: {
    ImgUpload
  },
  computed: {
    //添加或者更新的标志
    addOrUpdateTag() {
      //添加的为1,修改的为0
      let res = !!this.form.tag ? 1 : 0;
      return res;
    },
    dialogvis: {
      get() {
        return this.dialogFormVisible;
      },
      //这里的val就是dialogvis的最新值
      set(val) {
        this.$emit("changedv", val);
      }
    }
  },
  methods: {
    //添加图书
    onSubmit() {
      //添加图书
      this.$api.bookApi
        .addOrUpdateBook(
          this.form.isbn,
          this.form.cover,
          this.form.title,
          this.form.author,
          this.form.date,
          this.form.press,
          this.form.abs,
          this.form.category.id,
          Number(this.form.isborrow),
          this.addOrUpdateTag
        )
        .then(res => {
          if (res && res.data.code === 200) {
            this.$message({
              message: "操作成功！",
              type: "success"
            });
            this.$emit("changedv", false); //关闭对话框
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //上传图片
    uploadImg() {},
    closeDialog() {
      this.dialogvis = false;
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
.edit-book-main {
  text-align: left;
}
.el-input {
  float: left;
}
</style>