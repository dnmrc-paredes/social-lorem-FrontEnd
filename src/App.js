import React from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'

// CSS
import './App.css'

// Components
import Header from './components/header/header'
import Footer from './components/footer/footer'

// Pages
import LoginPage from './pages/root/login'
import SignUpPage from './pages/signup/signup'
import HomePage from './pages/home/home'
import CreatePostPage from './pages/createPost/createPost'
import MyPostsPage from './pages/myPosts/myPosts'
import LikedByPage from './pages/likedBy/likedBy'
import ProfilePage from './pages/profile/profile'
import AboutPage from './pages/about/about'

const App = () => {

  const user = useSelector(state => state.user)

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path="/" render={() => !user.user.user ? <LoginPage/> : <Redirect to="/home" /> } />
            <Route path="/signup" render={() => user.user.user ? <Redirect to="/home" /> : <SignUpPage/> } />
            <Route path="/home" render={() => user.user.user ? <HomePage/> : <Redirect to="/" /> } />
            <Route path="/createpost" render={() => user.user.user ? <CreatePostPage/> : <Redirect to="/" /> } />
            <Route exact path="/myposts" render={() => user.user.user ? <MyPostsPage/> : <Redirect to="/" /> } />
            <Route exact path="/myposts/:postID" render={() => user.user.user ? <LikedByPage/> : <Redirect to="/" /> } />
            <Route path="/myprofile" render={() => user.user.user ? <ProfilePage/> : <Redirect to="/" /> } />
            <Route path="/about" render={() => user.user.user ? <AboutPage/> : <Redirect to="/" /> } />
          </Switch>
        <Footer/>  
      </BrowserRouter>
    </div>
  );
}

export default App;
