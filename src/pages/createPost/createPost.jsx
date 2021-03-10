import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'

import {TextareaAutosize, Button, Collapse} from '@material-ui/core'
import { Alert } from '@material-ui/lab';

// Redux
import {errorCleanUp, errorEncounter, getAllData} from '../../redux/actions/actions'

// CSS
import './createpost-styles.css'

const CreatePostPage = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const errors = useSelector(state => state.errors)
    const datas = useSelector(state => state.datas)

    const [open, setOpen] = useState(true)
    const [post, setPost] = useState({
        content: ""
    })

    useEffect(() => {
        
        const getAllPost = async () => {
            const info = await axios.get('https://social-lorem-api.herokuapp.com/getallpost')
            dispatch(getAllData(info.data.data))
        }

        getAllPost()

    // eslint-disable-next-line
    }, [datas])

    const handleChange = (e) => {
        setPost({
            content: e.target.value
        })
    }

    const handlePost = async (e) => {
        e.preventDefault()

        try {

            await axios.post(`https://social-lorem-api.herokuapp.com/createpost`, {content: post.content, userID: user.user.user._id})
            dispatch(errorCleanUp())
            setPost({
                content: ""
            })
        } catch (err) {
            setOpen(true)
            dispatch(errorEncounter(err.response.data.msg))
        }

    }

    return <div>
        <form className="createpostcontent">
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
            <TextareaAutosize style={{height: "25rem", padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem"}} placeholder="Place your content here." onChange={handleChange} value={post.content} />
            <Button variant="contained" color="primary" onClick={handlePost}> Post </Button>
        </form>
    </div>
}

export default CreatePostPage