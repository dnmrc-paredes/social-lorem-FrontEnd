import {combineReducers} from 'redux'

import darkModeReducer from './darkModeReducer'
import userReducer from './userReducer'
import errorsReducer from './errorsReducer'
import loggedInReducer from './loggedInReducer'

const rootReducer = combineReducers({
    user: userReducer,
    isDarkMode: darkModeReducer,
    isLoggedIn: loggedInReducer,
    errors: errorsReducer
})

export default rootReducer