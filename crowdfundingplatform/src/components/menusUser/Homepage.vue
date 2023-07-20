<template>
  <div>
    <el-table
      :data="tableData"
      v-loading="loading"
      stripe
      border
      style="width: 100%"
      >
      <el-table-column
        label="标题"
        prop="title"
        width="680"
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
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="日期"
        prop="submissionTime"
        width="180"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDetails(scope.$index, scope.row)">详情</el-button>
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

export default {
  name: 'Homepage',
  data() {
    return {
      // 用户列表数据
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
      loading: true,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      let that = this
      that.$axios({
        method: 'get',
        url: 'http://crowdfundingplatform.vipgz4.91tunnel.com/project/selectAllProject',
      })
      .then(res => {
        let len = res.data.length
        that.total = len
        that.tableData = []
        for(let i = 0; i < len; i++){
          that.tableData.push({
            submissionTime: res.data[i].submissionTime,
            projectID: res.data[i].projectID,
            title: res.data[i].projectName,
            expectFinancing: res.data[i].targetmoney,
            nowmoney: res.data[i].nowmoney
          })
        }
        this.loading = false
        if(res.status == 200) {
          that.$message({
            type: 'success',
            message: '获取内容成功'
          })
        }
      })
      .catch(err => {
        this.loading = false
        that.$message({
          type: 'error',
          message: err
        })
      })
    },
    handleSizeChange(size) {
      console.log(this.tableData.length)
      this.pagesize = size
      this.getList();
      console.log(this.pagesize)  // 每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)  // 点击第几页
      this.getList()
    },
    handlePrevClick() {

    },
    handleNextClick() {
      
    },
    handleDetails(index, row) {
      // bus.$emit('share', row.id)
      // console.log(row)
      this.$router.push('/home/userdetails/' + row.projectID)
    }
  }
}
</script>

<style lang="less" scoped>
.el-table--striped .el-table__body tr.el-table__row--striped.el-table__row--striped
.el-table__row--striped td {
  background-color:#eaf3fb;
}
</style>
