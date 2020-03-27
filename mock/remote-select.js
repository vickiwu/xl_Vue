export default [
  {
    url: '/search/selectTree',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        list: [
          { id: 1, parentId: 0, name: '一级机构A', rank: 1 },
          { id: 2, parentId: 0, name: '一级机构B', rank: 1 },
          { id: 3, parentId: 0, name: '一级机构C', rank: 1 },
          { id: 4, parentId: 1, name: '二级机构A-A', rank: 2 },
          { id: 5, parentId: 1, name: '二级机构A-B', rank: 2 },
          { id: 6, parentId: 2, name: '二级机构B-A', rank: 2 },
          { id: 7, parentId: 4, name: '三级机构A-A-A', rank: 3 },
          { id: 8, parentId: 4, name: '三级机构A-A-B', rank: 3 },
          { id: 9, parentId: 4, name: '三级机构A-A-C', rank: 3 },
          { id: 15, parentId: 0, name: '一级机构C1', rank: 1 },
          { id: 16, parentId: 0, name: '一级机构D', rank: 1 },
          { id: 17, parentId: 0, name: '一级机构E', rank: 1 },
          { id: 18, parentId: 0, name: '一级机构F', rank: 1 },
          { id: 19, parentId: 0, name: '一级机构G', rank: 1 },
          { id: 20, parentId: 0, name: '一级机构H', rank: 1 },
          { id: 21, parentId: 0, name: '一级机构I', rank: 1 },
          { id: 22, parentId: 0, name: '一级机构J', rank: 1 },
          { id: 23, parentId: 0, name: '一级机构K', rank: 1 },
          { id: 24, parentId: 0, name: '一级机构L', rank: 1 },
          { id: 25, parentId: 0, name: '一级机构M', rank: 1 },
          { id: 26, parentId: 0, name: '一级机构N', rank: 1 },
          { id: 27, parentId: 0, name: '一级机构O', rank: 1 },
          { id: 40, parentId: 0, name: '一级机构end', rank: 1 }
        ]
      }
    }
  },
  // username search
  {
    url: '/search/select',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        'data|20': [{
          value: '@guid()',
          label: '@name()'
        }]
      }
    }
  }
]
