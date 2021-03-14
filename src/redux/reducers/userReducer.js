const INITIAL_STATE = {
    user: {}
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SUCCESS_LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT_USER':
            return {
                user: {}
            }  
        default:
            return state        
    }
}

export default userReducer