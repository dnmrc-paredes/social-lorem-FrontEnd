const INITIAL_STATE = {
    data: []
}

const postDataReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_ALL_DATA':
            return {
                ...state,
                data: action.payload
            }
        default:
            return state    
    }
}

export default postDataReducer