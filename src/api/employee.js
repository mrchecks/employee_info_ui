import axios from 'axios'
//TODO: Implement proper service layer with endpoints.
const url = 'https://localhost:7219/Employee'

export const apiGetAllEmployees = async () => {
    const response = await axios.get(url)
    return response.data
}

export const apiAddEmployee = async (employee) => {
    return axios.post(url, employee).then((response) => {
        return response.data
    })
}

export const apiUpdateEmployee = async (employee) => {
    return axios.put(url, employee).then((response) => {
        return response.data
      })
}

export const apiDeleteEmployee = async (id) => {
    const url = `https://localhost:7219/Employee/?id=${id}`
    return axios.delete(url).then((response) => {
        return response.data
      })
}