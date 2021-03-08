import {combineReducers} from 'redux'

import darkModeReducer from './darkModeReducer'
import userReducer from './userReducer'
import errorsReducer from './errorsReducer'
import loggedInReducer from './loggedInReducer'
import sideBarReducer from './sideBarReducer'
import postDataReducer from './postDataReducer'

const rootReducer = combineReducers({
    user: userReducer,
    isDarkMode: darkModeReducer,
    isSideBarOpen: sideBarReducer,
    isLoggedIn: loggedInReducer,
    errors: errorsReducer,
    datas: postDataReducer
})

export default rootReducer