import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {TextField, Button} from '@material-ui/core'
import {useSelector, useDispatch} from 'react-redux'


import { Alert } from '@material-ui/lab';
import {Collapse} from '@material-ui/core'

// Redux
import {getAllMyPost, getAllData, getUsername} from '../../redux/actions/actions'

// CSS
import './editProfile-styles.css'

const EditProfilePage = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const name = useSelector(state => state.name)
    const datas = useSelector(state => state.datas)
    const myPostsData = useSelector(state => state.myPost)
    const userID = user.user.user._id

    const [update, setUpdate] = useState({
        firstName: name.name.data.firstName,
        lastName: name.name.data.lastName
    })

    const [editError, setEditError] = useState({
        errors: []
    })

    useEffect(() => {
        
        const getAllPost = async () => {
            const info = await axios.get('https://social-lorem-api.herokuapp.com/getallpost')
            dispatch(getAllData(info.data.data))
        }

        getAllPost()

    // eslint-disable-next-line
    }, [datas])

    useEffect(() => {
        const getMyPosts =  async () => {
            const info = await axios.get(`https://social-lorem-api.herokuapp.com/myposts/${userID}`)
            dispatch(getAllMyPost(info.data))
        }
        getMyPosts()
    // eslint-disable-next-line
    },[myPostsData])

    useEffect(() => {
        const currentUser = async () => {
          const info = await axios.get(`http://localhost:8000/getcurrentuser/${userID}`)
          dispatch(getUsername(info.data))
        }
        currentUser()
    }, [name, dispatch, userID])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (update.firstName === "" || update.lastName === "") {
            setEditError({
                errors: [{ msg: "Field Inputs cannot be empty." }]
            })
            setOpen(true)
            return 
        }

        try {

            await axios.post(`http://localhost:8000/editprofile`, {update, userId: user.user.user._id})
            
        } catch (err) {
            console.log(err)
        }
        
    }

    const handleChange = (e) => {
        const {value, name} = e.target

        setUpdate({
            ...update,
            [name]: value
        })

    }

    const [open, setOpen] = useState(true)

    return <div className="editbox">
        <form className="editform">
            {editError.errors.length > 0 ?
            <Collapse in={open}>
                <Alert style={{marginBottom: "1rem"}} variant="filled" severity="error" onClose={() => {
                    setOpen(false)
                }}> {editError.errors.map(item => {
                    return <p key={item.msg}> {item.msg} </p>
                })} </Alert>
            </Collapse> : ""}

            <TextField name="firstName" value={update.firstName} style={{marginBottom: "0.5rem"}} label="First Name" onChange={handleChange}/>
            <TextField name="lastName" value={update.lastName} style={{marginBottom: "0.5rem"}} label="Last Name" onChange={handleChange}/>

            <Button variant="contained" color="primary"style={{marginTop: '1rem'}} onClick={handleSubmit}> Update </Button>
        </form>
    </div>

}

export default EditProfilePage