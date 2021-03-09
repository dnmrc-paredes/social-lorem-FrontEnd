import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {AppBar, Toolbar, Typography, Drawer, Divider, List} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import {Link, useHistory} from 'react-router-dom'

// Redux
import {logoutUser} from '../../redux/actions/actions'

// CSS
import './header-styles.css'

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }));

const Header = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const user = useSelector(state => state.user)

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };
    
    const handleLogout = () => {
        dispatch(logoutUser())
        history.push("/")
    }

    const gohome = () => {
        history.push("/")
    }

    return (
        <div>
            <AppBar variant="outlined" position="sticky" className="hello">
                <Toolbar>
                    {user.user.user ? <IconButton edge="start" onClick={handleDrawerOpen} >
                      <MenuIcon style={{color: "white"}}/>
                    </IconButton> : ""}
                    <Typography variant="h6" style={{flexGrow: "1", cursor: "pointer"}} onClick={gohome} > Social-Lorem </Typography>

                    {user.user.user ? <div className="loginregister">
                        <Link to="/home"> Home </Link>
                        <Link to="#" onClick={handleLogout} > Logout </Link>
                    </div> : <div className="loginregister">
                        <Link to="/"> Login </Link>
                        <Link to="/signup"> Sign Up </Link>
                    </div>}
                </Toolbar>
            </AppBar>
            
            <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <List>
          <ListItem> <h2> {user.user.user ? user.user.user.firstName : ""} {user.user.user ? user.user.user.lastName : ""} </h2> </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button >
                <ListItemText primary="Edit Profile"/> 
            </ListItem>
            <ListItem button >
                <ListItemText primary="Post" onClick={() => {
                  history.push("/createpost")
                }} /> 
            </ListItem>
            <ListItem button >
                <ListItemText primary="My Posts" onClick={() => {
                  history.push("/myposts")
                }} /> 
            </ListItem>
            <Divider />
            <ListItem button onClick={() => {
                handleDrawerClose()
                handleLogout()
            }}>
                <ListItemText primary="Logout"/> 
            </ListItem>
        </List>
      </Drawer>

        </div>
    )
}

export default Header