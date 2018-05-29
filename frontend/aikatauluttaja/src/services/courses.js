import axios from "axios"
const baseUrl = "/api/courses"


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const get = (id) => {
    const request = axios.get(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update, get }