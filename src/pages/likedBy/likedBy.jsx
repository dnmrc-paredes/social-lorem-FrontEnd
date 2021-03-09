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

    const {postID} = useParams()

    useEffect(() => {
        const getLikedBy = async () => {
            const info = await axios.get(`http://localhost:8000/likedby/${postID}`)
            dispatch(getLikes(info))
        }
        getLikedBy()
    }, [likedPost])

    return <div className="likebox">
        {likedPost.data.data.data.likes.map(item => {
            return <div key={item._id} className="likeitems">
                <h1> {item.firstName} {item.lastName} </h1>
            </div>
        })}
    </div>
}

export default LikedByPage