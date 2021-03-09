export const successLogin = (user) => {
    return {
        type: 'SUCCESS_LOGIN',
        payload: user
    }
}

export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER'
    }
}

export const errorEncounter = (err) => {
    return {
        type: 'ERROR_ENCOUNTER',
        payload: err
    }
}

export const errorCleanUp = () => {
    return {
        type: 'ERROR_CLEAN_UP' 
    }
}

export const darkModeToggle = () => {
    return {
        type: 'DARK_TOGGLE'
    }
}

export const loggedIn = () => {
    return {
        type: 'LOGGED_IN'
    }
}

export const sideBarToggle = () => {
    return {
        type: 'SIDEBAR_TOGGLE'
    }
}

export const getAllData = (data) => {
    return {
        type: 'GET_ALL_DATA',
        payload: data
    }
}

export const getAllMyPost = (data) => {
    return {
        type: 'GET_ALL_MY_POST',
        payload: data
    }
}