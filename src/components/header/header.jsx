import React from 'react'

import {AppBar, Toolbar, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import {Link} from 'react-router-dom'

// CSS
import './header-styles.css'

const Header = () => {
    return (
        <div>
            <AppBar variant="outlined" position="sticky" className="hello">
                <Toolbar>
                    <IconButton edge="start">
                      <MenuIcon style={{color: "white"}} />
                    </IconButton>
                    <Typography variant="h6" style={{flexGrow: "1"}}> Social-Lorem </Typography>

                    <div className="loginregister">
                        <Link to="/"> Login </Link>
                        <Link to="/signup"> Sign Up </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header