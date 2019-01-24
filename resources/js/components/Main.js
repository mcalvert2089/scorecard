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
import TeamsAdd from './pages/TeamsAdd'
import TeamsEdit from './pages/TeamsEdit'
import NotFound from './NotFound'

window.store = store

const mapStateToProps = state => {
  return { is_authenticated: state.is_authenticated }
}

const RedirectIfLoggedIn =  ({ ...props }) => {
    return localStorage.getItem('loggedIn')
        ? ( <Redirect to="/" /> )
        : ( <Route {...props} /> )
}

class Main extends Component {
  render () {
    let loggedIn = localStorage.getItem('loggedIn')

    return (
          <div className="container mx-auto">
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
                <Route exact path='/teams' component={Teams}/>
                <Route exact path='/teams/add' component={TeamsAdd}/>
                <Route exact path='/teams/edit/:id' component={TeamsEdit}/>

                // 404
                <Route path="*" component={NotFound} />
              </Switch>
            </HashRouter>
          </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

