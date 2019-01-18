import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import store from '../store/index'
import Header from './Header'
import Router from './Router'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import ActivateAccount from './ActivateAccount'
import NotFound from './NotFound'
import {connect} from "react-redux"
import { isAuthenticated } from '../actions/index'

class App extends Component {
  render () {
    let message

    if (this.props.is_authenticated) {
      message = 'loggedIn'
    } else {
      message = 'loggedOut'
    }

    return (
      <Provider store={store}>
          <div id="content">
  	        <div>
  	          <Header />
  	        </div>
            <Router />
      		</div>
        </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))