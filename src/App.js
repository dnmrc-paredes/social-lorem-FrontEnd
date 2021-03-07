import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

// CSS
import './App.css'

// Components
import Header from './components/header/header'

// Pages
import LoginPage from './pages/root/login'
import SignUpPage from './pages/signup/signup'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
