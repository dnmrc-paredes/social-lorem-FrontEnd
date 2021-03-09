import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

import {Button} from '@material-ui/core'

// Redux
import {getAllMyPost, getAllData} from '../../redux/actions/actions'

// CSS
import './myPost-styles.css'

const MyPostsPage = () => {

    const history = useHistory()

    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const datas = useSelector(state => state.datas)
    const myPostsData = useSelector(state => state.myPost)
    const userID = user.user.user._id

    useEffect(() => {
        const getMyPosts =  async () => {
            const info = await axios.get(`http://localhost:8000/myposts/${userID}`)
            dispatch(getAllMyPost(info.data))
        }
        getMyPosts()
    // eslint-disable-next-line
    },[myPostsData])

    useEffect(() => {
        
        const getAllPost = async () => {
            const info = await axios.get('http://localhost:8000/getallpost')
            dispatch(getAllData(info.data.data))
        }

        getAllPost()

    // eslint-disable-next-line
    }, [datas])

    const deletePost = async (postID) => {
        await axios.delete(`http://localhost:8000/deleteonepost/${postID}`)
    }

    return <div className="mypostbox">
        {myPostsData.data.data.posts.map(post => {
            return <div key={post._id} className="mypostitem">

                <div className="mypost1">
                    <Button variant="contained" color="primary" style={{margin: '0rem 0.5rem'}} onClick={() => {
                        history.push(`/likedby/${post._id}`)
                    }}> Liked By </Button>
                    <Button variant="contained" color="primary" onClick={() => {
                        deletePost(post._id)
                    }}>
                        Delete
                    </Button>
                </div>

                <div className="mypost2">
                    <h3> {post.content} </h3>
                </div>

            </div>
        })}
    </div>
}

export default MyPostsPage