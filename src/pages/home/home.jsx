import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ShowMoreText from 'react-show-more-text'

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

    const executeOnClick = (isExpanded) => {
        console.log(`Expanded`)
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
                            {/* {data.content.length > 30 ? <p> {data.content.substring(0,200)}<Link to="/viewpost"style={{textDecoration: 'none'}} > ...Read More. </Link> </p> : <p> {data.content} </p> }  */}
                            {/* {data.content.length > 30 ? <p> {data.content.substring(0,200)}<span style={{color: 'blue', cursor: 'pointer'}} onClick={() => {
                                return <p> {data.content} </p>
                            }} >...Read More.</span> </p> : <p> {data.content} </p> }  */}
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

                        <div className="postreacts" style={{cursor: "pointer"}} onClick={async () => {
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
                    </div>
                </div>
            })}
        </div>
    )
}

export default HomePage