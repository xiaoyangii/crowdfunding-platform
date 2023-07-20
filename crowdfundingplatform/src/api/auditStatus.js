// 审核状态的 API 接口，都封装到这个模块中
import request from '@/utils/request.js'

// 向外按需导出一个 API 函数
export const getStatusAPI = function(_id) {
  return request.get('', {
    // 请求参数
    params: {
      _id
    }
  })
}
