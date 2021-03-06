import axios from 'axios'
const baseUrl = '/api/goals'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = id => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const removeById = id => {
  axios.delete(`${baseUrl}/${id}`)
}

const deleteAllGoals = async () => {
  const allGoals = await getAll()

  allGoals.forEach(goal => {
    removeById(goal._id)
  })
}

export default {
  getAll,
  create,
  update,
  get,
  removeById,
  setToken,
  deleteAllGoals,
}
