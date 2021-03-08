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
          </Switch>
        <Footer/>  
      </BrowserRouter>
    </div>
  );
}

export default App;
