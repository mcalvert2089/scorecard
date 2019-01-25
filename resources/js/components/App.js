import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import store from '../../js/store/index'
import { saveUserInfo } from '../../js/actions/index'
import Main from './Main'
import Header from './Header'

if(localStorage.getItem('access_token')) axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('access_token')

class App extends Component {
  	componentDidMount() {
		if(localStorage.getItem('access_token')) {
			axios.get('/api/me')
			    .then((result) => {
			      if(result.status === 200) {
			      	store.dispatch( saveUserInfo({ user: result.data }) )
			      }
			    })
		}
	}

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