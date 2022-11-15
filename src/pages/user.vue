<template>
  <div class="user">
    <div class="user-top">
      <div>
        <el-button type="primary" @click="handleAdd">+新增</el-button>

        <el-dialog title="新增用户信息" :visible.sync="dialogFormVisible" :before-close="handleClose">
          <el-form :inline="true" :model="form" :rules="rules" ref="form">
            <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
              <el-select v-model="form.sex" placeholder="请选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birth">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%" format="yyyy - MM - dd " value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>

            <el-form-item label="电话" label-width="90px" prop="phone">
              <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
              <el-input v-model="form.address" autocomplete="off" style="width: 500px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            <el-button @click="resetForm">取 消</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="user-top-r">
        <el-input v-model="input" placeholder="请输入姓名"></el-input>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>
    </div>

    <div class="main">
      <el-table :data="tableData" stripe style="width: 100%" height="740">
        <el-table-column prop="name" label="姓名" width="200"> </el-table-column>
        <el-table-column prop="sex" label="性别" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex == 1 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期" width="200"> </el-table-column>
        <el-table-column prop="phone" label="电话" width="200"> </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage" background :page-size="13"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { getUser, addUser, editorUser, deleteUser, searchUser } from '../api'
export default {
  name: 'user',
  data() {
    return {
      input: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        name: '',
        sex: '',
        phone: '',
        birth: '',
        address: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        birth: [{ required: true, message: '请选择日期', trigger: 'change' }],
        phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }]
      },
      tableData: [],
      modeType: -1,
      total: 0
    }
  },
  methods: {
    getUserList(res) {
      getUser(res).then(({ data }) => {
        this.tableData = data.list
        this.total = data.count
      })
    },
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.modeType === 0) {
            addUser(this.form).then(() => {
              this.getUserList()
            })
          } else if (this.modeType === 1) {
            editorUser(this.form).then(() => {
              this.getUserList()
            })
          } else {
            return 0
          }

          this.$refs[form].resetFields()
          this.dialogFormVisible = false
        }
      })
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogFormVisible = false
    },
    resetForm() {
      this.handleClose()
    },
    handleAdd() {
      this.modeType = 0
      this.dialogFormVisible = true
    },
    handleEdit(row) {
      this.modeType = 1
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.form = JSON.parse(JSON.stringify(row))
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteUser(row).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getUserList()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    search() {
      searchUser(this.input).then(({ data }) => {
        if (data) {
          this.tableData = data
          console.log(data)
        } else {
          this.getUserList()
        }
      })
    },
    handlePage(res) {
      this.getUserList(res)
    }
  },
  mounted() {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.user {
  .user-top {
    display: flex;
    justify-content: space-between;
    .user-top-r {
      width: 300px;
      display: flex;
    }
  }
  .main {
    margin-top: 20px;
  }
  .page {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
