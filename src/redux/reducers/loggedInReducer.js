const loggedInReducer = (state = false, action) => {
    switch (action.type) {
        case 'LOGGED_IN':
            return true
        case 'LOGOUT_THE_USER':
            return false      
        default:
            return state    
    }
}

export default loggedInReducer