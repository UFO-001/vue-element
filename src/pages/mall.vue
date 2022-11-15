<template>
  <div class="mall">
    <div class="mall-top">
      <el-button type="primary" @click="handleAdd">增加库存 / 增加产品</el-button>
      <el-button type="primary" @click="handleReduce"> 减少库存 / 移除产品</el-button>

      <el-dialog title="商品信息" :visible.sync="dialogFormVisible" :before-close="handleClose">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="品牌" :label-width="formLabelWidth" prop="brand">
            <el-select v-model="form.brand" placeholder="请选择品牌">
              <el-option label="苹果" value="apple"></el-option>
              <el-option label="三星" value="galaxy"></el-option>
              <el-option label="小米" value="xiaomi"></el-option>
              <el-option label="oppo" value="oppo"></el-option>
              <el-option label="vivo" value="vivo"></el-option>
              <el-option label="华为" value="huawei"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="型号" :label-width="formLabelWidth" prop="type">
            <el-input v-model="form.type" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="库存" :label-width="formLabelWidth" prop="number">
            <el-input v-model.number="form.number" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="main">
      <div v-for="(item, index) in mallRef" :key="index" class="malls">
        <el-card style="height: 380px">
          <div class="bar" style="height: 380px; width: 100%"></div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getMall, addMall, deleteMall } from '../api'
export default {
  name: 'mall',
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        brand: '',
        type: '',
        number: ''
      },
      formLabelWidth: '120px',
      rules: {
        brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
        type: [{ required: true, message: '请输入型号', trigger: 'blur' }],
        number: [
          { required: true, message: '请输入库存', trigger: 'blur' },
          { message: '请输入数字', type: 'number' }
        ]
      },
      modeType: 0,
      mallRef: []
    }
  },

  methods: {
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogFormVisible = false
    },
    resetForm() {
      this.handleClose()
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.modeType == 0) {
            addMall(this.form).then(() => {
              this.getList()
            })
          } else {
            deleteMall(this.form).then(({ data }) => {
              if (data.code == 404) {
                this.$message({
                  message: data.message,
                  type: 'warning'
                })
              } else {
                this.getList()
              }
            })
          }
          this.$refs.form.resetFields()
          this.dialogFormVisible = false
        }
      })
    },
    handleAdd() {
      this.modeType = 0
      this.dialogFormVisible = true
    },
    handleReduce() {
      this.modeType = 1
      this.dialogFormVisible = true
    },
    getList() {
      getMall().then(({ data }) => {
        this.mallRef = Object.keys(data.data[0])
        var myEchart = document.getElementsByClassName('bar')
        this.$nextTick(() => {
          for (let i = 0; i < myEchart.length; i++) {
            var brand = []
            var number = []
            brand = Object.keys(data.data[0][this.mallRef[i]])
            number = Object.values(data.data[0][this.mallRef[i]])
            var myChart = echarts.init(myEchart[i])
            var option = {
              title: {
                text: this.mallRef[i] + '库存',
                left: 'center'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '23%'
              },
              xAxis: [
                {
                  type: 'category',
                  data: brand,
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: 'Direct',
                  type: 'bar',
                  barWidth: '60%',
                  data: number
                }
              ]
            }
            myChart.setOption(option)
          }
        })
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.mall {
  .main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
    .malls {
      width: 30%;
      height: 380px;
      margin: 15px;
    }
  }
}
</style>
