import axios from 'axios'
// import userService from '@/services/user-service'

const getRequest = () => {
  const request = axios.create()

  request.interceptors.request.use(config => ({
    ...config,
    headers: { 'Authorization': localStorage.getItem('jwt')},
    url: `${process.env.apiUrl}/${config.url}`
  }))

  request.interceptors.response.use(
    response => response.data,
    error => console.error(error)
  )
  return request
}

const request = getRequest()
const _get = request.get.bind(request)
const _post = request.post.bind(request)
const _put = request.put.bind(request)
const _patch = request.patch.bind(request)
const _delete = request.delete.bind(request)

export default {
  get: _get,
  post: _post,
  put: _put,
  patch: _patch,
  delete: _delete,
}
