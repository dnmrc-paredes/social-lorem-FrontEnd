import React, {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import ShowMoreText from 'react-show-more-text'

import axios from 'axios'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import SendIcon from '@material-ui/icons/Send';
import {TextField, Button} from '@material-ui/core'

// Redux
import {getAllData, getAllMyPost} from '../../redux/actions/actions'

// CSS
import './home-styles.css'

const HomePage = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)
    const datas = useSelector(state => state.datas)
    const myPostsData = useSelector(state => state.myPost)
    const userID = user.user.user._id

    const token = user.user.token

    const comment = useRef()

    // const [comment, setComment] = useState({
    //     content: ""
    // })

    axios.interceptors.request.use(
        config => {
            config.headers.auth = `Bearer ${token}`
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

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

    // const handleChange = (e) => {
    //     setComment({
    //         content: e.target.value
    //     })
    // }

    const executeOnClick = (isExpanded) => {
        console.log(`Expanded`)
    }

    const handleReset = () => {
        return console.log(comment(
            {current: ""}
            ))
    }

    return (
        <div className="postbox">
            {datas.data.map(data => {
                return <div key={data._id}>
                    <div className="post">
                        <div className="postprofile">
                            <AccountCircleIcon style={{width: "4rem", height: "4rem"}} />

                            <div className="postdetail">

                                <h3> {user.user.user ? data.postBy.firstName : ""} {user.user.user ? data.postBy.lastName : ""} </h3>
                        
                                <ShowMoreText lines={2}
                                    more='Show more'
                                    less='Show less'
                                    onClick={executeOnClick}
                                    expanded={false}
                                    width={700}> 

                                    {data.content}

                                </ShowMoreText>

                            </div>
                        </div>

                        <div className="postinteractions">
                            
                            <div className="like" onClick={ async () => {
                                try {
                                    await axios.post(`https://social-lorem-api.herokuapp.com/reacts/${data._id}`, {userID: user.user.user._id})
                                } catch (err) {
                                    console.log(err)
                                }
                            }} >
                                <FavoriteIcon style={{cursor: 'pointer'}} /> 
                                <p> {data.likes.length} Likes </p>
                            </div>

                            <div className="comment">
                                <InsertCommentIcon style={{cursor: 'pointer'}} />
                                <p> {data.comments.length} Comments </p>
                            </div>
                        </div>

                        <form className="addcommentform">
                            <TextField name="content" placeholder="Add a comment..." style={{width: "100%"}} onChange={e => comment.current = e.target.value} />
                             <SendIcon style={{marginLeft: "0.5rem"}} onClick={() => {
                                //  axios.post(`http://localhost:8000/commentonpost/${data._id}`, {userID: user.user.user._id, userComment: comment.current}).then(() => {
                                //      window.location.reload()
                                //  }).catch(err => {
                                //      console.log(err.response.data)
                                //  }) 
                                try {
                                    axios.post(`http://localhost:8000/commentonpost/${data._id}`, {userID: user.user.user._id, userComment: comment.current})
                                    return window.location.reload()
                                } catch (err) {
                                    console.log(err.response.data)
                                }
                            }}/>
                        </form>

                        {/* <div className="postreacts" style={{cursor: "pointer"}} onClick={async () => {
                            try {
                                await axios.post(`https://social-lorem-api.herokuapp.com/reacts/${data._id}`, {userID: user.user.user._id})
                            } catch (err) {
                                console.log(err)
                            }
                        }}>

                                <div className="reactbtn">
                                    <FavoriteIcon/> 
                                    <p> {data.likes.length} </p>
                                </div>
                        
                        </div>

                        <div className="commentbtn">
                            <p> {data.comments.length} Comments </p>
                        </div> */}

                    </div>
                </div>
            })}
        </div>
    )
}

export default HomePage