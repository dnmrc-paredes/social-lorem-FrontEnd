import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import darkModeReducer from './darkModeReducer'
import userReducer from './userReducer'
import errorsReducer from './errorsReducer'
import loggedInReducer from './loggedInReducer'
import sideBarReducer from './sideBarReducer'
import postDataReducer from './postDataReducer'
import usersPostsReducer from './usersPostReducer'

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    user: userReducer,
    isDarkMode: darkModeReducer,
    isSideBarOpen: sideBarReducer,
    isLoggedIn: loggedInReducer,
    errors: errorsReducer,
    datas: postDataReducer,
    myPost: usersPostsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer