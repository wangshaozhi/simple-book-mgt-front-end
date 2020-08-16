<!--  -->
<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="rules"
      label-position="top"
      class="login-form"
    >
      <el-form-item>
        <h3 class="login-form_title">登录界面</h3>
      </el-form-item>
      <el-form-item label="用户名" prop="username" label-width="50px">
        <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" label-width="50px">
        <el-input prefix-icon="el-icon-lock" type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="login('loginForm')"
          icon="el-icon-s-promotion"
          class="login-form_btn"
          round
        >登录</el-button>
        <!-- <el-link
          type="primary"
          class="login-form-reg"
          :underline="false"
          @click="gotoRegister()"
        >忘记密码？</el-link>| -->
        <!-- <el-link
          type="primary"
          class="login-form-reg"
          :underline="false"
          @click="gotoRegister()"
        >注册账号</el-link> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    //登录的方法
    login(val) {
      this.$refs[val].validate(valid => {
        if (valid) {
          let _this = this;
          this.$api.loginApi
            .login(this.loginForm.username, this.loginForm.password)
            .then(res => {
              console.log(res);
              if (res && res.data.code == 200) {
                //修改vuex中的username
                this.$store.dispatch("changeName", this.loginForm.username);
                this.$message({
                  type: "success",
                  message: `欢迎你，${this.loginForm.username}，再次回来！`
                });
                //跳转到home页面
                this.$router.push("/admin/index");
              } else {
                this.$alert(res.data.msg, "提示", {
                  confirmButtonText: "确定"
                });
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
    },
    gotoRegister() {
      //跳转到注册页面
      this.$router.push("/register");
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.login {
  width: 100%;
  height: 100%;
  background: url(../assets/images/index.jpg) center center/cover no-repeat;
}
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 260px;
  height: 400px;
  padding: 10px 15px;
  background-color: #fff;
  box-shadow: 0 5px 20px -5px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  border: 2px solid #eaeaea;
}
.login-form_title {
  margin-top: 15px;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.5em;
  text-align: center;
}
.login-form_btn {
  width: 100%;
  margin: 2px auto;
}
.login-form-reg {
  padding: 1px 79px;
  letter-spacing: 0.2em;
}
</style>