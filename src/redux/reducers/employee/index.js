export const initialState = {
    employees: []
}

const employeeReducer = (state = initialState, action) => {
    //TODO: Implement other reducers.
    switch (action.type) {
        case 'SET_EMPLOYEES':
            return {
                ...state,
                employees: action.data
            }
        default:
            return state;

    }
}

export default employeeReducer