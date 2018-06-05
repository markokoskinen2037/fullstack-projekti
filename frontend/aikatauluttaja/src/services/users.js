import axios from "axios"
const baseUrl = "/api/users"


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

const update = (id, updatedUser) => {
    console.log("here we are............................................")
    console.log("here we are............................................")
    console.log("here we are............................................")
    console.log("here we are............................................")
    console.log("here we are............................................")

    console.log(id) //Täällä on user id joka määrittää mihin osoitteeseen päivitys tehdään (eli mille userille)
    console.log(updatedUser) //Täällä on päivitetty user


    const request = axios.put(`${baseUrl}/${id}`, updatedUser) //Tää tekee backendin osoitteeseen :/id pyynnön ja lisää siihen mukaan newObjektin
    return request.then(response => response.data)
}

const removeById = (id) => {
    axios.delete(`${baseUrl}/${id}`)
    
}



export default { getAll, create, update, get, removeById }