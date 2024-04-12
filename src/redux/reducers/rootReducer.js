// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import employeeReducer from './employee'

const rootReducer = combineReducers({
    employeeReducer
})

export default rootReducer
