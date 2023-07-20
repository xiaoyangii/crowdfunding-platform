<template>
  <div>
    <!-- 标题 -->
    <h4 class="text-center">用户管理(暂未实现)</h4>

    <!-- 用户列表 -->
    <table class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>姓名</th>
          <th>类型</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in userlist" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>
            <a href="#" @click.prevent="gotoDetail(item.id)">详情</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'MyUser',
  data() {
    return {
      // 用户列表数据
      userlist: [
      ]
    }
  },
  methods: {
    gotoDetail(id) {
      //   /admin/userinfo/1
      this.$router.push('/admin/userinfo/' + id)
    }
  }
}
</script>

<style lang="less" scoped></style>
