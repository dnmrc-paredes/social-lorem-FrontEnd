import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios'

// Redux
import {getLikes} from '../../redux/actions/actions'

// CSS
import './likedBy-styles.css'

const LikedByPage = () => {

    const dispatch = useDispatch()
    const [likers, setLikers] = useState({
        data: []
    })
    const likedPost = useSelector(state => state.likedBy)
    const user = useSelector(state => state.user)

    const {postID} = useParams()

    useEffect(() => {
        const getLikedBy = async () => {
            const info = await axios.get(`https://social-lorem-api.herokuapp.com/likedby/${postID}`)
            setLikers(info.data.data.likes)
            // dispatch(getLikes(info.data.data.likes))
        }
        getLikedBy()
    
    }, [dispatch, postID])

    return <div className="likebox">
        {likers.length > 0 ? likers.map(item => {
            return <div key={item._id} className="likeitems">
                {user.user.user.firstName === item.firstName ? <h1> You </h1> : <h1> {item.firstName} {item.lastName} </h1> }
            </div>
        }) : likers.length === 0 ? <h1 style={{textAlign: 'center', paddingTop: '5rem'}}> No one liked your post.</h1> : <div className="loading">
        <div className="loader"></div>
     </div> }

        {/* { likers.data === [] ? <h1> henlo </h1> : <h1> taet </h1> }
        {console.log(likers)} */}

    </div>
}

export default LikedByPage