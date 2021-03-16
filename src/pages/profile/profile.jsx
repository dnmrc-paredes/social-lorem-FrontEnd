import React, {useState, useEffect, useCallback} from 'react'
import {Link} from 'react-router-dom'
import ShowMoreText from 'react-show-more-text'
import axios from 'axios'

import {useSelector, useDispatch} from 'react-redux'

import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import {TextareaAutosize, Button} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';

// Components
import EditProfileName from '../../components/edit-profile-popup/edit-profile-popup'

// Redux
import {getAllMyPost, errorCleanUp, errorEncounter, getUsername} from '../../redux/actions/actions'
// import {getAllMyPost, getAllData, getUsername, errorCleanUp, errorEncounter} from '../../redux/actions/actions'

// CSS
import './profile-styles.css'

const ProfilePage = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const name = useSelector(state => state.name)
    // const datas = useSelector(state => state.datas)
    const myPostsData = useSelector(state => state.myPost)
    const userID = user.user.user._id
    // let {url} = useRouteMatch()

    const [update, setUpdate] = useState({
        firstName: name.name.data.firstName ?? "Temporary",
        lastName: name.name.data.lastName ?? "Username"
    })

    const [editError, setEditError] = useState({
        errors: []
    })

    const [post, setPost] = useState({
        content: ""
    })

    // useEffect(() => {
        
    //     const getAllPost = async () => {
    //         const info = await axios.get('https://social-lorem-api.herokuapp.com/getallpost')
    //         dispatch(getAllData(info.data.data))
    //     }

    //     getAllPost()

    // // eslint-disable-next-line
    // }, [datas])

    const getMyPosts = useCallback( async () => {
        const info = await axios.get(`https://social-lorem-api.herokuapp.com/myposts/${userID}`)
        dispatch(getAllMyPost(info.data))
    }, [dispatch, userID])

    const currentUser = useCallback( async () => {
        const info = await axios.get(`https://social-lorem-api.herokuapp.com/getcurrentuser/${userID}`)
        dispatch(getUsername(info.data))
    }, [dispatch, userID])
    
    // const currentUser = async () => {
    //     const info = await axios.get(`http://localhost:8000/getcurrentuser/${userID}`)
    //     dispatch(getUsername(info.data))
    // }

    // const getMyPosts =  async () => {
    //     const info = await axios.get(`https://social-lorem-api.herokuapp.com/myposts/${userID}`)
    //     dispatch(getAllMyPost(info.data))
    // }

    useEffect(() => {

        getMyPosts()

        const get = setInterval(() => {
            getMyPosts()
        }, 1000)
    return () => clearInterval(get)
    },[getMyPosts])

    useEffect(() => {

        currentUser()

        const get = setInterval(() => {
            currentUser()
        }, 1000)
    return () => clearInterval(get)
    },[currentUser])

    // useEffect(() => {
    //     const currentUser = async () => {
    //       const info = await axios.get(`http://localhost:8000/getcurrentuser/${userID}`)
    //       dispatch(getUsername(info.data))
    //     }
    //     currentUser()
    // }, [name, dispatch, userID])

    const handleChangeCreatePost = (e) => {
        setPost({
            content: e.target.value
        })
    }

    const handleCreatePost = async (e) => {
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

            await axios.post(`https://social-lorem-api.herokuapp.com/editprofile`, {update, userId: user.user.user._id})
            
        } catch (err) {
            console.log(err)
        }
        
    }

    const deletePost = async (postID) => {
        await axios.delete(`https://social-lorem-api.herokuapp.com/deleteonepost/${postID}`)
    }

    const handleChange = (e) => {
        const {value, name} = e.target

        setUpdate({
            ...update,
            [name]: value
        })

    }

    const executeOnClick = (isExpanded) => {
        console.log(`Expanded`)
    }

    const [open, setOpen] = useState(true)
    const [trigger, setTrigger] = useState(false)

    return <div className="editbox">

        <div className="nameandiconbox">
            <AccountCircleIcon style={{width: "7rem", height: "7rem", margin: 'auto'}} />
            <h1> {name.name.data.firstName} {name.name.data.lastName} <EditIcon style={{cursor: 'pointer'}} onClick={() => {
                setTrigger(true)
            }} /> </h1>
        </div>
        
        <EditProfileName trigger={trigger} editError={editError} setOpen={setOpen} handleChange={handleChange} handleSubmit={handleSubmit} open={open} update={update} setTrigger={setTrigger} />

        <hr style={{width: "80%", margin: '2rem auto'}} />

        <form className="profilepostfunction">

            <TextareaAutosize style={{height: "10rem", padding: "0.5rem", fontSize: "1rem", }} value={post.content} onChange={handleChangeCreatePost} placeholder="Place your content here."/>
            <Button variant="contained" color="primary" onClick={handleCreatePost} > Post </Button>

        </form>    

        <hr style={{width: "80%", margin: '2rem auto'}} />

        <div className="profilepostbox">

        {myPostsData.data.data.posts.length > 0 ? myPostsData.data.data.posts.map(post => {
            return <div key={post._id} className="profilepostitem">

                <div className="profilepost1">
                    {/* <Button variant="contained" color="primary" style={{margin: '0rem 0.5rem'}} onClick={() => {
                        history.push(`/${url}/${post._id}`)
                    }}> Liked By </Button> */}
                    <Link to={`/myposts/${post._id}`} style={{marginRight: '1rem', color: 'black'}}> <FavoriteIcon style={{cursor: 'pointer', margin: 'auto'}} /> </Link>
                    <DeleteIcon style={{cursor: 'pointer'}} onClick={() => {
                        deletePost(post._id)
                    }} />
                    {/* <Button variant="contained" color="primary" onClick={() => {
                        deletePost(post._id)
                    }}>
                        Delete
                    </Button> */}
                </div>

                <div className="profilepost2">
                <ShowMoreText lines={2}
                                    more='Show more'
                                    less='Show less'
                                    onClick={executeOnClick}
                                    expanded={false}
                                    width={700}> 

                                    {post.content}

                                </ShowMoreText>
                </div>
                
            </div>
        }) : <h1 style={{textAlign: 'center', paddingTop: '5rem'}}> Create a post now. </h1> }
    </div>

        <hr style={{width: "80%", margin: '2rem auto'}} />
    </div>

}

export default ProfilePage