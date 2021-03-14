import React, {useEffect, useRef, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import ShowMoreText from 'react-show-more-text'

import axios from 'axios'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import SendIcon from '@material-ui/icons/Send';
import {TextField, Button} from '@material-ui/core'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Redux
import {getAllData, getAllMyPost} from '../../redux/actions/actions'

// Comments 
import CommentPopUp from '../../components/comment-popup/comment-popup'

// CSS
import './home-styles.css'

const HomePage = () => {

    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.user)
    const datas = useSelector(state => state.datas)
    const myPostsData = useSelector(state => state.myPost)
    const [comments, setComments] = useState({
        data: []
    })
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

    const getCommentsOnPost = async (postid) => {
        const info = await axios.get(`http://localhost:8000/getcommentsonpost/${postid}`)
        setComments(info.data)
    }

    const executeOnClick = (isExpanded) => {
        console.log(`Expanded`)
    }

    const useStyles = makeStyles((theme) => ({
        popover: {
          pointerEvents: 'none',
        },
        paper: {
          padding: theme.spacing(1),
        },
      }));

    const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const [openComments, setOpenComments] = useState(false)
  const closecomments = () => {
      setOpenComments(false)
      setComments({
          data: []
      })
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
                                <Typography aria-owns={open ? 'mouse-over-popover' : undefined}
                                    aria-haspopup="true"
                                    onMouseEnter={handlePopoverOpen}
                                    onMouseLeave={handlePopoverClose}
                                    style={{margin: 'auto'}}> {data.likes.length} Likes </Typography>
                                    
                                    <Popover
                                    id="mouse-over-popover"
                                    className={classes.popover}
                                    classes={{
                                    paper: classes.paper,
                                    }}
                                    open={open}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                    }}
                                    onClose={handlePopoverClose}
                                    disableRestoreFocus
                                >
                                    <Typography> I use Popover. </Typography>
                                </Popover>

                            </div>

                            <div className="comment">
                                <InsertCommentIcon style={{cursor: 'pointer'}} onClick={() => {
                                    getCommentsOnPost(data._id)
                                    setOpenComments(true)
                                }}  />
                                <p> {data.comments.length} Comments </p>

                                <CommentPopUp trigger={openComments} closecomments={closecomments} comments={comments} />

                            </div>
                        </div>

                        <form className="addcommentform">
                            <TextField name="content" placeholder="Add a comment..." style={{width: "100%"}} onChange={e => comment.current = e.target.value} />
                             <SendIcon style={{marginLeft: "0.5rem", cursor: 'pointer'}} onClick={() => {
                                try {
                                    if (comment.current === null || comment.current === "" || comment.current === undefined) {
                                        return
                                    }
                                    axios.post(`http://localhost:8000/commentonpost/${data._id}`, {userID: user.user.user._id, userComment: comment.current})
                                    return window.location.reload()
                                } catch (err) {
                                    console.log(err.response.data)
                                }
                            }}/>
                        </form>

                    </div>

                    <hr style={{width: "95%", margin: '2rem auto'}} />

                </div>
            })}
        </div>
    )
}

export default HomePage