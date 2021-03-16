import React from 'react'
import CancelIcon from '@material-ui/icons/Cancel';
import {useSelector} from 'react-redux'

import "./comment-popup-styles.css"

const CommentPopUp = ({trigger, closecomments, comments}) => {

    const user = useSelector(state => state.user)

    // user.user.user.firstName === item.firstName ? <h1> You </h1> : <h1> {item.firstName} {item.lastName} </h1> 


    return trigger ? <div className="allcommentsbox" >
        <div className="closecomments">
            <CancelIcon style={{margin: 'auto 0', color: 'white'}} onClick={closecomments} />
        </div>

        <div className="allcomments">
            {comments.data.comments ? comments.data.comments.map(item => {
                return <div key={item._id} className="commentitem">
                    {item.commentBy.map(name => {
                        return user.user.user.firstName === name.firstName ? <h3 key={name._id}> You </h3> : <h3 key={name._id} > {name.firstName} {name.lastName} </h3>
                    })}
                    <p> {item.content} </p>
                </div>
            }) : <div className="loading">
                    <div className="loader"></div>
                 </div> }
        </div>
   </div> : ""

}

export default CommentPopUp