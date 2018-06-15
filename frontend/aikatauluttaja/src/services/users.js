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

const update = (id, newObject) => {

    //console.log(newObject) //Täällä on päivitetty user. Tämä arvo päivittyy oikein.


    const request = axios.put(`${baseUrl}/${id}`, newObject) 
    return request.then(response => response.data)
}

const removeById = (id) => {
    axios.delete(`${baseUrl}/${id}`)
    
}

const deleteAllUsers = async () => {
    const allUsers = await getAll()


    allUsers.forEach(user => {
        removeById(user._id)
    });

}



export default { getAll, create, update, get, removeById, deleteAllUsers }