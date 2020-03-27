<template>
  <div class="dashboard-editor-container">
    <el-button v-permission="'add'" type="success" @click="doEdit">{{ edit ? '保存' : '编辑' }}</el-button>
    <el-button v-permission="'delete'" type="success">删除</el-button>
    <el-button v-permission="'reset'" type="success" @click="reset">重置</el-button>
    <el-button v-permission="'ref'" type="success" @click="toList">跳转</el-button>

    <el-row :gutter="32">
      <el-col v-for="(subCard, index) in showCardList" :key="index" :xs="24" :sm="24" :lg="subCard.cards.length * 4">
        <panel-group ref="children" :card-list="subCard.cards" :edit="edit" @deleteEle="deleteEleCard(index, arguments)" />
      </el-col>
    </el-row>

    <el-row v-if="edit" :gutter="32">
      <draggable :set-data="setData" :list="showModulesList" group="article" class="dragArea" @update="update">
        <el-col v-for="(module, idx) in showModulesList" :key="module.id" class="list-complete-item" :xs="24" :sm="24" :lg="12">
          <div class="chart-wrapper">
            <component :is="module.name" />
            <drop-icon :edit="edit" @deleteEle="deleteEle(idx)" />
          </div>
        </el-col>
      </draggable>
    </el-row>

    <el-row v-else :gutter="32">
      <el-col v-for="(module) in showModulesList" :key="module.id" class="list-complete-item" :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <component :is="module.name" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import HeapUpBarChart from './components/HeapUpBarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import draggable from 'vuedraggable'
import DropIcon from '@/components/DropIcon'
import { getStorageByKey, setStorageByKey, Keys, removeStorageByKey } from '@/utils/localstorage'
import { sendMessage } from '../../../utils/request'
import permission from '@/directive/button-permission'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard,
    draggable,
    DropIcon,
    HeapUpBarChart
  },
  directives: {
    permission
  },
  data() {
    return {
      showModulesList: [],
      modulesList: [
        {
          name: 'bar-chart',
          id: 'first'
        },
        {
          name: 'heap-up-bar-chart',
          id: 'second'
        },
        {
          name: 'raddar-chart',
          id: 'third'
        },
        {
          name: 'line-chart',
          id: 'forth'
        }
      ],
      edit: false,
      showCardList: [],
      cardList: [
        {
          title: '基本情况',
          cards: [
            {
              icon: 'people',
              title: '污染源企业',
              count: 6170,
              unit: '家',
              url: 'abnormal-tracking-company-list'
            },
            {
              icon: 'message',
              title: '产物设施',
              count: 25550,
              unit: '处',
              url: 'abnormal-tracking-company-list'
            },
            {
              icon: 'money',
              title: '污处设置',
              count: 17483,
              unit: '处',
              url: 'abnormal-tracking-company-list'
            },
            {
              icon: 'peoples',
              title: '监测点',
              count: 77954,
              unit: '个',
              url: 'abnormal-tracking-company-list'
            }
          ]
        },
        {
          title: '污处设施异常',
          cards: [
            {
              icon: 'people',
              title: '异常企业',
              count: 155,
              unit: '家',
              url: 'abnormal-tracking-company-list'
            }
          ]
        },
        {
          title: '大气管控异常',
          cards: [
            {
              icon: 'people',
              title: '异常企业',
              count: 12,
              unit: '家',
              url: 'abnormal-tracking-company-list'
            }
          ]
        }
      ]
    }
  },
  created() {
    this.showModulesList = JSON.parse(JSON.stringify(this.modulesList))
    const listStr = getStorageByKey(Keys.component)
    if (listStr) {
      this.showModulesList = JSON.parse(listStr)
    }
    this.showCardList = JSON.parse(JSON.stringify(this.cardList))
    const cardListStr = getStorageByKey(Keys.card)
    if (cardListStr) {
      this.showCardList = JSON.parse(cardListStr)
    }
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    deleteEle(idx) {
      this.showModulesList.splice(idx, 1)
      this.setToStorage(Keys.component, this.showModulesList)
    },
    deleteEleCard(index) {
      const fatherArgs = arguments[0] // 父组件参数
      const sonArgs = arguments[1][0] // 子组件参数
      this.showCardList[fatherArgs].cards.splice(sonArgs, 1)
    },
    update() {
      this.setToStorage(Keys.component, this.showModulesList)
    },
    setToStorage(key, list) {
      setStorageByKey(key, JSON.stringify(list))
    },
    doEdit() {
      if (this.edit) {
        this.setToStorage(Keys.component, this.showModulesList)
        this.setToStorage(Keys.card, this.showCardList)
      }
      this.edit = !this.edit
    },
    reset() {
      removeStorageByKey(Keys.component)
      this.showModulesList = JSON.parse(JSON.stringify(this.modulesList))
      removeStorageByKey(Keys.card)
      this.showCardList = JSON.parse(JSON.stringify(this.cardList))
    },
    toList() {
      sendMessage({
        sysCode: '102',
        res: 'http://localhost:9527/#/table/abnormal-tracking-company-list',
        params: {
          orgId: '13920',
          isImportamt: 1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    position: relative;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
