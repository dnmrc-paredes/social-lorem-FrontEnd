import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import userReducer from './userReducer'
import usersNameReducer from './usersNameReducer'
import errorsReducer from './errorsReducer'
import loggedInReducer from './loggedInReducer'
import postDataReducer from './postDataReducer'
import usersPostsReducer from './usersPostReducer'
import likedByReducer from './likedByReducer'

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    user: userReducer,
    name: usersNameReducer,
    isLoggedIn: loggedInReducer,
    errors: errorsReducer,
    datas: postDataReducer,
    myPost: usersPostsReducer,
    likedBy: likedByReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer