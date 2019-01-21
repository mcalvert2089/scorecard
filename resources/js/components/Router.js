import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter, Route, Redirect, Switch, withRouter } from 'react-router-dom'
import store from '../store/index'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ActivateAccount from './ActivateAccount'
import NotFound from './NotFound'
import Teams from './pages/Teams'
import { connect } from "react-redux"
import { isAuthenticated } from '../actions/index'

const mapStateToProps = state => {
  return { is_authenticated: state.is_authenticated }
}

const mapDispatchToProps = dispatch => ({
  isAuthenticated: dispatch(isAuthenticated())
})

class Router extends Component {
  render () {
    let message

    if(this.props.isAuthenticated) {
      message = 'logged in'
    } else {
      message = 'logged out'
    }
    return (
        <div>
          AUTH: { message }
      			<Switch>
              // public routes
              <Route exact path='/' component={Home}/>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path='/activate/:key' component={ActivateAccount}/>
              
              if (! this.props.is_authenticated) {
                 <Redirect to={ '/login' } />
              }
              
              // protected routes
              // Teams
              <Route path='/teams' component={Teams}/>

      				// 404
            	<Route path="*" component={NotFound} />
      			</Switch>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Router)