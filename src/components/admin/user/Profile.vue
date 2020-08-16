<template>
  <div>
    <div class="profile-header">
      <el-button type="primary" size="mini" @click="addUser()">添加用户</el-button>
    </div>
    <el-table
      :data="allUsers.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="id" width="190" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" width="190" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="190" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="190" align="center"></el-table-column>
      <el-table-column prop="name" label="用户类型" width="190" align="center"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="small" placeholder="根据用户姓名进行搜索..." />
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editUserInfo(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteUserInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="28%">
      <el-form :model="userInfo" label-position="left">
        <el-form-item label="id" :label-width="formLabelWidth" v-if="userInfo.tag">
          <el-input v-model="userInfo.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="userInfo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth" v-if="!userInfo.tag">
          <el-input v-model="userInfo.password" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号" :label-width="formLabelWidth">
          <el-input v-model="userInfo.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth">
          <el-input v-model="userInfo.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户启用" :label-width="formLabelWidth">
          <el-input v-model="userInfo.enabled" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户类型" :label-width="formLabelWidth">
          <el-select v-model="userInfo.name" placeholder="请选择用户类型">
            <el-option label="系统管理员" value="系统管理员"></el-option>
            <el-option label="普通用户" value="普通用户"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click=" addUserInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allUsers: [],
      search: "",
      userInfo: {
        username: "",
        password: "",
        phone: "",
        email: "",
        name: "",
        enabled: 0
      },
      user_type: {
        系统管理员: "系统管理员",
        普通用户: "普通用户"
      },
      dialogFormVisible: false,
      formLabelWidth: "100px"
    };
  },
  methods: {
    getAllUsers() {
      let _this = this;
      _this.$api.userApi.getAllUsers().then(res => {
        if (res && res.data.code === 200) {
          _this.allUsers = res.data.data;
          //根据对象的id进行升序排序
          _this.allUsers.sort(function(a, b) {
            return a.id - b.id;
          });
        }
      });
    },
    addUserInfo() {
      let _this = this;
      //tag为true是添加用户
      if (this.userInfo.tag) {
        _this.$api.userApi
          .updateUserInfo(
            _this.userInfo.username,
            _this.user_type[_this.userInfo.name],
            _this.userInfo.phone,
            _this.userInfo.email,
            !!_this.userInfo.enabled,
            _this.userInfo.id
          )
          .then(res => {
            if (res && res.data.code === 200) {
              //关闭添加用户dialog
              _this.dialogFormVisible = false;
              //重新加载所有用户信息
              _this.getAllUsers();
              _this.$message({
                type: "success",
                message: "更新成功！"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      //tag为false是更新用户信息
      else {
        _this.$api.userApi
          .addUser(
            _this.userInfo.username,
            _this.userInfo.password,
            "",
            _this.user_type[this.userInfo.name],
            _this.userInfo.phone,
            _this.userInfo.email,
            !!_this.userInfo.enabled
          )
          .then(res => {
            if (res && res.data.code === 200) {
              //关闭添加用户dialog
              _this.dialogFormVisible = false;
              //重新加载所有用户信息
              _this.getAllUsers();
              _this.$message({
                type: "success",
                message: "添加成功！"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    editUserInfo(val) {
      console.log(val);
      val.enabled = val.enabled === true ? 1 : 0;
      this.userInfo = val;
      this.userInfo["tag"] = true;
      this.userInfo["name"] = val.name;
      this.dialogFormVisible = true;
    },
    /**
     * 取消操作
     */
    cancel() {
      this.dialogFormVisible = false;
      this.userInfo = {
        username: "",
        password: "",
        phone: "",
        email: "",
        name: "",
        enabled: 1
      };
    },
    /**
     * 根据用户id删除用户信息
     */
    deleteUserInfo(id) {
      let _this = this;
      _this
        .$confirm("确定删除该用户信息, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$api.userApi
            .deleteUser(id)
            .then(res => {
              if (res && res.data.code === 200) {
                //删除完毕，重新加载所有用户
                _this.getAllUsers();
                _this.$message({
                  type: "success",
                  message: "删除成功！"
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
            message: "已取消删除"
          });
        });
    },
    addUser() {
      this.dialogFormVisible = !this.dialogFormVisible;
      this.userInfo = {
        username: "",
        password: "",
        phone: "",
        email: "",
        name: "",
        enabled: 1
      };
    }
  },
  computed: {},
  mounted() {
    this.getAllUsers();
  }
};
</script>

<style scoped>
</style>