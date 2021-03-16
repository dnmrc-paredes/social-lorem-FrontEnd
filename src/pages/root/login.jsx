import React, {useState} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {TextField, Button, Collapse} from '@material-ui/core'
import { Alert } from '@material-ui/lab';

// Redux
import {errorCleanUp, successLogin, errorEncounter, loggedIn} from '../../redux/actions/actions'

// CSS
import './login-styles.css'

const LoginPage = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const errors = useSelector(state => state.errors)

    const [open, setOpen] = useState(true)

    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const {value, name} = e.target

        setLogin({
            ...login,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const info = await axios.post('https://social-lorem-api.herokuapp.com/login', login)

            dispatch(errorCleanUp())
            setLogin({
                email: "",
                password: ""
            })
            dispatch(loggedIn())
            dispatch(successLogin(info.data))
        } catch (err) {
            setOpen(true)
            dispatch(errorEncounter(err.response.data.msg))
        }
        
    }

    return (
        <div className="loginbox">
            <form className="loginform">
            {errors.errors.length > 0 ? <div>
                    <Collapse in={open}>
                      <Alert style={{marginBottom: "1rem"}} variant="filled" severity="error" onClose={() => {
                          dispatch(errorCleanUp())
                          setOpen(false)
                      }}> {errors.errors.map(err => {
                          return <p key={err}> {err} </p>
                      })} </Alert>
                    </Collapse>
                    </div> : ""}

                <h1> Login </h1>   
                <TextField name="email" style={{marginBottom: "0.5rem"}} label="Email" type="email" onChange={handleChange} value={login.email} />
                <TextField name="password" style={{marginBottom: "0.5rem"}} label="Password" type="password" onChange={handleChange} value={login.password} />

                <Button variant="contained" style={{marginTop: "2rem"}} color="primary" onClick={handleSubmit} > Login </Button> 
                <Button variant="contained" style={{marginTop: "0.3rem"}} color="secondary" onClick={() => {
                    history.push(`/signup`)
                }} > Register </Button> 
                
            </form>
        </div>
    )
}

export default LoginPage