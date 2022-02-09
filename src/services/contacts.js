import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

// const getAll = () => {

// }

const create = newContact => {
    const request = axios.post(baseUrl, newContact) //promise aka promise
    return request.then(response => response.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newContact) => {
    const request = axios.put(`${baseUrl}/${id}`, newContact)
    return request.then(response => response.data)
}

const exportedObject = {create, remove, update}
export default exportedObject