import request from '@/utils/request.js'

export const loginAPI = function() {
  return request.get('/user')
}
