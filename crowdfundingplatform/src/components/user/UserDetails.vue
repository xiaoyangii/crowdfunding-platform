<template>
  <div>
    <button type="button" class="btn btn-light btn-sm" @click="$router.back()">后退</button>
    <h4 class="text-center">{{ title }}</h4>
    <!-- <el-carousel indicator-position="outside" :height="bannerHeight + 'px'">
      <el-carousel-item v-for="(item,index) in fileList" :key="index">
        <h3 class="text-center">{{ 11 }}</h3>
      </el-carousel-item>
    </el-carousel> -->
    <div class="demo-image__preview">
      <el-image 
        style="width: 200px; height: 200px"
        :src="projectMaterials" 
        :preview-src-list="srcList"
        >
      </el-image>
    </div>
    <!-- this.$route.params.id -->
    <el-divider></el-divider>

    <el-descriptions class="margin-top" title="基本信息" :column="3" border>
      <template slot="extra">
        <el-button type="primary" size="normal" @click="handleDonate">捐款</el-button>
      </template>
      <el-descriptions-item :contentStyle='contentStyle' :labelStyle='labelStyle'>
        <template slot="label">
          <i class="el-icon-user"></i>
          姓名
        </template>
        {{ name }}
      </el-descriptions-item>
      <el-descriptions-item :contentStyle='contentStyle' :labelStyle='labelStyle'>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          手机号
        </template>
        {{ tel }}
      </el-descriptions-item>
      <el-descriptions-item :contentStyle='contentStyle' :labelStyle='labelStyle'>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          居住地
        </template>
        {{ region }}
      </el-descriptions-item>
      <el-descriptions-item :contentStyle='contentStyle' :labelStyle='labelStyle'>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          备注
        </template>
        <el-tag size="small">{{ type }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item :contentStyle='contentStyle' :labelStyle='labelStyle'>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        {{ address }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top" title="" :column="3" border>
      <el-descriptions-item :contentStyle='contentStyle' :labelStyle='labelStyle'>
        <template slot="label">
          <i class="el-icon-chat-line-round"></i>
          众筹目的
        </template>
        {{ goal }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions class="margin-top" title="" :column="3" border>
      <el-descriptions-item :contentStyle='contentStyle' :labelStyle='labelStyle'>
        <template slot="label">
          <i class="el-icon-tickets"></i>
          项目名称
        </template>
        {{ title }}
      </el-descriptions-item>
      <el-descriptions-item :contentStyle='contentStyle' :labelStyle='labelStyle'>
        <template slot="label">
          ￥期望筹款
        </template>
        {{ targetmoney }}
      </el-descriptions-item>
      <el-descriptions-item :contentStyle='contentStyle' :labelStyle='labelStyle'>
        <template slot="label">
          ￥目前筹资
        </template>
        {{ nowmoney }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import request from '@/utils/request.js'
import eventBus from '@/assets/js/eventBus'
// const Base64 = require('js-base64').Base64

export default {
  name: 'UserDetail',
  props: ['id'],
  data() {
    return {
      projectMaterials: '',
      proId: '',
      srcList: [],
      title: '',
      name: '',
      region: '',
      address: '',
      type: '',
      targetmoney: '',
      tel: '',
      nowmoney: 0,
      goal: '',
      contentStyle: { 'text-align': 'center' },
      //label样式
      labelStyle: { 'width': '200px' },
      bannerHeight: 200
    }
  },
  created() {
    this.getUserDetails(parseInt(this.$route.params.id))
  },
  mounted() {
    this.setSize()
    window.addEventListener('resize', ()=>{
      this.setSize()
    },false)   
  },
  methods: {
    async getUserDetails(iddd) {
      let that = this
      that.proId = iddd
      // 发起get请求，获取列表参数
      await request.get('/project/detail', {
        params: {
          projectId: iddd
        },
        headers: {
          "satoken": localStorage.getItem("satoken")
        }
      })
      .then( res => {
        if(res.status == 200) {
          that.$message({
            type: 'success',
            message: '获取内容成功'
          })
          console.log(res)
          this.title = res.data.Project.projectName
          this.name = res.data.Project.creatorName
          this.region = res.data.Project.region
          this.address = res.data.Project.address
          this.targetmoney = res.data.Project.targetmoney
          this.nowmoney = res.data.Project.nowmoney
          this.tel = res.data.telephone
          this.type = res.data.Project.remarks
          this.goal = res.data.Project.purpose
          this.projectMaterials = 'data:image/png;base64,' + res.data.Project.projectMaterials
          this.srcList.push(this.projectMaterials)
        }
      })
    },
    async userDonate(val,idd) {
      let money = parseInt(val)
      let that = this
      let pa = new URLSearchParams()
      pa.append('money', money)
      pa.append('projectid', idd)
      await request.post('/project/addMoney'+'?projectid=' + idd + '&money=' + money, {
        headers: {
          "satoken": localStorage.getItem("satoken")
        }
      }).then(res => {
        console.log(res)
        if(res.code == 200) {
          that.$message({
            type: 'success',
            message: '捐款成功'
          })
          this.nowmoney += money
        }
      }).catch(() => {
        this.$message({
          type: 'error',
          message: '捐款失败'
        })  
      })
    },
    setSize() {
      this.bannerHeight = document.body.clientWidth / 4
    },
    handleDonate() {
      let that = this
      this.$prompt('请输入捐款金额(整数金额)', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[1-9]\d*$/,
          inputErrorMessage: '输入格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '您的捐款金额为' + value,
        })
        that.userDonate(value,parseInt(that.proId))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })  
      })
    }
  }
}
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>