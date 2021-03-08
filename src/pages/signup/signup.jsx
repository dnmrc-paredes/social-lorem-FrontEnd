import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'

import {TextField, Button, Collapse} from '@material-ui/core'
import { Alert } from '@material-ui/lab';

// Redux
import {errorEncounter, errorCleanUp, successLogin, loggedIn} from '../../redux/actions/actions'

// CSS
import './signup-styles.css'

const SignUpPage = () => {

    const dispatch = useDispatch()

    const errors = useSelector(state => state.errors)

    const [open, setOpen] = useState(true)

    const [signUp, setSignUp] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const handleChange = (e) => {
        const {value, name} = e.target

        setSignUp({
            ...signUp,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            
            const info = await axios.post(`http://localhost:8000/signup`, signUp)
            // console.log(info.data)
            dispatch(errorCleanUp())
            setSignUp({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                passwordConfirm: ""
            })
            dispatch(successLogin(info.data))
            dispatch(loggedIn())
        } catch (err) {
            setOpen(true)
            dispatch(errorEncounter(err.response.data.msg))
        }

    } 

    return (
        <div className="signupbox">
            <form className="signupform">
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
                <TextField required name="firstName" type="text" style={{marginBottom: "0.5rem"}} label="First Name" value={signUp.firstName} onChange={handleChange} />
                <TextField required name="lastName" type="text" style={{marginBottom: "0.5rem"}} label="Last Name" value={signUp.lastName} onChange={handleChange} />
                <TextField required name="email" type="email" style={{marginBottom: "0.5rem"}} label="Email" value={signUp.email} onChange={handleChange} />
                <TextField required name="password" type="password" style={{marginBottom: "0.5rem"}} label="Password" value={signUp.password} onChange={handleChange} />
                <TextField required name="passwordConfirm" type="password" style={{marginBottom: "0.5rem"}} label="Password Confirm" value={signUp.passwordConfirm} onChange={handleChange} />

                <Button variant="contained" color="primary" style={{marginTop: "2rem"}} onClick={handleSubmit} > Sign Up </Button>
            </form>
        </div>
    )
}

export default SignUpPage