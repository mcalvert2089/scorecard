import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import store from '../../js/store/index'
import { Provider } from 'react-redux'
import Main from './Main'
import Header from './Header'

class App extends Component {
  render () {
    return (
         <Provider store={store}>
	         <Header />
	         <HashRouter>
	         	<Main/>
	         </HashRouter>
	     </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))