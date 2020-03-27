import Mock from 'mockjs'

export default [
  {
    url: '/abnormal/industryList',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: [
          {
            date1: '污水处理',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '-',
            name4: '175'
          },
          {
            date1: '化工',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '12',
            name4: '175'
          },
          {
            date1: '纺织印染',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '-',
            name4: '175'
          },
          {
            date1: '钢铁',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '-',
            name4: '175'
          },
          {
            date1: '造纸',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '-',
            name4: '175'
          },
          {
            date1: '电力',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '-',
            name4: '175'
          },
          {
            date1: '水泥',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '4',
            name4: '175'
          }
        ]
      }
    }
  },
  {
    url: '/abnormal/companyList',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: [
          {
            date1: '宿迁市生态环境局',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '-',
            name4: '175'
          },
          {
            date1: '盐城市生态环境局',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '12',
            name4: '175'
          },
          {
            date1: '连云港市环境保护局',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '-',
            name4: '175'
          },
          {
            date1: '南京市环境保护局',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '-',
            name4: '175'
          },
          {
            date1: '苏州市生态环境局',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '-',
            name4: '175'
          },
          {
            date1: '淮安市生态环境局',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '-',
            name4: '175'
          },
          {
            date1: '徐州市生态环境局',
            date2: '64',
            date3: '114',
            date4: '105',
            name1: '887',
            name2: '712',
            name3: '4',
            name4: '175'
          }
        ]
      }
    }
  },
  {
    url: '/company/list',
    type: 'post',
    response: _ => {
      const list = []
      for (let i = 0; i < 10; i++) {
        list.push(Mock.mock({
          Index: '@increment',
          OrgId: '@increment',
          OrgName: '@string(5, 10)',
          CompanyId: '@integer(10000)',
          CompanyName: '@string(15)',
          IndustryId: '@integer(10000)',
          IndustryName: '@string(5)',
          StatusId: '@integer(1)',
          DeviceCount: '@integer(60, 100)',
          RunCount: '@integer(60, 100)',
          DisabledCount: '@integer(60, 100)',
          DebugCount: '@integer(60, 100)',
          EP_PfCount: '@integer(60, 100)',
          EP_PfCode: '@integer(60, 100)',
          EP_PfName: '正常',
          EP_EpCount: '@integer(60, 100)',
          StatusName: '正常',
          UserStatus: '@integer(1)',
          UserStatusDesc: '运行',
          Addr: '@string(5, 10)',
          WebUrl: '@string(10, 15)',
          HostUrl: null,
          Sort: '@integer(1)',
          ConstructionUnitName: '@string(10, 15)'
        }))
      }

      return {
        code: 20000,
        PageCount: 10,
        PageIndex: 1,
        TotalCount: 32,
        Data: list
      }
    }
  }]
