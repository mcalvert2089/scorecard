import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import store from '../../js/store/index'
import { Provider } from 'react-redux'
import Main from './Main'
import Header from './Header'

if(localStorage.getItem('access_token')) axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token')

class App extends Component {
  render () {
    return (
         <Provider store={store}>
	         <Header />
	         <Main/>
	     </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))