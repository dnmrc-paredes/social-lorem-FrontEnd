const INITIAL_STATE = {
    name: {}
}

const usersNameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_CURRENT_USERNAME':
            return  {
                ...state,
                name: action.payload
            }
        default:
            return state
    }
    
}

export default usersNameReducer