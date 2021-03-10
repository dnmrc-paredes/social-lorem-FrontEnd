import React, {useState} from 'react'
import {TextField, Button} from '@material-ui/core'
import {useSelector} from 'react-redux'
import axios from 'axios'

// CSS
import './editProfile-styles.css'

const EditProfilePage = () => {

    const user = useSelector(state => state.user)

    const [update, setUpdate] = useState({
        firstName: "",
        lastName: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (update.firstName === "" && update.lastName === "") {
            setUpdate({
                firstName: user.user.user.firstName,
                lastName: user.user.user.lastName
            })

            const info = await axios.post(`https://social-lorem-api.herokuapp.com/editprofile`, {update, userId: user.user.user._id})
            console.log(info)
        }

        const info = await axios.post(`https://social-lorem-api.herokuapp.com/editprofile`, {update, userId: user.user.user._id})
        console.log(info)


    }

    const handleChange = (e) => {
        const {value, name} = e.target

        setUpdate({
            ...update,
            [name]: value
        })

    }

    return <div className="editbox">
        <form className="editform">
            <TextField name="firstName" defaultValue={user.user.user.firstName} style={{marginBottom: "0.5rem"}} label="First Name" onChange={handleChange}/>
            <TextField name="lastName" defaultValue={user.user.user.lastName} style={{marginBottom: "0.5rem"}} label="Last Name" onChange={handleChange}/>

            <Button variant="contained" color="primary"style={{marginTop: '1rem'}} onClick={handleSubmit}> Update </Button>
        </form>
    </div>

}

export default EditProfilePage