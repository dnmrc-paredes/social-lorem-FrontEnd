const darkModeReducer = (state = false, action) => {
    switch(action.type) {
        case 'DARK_TOGGLE':
            return !state
        default: 
            return state   
    }
}

export default darkModeReducer