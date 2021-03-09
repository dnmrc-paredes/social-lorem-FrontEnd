import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';

// Redux
import {getAllData, getAllMyPost} from '../../redux/actions/actions'

// CSS
import './home-styles.css'

const HomePage = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const datas = useSelector(state => state.datas)
    const myPostsData = useSelector(state => state.myPost)
    const userID = user.user.user._id

    const token = user.user.token

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
            const info = await axios.get('http://localhost:8000/getallpost')
            dispatch(getAllData(info.data.data))
        }

        getAllPost()

    // eslint-disable-next-line
    }, [datas])

    useEffect(() => {
        const getMyPosts =  async () => {
            const info = await axios.get(`http://localhost:8000/myposts/${userID}`)
            dispatch(getAllMyPost(info.data))
        }
        getMyPosts()
    // eslint-disable-next-line
    },[myPostsData])

    return (
        <div className="postbox">
            {datas.data.map(data => {
                return <div key={data._id}>
                    <div className="post">
                        <div className="postprofile">
                            <AccountCircleIcon style={{width: "4rem", height: "4rem"}} />

                            <div className="postdetail">
                            <h3> {user.user.user ? data.postBy.firstName : ""} {user.user.user ? data.postBy.lastName : ""} </h3>
                            <p> {data.content} </p>

                        </div>
                        </div>

                        <div className="postreacts" style={{cursor: "pointer"}} onClick={async () => {
                            try {
                                await axios.post(`http://localhost:8000/reacts/${data._id}`, {userID: user.user.user._id})
                            } catch (err) {
                                console.log(err)
                            }
                        }}>
                            <p> { <FavoriteIcon/> } {data.likes.length} </p>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default HomePage