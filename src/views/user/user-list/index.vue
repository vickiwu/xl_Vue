<template>
  <div>
    <span>用户列表</span>
    <XLTable
      :data="userList"
      :column="tableColumns"
      :pagination="pagination"
    />
  </div>
</template>

<script>
import XLTable from '@/components/XLTable'
import { fetchUserList } from '@/api/userManage'
export default {
  name: 'UserList',
  components: {
    XLTable
  },
  data() {
    return {
      userList: [],
      query: {
        pageIndex: 1,
        pageSize: 10
      },
      pagination: {
        pageSize: 10,
        total: 0,
        pageIndex: 1
      },
      tableColumns: [
        {
          lable: '用户名',
          prop: 'name',
          align: 'center'
        },
        {
          lable: '用户名',
          prop: 'name',
          align: 'center'
        },
        {
          lable: '用户名',
          prop: 'name',
          align: 'center'
        },
        {
          lable: '用户名',
          prop: 'name',
          align: 'center'
        },
        {
          lable: '用户名',
          prop: 'name',
          align: 'center'
        },
        {
          lable: '操作',
          align: 'center',
          buttonGroup: [
            {
              name: '修改',
              type: 'success',
              click(row, index) {
                console.log(row)
              }
            }
          ]
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchUserList(this.query).then(res => {
        // const { code, data } = res
        console.log('res', res)
      })
      // fetchUserList(this.query).then((code, data) => {
      //   console.log('user list is', data)
      //   this.userList = data
      // })
    }
  }

}
</script>

<style>

</style>
