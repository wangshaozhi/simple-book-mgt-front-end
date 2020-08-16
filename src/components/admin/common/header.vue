<template>
  <div class="header">
    <h5 class="header-tit">简单图书管理系统</h5>
    <div class="header-right">
      <!-- 图片 src="../../../assets/images/img.jpg" -->
      <img src="../../../assets/images/img.jpg" alt="找不到了" />
      <el-dropdown trigger="hover" size="small" @command="handleCommand">
        <!-- 用户名 -->
        <span class="el-dropdown-link">
          {{loginName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 鼠标经过弹出部分 -->
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="userInfo">账号信息</el-dropdown-item>
          <el-dropdown-item command="updatePassword">修改密码</el-dropdown-item>
          <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <el-form
          ref="ruleForm2"
          :model="ruleForm2"
          status-icon
          :rules="rules2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="旧密码" prop="oldPwd">
            <el-input v-model="ruleForm2.oldPwd" type="password" />
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input v-model="ruleForm2.password" autocomplete="off" type="password" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="ruleForm2.checkPass" autocomplete="off" type="password" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" hidden>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="用户信息" :visible.sync="userInfoVisible" width="26%">
        <el-form :model="userInfoForm" label-position="top">
          <el-form-item label="用户姓名">
            <el-input v-model="userInfoForm.username" :disabled="true" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-input v-model="userInfoForm.name" :disabled="true" prefix-icon="el-icon-coordinate"></el-input>
          </el-form-item>
          <el-form-item label="用户电话">
            <el-input v-model="userInfoForm.phone" :disabled="true" prefix-icon="el-icon-phone"></el-input>
          </el-form-item>
          <el-form-item label="用户email">
            <el-input
              v-model="userInfoForm.email"
              :disabled="true"
              prefix-icon="el-icon-mobile-phone"
            ></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "rightmenu",
  data() {
    //验证旧密码
    var vaildOldPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        if (this.ruleForm2.oldPwd !== "") {
          // this.$refs.ruleForm2.validateField("checkPass");
        }
        //没有加这句回调函数，最后验证没成功！
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value === this.ruleForm2.oldPwd) {
          callback(new Error("新密码不能和老密码一样！"));
        } else if (this.ruleForm2.checkPass !== "") {
          // this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validateNewPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      loginName: "她她她女神",
      dialogVisible: false,
      ruleForm2: {
        oldPwd: "",
        password: "",
        checkPass: ""
      },
      userInfoForm: {},
      userInfoVisible: false,
      rules2: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validateNewPwd, trigger: "blur" }],
        oldPwd: [{ validator: vaildOldPwd, trigger: "blur" }]
      }
    };
  },
  mounted() {
    //如果localStorage中用户名，则取出作为用户名，否则用默认的。
    this.loginName = localStorage.getItem("username")
      ? localStorage.getItem("username")
      : this.loginName;
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "userInfo":
          //调用登录的用户姓名
          this.getUserByUsername(this.loginName);
          break;
        case "updatePassword":
          this.dialogVisible = true;
          this.ruleForm2.oldPwd = "";
          this.ruleForm2.password = "";
          this.ruleForm2.checkPass = "";
          break;
        case "logout":
          this.loginOut();
          break;
        default:
          break;
      }
    },
    // 修改弹出框
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //提交验证信息，更新密码
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //如果验证通过
        if (valid) {
          this.updateUserPassword(this.loginName, this.ruleForm2.password);
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //根据用户姓名获取用户的信息
    getUserByUsername(username) {
      let _this = this;
      _this.$api.userApi
        .getUserByUsername(username)
        .then(res => {
          if (res && res.data.code === 200) {
            _this.userInfoForm = res.data.data;
            _this.userInfoVisible = true;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //修改用户密码
    updateUserPassword(uname, new_pwd) {
      this.$api.userApi
        .updateUserPassword(uname, new_pwd)
        .then(res => {
          if (res && res.data.code === 200) {
            this.$message({
              type: "success",
              message: "更新密码成功！"
            });
            //清除localStorage中的用户姓名
            window.localStorage.removeItem("username");
            //修改成功，跳转登录页面
            this.$router.push("/login");
          } else {
            this.$message({
              type: "error",
              message: "更新密码失败！"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //登出的方法
    loginOut() {
      let _this = this;
      _this
        .$confirm("注销登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$api.loginApi
            .logout()
            .then(res => {
              if (res && res.data.code === 200) {
                //提交store的clearUsername事件
                _this.$store.dispatch("clearUsername", "");
                _this.$store.dispatch("initMenuLists", []);
                _this.$router.push("/login");
                _this.$message({
                  type: "success",
                  message: "注销成功，期待下次相遇！"
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消注销"
          });
        });
    }
  }
};
</script>
 
 
<style scoped>
.header {
  width: 100%;
  height: 60px;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #409eff;
}
.header-tit {
  margin-left: 20px;
  color: #fff;
}
.top {
  background: #409eff;
  margin-bottom: 20px;
  padding: 0 60px;
}
.el-dropdown-menu {
  position: absolute;
  top: 40px !important;
  padding: 3px;
  text-align: center;
  width: 90px;
  overflow: visible;
}
.el-dropdown-menu__item {
  line-height: 30px !important;
}

.header-right img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  line-height: 30px;
  /* 图片和文字对齐 */
  vertical-align: middle;
}

.el-dropdown-link {
  margin-left: 16px;
  margin-right: 20px;
  cursor: pointer;
  color: #333;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>