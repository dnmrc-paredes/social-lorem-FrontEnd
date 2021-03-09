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
            <Route path="/myposts" render={() => user.user.user ? <MyPostsPage/> : <Redirect to="/" /> } />
            <Route path="/likedby/:postID" render={() => user.user.user ? <LikedByPage/> : <Redirect to="/" /> } />
          </Switch>
        <Footer/>  
      </BrowserRouter>
    </div>
  );
}

export default App;
