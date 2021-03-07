const INITIAL_STATE = {
    errors: []
}

const errorsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ERROR_ENCOUNTER':
            return {
                ...state,
                errors: [action.payload]
            }
        case 'ERROR_CLEAN_UP':
            return {
                ...state,
                errors: []
            }
        default:
            return state        
    }
}

export default errorsReducer