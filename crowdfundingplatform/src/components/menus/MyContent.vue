<template>
  <div>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      stripe
      style="width: 100%"
      >
      <el-table-column
        label="标题"
        prop="title"
        width="380"
      >
      </el-table-column>
      <el-table-column
        label="期望筹资"
        prop="expectFinancing"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="目前筹资"
        prop="nowmoney"
        width="180">
      </el-table-column>
      <el-table-column
        label="日期"
        prop="createTime"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="状态"
        prop="state"
        width="180"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDetails(scope.$index, scope.row)">详情</el-button>
          <el-button
            size="mini"
            type="success"
            @click="handleSuccess(scope.$index, scope.row)" v-show="!tableData.state">通过</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row>
      <el-col :span="24">
        <div style="padding-top: 20px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            @prev-click="handlePrevClick"
            @next-click="handleNextClick"
            :current-page="currentPage"
            :page-sizes="[5, 10, 25, 50]"
            :page-size="pagesize"
            
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import eventBus from '@/assets/js/eventBus.js'
import request from '@/utils/request.js'

export default {
  name: 'MyContent',
  data() {
    return {
      // 用户列表数据
       tableData: [
      ],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      loading: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      let that = this
      await request.get('/project/selectAllNotPassProject',{
        headers: {
          "satoken": localStorage.getItem("satoken")
        }
      })
      .then(res => {
        if(res.status == 200) {
          let len = res.data.length
          that.total = res.data.total
          that.tableData = []
          for(let i = 0; i < len; i++) {
            let isAudit = "已审核"
            if(res.data[i].isAudit == 0) {
              isAudit = "未审核"
            }
            that.tableData.push({
              title: res.data[i].projectName,
              createTime: res.data[i].submissionTime,
              state: isAudit,
              expectFinancing: res.data[i].targetmoney,
              nowmoney: res.data[i].nowmoney,
              projectID: res.data[i].projectID
            })
          }
          that.loading = false
          that.$message({
            type: 'success',
            message: '获取内容成功'
          })
        }
        else {
          that.loading = false
          that.$message({
            type: 'error',
            message: '获取内容失败'
          })
        }
      })
      .catch(err => {
        that.$message({
          type: 'error',
          message: err
        })
      })
    },
    handleSizeChange(size) {
      console.log(this.tableData.length)
      this.pagesize = size
      this.getList()
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)  //点击第几页
      this.getList()
    },
    handlePrevClick() {

    },
    handleNextClick() {
      
    },
    handleDetails(index, row) {
      eventBus.$emit('share', row)
      this.$router.push('/admin/userinfo/' + row.projectID)
    },
    handleSuccess(index, row) {
      let that = this
      this.$confirm("是否通过该项目？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async() => {
        await request.get('/project/changeAudi', {
          params: {
            projectId: row.projectID
          },
          headers: {
            "satoken": localStorage.getItem("satoken")
          }
        }).then(res => {
          that.$message({
            type: 'success',
            message: '成功通过'
          })
        })
      }).catch(err => {
        that.$message({
          type: 'error',
          message: '取消通过' + err
        })
      })
    },
    handleDelete(index, row) {
      let that = this
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async() => {
        await request.get('/project/deleteProjectByID', {
          params: {
            projectid: row.projectID
          },
          headers: {
            "satoken": localStorage.getItem("satoken")
          }
        }).then(res => {
          this.tableData.splice(index, 1)
          that.$message({
            type: 'success',
            message: '删除成功'
          })
        })
      }).catch(err => {
        that.$message({
          type: 'error',
          message: '取消删除' + err
        })
      })
    },
  }
}
</script>

<style lang="less" scoped>
.el-table--striped .el-table__body tr.el-table__row--striped.el-table__row--striped
.el-table__row--striped td {
  background-color:#eaf3fb;
}
</style>
