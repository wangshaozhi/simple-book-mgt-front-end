<!--  -->
<template>
  <div class="register">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="rules"
      label-position="left"
      class="register-form"
    >
      <el-form-item>
        <h3 class="register-form_title">注册界面</h3>
      </el-form-item>
      <el-form-item label="用户名" prop="username" :label-width="labelwidth">
        <el-input prefix-icon="el-icon-user" v-model="registerForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="labelwidth">
        <el-input prefix-icon="el-icon-lock" type="password" v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone" :label-width="labelwidth">
        <el-input prefix-icon="el-icon-phone" v-model="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="labelwidth">
        <el-input prefix-icon="el-icon-s-opportunity"  v-model="registerForm.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="register('registerForm')"
          icon="el-icon-s-promotion"
          class="register-form_btn"
        >注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registerForm: {
        username: "",
        password: "",
        phone: "",
        email: "",
        name: "",
        enabled: 0
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" }
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "change" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "change" }]
      },
      labelwidth: "70px"
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    //登录的方法
    register(val) {
      this.$refs[val].validate(valid => {
        if (valid) {
          //防止this指向改变
          let _this = this;
          _this.$api.userApi
            .addUser(
              _this.registerForm.username,
              _this.registerForm.password,
              "",
              "普通用户",
              _this.registerForm.phone,
              _this.registerForm.email,
              true
            )
            .then(res => {
              if (res && res.data.code === 200) {
                _this.$message({
                  type: "success",
                  message: "注册成功！"
                });
                //跳转到登录页面
                this.$router.push("/login");
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.register {
  width: 100%;
  height: 100%;
  background: url(../assets/images/register.jpeg) center center/cover no-repeat;
}
.register-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 280px;
  height: 430px;
  padding: 5px 26px;
  background-color: #fff;
  box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  border: 2px solid #eaeaea;
}
.register-form_title {
  margin-top: 15px;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.5em;
  text-align: center;
}
.register-form_btn {
  width: 100%;
  margin: 16px 10px;
}
</style>