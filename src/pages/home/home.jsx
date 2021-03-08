import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// Redux
import {getAllData} from '../../redux/actions/actions'

// CSS
import './home-styles.css'

const HomePage = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const datas = useSelector(state => state.datas)

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

    // const reactPost = async () => {
    //     try {

    //         const info = await axios.patch(`http://localhost:8000/reacts/60435cc1ed6e0d1fe4f4e622`, user.user.user._id)
    //         console.log(info.data.data)
            
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    useEffect(() => {
        
        const getAllPost = async () => {
            const info = await axios.get('http://localhost:8000/getallpost')
            dispatch(getAllData(info.data.data))
        }

        getAllPost()

    // eslint-disable-next-line
    }, [datas])

    return (
        <div className="postbox">
            {datas.data.map(data => {
                return <div key={data._id}>
                    <div className="post">
                        <div className="postprofile">
                            <AccountCircleIcon style={{width: "4rem", height: "4rem"}} />

                            <div className="postdetail">
                            <h3> {user.user.user ? user.user.user.firstName : ""} {user.user.user ? user.user.user.lastName : ""} </h3>
                            <p> {data.content} </p>

                        </div>
                        </div>

                        <div className="postreacts" style={{cursor: "pointer"}} onClick={async () => {
        try {

            const info = await axios.post(`http://localhost:8000/reacts/${data._id}`, {userID: user.user.user._id})
            console.log(info.data.data)
            
        } catch (err) {
            console.log(err)
        }
    }}>
                              <FavoriteBorderIcon/> {data.likes.length}
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default HomePage