import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import store from '../store/index'
import Home from './Home'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import ActivateAccount from './ActivateAccount'
import Teams from './pages/Teams'
import NotFound from './NotFound'
import { isAuthenticated } from '../actions/index'

window.store = store

const mapStateToProps = state => {
  return { is_authenticated: state.is_authenticated }
}

const mapDispatchToProps = dispatch => ({
  isAuthenticated: dispatch(isAuthenticated())
})

const RedirectIfLoggedIn =  ({ ...props }) => {
    return localStorage.getItem('loggedIn')
        ? ( <Redirect to="/" /> )
        : ( <Route {...props} /> )
}

class Main extends Component {
  render () {
    let loggedIn = localStorage.getItem('loggedIn')

    return (
          <div>
            <HashRouter>
              <Switch>
                // public routes
                <Route exact path='/' component={Home}/>

                <RedirectIfLoggedIn path="/login" component={Login} />
                <RedirectIfLoggedIn path="/register" component={Register} />
                <RedirectIfLoggedIn path='/activate/:key' component={ActivateAccount}/>

                { ! loggedIn && <Redirect to="/login" /> }

                // protected routes
                <Route path='/logout' component={Logout}/>
                // Teams
                <Route path='/teams' component={Teams}/>

                // 404
                <Route path="*" component={NotFound} />
              </Switch>
            </HashRouter>
          </div>
    )
  }
}

export default Main
// export default connect(mapStateToProps, mapDispatchToProps)(Main)

