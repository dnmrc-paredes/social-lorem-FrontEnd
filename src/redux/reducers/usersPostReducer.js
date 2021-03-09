const INITIAL_STATE = {
    data: []
}

const usersPostsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_ALL_MY_POST':
            return {
                ...state,
                data: action.payload
            }
        default:
            return state    
    }
}

export default usersPostsReducer