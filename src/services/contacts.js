import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

// const getAll = () => {

// }

const create = newContact => {
    const request = axios.post(baseUrl, newContact) //promise aka promise
    return request.then(response => response.data)
}

const exportedObject = {create}
export default exportedObject