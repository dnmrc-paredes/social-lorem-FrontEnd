import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory, useRouteMatch, Link} from 'react-router-dom'
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
            const info = await axios.get(`https://social-lorem-api.herokuapp.com/myposts/${userID}`)
            dispatch(getAllMyPost(info.data))
        }
        getMyPosts()
    // eslint-disable-next-line
    },[myPostsData])

    useEffect(() => {
        
        const getAllPost = async () => {
            const info = await axios.get('https://social-lorem-api.herokuapp.com/getallpost')
            dispatch(getAllData(info.data.data))
        }

        getAllPost()

    // eslint-disable-next-line
    }, [datas])

    const deletePost = async (postID) => {
        await axios.delete(`https://social-lorem-api.herokuapp.com/deleteonepost/${postID}`)
    }

    let {url} = useRouteMatch()

    return <div className="mypostbox">

        {myPostsData.data.data.posts.length > 0 ? myPostsData.data.data.posts.map(post => {
            return <div key={post._id} className="mypostitem">

                <div className="mypost1">
                    {/* <Button variant="contained" color="primary" style={{margin: '0rem 0.5rem'}} onClick={() => {
                        history.push(`/${url}/${post._id}`)
                    }}> Liked By </Button> */}
                    <Link to={`${url}/${post._id}`} style={{marginRight: '1rem'}}> Liked By </Link>
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
        }) : <h1 style={{textAlign: 'center', paddingTop: '5rem'}}> Create a post now. </h1> }
    </div>
}

export default MyPostsPage