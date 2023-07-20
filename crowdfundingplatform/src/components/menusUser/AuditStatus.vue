<template>
  <div>
    <h4 class="text-center">审核状态</h4>
    <div class="box">
      <el-table
        v-if="haveItem"
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
        >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          width="280"
        >
        </el-table-column>
        <el-table-column
          prop="targetMoney"
          label="期望筹款"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="nowMoney"
          label="目前筹款"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="auditStatus"
          label="审核状态"
        >
        </el-table-column>
      </el-table>
      <h4 class="text-center" v-else>暂无内容</h4>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request.js'

export default {
  name: 'AuditStatus',
  data() {
    return {
      tableData: [],
      id: localStorage.getItem('loginId'),
      haveItem: true,
      loading: true
    }
  },
  created() {
    this.getRaiseStatus()
  },
  methods: {
    async getRaiseStatus() {
      let userId = parseInt(this.id)
      await request.get('/project/selectselfsProjectByID',{
        params: {
          userId
        },
        headers: {
          "satoken": localStorage.getItem("satoken")
        }
      }).then(res => {
        let len = res.data.length
        if(len == 0) {
          this.haveItem = false
        } else {
          for(var i = 0; i < len; i++){
            let auditstatus
            if(res.data[i].isAudit == 0) {
              auditstatus = "审核中或审核失败"
            } else {
              auditstatus = "审核通过"
            }
            this.tableData.push({
              projectName: res.data[i].projectName,
              date: res.data[i].submissionTime,
              targetMoney: res.data[i].targetmoney,
              nowMoney: res.data[i].nowmoney,
              auditStatus: auditstatus
            })
          }
          this.loading = false
          this.$message({
            message: '获取审核状态成功',
            type: 'success'
          })
        }
      }).catch(err => {
        this.loading = false
        this.$message({
          message: '获取审核状态失败 ' + err,
          type: 'error'
        })
      })
    },
    tableClass({ row, rowIndex }) {
      if (rowIndex % 2 == 1) {
        return "even-row"
      } else {
        return ""
      }
    }
  }
}
</script>

<style lang="less">
.el-table--striped .el-table__body tr.el-table__row--striped.el-table__row--striped
.el-table__row--striped td {
  background-color:#eaf3fb
}
</style>
