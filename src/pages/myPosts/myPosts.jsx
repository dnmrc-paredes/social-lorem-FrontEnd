import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'

import {Button} from '@material-ui/core'

// Redux
import {getAllMyPost, getAllData} from '../../redux/actions/actions'

// CSS
import './myPost-styles.css'

const MyPostsPage = () => {

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

    const deletePost = async (id) => {
        await axios.delete(`http://localhost:8000/deleteonepost/${id}`)
    }

    return <div className="mypostbox">
        {myPostsData.data.data.posts.map(post => {
            return <div key={post._id} className="mypostitem">

                <div className="mypost1">
                    <Button variant="contained" color="primary" onClick={() => {
                        deletePost(post._id)
                    }}>
                        Delete
                    </Button>
                </div>

                <div className="mypost2">
                    <p> {post.content} </p>
                </div>

            </div>
        })}
    </div>
}

export default MyPostsPage