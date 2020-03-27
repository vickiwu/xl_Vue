<template>
  <row>
    <el-row v-for="(key) in Object.keys(companyInfo)" :key="key">
      <el-row class="title">
        {{ key }}
      </el-row>
      <el-row class="table">
        <XLMapTable v-if="key !== '联系信息'" :data="companyInfo[key]" />
        <XLTable
          v-if="key === '联系信息'"
          :border="true"
          :data="companylinkMan"
          :columns="contactColumns"
        />
      </el-row>
    </el-row>

    <XLTable
      :border="true"
      :data="monitors"
      :columns="tableColumns"
    />
  </row>
</template>

<script>
import { fetchArchives } from '@/api/company-info'
import XLTable from '@/components/XLTable'
import XLMapTable from '@/components/XLMapTable'

export default {
  name: 'EnterpriseArchives',
  components: {
    XLTable,
    XLMapTable
  },
  data() {
    return {
      activeNames: ['1', '2'],
      monitors: [],
      companyInfo: {},
      companylinkMan: [],
      tableColumns: [
        {
          label: '监测点名称',
          prop: 'DeviceName',
          align: 'center'
        },
        {
          label: '状态',
          prop: 'Stataus',
          align: 'center'
        },
        {
          label: 'TA',
          prop: 'TA',
          align: 'center'
        },
        {
          label: 'TV',
          prop: 'TV',
          align: 'center'
        },
        {
          label: '倍率',
          prop: 'MULT',
          align: 'center'
        },
        {
          label: '摄像头',
          prop: 'Cameras',
          align: 'center'
        }
      ],
      contactColumns: [
        {
          label: '名称',
          prop: 'LinkName',
          align: 'center'
        },
        {
          label: '职务属性',
          prop: 'JobName',
          align: 'center'
        },
        {
          label: '手机号',
          prop: 'Phone',
          align: 'center'
        },
        {
          label: 'QQ',
          prop: 'QQ',
          align: 'center'
        },
        {
          label: '微信',
          prop: 'WeChat',
          align: 'center'
        },
        {
          label: 'E-Mail',
          prop: 'EMail',
          align: 'center'
        },
        {
          label: '电话',
          prop: 'TelPhone',
          align: 'center'
        }
      ]
    }
  },
  created() {
    this.getArchives()
  },
  methods: {
    getArchives() {
      fetchArchives().then(({ code, data }) => {
        const { LstEP_Device, dicEP_Info, LstCompanylinkMan } = data
        this.monitors = LstEP_Device
        this.companyInfo = dicEP_Info
        this.companylinkMan = LstCompanylinkMan
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: 700;
  padding-top: 30px;
  // padding-bottom: 10px;
}
.table {
  .el-table {
    margin-top: 1 !important;
  }
}
</style>
