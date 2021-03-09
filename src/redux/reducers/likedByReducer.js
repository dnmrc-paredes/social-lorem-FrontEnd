const INITIAL_STATE = {
    data: []
}

const likedByReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_LIKED_BY':
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
}

export default likedByReducer