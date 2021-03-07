import React, {useState} from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'

import {TextField, Button, Collapse} from '@material-ui/core'
import { Alert } from '@material-ui/lab';

// Redux
import {errorCleanUp, successLogin, errorEncounter, loggedIn} from '../../redux/actions/actions'

// CSS
import './login-styles.css'

const LoginPage = () => {

    const dispatch = useDispatch()
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

            const info = await axios.post('http://localhost:8000/login', login)

            dispatch(errorCleanUp())
            dispatch(successLogin(info.data))
            setLogin({
                email: "",
                password: ""
            })
            dispatch(loggedIn())
            
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
                          setOpen(false)
                      }}> {errors.errors.map(err => {
                          return <p key={err}> {err} </p>
                      })} </Alert>
                    </Collapse>
                    </div> : ""}
                <TextField name="email" style={{marginBottom: "0.5rem"}} label="Email" type="email" onChange={handleChange} value={login.email} />
                <TextField name="password" style={{marginBottom: "0.5rem"}} label="Password" type="password" onChange={handleChange} value={login.password} />

                <Button variant="contained" style={{marginTop: "2rem"}} color="primary" onClick={handleSubmit} > Login </Button> 
            </form>
        </div>
    )
}

export default LoginPage