import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect, Provider } from 'react-redux'
import { createStore } from 'redux'
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom'
import store from '../store/index'
import Home from './Home'
import Login from './Login'
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


class Main extends Component {
  render () {
    let message

    if (this.props.is_authenticated) {
      message = 'loggedIn'
    } else {
      message = 'loggedOut'
    }

    return (
          <HashRouter>
            <Switch>
              // public routes
              <Route exact path='/' component={Home}/>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path='/activate/:key' component={ActivateAccount}/>
              
              if (! this.props.is_authenticated) {
                 <Redirect to={ '/login' } />
              }
              
              // protected routes
              // Teams
              <Route path='/teams' component={Teams}/>

              // 404
              <Route path="*" component={NotFound} />
            </Switch>
          </HashRouter>
    )
  }
}

export default Main
// export default connect(mapStateToProps, mapDispatchToProps)(Main)

