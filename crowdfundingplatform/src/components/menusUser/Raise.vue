<template>
  <div>
    <h4 class="text-center">提出众筹</h4>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="居住地" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择居住地">
          <el-option label="上海" value="上海"></el-option>
          <el-option label="北京" value="北京"></el-option>
          <el-option label="天津" value="天津"></el-option>
          <el-option label="重庆" value="重庆"></el-option>
          <el-option label="江西" value="江西"></el-option>
          <el-option label="福建" value="福建"></el-option>
          <el-option label="安徽" value="安徽"></el-option>
          <el-option label="浙江" value="浙江"></el-option>
          <el-option label="江苏" value="江苏"></el-option>
          <el-option label="黑龙江" value="黑龙江"></el-option>
          <el-option label="吉林" value="吉林"></el-option>
          <el-option label="辽宁" value="辽宁"></el-option>
          <el-option label="山西" value="山西"></el-option>
          <el-option label="河北" value="河北"></el-option>
          <el-option label="山东" value="山东"></el-option>
          <el-option label="河南" value="河南"></el-option>
          <el-option label="湖北" value="湖北"></el-option>
          <el-option label="湖南" value="湖南"></el-option>
          <el-option label="广东" value="广东"></el-option>
          <el-option label="海南" value="海南"></el-option>
          <el-option label="四川" value="四川"></el-option>
          <el-option label="贵州" value="贵州"></el-option>
          <el-option label="云南" value="云南"></el-option>
          <el-option label="陕西" value="陕西"></el-option>
          <el-option label="甘肃" value="甘肃"></el-option>
          <el-option label="青海" value="青海"></el-option>
          <el-option label="台湾" value="台湾"></el-option>
          <el-option label="内蒙古" value="内蒙古"></el-option>
          <el-option label="西藏" value="西藏"></el-option>
          <el-option label="宁夏" value="宁夏"></el-option>
          <el-option label="广西" value="广西"></el-option>
          <el-option label="新疆" value="新疆"></el-option>
          <el-option label="澳门" value="澳门"></el-option>
          <el-option label="香港" value="香港"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="期望金额" prop="money">
        <el-input v-model.number="ruleForm.money" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="灾害重建" name="type"></el-checkbox>
          <el-checkbox label="民间集资" name="type"></el-checkbox>
          <el-checkbox label="创业募资" name="type"></el-checkbox>
          <el-checkbox label="设计发明" name="type"></el-checkbox>
          <el-checkbox label="科学研究" name="type"></el-checkbox>
          <el-checkbox label="艺术创作" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-upload
        class="upload-demo"
        action=""
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :auto-upload="false"
        ref="upload"
        multiple
        :http-request="httpRequest"
        :limit="1"
        :on-exceed="handleExceed"
        list-type="picture"
        :file-list="ruleForm.fileList"
        >
        <el-button size="small" type="primary">点击上传图片</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件，且不超过1MB</div>
      </el-upload>
      <el-form-item label="众筹目的" prop="goal">
        <el-input type="textarea" v-model="ruleForm.goal" autosize></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">发起众筹</el-button>
        <el-button @click="resetForm('ruleForm')" id="clickId">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Raise',
  data() {
    return {
      ruleForm: {
        // 文件回显出来就要给对应绑定fileList赋值 对应的对象属性是name和url
        fileList: [],
        title: '',
        name: '',
        region: '',
        address: '',
        type: [],
        money: '',
        nowmoney: 0,
        id:'',
        goal: '',
        status: 0,
        userID: localStorage.getItem('loginId')
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择居住地', trigger: 'change' }
        ],
        address: [
          { message: '请填写联系地址', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个备注', trigger: 'change' }
        ],
        fileList: [
          { required: true, message: '请上传图片' }
        ],
        money: [
          { required: true, message: '请输入金额' },
          { type: 'number', message: '金额必须为数字值且大于0' },
          { pattern: /^[1-9]\d*$/, message: '金额必须大于0', trigger: 'blur' }
        ],
        goal: [
          { required: true, message: '请填写众筹目的', trigger: 'blur' }
        ]
      },
      flag: true,
      formDate: new FormData()
    }
  },
  methods: {
    // 表单按钮
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          alert('submit!')
          let submissionTime = this.getCurrentTime()
          this.formDate.append('projectName',this.ruleForm.title)
          this.formDate.append('projectID', 0)
          this.formDate.append('creatorID',this.ruleForm.userID)
          this.formDate.append('creatorName',this.ruleForm.name)
          this.formDate.append('submissionTime',submissionTime)
          this.formDate.append('nowmoney',this.ruleForm.nowmoney)
          this.formDate.append('region',this.ruleForm.region)
          this.formDate.append('address',this.ruleForm.address)
          this.formDate.append('isAudit',this.ruleForm.status)
          this.formDate.append('targetmoney',this.ruleForm.money)
          this.formDate.append('projectMaterials','')
          this.formDate.append('remarks',this.ruleForm.type)
          this.formDate.append('purpose',this.ruleForm.goal)
          // 获取图片
          this.$refs.upload.submit()
          this.$axios({
            url: 'http://crowdfundingplatform.vipgz4.91tunnel.com/project/add/',
            method: "post",
            data: this.formDate,
            headers: {
              'Content-Type': 'multipart/form-data',
              "satoken": localStorage.getItem("satoken")
            }
          }).then(res =>{
            if(res.status == 200) {
              this.$message({
                message: '发布成功' + res.data.msg,
                type: 'success'
              })
              this.resetForm('ruleForm')
            } else {
              this.$message({
                message: '发布失败' + res.data.msg,
                type: 'success'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    httpRequest(param) { //this.$refs.upload.submit()执行后会调用，多个图片会调用多次
      this.formDate.append('file', param.file)
    },
    resetForm(form) {
      this.$refs[form].resetFields()
    },
    // 上传图片
    // 删除的时候在数组中移除这个对象
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 获取到上传文件的信息
    handlePreview(file) {
      console.log(file)
    },
    // 文件数量的限制
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制最多选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 成功上传文件  :on-success="onSuccess"
    // onSuccess(response){
      //拼接得到图片信息对象
      // console.log(response)

      // const picInfo = { name:111,url: response.data.tmp_path }
      //将图片信息对象，push到pics数组中
      // this.ruleForm.fileList.push(picInfo)
      //console.log(this.addForm)
    // },
    // upFile(res, file) {
    //   if (res.status == 200) {
    //     // 文件上传成功后的回调，比如一些提示信息或者页面跳转都写在这里
    //     this.$message.success(res.info)
    //   } else {
    //     this.$message.warning(res.info)
    //     let _this = this
    //     setTimeout(function() {
    //       _this.$refs.fileList.clearFiles()
    //     }, 1000)
    //   }
    // },
    // onChange(file) {        :on-change="onChange"
    //   // const isJPG = file.type === 'image/jpg'
    //   var testimage = /^image\/(png|jpg|jpeg)$/.test(file.raw.type)
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if (!testimage) {
    //     this.$message.error('上传图片只能是 jpg jpeg png 格式!')
    //     this.flag = false
    //     this.handleRemove(file)
    //     return false
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传图片大小不能超过 2MB!')
    //     this.flag = false
    //     return false
    //   }
    //   this.flag = true
    // },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    // beforeUpload(file){        :before-upload="beforeUpload"
    //   var that = this
    //   return new Promise(function(resolve, reject) {
    //     var reader = new FileReader()
    //     reader.readAsDataURL(file)// 转换成base64
    //     // console.log(file)
    //     reader.onload = function(event) {
    //       // if(that.flag === true)
    //         that.ruleForm.fileList.push({ name: file.name, url: event.target.result }) //定义参数获取图片路径
    //       // console.log(that.ruleForm.fileList)
    //     }
    //   }) 
    // },
    getCurrentTime() {
      var _this = this
      let yy = new Date().getFullYear()
      let mm = new Date().getMonth()+1
      let dd = new Date().getDate()
      let hh = new Date().getHours()
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes()
      let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds()
      _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss
      return _this.gettime
    }
  }
}

</script>

<style scoped>
.upload-demo {
  margin-left: 27px;
}
</style>
