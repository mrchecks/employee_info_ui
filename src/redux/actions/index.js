import { apiGetAllEmployees, apiUpdateEmployee, apiAddEmployee, apiDeleteEmployee } from '../../api/employee'

export const getEmployees = () => {
  return async dispatch => {
    const response = await apiGetAllEmployees()
    if (response) {
      dispatch({
        type: 'SET_EMPLOYEES',
        data: response
      })
    }
  }
}

export const addEmployee = (employee) => {
  return async dispatch => {
    const response = await apiAddEmployee(employee)
    if (response) {
      dispatch({
        type: 'SET_EMPLOYEES',
        data: response
      })
    }
  }
}

export const updateEmployee = (employee) => {
  return async dispatch => {
    const response = await apiUpdateEmployee(employee)
    if (response) {
      dispatch({
        type: 'SET_EMPLOYEES',
        data: response
      })
    }
  }
}

export const deleteEmployee = (id) => {
  return async dispatch => {
    const response = await apiDeleteEmployee(id)
    if (response) {
      dispatch({
        type: 'SET_EMPLOYEES',
        data: response
      })
    }
  }
}

export const SetEmployees = data => dispatch => dispatch({ type: 'SET_EMPLOYEES', data })