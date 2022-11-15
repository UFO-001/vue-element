<template>
  <div class="main">
    <img src="../assets/1.jpg" alt="" />
    <el-card class="login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h3>登录系统</h3>
        <el-form-item label="账号" prop="name">
          <el-input class="input" v-model="ruleForm.name" placeholder="管理员账号:admin,  普通账号:随便输入"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input class="input" v-model="ruleForm.password" placeholder="管理员密码:123456,  密码：随便输入" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { loginUser } from '../api'
import Cookie from 'js-cookie'
export default {
  name: 'login',
  data() {
    return {
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          loginUser(this.ruleForm).then(({ data }) => {
            if (data.data.code == 200) {
              const { menu, token, personal } = data.data
              this.$store.commit('changeMenu', menu)
              Cookie.set('personal', JSON.stringify(personal))

              this.$store.commit('addMenu', this.$router)
              Cookie.set('token', token)
              this.$router.push('/home')
            } else {
              this.$message({
                message: data.data.message,
                type: 'warning'
              })
            }
          })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
  // mounted() {
  //   getConstomer().then(data => {
  //     console.log(data)
  //   })
  // }
}
</script>

<style lang="less">
.main {
  img {
    width: 100%;
    height: 99.5vh;
  }
  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    padding-right: 80px;
    background-color: rgba(19, 18, 18, 0.3);
    h3 {
      color: white;
      margin-left: 50%;
      margin-bottom: 30px;
    }
    .el-button + .el-button {
      margin-left: 100px;
    }
    .el-button--primary {
      margin-left: 50px;
    }
    .el-input__inner {
      background-color: rgba(36, 35, 35, 0.3);
      color: white;
    }
    .el-form-item__label,
    .el-form-item__error {
      color: white;
    }
  }
}
</style>
