export default [
  {
    url: '/permission/buttons',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          buttons: ['add', 'delete', 'edit']
        }
      }
    }
  }
]
