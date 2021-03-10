import React, {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'

// Redux
import {getLikes} from '../../redux/actions/actions'

// CSS
import './likedBy-styles.css'

const LikedByPage = () => {

    const dispatch = useDispatch()
    const likedPost = useSelector(state => state.likedBy)
    const user = useSelector(state => state.user)

    const {postID} = useParams()

    useEffect(() => {
        const getLikedBy = async () => {
            const info = await axios.get(`https://social-lorem-api.herokuapp.com/likedby/${postID}`)
            dispatch(getLikes(info))
        }
        getLikedBy()
    }, [likedPost])

    return <div className="likebox">
        {likedPost.data.data.data.likes.length > 0 ? likedPost.data.data.data.likes.map(item => {
            return <div key={item._id} className="likeitems">
                {user.user.user.firstName === item.firstName ? <h1> You </h1> : <h1> {item.firstName} {item.lastName} </h1> }
            </div>
        }) : <h1 style={{textAlign: 'center', paddingTop: '5rem'}}> No one liked your post.</h1> }
    </div>
}

export default LikedByPage